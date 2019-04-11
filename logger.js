'use strict'
/**
 * @module logger.js
 */
const io = require('socket.io-client')
const PORT = 3001;
const socket = io.connect(`http://localhost:${PORT}`)

/**
 * when saved event happens, then it logs the stuff
 */
socket.on('saved', (payload) => console.log(payload));

/**
 * when error event happens, it console errors
 */
socket.on('err', (payload) => console.error(payload));