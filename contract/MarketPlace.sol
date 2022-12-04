//SPDX-License-Identifier: Unlicensed
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/utils/structs/EnumerableSet.sol';
import './NFT.sol';
import 'hardhat/console.sol';


pragma solidity 0.8.10;

contract MarketPlace{
    using SafeMath for uint256;
    using EnumerableSet for EnumerableSet.UintSet;

    NFT public nft;

    EnumerableSet.UintSet private tokenIdOnSell;

    struct tokenInfo{
        uint256 tokenId;
        uint256 totalSell;
        uint256 minPrice;
        bool onSell;
        address nftOwner;

    }

    uint256 public platformFee;
    address public platformAddress;

    mapping(uint256=>tokenInfo) public tokenDetails;


    constructor (address _nft, address _platformAddress){
        nft = NFT(_nft);
        platformFee = 400;
        platformAddress =_platformAddress;

    }

    ///@notice to check whether the sender address is owner of given token id or not or the owner of the gallery
	///@dev modifier to check whether the sender address is owner of given token id or not or the owner of the gallery
	modifier onlyTokenOwner(uint256 _tokenId) {
        tokenInfo  memory _tokenInfo = tokenDetails[_tokenId];
        require(_tokenInfo.nftOwner == msg.sender,"MarketPlace:Not authorized");
        _;

	}

    function mintAndSell(uint256 _price,string calldata _tokenUri) public{
        uint256 _tokenId = nft.mint(_tokenUri,address(this));
        tokenInfo  storage _tokenInfo = tokenDetails[_tokenId];
        _tokenInfo.tokenId = _tokenId;
        _tokenInfo.minPrice = _price;
        _tokenInfo.onSell = true;
        _tokenInfo.nftOwner = msg.sender;

    }

    function buy(uint256 _tokenId) public payable {
        tokenInfo storage _tokenInfo = tokenDetails[_tokenId];
        require(_tokenInfo.onSell,"MarketPlace:Not on sell");
        require(_tokenInfo.minPrice == msg.value,"MarketPlace:Insufficent fund");
        address seller = _tokenInfo.nftOwner;
        _tokenInfo.onSell = false;
        _tokenInfo.totalSell += 1;
        _tokenInfo.minPrice =0;
        uint256 _platformFee;
        uint256 _remainingAmount;
        (_platformFee,_remainingAmount) = calculateCommission(_tokenId);
        nft.safeTransferFrom(address(this), msg.sender, _tokenId);
        transferfees(platformAddress, _platformFee);
        transferfees(seller, _remainingAmount);

    }

    function secondarySell(uint256 _tokenId, uint256 _price) public onlyTokenOwner(_tokenId){
        tokenInfo storage _tokenInfo = tokenDetails[_tokenId];
        require(!_tokenInfo.onSell,"MarketPlace:Already on sell");
        _tokenInfo.minPrice = _price;
        _tokenInfo.onSell = true;


    }

    function cancelSell(uint256 _tokenId) public onlyTokenOwner(_tokenId){
        tokenInfo storage _tokenInfo = tokenDetails[_tokenId];
        require(_tokenInfo.onSell,"MarketPlace:Not on sell");
        nft.safeTransferFrom(address(this), msg.sender, _tokenId);
        _tokenInfo.onSell = false;
        _tokenInfo.minPrice = 0;
    }

    ///@notice transfer the fees/commission rates to different parties
	///@dev internal utility function to transfer fees
	// function transferfees(uint256 _tokenId) internal {
	function transferfees(address receiver, uint256 _amount) internal {
		(bool txSuccess, ) = receiver.call{ value: _amount }('');
		require(txSuccess, 'Failed to pay commission rates');
	}

    function calculateCommission(uint256 _tokenId) internal view returns(
        uint256 _platformFee,
        uint256 _remainingAmount
    )
    {
        tokenInfo memory _tokenInfo = tokenDetails[_tokenId];
        uint256 sellingPrice = _tokenInfo.minPrice;
        _platformFee = cutPer10000(platformFee, sellingPrice);
        _remainingAmount = sellingPrice.sub(_platformFee);
        return (_platformFee,_remainingAmount);


    }

	///@notice calculate percent amount for given percent and total
	///@dev calculates the cut per 10000 fo the given total
	///@param _cut cut to be caculated per 10000, i.e percentAmount * 100
	///@param _total total amount from which cut is to be calculated
	///@return cutAmount percentage amount calculated
	///@dev internal utility function to calculate percentage
	function cutPer10000(uint256 _cut, uint256 _total) internal pure returns (uint256 cutAmount) {
		if (_cut == 0) return 0;
		cutAmount = _total.mul(_cut).div(10000);
		return cutAmount;
	}
}