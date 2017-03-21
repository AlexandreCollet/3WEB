var table = document.getElementById('usersList');

if(window.Worker){

    var worker = new Worker('/js/worker.js');

    worker.onmessage = function(event){

        var result = event.data;

        table.innerHTML = result + table.innerHTML;

    }

}else{
    alert('Workers is not supported by this browser.');
}