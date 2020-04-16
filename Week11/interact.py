from web3 import Web3
#w3 = Web3(Web3.EthereumTesterProvider())
#from web3.auto import w3auto
from solc import compile_source

contract_source_code = None
#contract_source_code_file = 'fib.sol'
contract_source_code_file = '../11_src/webapp/cointoss.sol'

with open(contract_source_code_file, 'r') as file:
    contract_source_code = file.read()

# Compile the contract
contract_compiled = compile_source(contract_source_code)
contract_interface = contract_compiled['<stdin>:Cointoss']


ganache_url = "http://127.0.0.1:8545"
web3 = Web3(Web3.HTTPProvider(ganache_url))

contract = web3.eth.contract(address="0x77ccc34D5E1ec56E031c05eA85C6c403eCEAe85b",abi =  contract_interface['abi'])

reveal = contract.functions.reveal(1).transact()
#fiba = contract.functions.fibonacciA(5).transact()
#fiba_receipt = Web3.eth.waitForTransactionReceipt(fiba)
#print("================= Receipt ==============")
#print(fiba_receipt)

#fibb = contract.functions.fibonacciB(5).transact()
#fibb_receipt = web3.eth.waitForTransactionReceipt(fibb)
#print("================ Receipt B ==============")
#print(fibb_receipt)


