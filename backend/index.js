// server
const express = require("express");
const app = express();
// https connection
const https = require("https");
const fs = require("fs");
// middleware
const cors = require("cors");
// port for local server
const port = 4000;
// import routes
const routerSessions = require("./routes/sessions");

app.use(cors());
app.use(express.json());
// use routes
app.use("/sessions", routerSessions);

const options = {
    key: fs.readFileSync("./certificates/key.pem"),
    cert: fs.readFileSync("./certificates/cert.pem")
}

https.createServer(options, app).listen(port, () => {
    console.log(`i am listening on port ${port}`);
});