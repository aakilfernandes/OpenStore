var web3 = require('web3')
	,BigNumber = require('bignumber.js')
	,request = require('request')
	,fs = require('fs')
	,rates = {}
	,contractCode = fs.readFileSync('app/contracts/OpenFeed.sol','utf8')

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8101'));
var account = web3.eth.defaultAccount = web3.eth.accounts[0]

var compiled = web3.eth.compile.solidity(contractCode)
	,OpenFeed = web3.eth.contract(compiled.OpenFeed.info.abiDefinition).at("0xb4934dc0e40fb0a40d1b844d95abc1d426c54802")

request('https://coinmarketcap-nexuist.rhcloud.com/api/eth',function(error,response,body){
	if(response.statusCode !== 200)
		throw new Error('blockchain.info returned '+response.statusCode)

	var data = JSON.parse(body);

	for(currency in data.price)
		rates[currency] = new BigNumber(data.price[currency]).times('1000000000000')

	for(currency in rates){

		var newRate = rates[currency]
			,newRateRounded = newRate.round()
			,rateBytes = OpenFeed.getValue(account,currency)
			,rateBytesPadded = rateBytes.length===2 ? rateBytes+'00' : rateBytes
			,rate = web3.toBigNumber(rateBytesPadded)
			,timestamp = OpenFeed.getTimestamp(account,currency)
			,difference = newRate.minus(rate)
			,percentChange = difference.div(rate)
			,absolutePercentChange = percentChange.greaterThanOrEqualTo(0) ? percentChange : percentChange.times('-1')

		console.log(currency,rate.toString(),newRateRounded.toString())

		if(
			timestamp.equals(0)
			|| absolutePercentChange.greaterThan('.01')
			|| rate.equals(0) && newRate.notEqualTo(0)
		){
				OpenFeed.set(currency,newRateRounded)
		}
	}

	process.exit()
})