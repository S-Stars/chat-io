const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const users = []

io.on('connection', function(socket){
  socket.on('join',(userName)=> {
    if(users.find(element=> element===userName)){
      return socket.emit('userStatus', false)
    }
    users.push(userName);
    return socket.emit('userStatus', true)
  })
});

http.listen(5000, function(){
  console.log('listening on *:5000');
});