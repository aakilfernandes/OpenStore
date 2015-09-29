contract OpenFeed{
	
	mapping(address=>mapping(string=>Datum)) data;

	struct Datum{
		int value;
		uint timestamp;
	}

	function set(string key, int value){
		data[tx.origin][key].value = value;
		data[tx.origin][key].timestamp = now;
	}

	function setFromContract(string key, int value){
		data[msg.sender][key].value = value;
		data[msg.sender][key].timestamp = now;
	}

	function getValue(address addr, string key) constant returns(int){
		return data[addr][key].value;
	}

	function getTimestamp(address addr, string key) constant returns(uint){
		return data[addr][key].timestamp;
	}
}