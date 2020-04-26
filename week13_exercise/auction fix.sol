pragma solidity ^0.4.10;

contract Auction {
    
    address winner;
    uint lastBid;
    mapping(address => uint) to_refund;
    
    function Auction() public {
        winner = msg.sender;
        lastBid = 0;
    }

    function bid() public payable {
        assert(msg.value > lastBid);
        if (lastBid > 0) {
            to_refund[winner] = lastBid;
        }
        winner = msg.sender;
        lastBid = msg.value;
    }
    
    function getWinner() public returns(address) {
        return winner;
    }
    function get_refund() public payable{
        assert(msg.sender.call.value(to_refund[msg.sender])());
        to_refund[msg.sender] = 0;
    }
}