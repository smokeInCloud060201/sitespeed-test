const dotenv = require('dotenv').config()

module.exports = async function (context, commands) {

    await commands.measure.start(process.env.BASE_URL + "/payment");

    console.log("Start in app.js")



    return commands.measure.stop();
};

