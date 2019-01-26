var express = require('express')
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var userData =[]
server.listen(8080, () => {
    console.log("Server listening on 8080");
    
});

// routing
// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/index.html');
// });
app.use(express.static('public'))


io.on('connection', function (socket) {
    
  // socket.on('add user', function (data) {
  //   socket.join(data.room)
  //   // socket.emit('message',{
  //   //     msg: "User added to room "+data.room
  //   // })
  // });

  socket.on('getCode', async() => {
    let code = await getCode();
    socket.join(code);
    socket.emit('message',{
       msg: "User added to room "+code,
       room: code
    })
    let id = socket.id
    userData.push({
      [id] : code
    })
    for (var key in userData[0]) {
      if (userData.hasOwnProperty(key)) {
          console.log(key + " -> " + userData[key]);
      }
    }
    console.log("Socket join "+socket.id)
    console.log(Object.keys(userData[0]));
    
    
  })

  socket.on('sendCode', (code) => {
    socket.join(code)
    io.sockets.in(code).emit('message', {
      msg: "User Joinde room:"+code,
      room: code
  })
  })
  socket.on('client-message', (data) => {
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
          console.log(key + " -> " + data[key]);
      }
    }
      io.sockets.in(data.room).emit('message', {
          msg: "User send msg: "+data.msg+" room: "+data.room,
          room: data.room
      })

      socket.broadcast.to(data.room).emit('message',  {
        msg: "User send msg: "+data.msg+" room: "+data.room,
        room: data.room
    })
  })
  socket.on('disconnect', () => {
    socket.leave()
  })

});

const getCode = () => {
  var val = Math.floor(1000 + Math.random() * 9000);
  return val;
}