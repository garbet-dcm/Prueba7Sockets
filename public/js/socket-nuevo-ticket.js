var socket = io();

socket.on('connect', () => {
    console.log('Conectado al servidor');
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
});

//((3)) - socket.js
socket.on('estadoActual', (data, callback) => {
    label.text(data.actual);
});

//jQuery
var label = $('#lblNuevoTicket');
$('button').on('click', () => {
    //((1)) - socket.js
    //null correspondería al data
    socket.emit('siguienteTicket', null, (siguienteTicket, callback) => {
        label.text(siguienteTicket);
    });
});