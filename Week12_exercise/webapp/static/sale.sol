pragma solidity ^0.4.24;

import "cointoss.sol";


contract sale {
    address admin;
    Cointoss public cointosscontract;
    uint256 public coinPrice;
    uint256 public coinsSold;
    uint256 public icoStartTime;
    uint256 public icoEndTime;

    constructor(uint256 _start, uint256 _end, uint256 _price) public {
        icoStartTime = _start;
        icoEndTime = _end;
        coinPrice = _price;
        admin = msg.sender;
    }



    function buy(uint256 _noToken) public payable {
        require(msg.value == _noToken * coinPrice,"wrong value");
        require(
            coinsSold <= 1000000 - _noToken,
            "not enough token to sell"
        );
        require(
            cointosscontract.transfer(msg.sender, _noToken),
            "transfer failed"
        );
        coinsSold += _noToken;
    }

    function end() public {
        require(msg.sender == admin);
        admin.transfer(address(this).balance);
        cointosscontract.transfer(admin, cointosscontract.balances(this));
    }
}
