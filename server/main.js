var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var connections = 0;



app.get('/hello', function(req,res){
    res.status(200).send("Hola mundo");
});


io.on('connection', function(socket){
    console.log('Alguien se ha conectado con socket');
    var data1;

    connections++;

    console.log('conexiones activas: '+connections);

    socket.broadcast.emit('connectUsers', {numbers : connections})

    socket.on('add-message',function(data) {
        console.log(data);
   
   
        socket.broadcast.emit('response', data);
    })

    socket.on('disconnect', function(){
        connections--
        console.log('Conexiones activas: '+connections);

        socket.broadcast.emit('connectUsers', {numbers : connections})
    })
})


server.listen(8080,function(){
    console.log("Servidor correndo en Http://localhost:8080");
});