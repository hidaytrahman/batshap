const express = require('express');
const app = express();
const http = require('http').createServer(app);
const PORT = process.env.PORT || 3000;


http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// Give access to the public folder
app.use(express.static(__dirname + '/public'));

// Landing page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Socket configuration
const io = require('socket.io')(http);

// connection configuration
io.on('connection', (socket) => {
  console.log('a user connected');

  // listen to the client for a message
  socket.on('message', (payload) => {
    console.log('message ', payload);

    // send the message to all connected clients
    socket.broadcast.emit('message', payload);
  });

  // listen to the client for a disconnect
  socket.on('disconnect', (payload) => {
    console.log('user disconnected', payload);
  });

});