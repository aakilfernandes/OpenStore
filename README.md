#OpenStore

OpenStore is a minimalistic contract for saving data on the Ethereum blockchain. The use case is a developer who wants to make some data public, but does not necessarily need any contract.

An example of this would be a developer trying to expose exchange rate data that can be used by any contract or client.

##Design

You can think of OpenStore like a JSON object where each address has their own space.

	OpenStore[address][key] = {value:value,timestamp:timestamp}

Keys must fit within 32 bytes, values have no upper limit. All values are stored within the contract as bytes and must be converted upon retreival.

[You can read the source code here.](/app/contracts/OpenStore.sol)

##Examples

###Instantiation

     var OpenStoreAbi = [{"constant":true,"inputs":[{"name":"addr","type":"address"},{"name":"key","type":"bytes32"}],"name":"getTimestamp","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"key","type":"bytes32"},{"name":"value","type":"bytes"}],"name":"setFromContract","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"},{"name":"key","type":"bytes32"}],"name":"getValue","outputs":[{"name":"","type":"bytes"}],"type":"function"},{"constant":false,"inputs":[{"name":"key","type":"bytes32"},{"name":"value","type":"bytes"}],"name":"set","outputs":[],"type":"function"}]
     	,OpenStore = web3.eth.contract(OpenStoreAbi).at("0x....")

###Setting Data
	OpenStore.set('usd',20)

###Getting Data

	var valueAsHex = OpenStore.getValue(web3.eth.defaultAccount,'usd')
		,value = web3.toBigNumber(valueAsHex)
		,timestamp = OpenStore.getTimestamp(web3.eth.defaultAccount,'usd')