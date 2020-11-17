var express = require('express');
var cookieParser = require('cookie-parser');
var http = require('http');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var save_function = null;
var exit_function = null;

app.get('/', function (req, res) {
    save_function();
    return res.json( {ok:"ok"} );
});


app.get('/shutdown', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json( {shutdown:"ok"} );
    exit_function({exit:true}, null);
});



var port = process.env.PORT || '19876';
app.set('port', port);


function onErrorServer(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}


function onListeningServer() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}

var set_save_function = (save_functionn) =>{
    save_function = save_functionn;
};

var set_exit_function = (exit_functionn) =>{
    exit_function = exit_functionn;
};

var server = http.createServer(app);
server.listen(port);
server.on('error', onErrorServer);
server.on('listening', onListeningServer);

module.exports = {
    server: server,
    set_save_function: set_save_function,
    set_exit_function: set_exit_function
};