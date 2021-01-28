const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Checks if request has token and if so, checks if token is valid.
 * 
 * Function goes into reqest headers and looks for "authorize" part. 
 * It is supposed that there is a string that contains text: "Bearer <token>".
 * We split that by space and use library to check if token is valid.
 * 
 * Token is created when user loggs in. It is created by special algorythm that uses
 * private key. User can't modify token without knowing what private key is.
 * When user modify token, verification process (here) that knows the private key
 * will cause an error.
 */
module.exports = async(req, res, next) => {
    try {
        const authorizationHeader = req.header("authorize");
        if (!authorizationHeader) throw "Nie dostarczono nagłówka autoryzacyjnego.";

        const token = authorizationHeader.split(" ")[1];
        if (!token) throw "Nie dostarczono tokenu autoryzacyjnego.";

        try {
            const payload = jwt.verify(token, process.env.jwtSecret);
            req.user = payload.user;
            next();
        } catch (err) {
            throw "Token jest nieprawidłowy lub wygasł."
        }
    } catch (err) {
        res.status(403).json({message: err})
    }
}