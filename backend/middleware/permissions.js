/**
 * Checks if user that perform request has required role.
 * 
 * This function must be invoked AFTER authorize middleware, because authorize
 * middleware checks if request has token and if so, it puts user data from that token
 * into req.user.
 * Here we simply check presence of requested role in user json.
 * 
 * @param {string} role_name : role that is expected to execute the route
 */
module.exports = function(role_name) {
    return function(req, res, next) {
        if (req.user && role_name === req.user.role) next();
        else res.status(403).json({message: "Brak uprawnień."});
    }
}