const { Log4me } = require("../log4me.js");

module.exports = client => {
	const {log} = new Log4me("antiCrash", "./logs.txt");
	
	process.on('unhandledRejection', (reason, p) => {
		console.log(' [antiCrash] :: Unhandled Rejection/Catch');
		console.log(reason, p);
		log(reason)
	});
	process.on("uncaughtException", (err, origin) => {
		console.log(' [antiCrash] :: Uncaught Exception/Catch');
		console.log(err, origin);
		log(err + origin)
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
