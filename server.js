var PORT = process.env.PORT || 3000;
var express = require("express");
var app = express();
// "http" is build in nodejs module to create http server
// The server use express app as boiler plate
var http = require("http").Server(app); 
app.use(express.static(__dirname + "/public"));

http.listen(PORT, function(){
	console.log("Server started");
});