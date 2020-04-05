pragma solidity >=0.4.22 <0.7.0;
import "counter.sol";

contract IncrementCounter is Counter {
    
    constructor(uint256 startValue) Counter(startValue) public {}
    
    function step() public {
        setCounter(getCount() + 1);
    }
    
}