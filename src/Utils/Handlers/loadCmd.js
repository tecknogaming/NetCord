const path = require("path");
const fs = require("fs");
const mainCfg = require("../../Config/mainCfg.json");

module.exports = (client) => {
	const commands = []
	let amount = 0

	const readCommands = (dir) => {
		const files = fs.readdirSync(path.join(__dirname, dir))
		for (const file of files) {
			const stat = fs.lstatSync(path.join(__dirname, dir, file))
			if (stat.isDirectory()) {
				readCommands(path.join(dir, file))
			} else if (file.endsWith('.js')) {
				const option = require(path.join(__dirname, dir, file))
				commands.push(option)
				if (client) {
					amount++
					client.commands.set(option.name, option)
				}
				 if (option.aliases && Array.isArray(option.aliases)) option.aliases.forEach((alias) => client.aliases.set(alias, option.name));
			}
		}
	}


	readCommands(mainCfg.cmdDir)
	console.log(`${amount} commands loaded!`.brightYellow)


	return commands
}
