pragma solidity >=0.4.22 <0.7.0;
import "remix_tests.sol"; // this import is automatically injected by Remix.
import "cointoss.sol";


contract cointosstest {
    uint8 choice;
    bytes32 secret;
    cointoss test;
    cointoss player2;
    function beforeAll () payable public {
        choice = 1;
        secret = (keccak256(abi.encodePacked(choice)));
        test = (new cointoss).value(msg.value)(choice,secret);
        //test = (new cointoss(choice,secret));
        
    }
    function () payable {}
    function checkchoice () public {
        uint256 trial = 1;
        assert(test.choice() == trial);
        
    }
    
    function takethebet() public {
        uint nonce = 3;
        
    }
    function checkresult() public{
        require(test.result() != 2, "reveal not called");
        assert(test.choice() == test.result());
    }
}
