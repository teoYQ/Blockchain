pragma solidity ^0.4.10;

contract Bank {

    mapping(address => uint) balances;

    function deposit() public payable {
        balances[msg.sender] = balances[msg.sender] + msg.value;
    }

    function withdrawAll() public {
        uint amount = balances[msg.sender];
        assert(msg.sender.call.value(amount)());
        balances[msg.sender] = 0;
    }
    
    function getBalance(address _address) public returns(uint) {
        return(balances[_address]);
    }

}