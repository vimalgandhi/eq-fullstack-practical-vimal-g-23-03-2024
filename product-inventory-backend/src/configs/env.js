const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
    mongoConnectionUrl: process.env.MONGO_CONNECTION_URL,
    jwtSecret: process.env.JWT_SECRET
};
