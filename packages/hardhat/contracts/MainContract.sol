// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Passport.sol";
import "./CountryStamp.sol";

contract MainContract {
    Passport public passport;
    address[] public countryStampAddresses;

    constructor() {
        passport = new Passport();
    }

    function createPassport(string memory dataUri) public returns (uint256) {
        return passport.mintPassport(dataUri);
    }

    function collectStamp(
        uint256 passportTokenId,
        address countryStampAddress,
        string memory dataUri
    ) public {
        passport.collectStamp(passportTokenId, countryStampAddress, dataUri);
    }

    function createCountryStamp(string memory countryName, string memory currency) public returns (address) {
        CountryStamp countryStamp = new CountryStamp(countryName, currency);
        countryStampAddresses.push(address(countryStamp));
        return address(countryStamp);
    }

    function getCountryStamps() public view returns (address[] memory) {
        return countryStampAddresses;
    }
}
