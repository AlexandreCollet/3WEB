console.log("offline");

/**
 * VARIABLES
 */

var username     = null;
var formUsername = document.getElementById('formUsername');
var messagesList = document.getElementById('messages');
var formMessage  = document.getElementById('formMessage');

/**
 * FORMS SUBMIT
 */

formUsername.onsubmit = function(event){

	event.preventDefault();

	username = this.username.value;

	getMessagesFromLocalStorage();

	document.getElementById('anonymous').className = "hidden";
	document.getElementById('connected').className = "";

	this.username.value = "";

	formMessage.message.focus();
}

formMessage.onsubmit = function(event){

	event.preventDefault();

	body = this.message.value;

	if(!username || !body) return false;

	appendMessage('sended',username,body,new Date(),false);

	addMessageInLocalStorage(username,body,new Date());
	
	this.message.value = "";
}

/**
 * FUNCTIONS
 */

function appendMessage(type,username,body,date,sended){

	var colors = {
		received  : 'info',
		sended    : 'success'
	};

	var alertType = sended === undefined ? colors[type] : 'danger';
	var date      = new Date(date).toDateString();

	messagesList.innerHTML += '<div class="' + type + '">' +
							'<h5>' + username + ' : ' +  date + '</h5>' + 
							'<div class="alert alert-dismissable alert-' + alertType + '">' +
								body +
							'</div></div>';		

	window.scrollTo(0,document.body.scrollHeight);
}

function addMessageInLocalStorage(username,body,date){

	if(!window.localStorage) return;

	var messages;
	var message = {
        username : username,
        body     : body,
        date     : date
    };

	if(localStorage["offline_messages"]){
		messages = JSON.parse(localStorage["offline_messages"]);
		messages.push(message);
	}else{
		messages = [message];
	}

	localStorage["offline_messages"] = JSON.stringify(messages);

}

function getMessagesFromLocalStorage(){

	if(localStorage["messages"])
		JSON.parse(localStorage["messages"]).forEach(function(message){
			appendMessage(
				message.username === username ? 'sended' : 'received',
				message.username,
				message.body,
				message.date
			);
		});

	if(localStorage["offline_messages"])
		JSON.parse(localStorage["offline_messages"]).forEach(function(message){
			appendMessage(
				message.username === username ? 'sended' : 'received',
				message.username,
				message.body,
				message.date,
				false
			);
		});

}