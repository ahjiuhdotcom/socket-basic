// The is java script file for index.html
// Imagine this file can be put entirely in html file under <script> tag

// variable io() is loaded in when we put 
// library <script src="/js/socket.io-1.3.7.js" ></script> in index.html
// This var connect the front end socket to back end server
var socket = io();

// socket.on in this file is to tell the browser (client) to connect to server 
// and standby listen to event from server
// if there is event from server, it will automaitcally receive without make a call
// & result will appear at developer tool of browser
// Server send event to browser thru function socket.emit in server.js file

socket.on("connect", function(){
	console.log("Front end connected to socket.io");
});

// The "message" is refer to event name from server.js
socket.on("message", function(message){
	console.log("New message");
	console.log(message.text);
});