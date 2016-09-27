var PORT = process.env.PORT || 3000;
var express = require("express");
var app = express();
// "http" is build in nodejs module to create http server
// The server use express app as boiler plate
var http = require("http").Server(app); 
var io = require("socket.io")(http);
var moment = require("moment");

app.use(express.static(__dirname + "/public"));


// Start listen to an event with name: "connection"
// We tell the server to wait (or listen) to event "connection" whenever available
// Main purpose function is to tell the server to listen to any new event
// send to the server by user (socket.on)
// Then emit the event to other browser thru "socket emit", "socket.broadcast.emit" etc
io.on("connection", function(socket){
	console.log("User connected to back end via socket.io");

	// Make 2 browsers talk each other by
	// 1. server listen to event from browser when user submit message
	// 2. server emit/send the message to other browser
	socket.on("message", function(message){
		console.log("Message receive: " + message.text);
		
		message.timestamp = moment().valueOf()
		// socket.broadcast.emit: send to everybody except sender
		// io.emit: send to everybody including sender
		io.emit("message", message);
	});

	// This one run once during server is connected upon "io.on"
	// This send an event call "message" to browser (client)
	socket.emit("message", {
		name: "System",
		text: "Welcome to the chat application!",
		timestamp: moment().valueOf()
	});
});

http.listen(PORT, function(){
	console.log("Server started");
});