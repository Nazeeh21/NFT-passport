// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Passport.sol";
import "./CountryStamp.sol";

contract MainContract {
    mapping(address => Passport) public passports;
    mapping(string => CountryStamp) public countryStamps;

    // Create a new passport for the user
    function createPassport() external {
        require(address(passports[msg.sender]) == address(0), "Passport already exists.");
        Passport passport = new Passport(msg.sender);
        passports[msg.sender] = passport;
    }

    // Create a new country stamp
    function createCountryStamp(string memory countryName, string memory currency, string memory flagSvg) external {
        require(address(countryStamps[countryName]) == address(0), "Country stamp already exists.");
        CountryStamp countryStamp = new CountryStamp(countryName, currency, flagSvg);
        countryStamps[countryName] = countryStamp;
    }

    // Collect a country stamp for the user's passport
    function collectStamp(string memory countryName) external {
        require(address(passports[msg.sender]) != address(0), "Passport does not exist.");
        require(address(countryStamps[countryName]) != address(0), "Country stamp does not exist.");
        Passport userPassport = passports[msg.sender];
        CountryStamp countryStamp = countryStamps[countryName];
        userPassport.collectStamp(countryStamp);
    }
}