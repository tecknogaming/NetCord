const fs = require("fs")
const dat = require("date-and-time");
let path = "";
let data = "";
let author = ""

function current(dt) {
	const n = dt
	const format = dat.compile("MM-DD-YY hh:mm A");
	const time = dat.format(n, format);
	return time
}

function set(filePath, Logauthor) {

	try {
		path = filePath;
		author = Logauthor;

		if (!fs.existsSync(filePath))
			fs.writeFileSync(filePath, "");
		data = fs.readFileSync(filePath).toString();

	} catch (err) {
		console.log()
	}
};


function log(str, logToConsole) {
	try {

		const now = new Date();
		const time = current(now);

		if (logToConsole) {
			console.log(`[${time} || ${author.toUpperCase() || "ERROR"}] ${str.toString()}`)
			fs.writeFileSync(path, `${data}\n[${time} || ${author.toUpperCase() || "ERROR"}] ${str.toString()}`)
		} else {
			fs.writeFileSync(path, `${data}\n[${time} || ${author.toUpperCase() || "ERROR"}] ${str.toString()}`)
		}

	} catch (e) {
		console.log(e)
	}
}



module.exports.set = set;
module.exports.log = log;

/*
  THIS CODE IS CREATED BY A PERSON NAMED SANIKAVA CHECK HIM OUT
  LINKS:
  https://github.com/sanikava
  https://discord.com/rPFyqgjH6p
*/
