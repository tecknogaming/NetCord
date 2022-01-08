const config = require("../../Config/mainCfg.json");
const date = require("date-and-time");
const log4me = require("../../Utils/log4me.js");
const mongo = require("../../Utils/mongo.js");
const GuildSchema = require("../../Schema/guildSchema.js");
const {
	MessageEmbed
} = require("discord.js");
const guildPrefixes = {};

module.exports = async (client, message) => {
	log4me.set("./data.log", "commandhandler");

	if (!message.guild || !message.channel || message.author.bot) return;
	if (message.channel.partial) await message.channel.fetch();
	if (message.partial) await message.fetch();
	const prefix = guildPrefixes[message.guild.id] || config.defPrefix;
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
			usage = "",
			minArgs = 0,
			maxArgs = null,
			testCommand = false,
			ownerOnly = false,
			disabled = false,
			disabledReasson = "",
			aliases,
			run
		} = command;

		if (args.length < minArgs|| args.length > maxArgs) {
			return message.reply({
				embeds: [
					new MessageEmbed()
					.setColor("#242424")
					.setTitle("SyntaxError")
					.setDescription(`The Correct Usage For This Command Is: \`${prefix}${name} ${usage}\``)
				]})
		}

		if (ownerOnly && message.author.id !== config.ownerId) {
			return message.reply(`the command **${name}** is an owner only command!`)
		}

		if (testCommand && !message.guild.id.includes(config.testServerId)) {
			return message.reply(`The command **${name}** is only for test servers`);
		}

		const dt = new Date();
		const compiledDate = date.compile('ddd, MMM DD YYYY | hh:mm A');
		const time = date.format(dt, compiledDate);

		if (disabled) return mesdage.reply(`That command is dissabled\nReasson: ${disabledReasson || "No reasson"}`)

		run(message, args, args.join(" "), message.member, client);
		log4me.log(`CommandRuned: ${name}, By: ${message.author.tag}`, false)
	}
}

function escapeRegex(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}

module.exports.loadPrefixs = async (client) => {
	await mongo().then(async mongoose => {
		try {
			for (const guild of client.guilds.cache) {
				const guildId = guild[1].id

				const result = await GuildSchema.findOne({
					id: guildId
				});
				guildPrefixes[guildId] = result ? result.prefix: config.defPrefix;
			}

		} finally {
			mongoose.connection.close();
		}
	})
}
