        var room
        var socket = io.connect();

        //   socket.on('newuser', function (data) {
        //     console.log(data);
        //     socket.emit('my other event', { my: 'data' });
        //   });

        socket.on('connect', () => {
            
        })

        socket.on('message', (data) => {
            console.log(data.msg)
            console.log("Room:"+data.room);
            room = data.room ? data.room : 'hello123'
            document.getElementById('chatbox').innerHTML += data.msg +"<br>"
        })

        const getRoom = async() => {
            await socket.emit('getCode')
            
        }

        function sendMsg() {
        
            socket.emit('client-message', {
                msg: document.getElementById('send').value,
                room
            })
            
        }

        const sendCode = () => {
            let code = document.getElementById('code').value
            console.log("Sending code to S"+code);
            
            socket.emit('sendCode', code)
        }