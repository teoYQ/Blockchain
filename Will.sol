pragma solidity ^0.4.25;

contract Will {
    address[] beneficiaries;
    address owner;
    uint give_away;
    bool alive;
    bytes32 secret;
    address executer;
    
    constructor(address exe) public payable {
        owner = msg.sender;
        give_away = msg.value;
        alive = true;
        executer = exe;
        
    }
    
    modifier onlyOwner { 
        require(msg.sender == owner, "you do no have access to this");
        _;
    }
    
    modifier afterDeath {
        require(alive == false, "owner not dead yet");
        _;
    }
    
    modifier onlyExecuter{
        require(msg.sender = executer);
    }
    
    modifier onlyBeneficiaries {
        
    }
    mapping ( address => uint ) inheritance;
    function add_beneficaries(address wallet_addr,uint amount) public onlyOwner {
        beneficiaries.push(wallet_addr);
        inheritance[wallet_addr] = amount;
        
    }
    
    function claimInheritance() private afterDeath {
        require(msg.sender)
    }
}