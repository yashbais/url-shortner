const dotenv = require('dotenv').config();
exports.envConfig = {
    PORT:process.env.PORT,
    CONNECTION_URL:process.env.CONNECTION_URL,
 }