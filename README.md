#OpenStore

OpenStore is a minimalistic contract for saving data on the Ethereum blockchain. The use case is a developer who wants to make some data public, but does not necessarily need any contract.

An example of this would be a developer trying to expose exchange rate data that can be used by any contract or client.

##Examples

###Instantiation

     var OpenStoreAbi = [{"constant":false,"inputs":[{"name":"key","type":"string"},{"name":"value","type":"int256"}],"name":"set","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"key","type":"string"},{"name":"value","type":"int256"}],"name":"setFromContract","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"},{"name":"key","type":"string"}],"name":"getValue","outputs":[{"name":"","type":"int256"}],"type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"},{"name":"key","type":"string"}],"name":"getTimestamp","outputs":[{"name":"","type":"uint256"}],"type":"function"}]
     	,OpenStore = web3.eth.contract(OpenStoreAbi).at("0x....")

###Setting Data
	OpenStore.set('usd',20)

###Getting Data

	var valueAsHex = OpenStore.getValue(web3.eth.defaultAccount,'usd')
		,value = web3.toBigNumber(valueAsHex)
		,timestamp = OpenStore.getTimestamp(web3.eth.defaultAccount,'usd')