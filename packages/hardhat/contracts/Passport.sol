// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CountryStamp.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Passport is ERC721 {
    address public owner;

    mapping(uint256 => address) public collectedStamps;

    constructor(address _owner) ERC721("Passport", "PP") {
        owner = _owner;
        _mint(_owner, 0); // Mint passport with tokenId 0
    }

    function collectStamp(CountryStamp countryStamp) external {
        require(msg.sender == owner, "Only the passport owner can collect stamps.");
        uint256 countryStampTokenId = countryStamp.registerStamp(address(this));
        collectedStamps[countryStampTokenId] = address(countryStamp);
    }
}
