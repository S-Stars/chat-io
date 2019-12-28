const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const users = [];
const chat = [];

io.on('connection', function(socket) {
  socket.on('join', userName => {
    if (users.find(element => element === userName)) {
      return socket.emit('userStatus', false);
    }
    users.push(userName);
    chat.push(`${userName} has joined the chat`);
    io.sockets.emit('chat', chat);
    return socket.emit('userStatus', true);
  });
  socket.on('grabChat', data => {
    return socket.emit('chat', chat);
  });
  socket.on('leave', username => {
    users.splice(users.indexOf(username));
    console.log(username);
    chat.push(`${username} has left the chat.`);
    io.sockets.emit('chat', chat);
  });
  socket.on('message', message => {
    chat.push(message);
    //send to all client
    io.sockets.emit('chat', chat);
  });
});

http.listen(5000, function() {
  console.log('listening on *:5000');
});
