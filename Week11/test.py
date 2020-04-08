
from web3 import Web3

ganache_url = "http://127.0.0.1:8545"
web3 = Web3(Web3.HTTPProvider(ganache_url))

receipt = web3.eth.getTransactionReceipt('0x37de0ef93736e1083d217049b7dfa78a265c893fab4cc193b05e5c6db513aebe')
print(receipt)
#block = web3.eth.getBlock('latest')
#print(block)
#acc_1 = "0x892D7Fad70799890AA563643b3C5483d47c23398"
#acc_2 = "0xb6Bbee1163B526Ee7c8ffdf59aDd0a959e20668C"

#private_key = "f59b0a080bf65cc587c6a1596afb9314e57a2b80580e70513bda9a1d244b8a79"
#nonce = web3.eth.getTransactionCount(acc_1)

#tx = {
 #   'nonce': nonce,
  #  'to': acc_2,
   # 'value': web3.toWei(1, 'ether'),
    #'gas': 2000000,
    #'gasPrice': web3.toWei('50', 'gwei'),
#}

#signed_tx = web3.eth.account.signTransaction(tx, private_key)
#tx_hash = web3.eth.sendRawTransaction(signed_tx.rawTransaction)
#print(web3.toHex(tx_hash))
