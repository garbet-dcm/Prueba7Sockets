var socket = io();

//((3)) - socket.js 
socket.on('estadoActual', function(data) {
    actualizaHTML(data.ultimos4);
});
//((4)) - socket-escritorio.js
socket.on('ultimos4', function(data) {
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizaHTML(data.ultimos4);
});


var lblTicket = [$('#lblTicket1'), $('#lblTicket2'), $('#lblTicket3'), $('#lblTicket4')];
var lblEscritorio = [$('#lblEscritorio1'), $('#lblEscritorio2'), $('#lblEscritorio3'), $('#lblEscritorio4')];

function actualizaHTML(ultimos4) {
    for (var i = 0; i < ultimos4.length; i++) {
        lblTicket[i].text('Numero: ' + ultimos4[i].numero);
        lblEscritorio[i].text('Escritorio: ' + ultimos4[i].escritorio);
    }
}