var socket = io();

var parametrosBusqueda = new URLSearchParams(window.location.search);
//Si no es de este estilo la búsqueda escritorio.html?escritorio=1
//Reegresa al inicio
if (!parametrosBusqueda.has('escritorio')) { //Da true si en la búsqueda está escritorio
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var numEscritorio = parametrosBusqueda.get('escritorio');

$('h1').text('Escritorio ' + numEscritorio);
$('button').on('click', function() {
    //((2)) - socket.js
    socket.emit('atenderTicket', { escritorio: numEscritorio }, function(res) {
        if (!res.numero) {
            alert(res); //Manda por defecto un texto cuando no hay numeros
            return;
        }
        $('small').text('Ticket: ' + res.numero);
    });
});