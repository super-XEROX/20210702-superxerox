// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/IERC1155MetadataURI.sol";

contract CopyToken is ERC1155PresetMinterPauser {

    constructor() public ERC1155PresetMinterPauser("http://mars.muzamint.com:3000/{id}.json") {
      // _mint(msg.sender, 0, 1000, "GOLD"); // owner, token id, amount, data
      // to use id for cryptokitty id as a copy of cryptokitty erc721 token
    }
