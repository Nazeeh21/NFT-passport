// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CountryStamp is ERC721 {
  using Strings for uint256;
  string public countryName;
  string public currency;
  string public countryFlag;
  uint256 private nextId = 0;
  mapping(uint256 => string) private _tokenURIs;

  constructor(string memory _countryName, string memory _currency, string memory _flagSvg) ERC721(_countryName, "CS") {
    countryName = _countryName;
    currency = _currency;
    countryFlag = _flagSvg;
  }

  function registerStamp(address _owner) external returns (uint256 _tokenId) {
    _tokenId = nextId++;
    _safeMint(_owner, _tokenId);
    _setTokenURI(tokenId, generateTokenURI(tokenId));
  }

  function _setTokenURI(uint256 _tokenId, string memory _tokenURI) internal {
    require(_exists(_tokenId), "ERC721Metadata: URI set of nonexistent token");
    _tokenURIs[_tokenId] = _tokenURI;
  }

  function tokenURI(uint256 _tokenId) public view override returns (string memory) {
    require(_exists(_tokenId), "ERC721Metadata: URI query for nonexistent token");
    return _tokenURIs[_tokenId];
  }

  function generateTokenURI(uint256 _tokenId) internal view returns (string memory) {
    return
      string(
        abi.encodePacked(
          "data:application/json;base64,",
          encode(
            string(
              abi.encodePacked(
                '{"name":"',
                countryName,
                '","description":"Country Stamp for ',
                countryName,
                '","attributes":[{"trait_type":"Country Name","value":"',
                countryName,
                '"},{"trait_type":"Currency","value":"',
                currency,
                '"},{"trait_type":"Date Visited","value":"',
                block.timestamp.toString(),
                '"}],"image":"',
                countryFlag,
                '"}'
              )
            )
          )
        )
      );
  }

  function encode(string memory source) public pure returns (string memory) {
    bytes memory _source = bytes(source);
    uint256 length = _source.length;
    bytes memory output = new bytes(length * 2);
    uint256 i = 0;
    uint256 index = 0;
    for (i = 0; i < length; i++) {
      uint8 _char = uint8(_source[i]);
      output[index++] = HEX_CHARACTERS[_char >> 4];
      output[index++] = HEX_CHARACTERS[_char & 0x0F];
    }
    return string(output);
  }

  bytes private constant HEX_CHARACTERS = "0123456789abcdef";

  function mint(address to, uint256 tokenId) public {
    _safeMint(to, tokenId);
    _setTokenURI(tokenId, tokenId.toString());
  }
}
