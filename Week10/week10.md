
### How does it work

#### creating a bet (player1)
If you want to start the bet, deploy the contract with your value, call (1 for heads, 0 for tails) and the keccak256 hash of the secret value used to compute if its head or tails.

#### taking a bet (player 2)
If you wish to take the bet of anyone's, put in the same value and activate the takebet function of the contract. You will be required to input a nonce for the result calculation

#### reveal
The original owner that started the bet will now have to activate the function reveal, passing in the actual value that was used to create the hash. 

The reveal function will then add player1's value and the nonce of player2 and perform a mod 2. The output of this will determine if its head or tails.

### Why is the protocol fair
Player1 only submits the hash of the value, so player 2 cannot guess what is the value that player 1 input. This ensures that the outcome for every run is fair (commit-reveal scheme)

### Why is the protocol secure
If player1 sees the nonce of player 2 and decides not to call reveal, player2 can call the claimTimeout() function if it has been more than 24hours and win the value of the bet no matter the result.

If player1 tries to call cancel when player2 has already joined, then it will fail to happen because it is caught by the require(player2 == address(0)) line.

Reveal can also only be called by player1


## Question 2
Using your application, explore and demonstrate the following Solidity features.

- Explore different data types
    - In this exercise, we used a few datatypes, bytes32, string memory, struct, address

- Make use of struct types and mappings
    - a struct was created for each game of cointoss

- Create payable functions
    - the constructor and the following functions are payable ( reveal , takebet, cancel, claimtimeout )
- Define modifiers
    - player2 can change his nonce as long as player 1 has not called reveal
- Implement inheritance from an existing deployed smart contract
    - not sure how is this related to the coin toss example
- Play with functions visibility and understand their differences
#### external:
External functions are part of the contract interface, which means they can be called from other contracts and via transactions. An external function f cannot be called internally (i.e. f() does not work, but this.f() works). External functions are sometimes more efficient when they receive large arrays of data.
#### public:
Public functions are part of the contract interface and can be either called internally or via messages. For public state variables, an automatic getter function (see below) is generated.
internal:
Those functions and state variables can only be accessed internally (i.e. from within the current contract or contracts deriving from it), without using this.
private:
#### private
Private functions and state variables are only visible for the contract they are defined in and not in derived contracts.
    
- How is it possible to integrate a log?
    - using logi where i = 1,2,3 
- Is it possible to create an infinite loop?
    - yes but it will not run due to the lack of gas
- Calls between smart contracts
    - calls between contracts are done in the cointosstest.sol example, where we created a new contract from the test file
- Create a fallback function, how it works?
    - All contracts have a fallback function which is payable. It will be activated when there is no matching function. The fallback function must be unnamed and does not accept arguments. this function needs to exisit to receive and send ether.