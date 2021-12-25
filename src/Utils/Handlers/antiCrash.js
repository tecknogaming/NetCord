const {
	File,
	log
} = require("../log4me.js");
File("./data.log")

let fs = require('fs')
module.exports = (client) => {
	process.on('unhandledRejection', (reason, p) => {
		console.log(' [antiCrash] :: Unhandled Rejection/Catch');
		console.log(reason, p);
		log(reason)
	});
	process.on("uncaughtException", (err, origin) => {
		console.log(' [antiCrash] :: Uncaught Exception/Catch');
		console.log(err, origin);
		log(err)
	})
	process.on('uncaughtExceptionMonitor', (err, origin) => {
		console.log(' [antiCrash] :: Uncaught Exception/Catch (MONITOR)');
		console.log(err, origin);
		log(err + origin)
	});
	process.on('multipleResolves', (type, promise, reason) => {
		console.log(' [antiCrash] :: Multiple Resolves');
		console.log(type, promise, reason);
		log(`${type}: ${promise} ${reason}`)
	});
}