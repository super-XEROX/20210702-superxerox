const fetch = require('node-fetch')
const {buffer, text, json} = require('micro')
const qs = require('querystring')
const url = require('url')

module.exports = async req => {
    console.log("\n 🔥 Usage: curl http://localhost:3000/000000000000000000000000000000000000000000000000000000000004cce0.json\n")
    let tmp = req.url.replace('/','')
    let longIndex = tmp.replace('.json','')
	//const query = qs.parse(url.parse(req.url).query);
	if (!longIndex.match('.+[A-Fa-f0-9]$')) {
		return { error: 'not with an index of ERC1155 uri, such as https://token-cdn-domain/000000000000000000000000000000000000000000000000000000000004cce0.json'}
	} else {
/*	
        // test to generate sample index
	const yourNumber = 314592 // 0x4CCE0
	const hexString = yourNumber.toString(16).padStart(64, "0") // 000000000000000000000000000000000000000000000000000000000004cce0
	*/
	const index = parseInt("0x" + longIndex)
	console.log("🦄 cryptokitty index is:" + index)

	const response = await fetch('https://api.cryptokitties.co/kitties/'+index);
	const json = await response.json();

	return json;
	}
};
