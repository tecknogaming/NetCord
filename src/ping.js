module.exports = {
	name: "ping",
	aliases: ["p", "pi"],
	Dev: true,
	run: (message, args) => {
		var date = Date.now();
		message.channel.send("pinging....").then(msg => {
			msg.edit(`ping: \`${Math.round(Date.now() - date)}ms\`\nlatency: \`${Math.round(message.client.ws.ping)}ms\``);
		})
	}
}