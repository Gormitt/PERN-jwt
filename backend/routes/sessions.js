const express = require("express");
const db = require("../db");
const jwtGenerator = require("../utils/jwtGenerator");
const authorization = require("../middleware/authorization");
const router = express.Router();

router.post("/new", async (req, res) => {
    try {
        // check body of request
        if (!req.body.email || req.body.email === "") throw "Nie dostarczono adresu e-mail lub jest on błędny.";
        if (!req.body.password || req.body.password === "") throw "Nie dostarczono hasła lub jest ono błędne."
        // look for the user in database
        const { rows } = await db.query(`
            SELECT u.id, u.email, u.password, r.name
            FROM users u
            LEFT JOIN roles r ON r.id=u.role_id
            WHERE u.email=$1`, [req.body.email]
        );
        // check if user found 
        if (rows.length === 0) throw "Niepoprawny email lub hasło.";
        // save user to variable
        const user = rows[0];
        // check email password combination
        if (req.body.password !== user.password) throw "Niepoprawny email lub hasło.";

        // generate token for client (without permission yet)
        const token = jwtGenerator({
            id: user.id,
            email: user.email,
            role: "rola"
        });

        res.status(200).json({message: "Poprawnie zalogowano.", token: token});
    } catch (error) {
        res.status(400).json({message: error});
    }
});

router.get("/check_token", authorization, (req, res) => {
    res.status(200).json({message: "Uwierzytelniono token."});
})

module.exports = router;