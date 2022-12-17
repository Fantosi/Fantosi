// SPDX-License-Identifier: GPL-3.0

/// @title FANTOSI Daily Auction Contract

// Original work from NOUNS DAO Project:
// https://github.com/nounsDAO/nouns-monorepo/tree/master/packages/nouns-contracts/contracts

pragma solidity ^0.8.6;

import { PausableUpgradeable } from "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import { ReentrancyGuardUpgradeable } from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { IFantosiAuctionHouse } from "./interfaces/IFantosiAuctionHouse.sol";
import { IFantosiToken } from "./interfaces/IFantosiToken.sol";
import { IWBNB } from "./interfaces/IWBNB.sol";

// TODO: 테스트 완료 후 제거
import "hardhat/console.sol";

contract FantosiAuctionHouse is IFantosiAuctionHouse, PausableUpgradeable, ReentrancyGuardUpgradeable {
    // 컨트랙트 admin => 최초 경매 시작 시 fantosiDAOExecutor로 설정됨
    address admin;

    // Fantosi 토큰 컨트랙트
    IFantosiToken public fantosiToken;

    // wrapped BNB 주소
    address public wBNB;

    // 새로운 Bid가 제시된 후 제공되는 최소한의 시간(endTime이 지나도 유효)
    uint256 public timeBuffer;

    // 최소 Bid 가격
    uint256 public reservePrice;

    // 새로운 Bid를 제시할 때 필요한 이전 Bid와의 최소 가격 차(%)
    uint8 public minBidIncrementPercentage;

    // Auction이 진행되는 라운드 시간
    uint256 public totalDuration;

    // Final Auction이 시작되는 시점
    uint256 public finalAuctionPoint;

    // 기존에 진행되었던 Auction
    IFantosiAuctionHouse.Auction[] public auctionHistory;

    // 현재 진행되고 있는 Auction
    IFantosiAuctionHouse.Auction public auction;

    // Fantosi DAO Treasury 컨트랙트
    address fantosiDAOExecutor;

    modifier onlyAdmin() {
        require(msg.sender == admin, "FANTOSI: ACCESS_ERROR");
        _;
    }

    function initialize(
        IFantosiToken _fantosiToken,
        address _wBNB,
        uint256 _timeBuffer,
        uint256 _reservePrice,
        uint8 _minBidIncrementPercentage,
        uint256 _totalDuration,
        uint256 _finalAuctionPoint,
        address _fantosiDAOExecutor
    ) external initializer {
        __Pausable_init();
        __ReentrancyGuard_init();

        _pause();

        admin = msg.sender;
        fantosiToken = _fantosiToken;
        wBNB = _wBNB;
        timeBuffer = _timeBuffer;
        reservePrice = _reservePrice;
        minBidIncrementPercentage = _minBidIncrementPercentage;
        totalDuration = _totalDuration;
        finalAuctionPoint = _finalAuctionPoint;
        fantosiDAOExecutor = _fantosiDAOExecutor;
    }

    function settleCurrentAndCreateNewAuction() external override nonReentrant whenNotPaused {
        _settleAuction();
        _createAuction();
    }

    function settleAuction() external override whenPaused nonReentrant {
        _settleAuction();
    }

    function createBid(uint256 photoCardId) external payable override nonReentrant {
        IFantosiAuctionHouse.Auction memory _auction = auction;

        require(_auction.photoCardId == photoCardId, "FANTOSI: INVALID_ID_ERROR");
        require(
            block.timestamp < _auction.endTime && block.timestamp < _auction.finalAuctionTime,
            "FANTOSI: EXPIRED_AUCTION_ERROR"
        );
        require(
            msg.value >= _auction.amount + ((_auction.amount * minBidIncrementPercentage) / 100),
            "FANTOSI: INCREMENT_AMOUNT_ERROR"
        );

        address payable lastBidder = _auction.bidder;

        // Refund the last bidder, if applicable
        if (lastBidder != address(0)) {
            _safeTransferBNBWithFallback(lastBidder, _auction.amount);
        }

        auction.amount = msg.value;
        auction.bidder = payable(msg.sender);

        // Extend the auction if the bid was received within `timeBuffer` of the auction end time
        bool extended = _auction.finalAuctionTime - block.timestamp < timeBuffer;
        if (extended) {
            auction.finalAuctionTime = _auction.finalAuctionTime = block.timestamp + timeBuffer;
            auction.isFinalBid = true;
        }

        emit AuctionBid(_auction.photoCardId, msg.sender, msg.value, extended);

        if (extended) {
            emit AuctionExtended(_auction.photoCardId, _auction.finalAuctionTime);
        }
    }

    // 관리자 호출 기능
    function pause() external override onlyAdmin {
        _pause();
    }

    function unpause() external override onlyAdmin {
        _unpause();

        if (auction.startTime == 0 || auction.settled) {
            _createAuction();
            transferAdmin(fantosiDAOExecutor);
        }
    }

    function transferAdmin(address newAdmin) public onlyAdmin {
        admin = newAdmin;
    }

    function setTimeBuffer(uint256 _timeBuffer) external override onlyAdmin {
        timeBuffer = _timeBuffer;

        emit AuctionTimeBufferUpdated(_timeBuffer);
    }

    function setReservePrice(uint256 _reservePrice) external override onlyAdmin {
        reservePrice = _reservePrice;

        emit AuctionReservePriceUpdated(_reservePrice);
    }

    function setMinBidIncrementPercentage(uint8 _minBidIncrementPercentage) external override onlyAdmin {
        minBidIncrementPercentage = _minBidIncrementPercentage;

        emit AuctionMinBidIncrementPercentageUpdated(_minBidIncrementPercentage);
    }

    function getCurrentAuction() external view returns (Auction memory) {
        return auction;
    }

    function getAuctionHistory() external view returns (Auction[] memory) {
        return auctionHistory;
    }

    function getAuctionHistoryLength() external view returns (uint256) {
        return auctionHistory.length;
    }

    function _createAuction() internal {
        try fantosiToken.mint() returns (uint256 photoCardId) {
            uint256 startTime;
            if (photoCardId == 1) {
                // 컬렉션에 대한 최초 경매 시, block.timestamp를 기준으로 startTime과 endTime 세팅
                startTime = block.timestamp;
            } else {
                // 이전 경매가 존재할 시, 이전 경매를 기준으로 startTime과 endTime 세팅
                startTime = auction.endTime;
            }

            uint256 finalAuctionTime = startTime + finalAuctionPoint;
            uint256 endTime = startTime + totalDuration;

            if (block.timestamp >= endTime) {
                // 마지막 경매의 종료 후 24시간 이상 settlement가 이루어지지 않은 경우, Auction을 중지
                _pause();
            }

            auction = Auction({
                photoCardId: photoCardId,
                amount: 0,
                startTime: startTime,
                finalAuctionTime: finalAuctionTime,
                endTime: endTime,
                bidder: payable(0),
                isFinalBid: false,
                settled: false
            });

            emit AuctionCreated(photoCardId, startTime, endTime);
        } catch Error(string memory) {
            _pause();
        }
    }

    function _settleAuction() internal {
        IFantosiAuctionHouse.Auction memory _auction = auction;

        require(_auction.startTime != 0, "FANTOSI: UNSTARTED_AUCTION_ERROR");
        require(!_auction.settled, "FANTOSI: SETTLED_AUCTION_ERROR");
        require(block.timestamp >= _auction.endTime, "FANTOSI: END_AUCTION_ERROR");

        auction.settled = true;

        if (_auction.bidder == address(0)) {
            fantosiToken.burn(_auction.photoCardId);
        } else {
            fantosiToken.transferFrom(address(this), _auction.bidder, _auction.photoCardId);
        }

        if (_auction.amount > 0) {
            _safeTransferBNBWithFallback(admin, _auction.amount);
        }

        // 마감된 Auction을 auctionHistory에 저장
        auctionHistory.push(_auction);

        emit AuctionSettled(_auction.photoCardId, _auction.bidder, _auction.amount);
    }

    function _safeTransferBNBWithFallback(address to, uint256 amount) internal {
        if (!_safeTransferBNB(to, amount)) {
            IWBNB(wBNB).deposit{ value: amount }();
            IERC20(wBNB).transfer(to, amount);
        }
    }

    function _safeTransferBNB(address to, uint256 value) internal returns (bool) {
        (bool success, ) = to.call{ value: value, gas: 30_000 }(new bytes(0));
        return success;
    }
}
