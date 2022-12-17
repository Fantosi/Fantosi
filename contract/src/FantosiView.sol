/// @title FANTOSI View Contract

pragma solidity ^0.8.6;

import { IFantosiAuctionHouse } from "./interfaces/IFantosiAuctionHouse.sol";
import { IFantosiToken } from "./interfaces/IFantosiToken.sol";
import { Initializable } from "./upgrade/higherversion/Initializable.sol";

// TODO: 테스트 완료 후 제거
import "hardhat/console.sol";

contract FantosiView {
    // key => fantosiTokenAddress
    mapping(string => IFantosiToken) public fantosiTokenList;
    // fantosiTokenAddress => fantosiAuctionHouse
    mapping(IFantosiToken => IFantosiAuctionHouse) public auctionMap;

    function getFantosiTokenAddress(string memory key) external view returns (IFantosiToken) {
        return fantosiTokenList[key];
    }

    function setFantosiTokenAddress(string memory key, IFantosiToken fantosiToken) external {
        fantosiTokenList[key] = fantosiToken;
    }

    struct PhotoCardInfo {
        address fantosiTokenAddress;
        string metadataURI;
        IFantosiAuctionHouse.Auction auction;
    }

    function getArtistPhotoCardInfo(address fantosiTokenAddress) external view returns (PhotoCardInfo memory) {}

    function getAllPhotoCardInfo(address fantosiTokenAddress) external view returns (PhotoCardInfo[] memory) {}
}
