// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Whitelist.sol";

contract CryptoDevs is ERC721Enumerable, Ownable {
    uint256 constant public _price = 0.01 ether;
    uint256 constant public maxTokenIds = 20;
    Whitelist whitelist;
    uint256 public reservedTokens;
    uint256 public reservedTokensClaimed = 0;
    constructor (address whitelistContract) ERC721("Crypto Devs", "CD") Ownable(msg.sender) {
        whitelist = Whitelist(whitelistContract);
        reservedTokens = whitelist.maxWhitelistedAddresses();
    }
    function mint() public payable {
        require(totalSupply() + reservedTokens - reservedTokensClaimed < maxTokenIds, "EXCEEDED_MAX_SUPPLY");
        if (whitelist.whitelistedAddresses(msg.sender) && msg.value < _price) {
            require(balanceOf(msg.sender) == 0, "ALREADY_OWNED");
            reservedTokens += 1;
        } else {
            require(msg.value >= _price, "NOT_ENOUGH_ETHER");
        }
        uint256 tokenId = totalSupply();
        _safeMint(msg.sender, tokenId);
    }

    function withdraw() public onlyOwner {
        address _owner = owner();
        uint amount = address(this).balance;
        (bool sent, ) = _owner.call{value : amount}("");
        require(sent, "Failed to send Ether");
    }

    




}