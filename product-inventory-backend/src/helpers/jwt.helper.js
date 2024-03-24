const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../configs/env");

const Jwt = {
    encode: (data) => {
        const options = {
            expiresIn: "1d" // 1 day
        };
        return jwt.sign(data, jwtSecret, options);
    },

    decode: (token) => {
        if (token) {
            try {
                return jwt.verify(token, jwtSecret);
            } catch (error) {
                return false;
            }
        }
        return false;
    }
};

module.exports = Jwt;
