/**
 * Serveur simple, répond à /
 */

const express = require("express");

const app = express();

const db = require("./models/db.js");
db.sequelize.sync();

app.get("/", (req, res) => {
	return res.status(200).json({message: "Hello, World!"});
});

const PORT = 5000;
app.listen(PORT, () => {
	console.log(`Server is running: http://localhost:${PORT}`);
});