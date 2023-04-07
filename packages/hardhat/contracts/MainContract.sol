// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Passport.sol";
import "./CountryStamp.sol";

contract MainContract {
    Passport public passport;
    mapping(string => address) public countryStampAddresses;
    mapping(address => uint256) public userToPassportId;
    mapping(address => mapping(string => uint256)) public userToStamp;

    constructor() {
        passport = new Passport();
    }

    function createPassport(string memory dataUri) public returns (uint256) {
        require(userToPassportId[msg.sender] < 1,"Passport already exist for this address.");
        uint256 passportTokenId = passport.mintPassport(msg.sender, dataUri);
        userToPassportId[msg.sender] = passportTokenId;
        return passportTokenId;
    }

    function collectStamp(string memory countryName) public {
        require(
            userToPassportId[msg.sender] > 0,
            "This address does not own any passport"
        );
        require(countryStampAddresses[countryName] != address(0x0),"Country Stamp does not exist");
        require(userToStamp[msg.sender][countryName] <= 0, "Stamp already collected");
        uint256 passportTokenId = userToPassportId[msg.sender];
        uint256 stampTokenId = passport.collectStamp(
            passportTokenId,
            countryStampAddresses[countryName], 
            msg.sender
        );
        userToStamp[msg.sender][countryName] = stampTokenId;
    }

    function createCountryStamp(
        string memory countryName,
        string memory currency,
        string memory dataUri
    ) public returns (address) {
        require(countryStampAddresses[countryName] == address(0), "Stamp already exist");
        CountryStamp countryStamp = new CountryStamp(
            countryName,
            currency,
            dataUri
        );
        countryStampAddresses[countryName] = address(countryStamp);
        return address(countryStamp);
    }

    // function getCountryStamps() public view returns (address[] memory) {
    //     return countryStampAddresses;
    // }
}
