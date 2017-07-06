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



    socket.on('send-title',function(data) {
        console.log(data);
   
        socket.broadcast.emit('title', data);
    })

    socket.on('add-message1',function(data) {
        console.log(data);
   
   
        socket.broadcast.emit('response1', data);
    })

    socket.on('add-message2',function(data) {
        console.log(data);
   
   
        socket.broadcast.emit('response2', data);
    })

    socket.on('add-message3',function(data) {
        console.log(data);
   
   
        socket.broadcast.emit('response3', data);
    })

    socket.on('disconnect', function(){
        connections--
        console.log('Conexiones activas: '+connections);

        socket.broadcast.emit('connectUsers', {numbers : connections})
    })
})



server.listen(3000,function(){
    console.log("Servidor correndo en Http://localhost:3000");
});