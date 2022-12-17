/// @title FANTOSI View Contract

pragma solidity ^0.8.6;

import { IFantosiAuctionHouse } from "./interfaces/IFantosiAuctionHouse.sol";
import { IFantosiToken } from "./interfaces/IFantosiToken.sol";
import { Initializable } from "./upgrade/higherversion/Initializable.sol";

// TODO: 테스트 완료 후 제거
import "hardhat/console.sol";

contract FantosiView is Initializable {
    struct PhotoCardInfo {
        string metadataURI;
        IFantosiAuctionHouse.Auction currentAuction;
    }

    struct Artist {
        string artistKey;
        IFantosiToken fantosiTokenAddr;
        IFantosiAuctionHouse auctionHouseAddr;
    }

    // All Artist
    string[] public artists;
    // All Fantosi Tokens
    IFantosiToken[] public fantosiTokens;
    // key => fantosiTokenAddress
    mapping(string => IFantosiToken) public fantosiTokenList;
    // fantosiTokenAddress => fantosiAuctionHouse
    mapping(IFantosiToken => IFantosiAuctionHouse) public auctionMap;

    function initialize() public initializer {}

    function getFantosiTokenAddress(string memory key) public view returns (IFantosiToken) {
        return fantosiTokenList[key];
    }

    function setFantosiTokenAddress(string memory key, IFantosiToken fantosiToken) external {
        fantosiTokenList[key] = fantosiToken;

        artists.push(fantosiToken.getSymbol());
        fantosiTokens.push(fantosiToken);
    }

    function setFantosiTokenAuctionHouse(IFantosiToken fantosiToken, IFantosiAuctionHouse fantosiAuctionHouse)
        external
    {
        auctionMap[fantosiToken] = fantosiAuctionHouse;
    }

    function getAllArtistInfo() external view returns (Artist[] memory artistsInfo) {
        string[] memory artistsLocal = artists;
        uint256 length = artistsLocal.length;

        artistsInfo = new Artist[](length);
        
        for (uint256 i = 0; i < length; i++) {
            artistsInfo[i].artistKey = artistsLocal[i];
            artistsInfo[i].fantosiTokenAddr = fantosiTokenList[artistsLocal[i]];
            artistsInfo[i].auctionHouseAddr = auctionMap[artistsInfo[i].fantosiTokenAddr];
        }
    }

    function getArtistPhotoCardInfo(string memory key) public view returns (PhotoCardInfo memory photoCardInfo) {
        IFantosiToken fantosiToken = getFantosiTokenAddress(key);
        photoCardInfo = _getArtistPhotoCardInfo(fantosiToken);
    }

    function _getArtistPhotoCardInfo(IFantosiToken fantosiToken)
        internal
        view
        returns (PhotoCardInfo memory photoCardInfo)
    {
        IFantosiAuctionHouse _auctionHouse = auctionMap[fantosiToken];

        photoCardInfo.currentAuction = _auctionHouse.getCurrentAuction();
        photoCardInfo.metadataURI = fantosiToken.getTokenURI(photoCardInfo.currentAuction.photoCardId);
    }

    function getAllPhotoCardInfo() external view returns (PhotoCardInfo[] memory allPhotoCardInfo) {
        IFantosiToken[] memory localFantosiTokens = fantosiTokens;

        uint256 length = localFantosiTokens.length;
        allPhotoCardInfo = new PhotoCardInfo[](length);

        for (uint256 i = 0; i < length; i += 1) {
            allPhotoCardInfo[i] = _getArtistPhotoCardInfo(localFantosiTokens[i]);
        }
    }

    function getArtistPhotoCardHistoryInfo(string memory key)
        external
        view
        returns (PhotoCardInfo[] memory allPhotoCardInfo)
    {
        IFantosiToken fantosiToken = getFantosiTokenAddress(key);
        IFantosiAuctionHouse _auctionHouse = auctionMap[fantosiToken];

        uint256 length = _auctionHouse.getAuctionHistoryLength();
        IFantosiAuctionHouse.Auction[] memory auctionHistory = new IFantosiAuctionHouse.Auction[](length);
        auctionHistory = _auctionHouse.getAuctionHistory();

        allPhotoCardInfo = new PhotoCardInfo[](length + 1);

        for (uint256 i = 0; i < length; i++) {
            allPhotoCardInfo[i].currentAuction = auctionHistory[i];
            allPhotoCardInfo[i].metadataURI = fantosiToken.getTokenURI(allPhotoCardInfo[i].currentAuction.photoCardId);
        }

        allPhotoCardInfo[length] = _getArtistPhotoCardInfo(fantosiToken);
    }
}
