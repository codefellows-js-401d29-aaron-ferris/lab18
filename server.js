'use strict';
/**
 * @module server.js
 */

const PORT =3001;
const io = require('socket.io')(PORT);

/**
 * when the connectionstarts it listens for a speak event
 * turns it into a event and a payload, to be sent out.
 */
io.on('connection', (socket) => {

  console.log('CONNNECTED', socket.id);


  socket.on('speak', (buffer) => {
    let text = buffer.toString().trim();
    let [event,payload] = text.split(/\s+(.*)/)    
    socket.emit(event, payload)
    socket.broadcast.emit(event, payload)
    
  })

});