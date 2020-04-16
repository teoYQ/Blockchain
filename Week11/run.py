'''
Once Ganache is installed, run its GUI or execute the following command:
$ ganache-cli -p 8545 -h 0.0.0.0 -n
'''

from solc import compile_source
from web3.auto import w3

contract_source_code = None
contract_source_code_file = 'fib.sol'

with open(contract_source_code_file, 'r') as file:
    contract_source_code = file.read()

# Compile the contract
contract_compiled = compile_source(contract_source_code)
contract_interface = contract_compiled['<stdin>:Fib']

# Set the default account
w3.eth.defaultAccount = w3.eth.accounts[0]

# Contract abstraction
contract = w3.eth.contract(abi=contract_interface['abi'], bytecode=contract_interface['bin'])
# Create an instance, i.e., deploy on the blockchain
tx_hash = contract.constructor().transact()
tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)

#should change this to accept arguments
#private_key = "f59b0a080bf65cc587c6a1596afb9314e57a2b80580e70513bda9a1d244b8a79"
private_key = "aeb59509693c689fe363784bb8ca3af376b26b41cb8c274a24369b135e55f4a4"


contract = w3.eth.contract(address = tx_receipt.contractAddress, abi = contract_interface['abi'])
print(contract.functions.getOwner().call())

w3.eth.sendTransaction({'to': contract.address, 'from':w3.eth.coinbase, 'value': w3.toWei(1,"ether")})

fiba = contract.functions.fibonacciA(5).transact()

#if payable, use the function below
#fiba = contract.functions.fibonacciA(5).transact({"from": w3.eth.accounts[0], "value": w3.toWei(1,"ether")})
fiba_receipt = w3.eth.waitForTransactionReceipt(fiba)
print("================= Receipt ==============")
for k,v in fiba_receipt.items():
    if k == "logsBloom":
        continue
    print(k,v)
#print(fiba_receipt)

fibb = contract.functions.fibonacciB(5).transact()
fibb_receipt = w3.eth.waitForTransactionReceipt(fibb)
print("================ Receipt B ==============")
for k,v in fibb_receipt.items():
    if k == "logsBloom":
        continue
    print(k,v)



# Contract Object
#example = w3.eth.contract(address=tx_receipt.contractAddress, abi=contract_interface['abi'])

#print('Calling contract functions')
#print('Contract address: ', example.address)
#print('obj.getOwner(): ', example.functions.getOwner().call())
