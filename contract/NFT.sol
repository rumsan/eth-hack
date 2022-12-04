//SPDX-License-Identifier: Unlicensed

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

pragma solidity 0.8.10;

contract NFT is ReentrancyGuard, ERC721,ERC721Enumerable,ERC721URIStorage,Ownable{
    ///@notice counters to count tokens minted
	///@dev counters to keep track of tokens
	using Counters for Counters.Counter;
	Counters.Counter private _tokenIds;

    constructor() ERC721('EthIndia', 'Eth') {
	}

    modifier onlyTokenOwner(uint256 _tokenId) {
		address owner = ownerOf(_tokenId);
		require(owner == msg.sender, 'Not Authorized');
		_;
	}

    ///@notice mint the nfts
	///@param _tokenURI uri of the nft to be minted
	///@param _to address to mint the token
	///@dev anyone can mint
	function mint(string calldata _tokenURI, address _to) public  nonReentrant returns (uint256) {
		bytes memory testString = bytes(_tokenURI);
		require(testString.length != 0 && keccak256(testString) != keccak256(' '), 'uri:invalid');
		// require(keccak256(testString) != keccak256(' '), 'uri:whitespace');
		uint256 newId = _tokenIds.current();
		_tokenIds.increment();
		_mint(_to, newId);
		_setTokenURI(newId, _tokenURI);
		return newId;
	}

    ///@notice burn the given tokenId
	///@param _tokenId token Id to be burned
	///@dev only TokenOwner can burn his/her nft
	function burn(uint256 _tokenId) public  onlyTokenOwner(_tokenId) {
		_burn(_tokenId);
	}

	///@notice check the existence of given tokenId
	///@param _tokenId token Id to check
	function checkNft(uint256 _tokenId) public view  returns (bool exist) {
		return _exists(_tokenId);
	}
	function _burn(uint256 tokenId) internal override (ERC721, ERC721URIStorage) {
		super._burn(tokenId);
	}

	function _beforeTokenTransfer(
		address from,
		address to,
		uint256 tokenId
	) internal override(ERC721, ERC721Enumerable) {
		super._beforeTokenTransfer(from, to, tokenId);
	}

	function supportsInterface(bytes4 interfaceId)
		public
		view
		override(ERC721, ERC721Enumerable)
		returns (bool)
	{
		return super.supportsInterface(interfaceId);
	}

	function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
		return super.tokenURI(tokenId);
	}
}