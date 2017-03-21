console.log("online");

/**
 * SOCKET CONNECTION
 */

var socket = io.connect('http://vmlinux:8080');

sendMessagesInLocalStorage();

/**
 * VARIABLES
 */

var username = null;
var formUsername = document.getElementById('formUsername');
var formMessage = document.getElementById('formMessage');
var messagesList = document.getElementById('messages');

/**
 * FORMS SUBMIT 
 */

formUsername.onsubmit = function(event){
    event.preventDefault();
    socket.emit('login', this.username.value);
}

formMessage.onsubmit = function(event){
    event.preventDefault();

    var body = this.message.value;

    if(!username || !body) return false;

    socket.emit("message", body);
    appendMessage('sended', username, body, new Date());

    this.message.value = "";
}

/**
 * SOCKET LISTENERS
 */

socket.on('connected',function(usernameConfirmation){
    
    username = usernameConfirmation;
    
    document.getElementById('anonymous').className = "hidden";
    document.getElementById('connected').className = "";
    
    formMessage.message.focus();

    localStorage.removeItem('messages');
    
    socket.on('message',function(msgUsername,body,date){
        var msgType = msgUsername === username ? 'sended' : 'received';
        appendMessage(msgType, msgUsername, body, date);
    });

});



/**
 * FUNCTIONS
 */

function appendMessage(type,msgUsername,body,date){

    var colors = {
        received : 'info',
        sended   : 'success'
    };

    messagesList.innerHTML += '<div class="' + type + '">' +
                            '<h5>' + msgUsername + ' : ' + new Date(date).toDateString() + '</h5>' + 
                            '<div class="alert alert-dismissable alert-' + colors[type] + '">' +
                                body +
                            '</div></div>';     

    window.scrollTo(0,document.body.scrollHeight);

    addMessageInLocalStorage(msgUsername,body,date);
}

function addMessageInLocalStorage(msgUsername,body,date){

    if(!window.localStorage) return;

    var messages;
    var message = {
        username : msgUsername,
        body     : body,
        date     : date
    };

    if(localStorage["messages"]){
        messages = JSON.parse(localStorage["messages"]);
        messages.push(message);
    }else{
        messages = [message];
    }

    localStorage["messages"] = JSON.stringify(messages);

}

function sendMessagesInLocalStorage(){

    if(!window.localStorage || !localStorage['offline_messages']) return;

    var messages = JSON.parse(localStorage["offline_messages"]);

    messages.forEach(function(message){
        socket.emit("message", message.body, message.username, message.date);
    }) 

    localStorage.removeItem('offline_messages');

}