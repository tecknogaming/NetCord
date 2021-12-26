//yes i named this after log4j lol
const fs = require("fs")
let path = "";
let data = "";



function File(filePath) {

	try {
		path = filePath;

		if (!fs.existsSync(filePath))
			fs.writeFileSync(filePath, "");
		data = fs.readFileSync(filePath).toString();

	} catch (err) {
		console.log()
	}
};


function log(str) {
	try {

		const now = Date(Date.now());


		time = now.toString() //time
		console.log()
		fs.writeFileSync(path, `${data}\n[${time} || ${this.author || "ERROR" }]\n ${str.toString()}\n\n`)
	} catch (e) {
		console.log(e)
	}
}



module.exports.File = File;
module.exports.log = log;

/*
  THIS CODE IS CREATED BY A PERSON NAMED SANIKAVA CHECK HIM OUT
  LINKS:
  https://github.com/sanikava
  https://discord.com/rPFyqgjH6p
*/