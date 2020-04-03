
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