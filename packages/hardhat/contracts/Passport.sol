// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./CountryStamp.sol"; // Make sure to import the CountryStamp contract

contract Passport is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Passport", "PAS") {}

    function mintPassport(string memory dataUri) external returns (uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, dataUri);
        return tokenId;
    }

    function collectStamp(
        uint256 passportTokenId,
        address countryStampAddress
    ) external {
        require(_exists(passportTokenId), "Passport: Invalid passportTokenId");
        require(ownerOf(passportTokenId) == msg.sender, "Passport: Caller not owner of passportTokenId");

        CountryStamp countryStamp = CountryStamp(countryStampAddress);
        uint256 countryStampTokenId = countryStamp.registerStamp();

        // Transfer the countryStampTokenId to the passport owner
        countryStamp.transferFrom(address(this), msg.sender, countryStampTokenId);
    }
}
