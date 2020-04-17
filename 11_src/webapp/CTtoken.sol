pragma solidity >=0.4.22 <0.7.0;

contract CTtoken {
    string public name = "cointosser";
    uint256 public totalSupply;
    string public symbol = "MLC";

    mapping(address => uint256) public balances;
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );
    modifier enoughmoney(uint256 _value, address _sender){
        require(balances[_sender] >= _value,"not enough balance");
        _;
    }


    constructor(uint256 _init) public  {
        totalSupply = _init;
        balances[msg.sender] = _init;
    }

    function transfer(address _to, uint256 _value) public enoughmoney(_value,msg.sender) returns (bool success){
        balances[msg.sender] -= _value;
        balances[_to] += _value;

        emit Transfer(msg.sender,_to, _value);
        return true;
    }
    mapping (address => mapping(address => uint256)) public allowances;
    event Approval(
        address indexed _owner,
        address indexed _approvee,
        uint256 _value
    );

    function approve(address _approvee, uint256 _value) public enoughmoney(_value,msg.sender) returns (bool success) {
        allowances[msg.sender][_approvee] = _value;
        emit Approval(msg.sender,_approvee,_value);
        return true;
    }
    function transferFrom(address _from, address _to, uint256 _value) public enoughmoney(_value,_from) returns (bool success) {
        require(allowances[_from][msg.sender] >= _value, "ALLOWANCE NOT ENOUGH");
        balances[_from] -= _value;
        balances[_to] += _value;
        allowances[_from][msg.sender] -= _value;
        emit Transfer(_from,_to,_value);
        return true;
    }

}