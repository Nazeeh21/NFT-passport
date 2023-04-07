// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./CountryStamp.sol"; // Make sure to import the CountryStamp contract

contract Passport is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    mapping(address => uint256) public userToPassportId;

    constructor() ERC721("Passport", "PAS") {
        _tokenIdCounter.increment();
    }

    function mintPassport(address caller, string memory dataUri) external returns (uint256) {
        require(userToPassportId[caller] <=0, "passport already exist for this address");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _mint(caller, tokenId);
        _setTokenURI(tokenId, dataUri);
        userToPassportId[caller] = tokenId;
        return tokenId;
    }

    function collectStamp(
        uint256 passportTokenId,
        address countryStampAddress,
        address caller
    ) external returns(uint256) {
        require(_exists(passportTokenId), "Passport: Invalid passportTokenId");
        require(ownerOf(passportTokenId) == caller, "Passport: Caller not owner of passportTokenId");

        CountryStamp countryStamp = CountryStamp(countryStampAddress);
        uint256 countryStampTokenId = countryStamp.registerStamp(caller);

        // Transfer the countryStampTokenId to the passport owner
        // countryStamp.transferFrom(address(this), caller, countryStampTokenId);
        return countryStampTokenId;
    }
}
