pragma solidity ^0.4.25;

contract Example {

    address private owner;

    constructor() public {
        owner = msg.sender;
    }

    function getOwner() public view returns(address) {
        return(owner);
    }

}
