const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    //Se envía según se conecta para poner los datos oniciales
    //((3)) - socket-publico.js / socket-escritorio.js
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    // Escuchar el cliente
    //((1)) - socket-nuevo-ticket.js
    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        callback(siguiente);
        console.log(siguiente);
    });
    //((2)) - socket-escritorio.js
    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);

        //((4)) - socket-publico.js
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });
    });
});