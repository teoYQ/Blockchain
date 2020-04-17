pragma solidity >=0.4.22 <0.7.0;

import "/home/yq/Desktop/Blockchain/11_src/webapp/CTtoken.sol";

/**
 * Design, implement, and deploy (can be locally) a two-party coin tossing protocol and a smart contract running it.

For two participating users, Alice and Bob, your smart contract should determine the winner.
The protocol must be fair, i.e., for every run, Alice and Bob have equal 50% probability of winning.
The protocol must be secure, i.e., whenever a party deviates from the protocol it should be punished (e.g., by a deposit loss).
*/

contract Cointoss is CTtoken(1000000) {
    address public player1;
    address public player2;
    uint256 public betamount;
    uint256 public choice; //1 is head tails is 0
    uint256 public result = 2;
    bytes32 commit;
    uint256 p2nonce;
    address owner;
    struct flip {
        uint256 choice;
        address player1;
        bytes32 commit;
        address player2;
        uint256 betamount;
        uint256 nonce;
        uint256 result;
        uint256 expiration;
    }
    flip[] public flips;
    mapping(address => flip) public games;
    constructor() public payable {
    }
    function createbet(uint256 p1choice, bytes32 secret) public payable {
        player1 = msg.sender;
        owner = msg.sender;
        //require(msg.value == value,"wrong value");
        choice = p1choice;
        betamount = msg.value;
        //player1.transfer(value);
        commit = (secret);
        flip storage game = games[msg.sender];
        game.choice = choice;
        game.player1 = msg.sender;
        game.commit = commit;
        game.betamount = betamount;
        log3(
            bytes32(uint256(msg.sender)),
            bytes32(betamount),
            bytes32(choice),
            bytes32(secret)
        );
        //commit = sha256(abi.encodePacked(secret));
    }
    function () external payable {}
    modifier onlyOwner() {
        require(msg.sender == player1, "you do not own the contract");
        _;
    }

    uint256 public expiration = 2**256 - 1;

    function takebet(uint256 nonce) public payable {
        require(player2 == address(0),"someone took the bet already"); //only 1 other player
        player2 = msg.sender;
        games[player1].player2 = player2;
        //require(msg.value == betamount);
        //require(msg.value == betamount,"betamount does not match"); //same bet amount

        //choice2 = choice2;
        expiration = now + 24 hours;
        games[player1].expiration = expiration;
        p2nonce = nonce;
        games[player1].nonce = nonce;
        //player2.transfer(va)
    }

    function reveal(uint256 ran) public onlyOwner payable returns(uint) {
        //bytes32 ran_32 = bytes32(ran);
        //require(msg.sender == owner, "YOU NOT OWNER");
        require(player1 != address(0),"no one created a bet, do create your own!");
        require(player2 != address(0),"Need someone to take your bet");
        require(now < expiration,"bet expired");
        require((keccak256(abi.encodePacked(ran))) == commit,"hash mismatch");
        //require(keccak256(ran) == commit,"hash mismatch");
        result = (ran + p2nonce) % 2; // returns 0 or 1
        games[player1].result = result;
        if (result == choice) {
            player1.transfer(address(this).balance);
        } else {
            player2.transfer(address(this).balance);
        }
        player1 = address(0);
        player2 = address(0);
        return result;
    }
    function modifyNonce(uint256 nonce_) public {
        require(result == 2, "reveal has already been called");
        games[player1].nonce = nonce_;
        p2nonce = nonce_;
    }
    function claimTimeout() public payable {
        require(now >= expiration,"please wait for contract to expire");
        player2.transfer(address(this).balance);
    }

    function cancel() onlyOwner public payable {
        //require(msg.sender == player1,"you are not the owner");
        require(player2 == address(0),"someone has already joined the bet");

        betamount = 0;
        games[player1].betamount = 0;
        msg.sender.transfer(address(this).balance);
        player1 = address(0);
    }
    function getOwner(uint ran) pure public returns(bytes32){
        return(keccak256(abi.encodePacked(ran)));
    }

}