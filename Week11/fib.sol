pragma solidity ^0.4.25;

contract Fib {

    uint constant FEE = 1 ether;

    address private owner;
    uint private previousFirst;
    uint private previousSecond;
    uint private next;

    constructor() payable public {
        owner = msg.sender;
    }

    function getOwner() public view returns(address) {
        return(owner);
    }

    function fibonacciA(uint n) public payable returns(uint) {
        require(msg.value == FEE, "You must pay to execute this");
        if(n == 0){return(0);}
        if(n == 1){return(1);}
        else{return(fibonacciA(n - 1) + fibonacciA(n - 2));}
    }

    function fibonacciB(uint n) public returns(uint) {
        previousFirst = 0;
        previousSecond = 1;
        next = 1;
        for(uint i = 2; i <= n; i++) {
            next = previousFirst + previousSecond;
            previousFirst = previousSecond;
            previousSecond = next;
        }
        return(next);
    }

}
