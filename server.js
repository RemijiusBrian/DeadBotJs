const express = require("express");

const server = express();

server.all("/", (req, res) => {
	res.send("Bot is running...");
});

const port = process.env['PORT'] || 3000;
module.exports = function startServer() {
	server.listen(port, () => {
		console.log("Server has started!");
	});
}