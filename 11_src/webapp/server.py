import json

from flask import Flask, render_template

from web3.auto import w3
from solc import compile_source

app = Flask(__name__)

contract_source_code = None
contract_source_code_file = 'cointoss.sol'

with open(contract_source_code_file, 'r') as file:
    contract_source_code = file.read()

contract_compiled = compile_source(contract_source_code)
contract_interface = contract_compiled['<stdin>:Cointoss']
cointoss = w3.eth.contract(abi=contract_interface['abi'], 
                          bytecode=contract_interface['bin'])
secret_hash = w3.sha3(3)
print((secret_hash).hex())
# w3.personal.unlockAccount(w3.eth.accounts[0], '') #  Not needed with Ganache
tx_hash = cointoss.constructor().transact({'from':w3.eth.accounts[0]})
#{'from':w3.eth.accounts[0], 'value': w3.toWei(1,"ether")}
tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)

# Contract Object
cointoss = w3.eth.contract(address=tx_receipt.contractAddress, abi=contract_interface['abi'])

#w3.eth.sendTransaction({'to': "0xBa184FE4082814647520288C10b8E2a2a7E8A811", 'from':w3.eth.coinbase, 'value': w3.toWei(3,"ether")})
#w3.eth.sendTransaction({'to': "0x09E59fD3BeCa2914Ff15824E6b4Db9BE9a3a780F", 'from':w3.eth.coinbase, 'value': w3.toWei(3,"ether")})

# Web service initialization
@app.route('/')
@app.route('/index')
def hello():
    return render_template('template.html', contractAddress = cointoss.address.lower(), contractABI = json.dumps(contract_interface['abi']))

if __name__ == '__main__':
    app.run()