const config = require("../../Config/mainCfg.json");
const date = require("date-and-time");

module.exports = async (client, message) => {
	if (message.author.bot) return;
	if (message.channel.partial) await message.channel.fetch();
	if (message.partial) await message.fetch();
	const prefix = config.defPrefix;
	const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})`);
	if (!prefixRegex.test(message.content)) return;
	const [,
		mPrefix] = message.content.match(prefixRegex);
	const args = message.content.slice(mPrefix.length).trim().split(/ +/).filter(Boolean);
	const cmd = args.length > 0 ? args.shift().toLowerCase(): null;

	let command = client.commands.get(cmd);
	if (!command) command = client.commands.get(client.aliases.get(cmd));
	if (command) {
		let {
			name,
			testCommand = false,
			ownerOnly = false,
			aliases,
			run
		} = command;
		if (ownerOnly && message.author.id !== mainCfg.ownerId) {
			return message.reply(`the command **${name}** is an owner only command!`)
		}

		if (testCommand && !message.guild.id.includes(mainCfg.testServerId)) {
			return message.reply(`The command **${name}** is only for test servers`);
		}

		const dt = new Date();
		const compiledDate = date.compile('ddd, MMM DD YYYY | hh:mm A');
		const time = date.format(dt, compiledDate);

		run(message, args, args.join(" ").split("++").filter(Boolean), message.member, args.join(" "), client);


		console.log(`+++++++++++++++++++++++++++++++++++++`.brightGreen)
		console.log(`Command: ${command.name}`.brightGreen)
		console.log(`Runned by: ${message.author.tag} / ${message.author.id}`.brightGreen)
		console.log(`Guild Id: ${message.guild.name} / ${message.guild.id}`.brightGreen)
		console.log(`Channel Id: #${message.channel.name} / ${message.channel.id}`.brightGreen)
		console.log(`Message Id: ${message.id}`.brightGreen)
		console.log(`Time: ${time}`.brightGreen)
		console.log(`+++++++++++++++++++++++++++++++++++++`.brightGreen)
	}
}

function escapeRegex(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}
