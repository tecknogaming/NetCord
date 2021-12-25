const fs = require("fs");
const DAT = require("date-and-time");

function svToFile(fl, data) {
	fs.writeFileSync(`${dir}/${fl}${format}`, data)
}

function time() {
	const dt = new Date();
	const compiledDate = date.compile('MM-DD-YY');
	const time = date.format(dt, compiledDate);
	return time
}


class Log4me {
	constructor(author, dir) {
		if (!author) return new TypeError("NO_LOGAUTHOR_PROVIDED");
		if (!dir) return new TypeError("NO_FILEDIRECTORY_PROVIDED");
		try {
			this.author = author;
			this.dir = dir;

			//console.log(this.dir)
		} catch(e) {
			console.log("ERROR: " + e)
		}
	}

	log(str) {
		try {
			console.log(this.dir)
			const now = time
			//svToFile(this.file, `\n[${now} || ${this.author}] ${str}`)

			fs.writeFileSync(this.dir, `\n[${now} || ${this.author}] ${str.toString()}`)
		} catch(e) {
			console.log(e)
		}
	}
}

module.exports.Log4me = Log4me;
