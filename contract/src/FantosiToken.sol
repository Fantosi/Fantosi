// SPDX-License-Identifier: GPL-3.0

/// @title FANTOSI Photocard Token Contract

// Original work from NOUNS DAO Project:
// https://github.com/nounsDAO/nouns-monorepo/tree/master/packages/nouns-contracts/contracts

pragma solidity 0.8.11;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ERC721Checkpointable } from "./base/ERC721Checkpointable.sol";
import { IFantosiToken } from "./interfaces/IFantosiToken.sol";
import { ERC721 } from "./base/ERC721.sol";
import { IERC721 } from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

// TODO: 테스트 완료 후 제거
import "hardhat/console.sol";

contract FantosiToken is IFantosiToken, Ownable, ERC721Checkpointable {
    // The FANTOSI admin address
    address public fantosiAdmin;

    // The artist address
    address public fantosiArtist;

    // The minter address (In this project, FantosiAuctionHouse should be minter.)
    address public minter;

    // minter lock status
    bool public isMinterLocked;

    // current photoCard ID
    uint256 private _currentPhotoCardId;

    // IPFS content hash of contract-level metadata
    string public contractURIHash;

    // modifiers
    modifier whenMinterNotLocked() {
        require(!isMinterLocked, "Minter is locked");
        _;
    }

    modifier onlyFantosiAdmin() {
        require(msg.sender == fantosiAdmin, "Sender is not the nounders DAO");
        _;
    }

    modifier onlyMinter() {
        require(msg.sender == minter, "Sender is not the minter");
        _;
    }

    constructor(
        address _fantosiAdmin,
        address _fantosiArtist,
        string memory name,
        string memory symbol,
        string memory baseContractURIHash
    ) ERC721(name, symbol) {
        fantosiAdmin = _fantosiAdmin;
        fantosiArtist = _fantosiArtist;
        contractURIHash = baseContractURIHash;
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return tokenURI(tokenId);
    }

    function getSymbol() public view returns (string memory) {
        return symbol();
    }

    function setContractURIHash(string memory newContractURIHash) external onlyOwner {
        contractURIHash = newContractURIHash;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return string(abi.encodePacked(super.tokenURI(tokenId), ".json"));
    }

    function mint() public override onlyMinter returns (uint256) {
        if (_currentPhotoCardId % 10 == 0) {
            _mintTo(fantosiAdmin, _currentPhotoCardId++);
        }
        return _mintTo(minter, _currentPhotoCardId++);
    }

    function burn(uint256 nounId) public override onlyMinter {
        _burn(nounId);
        emit PhotoCardBurned(nounId);
    }

    function setfantosiAdmin(address _fantosiAdmin) external override onlyFantosiAdmin {
        fantosiAdmin = _fantosiAdmin;

        emit FantosiAdminUpdated(_fantosiAdmin);
    }

    function setMinter(address _minter) external override onlyOwner whenMinterNotLocked {
        minter = _minter;

        emit MinterUpdated(_minter);
    }

    function lockMinter() external override onlyOwner whenMinterNotLocked {
        isMinterLocked = true;

        emit MinterLocked();
    }

    function _baseURI() internal view override returns (string memory) {
        return contractURIHash;
    }

    function _mintTo(address to, uint256 nounId) internal returns (uint256) {
        _mint(owner(), to, nounId);
        emit PhotoCardCreated(nounId);

        return nounId;
    }

    function totalSupply() public view override returns (uint256) {
        super.totalSupply();
    }
}
