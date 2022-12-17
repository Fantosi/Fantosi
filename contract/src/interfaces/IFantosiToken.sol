// SPDX-License-Identifier: GPL-3.0

/// @title Interface for NounsToken

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

import { IERC721 } from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IFantosiToken is IERC721 {
    event PhotoCardCreated(uint256 indexed tokenId);

    event PhotoCardBurned(uint256 indexed tokenId);

    event FantosiAdminUpdated(address fantosiAdmin);

    event MinterUpdated(address minter);

    event MinterLocked();

    function mint() external returns (uint256);

    function burn(uint256 tokenId) external;

    function setfantosiAdmin(address fantosiAdmin) external;

    function setMinter(address minter) external;

    function lockMinter() external;

    function getTokenURI(uint256 tokenId) external view returns (string memory);

    function getSymbol() external returns (string memory);
}
