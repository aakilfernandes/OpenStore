#OpenFeed

OpenFeed is a minimalistic contract for creating numeric data feeds. There will likely be lots of independent data feeds in the Ethereum world. OpenFeed saves developers the hassle of creating their own contract.

##Design

OpenFeed in designed for numeric, signed, data. That means all values must be in the range `[-(2^255),(2^255) - 1]`. Timestamps are automatically set by the contract and can not be manually updated.

##Examples

###Instantiation

     var OpenFeedAbi = [{"constant":false,"inputs":[{"name":"key","type":"string"},{"name":"value","type":"int256"}],"name":"set","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"key","type":"string"},{"name":"value","type":"int256"}],"name":"setFromContract","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"},{"name":"key","type":"string"}],"name":"getValue","outputs":[{"name":"","type":"int256"}],"type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"},{"name":"key","type":"string"}],"name":"getTimestamp","outputs":[{"name":"","type":"uint256"}],"type":"function"}]
     	,OpenFeed = web3.eth.contract(OpenFeedAbi).at("0x")

###Setting Data
	OpenFeed.set('usd',20)

###Getting Data

	var value = OpenFeed.getValue(address,'usd')
		,timestamp = OpenFeed.getTimestamp(address,'usd')