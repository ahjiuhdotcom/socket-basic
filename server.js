var PORT = process.env.PORT || 3000;
var express = require("express");
var app = express();
// "http" is build in nodejs module to create http server
// The server use express app as boiler plate
var http = require("http").Server(app); 
var io = require("socket.io")(http);

app.use(express.static(__dirname + "/public"));

// start listen to an event with name: "connection"
io.on("connection", function(){
	console.log("User connected via socket.io");
})

http.listen(PORT, function(){
	console.log("Server started");
});