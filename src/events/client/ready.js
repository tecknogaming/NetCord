const func = require("../../Utils/fuctions.js");
const { presence } = require("../../Config/mainCfg.json");

module.exports = client => {
	func.setStatus(client, {
		name: presence.name,
		type: presence.type
	})
	console.log("ready".brightGreen)
	console.log(func.genId(3))
}
