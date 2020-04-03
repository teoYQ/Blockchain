pragma solidity >=0.4.22 <0.7.0;


/**
 * Design, implement, and deploy (can be locally) a two-party coin tossing protocol and a smart contract running it.

For two participating users, Alice and Bob, your smart contract should determine the winner.
The protocol must be fair, i.e., for every run, Alice and Bob have equal 50% probability of winning.
The protocol must be secure, i.e., whenever a party deviates from the protocol it should be punished (e.g., by a deposit loss).
*/

contract cointoss {
    address payable public player1;
    address payable public player2;
    uint256 public betamount;
    uint256 choice; //1 is head tails is 0
    uint256 public result = 2;

    constructor(uint256 p1choice, uint256 value) public payable {
        player1 = msg.sender;
        require(msg.value == value,"wrong value");
        choice = p1choice;
        betamount = msg.value;
        //player1.transfer(value);
    }

    uint256 public expiration = 2**256 - 1;

    function takebet() public payable {
        require(player2 == address(0),"someone already took the bet"); //only 1 other player
        player2 = msg.sender;

        //require(msg.value == betamount);
        require(msg.value == betamount,"invalid amount"); //same bet amount

        //choice2 = choice2;
        expiration = now + 24 hours;
        //player2.transfer(va)
    }

    function reveal() public payable {
        require(player2 != address(0),"no one has joined the bet");
        require(now < expiration,"bet expired");
        result = uint256(blockhash(block.number)) % 2; // returns 0 or 1
        if (result == choice) {
            player1.transfer(address(this).balance);
        } else {
            player2.transfer(address(this).balance);
        }
    }

    function claimTimeout() public payable {
        require(now >= expiration,"bet has not expired");
        player2.transfer(address(this).balance);
    }

    function cancel() public payable {
        require(msg.sender == player1,"you are not the creator");
        require(player2 == address(0),"someone has already took the bet");

        betamount = 0;
        msg.sender.transfer(address(this).balance);
    }
}
