// SPDX-License-Identifier: GPL-3.0

/// @title Interface for Noun Auction Houses

/*********************************
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ *
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ *
 * ░░░░░░█████████░░█████████░░░ *
 * ░░░░░░██░░░████░░██░░░████░░░ *
 * ░░██████░░░████████░░░████░░░ *
 * ░░██░░██░░░████░░██░░░████░░░ *
 * ░░██░░██░░░████░░██░░░████░░░ *
 * ░░░░░░█████████░░█████████░░░ *
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ *
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ *
 *********************************/

pragma solidity ^0.8.6;

interface IFantosiAuctionHouse {
    struct FinalBid {
        // final Bid 제출자의 주소
        address payable finalBidder;
        // final Bid 금액
        uint256 finalBidAmount;
    }

    struct Auction {
        // ID for the PhotoCard (ERC721 token ID)
        uint256 photoCardId;
        // The current highest bid amount
        uint256 amount;
        // The time that the auction started
        uint256 startTime;
        // Final Auction이 시작되는 시점
        uint256 finalAuctionTime;
        // The time that the auction is scheduled to end
        uint256 endTime;
        // The address of the current highest bid
        address payable bidder;
        // final Auction 발생 여부
        bool isFinalBid;
        // Whether or not the auction has been settled
        bool settled;
    }

    event AuctionCreated(uint256 indexed photoCardId, uint256 startTime, uint256 endTime);

    event AuctionBid(uint256 indexed photoCardId, address sender, uint256 value, bool extended);

    event AuctionExtended(uint256 indexed photoCardId, uint256 endTime);

    event AuctionSettled(uint256 indexed photoCardId, address winner, uint256 amount);

    event AuctionTimeBufferUpdated(uint256 timeBuffer);

    event AuctionReservePriceUpdated(uint256 reservePrice);

    event AuctionMinBidIncrementPercentageUpdated(uint256 minBidIncrementPercentage);

    function settleAuction() external;

    function settleCurrentAndCreateNewAuction() external;

    function createBid(uint256 photoCardId) external payable;

    function pause() external;

    function unpause() external;

    function setTimeBuffer(uint256 timeBuffer) external;

    function setReservePrice(uint256 reservePrice) external;

    function setMinBidIncrementPercentage(uint8 minBidIncrementPercentage) external;
}
