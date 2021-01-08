var express = require('express');
var cookieParser = require('cookie-parser');
var http = require('http');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

var save_function = null;
var exit_function = null;
var bot_send_function = null;

app.get('/', function (req, res) {
    save_function();
    return res.json( {ok:"ok"} );
});


app.get('/shutdown', function (req, res) {
    res.json( {shutdown:"ok"} );
    exit_function({exit:true}, null);
});

app.post('/send', function (req, res) {
    if(req.body && req.body.text && req.body.channel){
        //bot_send_function(req.body.channel, req.body.text);
        bot_send_function.sendMessage(req.body.channel, req.body.text,{
            parse_mode:"MarkdownV2"
        });

        return res.json({text_sent: "ok"});
    }else{
        return res.json({error: "could not send text"});
    }

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

var set_bot_send_function = (send_function) =>{
    bot_send_function = send_function;
};

var server = http.createServer(app);
server.listen(port);
server.on('error', onErrorServer);
server.on('listening', onListeningServer);

module.exports = {
    server: server,
    set_save_function: set_save_function,
    set_exit_function: set_exit_function,
    set_bot_send_function: set_bot_send_function
};