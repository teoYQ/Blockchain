
pragma solidity >=0.4.22 <0.7.0;

contract Counter {
    
    //Event emitted when the value is changed
    event ValueChanged(uint256 newValue);
    
    // Private variable of type unsigned int to keep the number of counts
    uint256 private count;
    
     constructor(uint256 startValue) public {
        count = startValue;
    }
    
    function getCount() public view returns (uint256) {
        return count;
    }
    
    function setCounter(uint256 newValue) internal {
        count = newValue;
        emit ValueChanged(count);
    }
    
    function step() public {}
    
}