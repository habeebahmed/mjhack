var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);


server.listen(8080, () => {
    console.log("Server listening on 8080");
    
});

// routing
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    
  socket.on('add user', function (data) {
    socket.join(data.room)
    // socket.emit('message',{
    //     msg: "User added to room "+data.room
    // })
  });

  socket.on('client-message', (data) => {
      io.sockets.in(data.room).emit('message', {
          msg: "User send msg: "+data.msg+" room: "+data.room
      })

      socket.broadcast.to(data.room).emit('message',  {
        msg: "User send msg: "+data.msg+" room: "+data.room
    })
  })

});