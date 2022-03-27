//servidor de express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const Sockets = require('./sockets');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        //HTTP server
        this.server =  http.createServer( this.app );
        //Configuración de sockets
        this.io = socketio( this.server, {} );
    }

    middlewares() {
        //desplegar el directorio 
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );
    }

    configurarSockets() {
        new Sockets( this.io );
    }

    execute() {
        //iniciar middlewares
        this.middlewares();
        //inicializar sockets
        this.configurarSockets(); 

        // iniciar server
        this.server.listen( this.port, () => {
            console.log('Server corriendo en un puerto', this.port);
        });
    }

}
module.exports = Server;