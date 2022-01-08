const { MessageEmbed } = require("discord.js");
const config = require("../Config/mainCfg.json");


module.exports.setStatus = setStatus;
module.exports.genId = genId;

function replaceMessage(msg, o = {}) {
	const opt = Object(o);
	return String(msg)
	  .replace(/%{prefix}%/gi, opt && opt.prefix ? opt.prefix : "%{prefix}")
	  .replace(/%{pingedUser}%/gi, opt && opt.pingedUser ? opt.pingedUser : "%{pingedUser}%")
	  .replace(/%{command}%/gi, opt && opt.command ? opt.command : "%{command}%")
	  .replace(/%{error}%/gi, opt && opt.error ? opt.error : "%{error}%")
}

function Embed(data = {}) {
	return new MessageEmbed()
	           .setColor(data.color || config.embed.defColor)
	           .setAuthor(data.author.name, data.author.avatar, data.author.URL)
	           .setTitle(data.title)
	           .setURL(data.URL)
	           .setDescription(data.description)
	           .setImage(data.image)
	           .setThumbnail(data.thumbnail)
	           .addFields(data.fields)
	           .setFooter(data.footer + " | " + config.embed.footer, data.footerImg)
}

function genId(length) {
	const Characters = [
		"a",
		"A",
		"b",
		"B",
		"c",
		"C",
		"d",
		"D",
		"e",
		"E",
		"f",
		"F",
		"g",
		"G",
		"h",
		"H",
		"i",
		"I",
    "j",
		"J",
		"k",
		"K",
		"l",
		"L",
		"m",
		"M",
		"n",
		"N",
		"o",
		"O",
		"p",
		"P",
		"q",
		"R",
		"r",
		"R",
		"s",
		"S",
		"t",
		"T",
		"u",
		"U",
		"v",
		"V",
		"w",
		"W",
		"x",
		"X",
		"y",
		"Y",
		"z",
		"Z",
		"0",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"-",
		"_",
		"=",
		"/",
		"@",
		"$",
		"!",
		"¡",
		"/",
	];
	
	let id = ""
	let newchar;
	let lastchar;
	for (i = 0; i < length; i++) {
		const ran = Characters[Math.floor(Math.random() * Characters.length)].toString();
		newchar = ran;
		if(!newchar.includes(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"])) {newchar = Characters[Math.floor(Math.random() * Characters.length)].toString();}
		if(newchar === lastchar) {newchar = Characters[Math.floor(Math.random() * Characters.length)].toString();}
		lastchar = newchar
		id += newchar
	}
	
	return id;
}

function setStatus(client, data = {}) {
	client.user.setActivity(data.name, {
		type: data.type
	});
}
