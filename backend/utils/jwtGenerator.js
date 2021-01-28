const jwt = require("jsonwebtoken");

require("dotenv").config();

/**
 * Function that generates json web token via library
 * @param {json} user : user information that will be places in json web token
 */
function jwtGenerator(user) {
    const payload = {
        user: { ...user }
    };

    return jwt.sign(payload, process.env.jwtSecret, { expiresIn: 3600 });
}

module.exports = jwtGenerator;