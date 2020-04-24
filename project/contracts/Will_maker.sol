pragma solidity >=0.4.21 <0.7.0;


contract Will_maker {
    //address[] wills;
    //address owner;
    //uint256 give_away;
    //bool alive;
    //bytes32 secret;
    //address executer;
    uint public deployed = 1;
    constructor() public payable {

    }
    modifier onlyBeneficiaries(address _owner){
        require(wills[_owner].beneficiaries[msg.sender] != 0,"you do not have an inheritance here");
        _;
    }

    modifier willOwners(){
        require(wills[msg.sender].dead != 0,"no will to adjust here");
        _;
    }
    modifier ownerDied(address _owner){
        require(now > wills[_owner].expiry,"will owner is still alive, or not enough time has passed");
        _;
    }
    /*
    modifier onlyOwner() {
        require(msg.sender == owner, "you do no have access to this");
        _;
    }

    modifier afterDeath() {
        require(alive == false, "owner not dead yet");
        _;
    }

    modifier onlyExecuter() {
        require(msg.sender == executer,"you do not have to power to do this");
        _;
    }

    modifier onlyBeneficiaries() {
        require(inheritance[msg.sender] > 0, "you do no have any thing to claim");
        _;
    }*/
    struct Will{
        address executor;
        //uint[] values;
        uint dead;
        uint secret;
        uint count;
        uint256 expiry;

        //address[] beneficiaries;
        //uint[] values;
        mapping(uint => address) beneficiariesList;
        mapping(address  => uint) beneficiaries;
    }
    mapping(address => Will) public wills;
    function create_will(address _exe, address[] memory _beneficiaries,uint[] memory _values,uint _secret) public payable{
        // create the struct
        /*uint sum;
        for (uint j = 0; j < _values.length; j++){
            sum = sum + _values[j];
        }
        require(sum==100,"sum needs to be 100");*/
        Will storage w = wills[msg.sender];
        w.executor = _exe;
        w.dead = 1;
        w.secret = _secret;
        w.count = _beneficiaries.length;
        //w.beneficiaries = _beneficiaries;
        //w.values = _values;
        w.expiry = now + 2400 hours;
        for (uint i = 0; i < _beneficiaries.length; i++ ){
            w.beneficiaries[_beneficiaries[i]] = _values[i];
            w.beneficiariesList[i] = _beneficiaries[i];
        }
        wills[msg.sender] = w;
    }
    function get_beneficiaries() public view returns(address[] memory) {
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

    function get_inheritance(address _owner) public view onlyBeneficiaries(_owner) returns(uint _amount){
        return wills[_owner].beneficiaries[msg.sender];
        /*for (uint i = 0; i<wills[_owner].count; i++){
            if(wills[_owner].beneficiaries[i] == msg.sender){
                return wills[_owner].values[i];
            }
        }*/
    }

    function still_alive() public payable {
        wills[msg.sender].expiry += 2400 hours;
    }

    function claim_money(address _owner) public payable{
        msg.sender.transfer(wills[_owner].beneficiaries[msg.sender]);
    }

    function unlock(address _owner, uint _secret) public payable{
        require(_secret == wills[_owner].secret,"wrong pass");
        wills[_owner].expiry = 0;
    }

}