const mongoose = require("mongoose");
const config = require("../Config/mainCfg.json");

module.exports = async () => {
    await mongoose.connect(config.mongoURI, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    return mongoose
}
