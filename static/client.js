var socket = io.connect('http://localhost:3000');
var $ = require('jquery')



$(document).ready(function(){
    $("#chat").hide();
    $("#user").animate({
            opacity: '0.9',
            height: '50px',
            width: '250px'
        });
    $("#user").focus();
    $("#user").keypress(function(event){
        if(event.which == 13){
            var new_user = $("#user").val()
            if(new_user != ''){
                $("#chat").show() 
                $(this).hide()
                $('#msg').focus()
                socket.emit('join', new_user)
            }
        }
    }); 
}); 



function submitfunction() {
    
    var from = $('#user').val();
    var message = $('#msg').val();
    
    if (message != '') {
        socket.emit('chat message', from, message);
    }
    $('#msg').val('').focus();
    return false;
}

socket.on('broadcast', (from, msg) => {
    var me = $('#user').val();
    var color = (from == me) ? 'green' : '#009afd';
    var from = (from == me) ? 'Me' : from;
    $('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');
});

socket.on('notifyJoin', (new_user) => {
    $('#messages').append('<li style="color:blue; text-align:center">' + new_user + ' Joined</li>');         
});