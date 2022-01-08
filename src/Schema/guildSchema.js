const mongoose = require("mongoose");

const GuildSchema = mongoose.Schema({
	id: {
		type: String,
		required: true
	},
	prefix: {
	  type: String
	}
})

module.exports = mongoose.model("Guilds", GuildSchema);
