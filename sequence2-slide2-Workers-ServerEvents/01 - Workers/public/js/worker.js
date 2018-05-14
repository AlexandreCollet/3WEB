var lastUserCreatedDate = null;

getNewUsers();
setInterval(function(){
    getNewUsers();
}, 5000);

function getNewUsers(){

    var url = "http://127.0.0.1:8080/users"

    if (lastUserCreatedDate) {
        url+= "?since=" + lastUserCreatedDate.getTime()
    }

    var request = new XMLHttpRequest();

    request.open('GET',url);

    request.addEventListener('readystatechange',function(){

        if (request.readyState != 4 || request.status != 200) return;

        var response = JSON.parse(request.responseText);

        if(response.length) lastUserCreatedDate = new Date(response[0].created);

        postMessage(generateHTML(response));

    });

    request.send(null);

}

function generateHTML(users){

    var HTML = "";

    users.forEach(function(user){
        HTML += "<tr>" +
                "<td>" + user._id       + "</td>" +
                "<td>" + user.firstname + "</td>" +
                "<td>" + user.lastname  + "</td>" +
                "<td>" + user.created   + "</td>" +
                "</tr>";
    });

    return HTML;
}
