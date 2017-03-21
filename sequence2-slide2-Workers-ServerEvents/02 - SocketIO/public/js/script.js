/**
 * SOCKET CONNECTION
 */

var socket = io.connect('http://vmlinux:8080');

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
    
    socket.on('message',function(msgUsername,body,date){
        var msgType = msgUsername === username ? 'sended' : 'received';
        appendMessage(msgType, msgUsername, body, date);
    });

});



/**
 * FUNCTIONS
 */

function appendMessage(type,username,body,date){

    var colors = {
        received : 'info',
        sended   : 'success'
    };

    messagesList.innerHTML += '<div class="' + type + '">' +
                            '<h5>' + username + ' : ' + new Date(date).toDateString() + '</h5>' + 
                            '<div class="alert alert-dismissable alert-' + colors[type] + '">' +
                                body +
                            '</div></div>';     

    window.scrollTo(0,document.body.scrollHeight);              

}