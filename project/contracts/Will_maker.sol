pragma solidity >=0.4.21 <0.7.0;


contract Will_maker {
    uint public deployed = 1;
    uint8 lock;
    constructor() public payable {
    }
    modifier onlyBeneficiaries(address _owner){
        require(wills[_owner].beneficiaries[msg.sender] != 0,"you do not have an inheritance here");
        _;
    }

    modifier willOwners(){
        require(wills[msg.sender].expiry != 0,"no will to adjust here");
        _;
    }
    modifier ownerDied(address _owner){
        require(block.number > wills[_owner].expiry,"will owner is still alive, or not enough time has passed");
        _;
    }

    modifier enoughMoney(uint[] memory _values){
        uint sum;
        for (uint j = 0; j < _values.length; j++){
            sum = sum + _values[j];
        }
        require(sum*1 ether == msg.value,"value and sum dont match");
        _;
    }
    struct Will{
        address executor;
        bytes32 secret;
        uint count;
        uint256 expiry;
        mapping(uint => address) beneficiariesList;
        mapping(address  => uint) beneficiaries;
    }
    event created_will(
        address _owner,
        address[] _bene,
        uint[] _values
    );
    mapping(address => Will) public wills;
    function create_will(address _exe, address[] memory _beneficiaries,uint[] memory _values,bytes32 _sec) public enoughMoney(_values) payable{
        // create the struct
        Will storage w = wills[msg.sender];
        w.executor = _exe;
        w.secret = _sec;
        w.count = _beneficiaries.length;
        //w.beneficiaries = _beneficiaries;
        //w.values = _values;
        w.expiry = block.number;
        for (uint i = 0; i < _beneficiaries.length; i++ ){
            w.beneficiaries[_beneficiaries[i]] = _values[i];
            w.beneficiariesList[i] = _beneficiaries[i];
        }
        wills[msg.sender] = w;
        emit created_will(msg.sender,_beneficiaries,_values);
    }
    function get_beneficiaries() public view willOwners() returns(address[] memory) {
        address[] memory out = new address[](wills[msg.sender].count);
        for (uint i = 0; i < wills[msg.sender].count; i++){
            out[i] = wills[msg.sender].beneficiariesList[i];
        }
        return out;
        //return wills[msg.sender].beneficiaries;
    }
    function add_beneficiaries(address[] memory _benes,uint[] memory _values) public payable willOwners(){
       for (uint i = 0;i<_benes.length;i++){
           wills[msg.sender].beneficiariesList[wills[msg.sender].count] = _benes[i];
           wills[msg.sender].beneficiaries[_benes[i]] = _values[i];
           wills[msg.sender].count += 1;
       }
    }
    function remove_beneficiary(address _bene) public willOwners() payable{
        require(lock==0,"lock in use");
        lock = 1;
        uint refund = wills[msg.sender].beneficiaries[_bene];
        (bool success, ) = msg.sender.call.value(refund*1 ether)("");
        require(success,"failed to pay");
        wills[msg.sender].beneficiaries[_bene] = 0;
        for (uint i; i<wills[msg.sender].count;i++){
            if(wills[msg.sender].beneficiariesList[i]==_bene){ 
                wills[msg.sender].beneficiariesList[i] = address(0);
            }
        }

        lock =0;
    }
    
    function get_inheritance(address _owner) public view returns(uint _amount){
        return wills[_owner].beneficiaries[msg.sender] * 1 ether;

    }

    function claim_money(address _owner) public payable ownerDied(_owner){
        require(lock==0,"someone is using this");
        lock = 1;
        (bool success, ) = msg.sender.call.value(wills[_owner].beneficiaries[msg.sender] * 1 ether)("");
        require(success,"failed to pay");
        wills[_owner].beneficiaries[msg.sender] = 0;
        lock = 0;
    }
    function claim_money_pass(address _owner, uint _pass) public payable{
        require(lock==0,"someone is using this");
        //check = keccak256(abi.encodePacked(_pass));
        require(keccak256(abi.encodePacked(_pass)) == wills[_owner].secret,"invalid password");
        lock = 1;
        (bool success, ) = msg.sender.call.value(wills[_owner].beneficiaries[msg.sender] * 1 ether)("");
        require(success,"failed to pay");
        wills[_owner].beneficiaries[msg.sender] = 0;
        lock = 0;
    }
    
    function still_alive() public willOwners  payable {
        wills[msg.sender].expiry += 4;
    }
    function execute(address _owner) public payable returns (uint){
        require(msg.sender == wills[_owner].executor,"you got no power");
        wills[_owner].expiry = block.number;
        return wills[_owner].expiry;
    }
    function gethash(uint ran)  public pure returns(bytes32){
        return(keccak256(abi.encodePacked(ran)));
    }

    /*function execute(address _owner) public payable{
        require(msg.sender == wills[_owner].executor,"you got no power");
        require(lock==0,"someone is using this");
        lock = 1;
        for (uint i = 0; i<wills[_owner].count; i++){
            address curr = wills[_owner].beneficiariesList[i];
            curr.transfer(wills[_owner].beneficiaries[curr] * 1 ether);
            wills[_owner].beneficiaries[msg.sender] = 0;
            }
        lock = 0;
    }*/
    


    function() external payable{
    }

}