// The is java script file for index.html
// Imagine this file can be put entirely in html file under <script> tag

// variable io() is loaded in when we put 
// library <script src="/js/socket.io-1.3.7.js" ></script> in index.html
// This var connect the front end socket to back end server
var socket = io();

// Main purpose of "socket.on" in this file is to tell browser (client) to listen to the server event 
// and print it on the browser
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

var $form = jQuery("#form-message");

$form.on("submit", function(event){
	// "preventDefault()" is a method on the "event" object
	// "preventDefault()" means not to submit the form in old fashion way
	// which the entire page is refreshed is after submit
	event.preventDefault();

	var $message = $form.find("input[name=message]");

	socket.emit("message", {
		text: $message.val()
	});

	$message.val("");

});