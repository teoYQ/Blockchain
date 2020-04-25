from web3 import Web3
#w3 = Web3(Web3.EthereumTesterProvider())
#from web3.auto import w3auto
from solc import compile_source,compile_files

contract_source_code = None
#contract_source_code_file = 'fib.sol'
#contract_source_code_file = '../11_src/webapp/cointoss.sol'

#with open(contract_source_code_file, 'r') as file:
#    contract_source_code = file.read()

# Compile the contract
contract_compiled = compile_files(["/home/yq/Desktop/Blockchain/11_src/webapp/sale.sol"])
#print(contract_compiled)
contract_interface = contract_compiled['/home/yq/Desktop/Blockchain/11_src/webapp/sale.sol:sale']


ganache_url = "http://127.0.0.1:8545"
web3 = Web3(Web3.HTTPProvider(ganache_url))

contract = web3.eth.contract(address="0xE266e7219229d271D45dD28558CA670bd4Af9eB3",abi =  contract_interface['abi'])

buy = contract.functions.buy(1).transact({"from": web3.eth.accounts[1], "value":10})
#fiba = contract.functions.fibonacciA(5).transact()
#fiba_receipt = Web3.eth.waitForTransactionReceipt(fiba)
#print("================= Receipt ==============")
#print(fiba_receipt)

#fibb = contract.functions.fibonacciB(5).transact()
#fibb_receipt = web3.eth.waitForTransactionReceipt(fibb)
#print("================ Receipt B ==============")
#print(fibb_receipt)


