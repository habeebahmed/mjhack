var socket = io.connect('http://localhost:8080');

        //   socket.on('newuser', function (data) {
        //     console.log(data);
        //     socket.emit('my other event', { my: 'data' });
        //   });

        socket.on('connect', () => {
            socket.emit('add user',{
                user: "user",
                room: 121
            })
        })  
        
        socket.on('message', (data) => {
            console.log(data.msg)
        })