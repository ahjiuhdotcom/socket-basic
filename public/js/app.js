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

var name = getQueryVariable("name") || "Anonymous";
var room = getQueryVariable("room");

jQuery(".room-title").text(room);

socket.on("connect", function(){
	console.log("Front end connected to socket.io");
	socket.emit("joinMyRoom", {
		name: name,
		room: room
	});
});

// The "message" is refer to event name from server.js
socket.on("message", function(message){
	var momentTimestamp = moment.utc(message.timestamp).local().format("h:mm a");
	var $messages = jQuery(".messages");
	var $message = jQuery("<li class='list-group-item'></li>");

	console.log("New message");
	console.log(message.text);

	$message.append("<p><strong>" + message.name + " " + momentTimestamp +  ": </strong></p>");
	$message.append("<p>" + message.text + "</p>");

	$messages.append($message);
});

var $form = jQuery("#message-form");

$form.on("submit", function(event){
	// "preventDefault()" is a method on the "event" object
	// "preventDefault()" means not to submit the form in old fashion way
	// which the entire page is refreshed is after submit
	event.preventDefault();

	var $message = $form.find("input[name=message]");

	socket.emit("message", {
		name: name,
		text: $message.val()
	});

	$message.val("");

});