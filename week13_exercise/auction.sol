pragma solidity ^0.4.10;

contract Auction {
    
    address winner;
    uint lastBid;
    
    function Auction() public {
        winner = msg.sender;
        lastBid = 0;
    }

    function bid() public payable {
        assert(msg.value > lastBid);
        if (lastBid > 0) {
            assert(winner.call.value(lastBid)());
        }
        winner = msg.sender;
        lastBid = msg.value;
    }
    
    function getWinner() public returns(address) {
        return winner;
    }
    function () payable{}
}