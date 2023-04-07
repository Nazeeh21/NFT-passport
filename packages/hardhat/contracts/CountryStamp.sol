// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CountryStamp is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    string public countryName;
    string public currency;
    string public dataUri;

    constructor(string memory _countryName, string memory _currency, string memory _dataUri) ERC721(_countryName, _currency) {
        countryName = _countryName;
        currency = _currency;
        dataUri = _dataUri;
        _tokenIdCounter.increment();
    }

    function registerStamp(address caller) external returns (uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _mint(caller, tokenId);
        _setTokenURI(tokenId, dataUri);
        return tokenId;
    }
}
