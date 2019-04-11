'use strict';
/**
 * @module app.js
 */

const io = require('socket.io-client')
const PORT = 3001;

/**
 * Connects our socket to server 3001 in localhost
 */
const socket = io.connect(`http://localhost:${PORT}`)

const fs = require('fs');
const util = require('util');

//modifying functions

/**
 * readit converts readfile into a promise
 * makes loadfile into a testable function
 */
const readit= util.promisify(fs.readFile)
const loadFile = (file) => readit(file)

/**
 * writeit converts readfile into a promise
 * makes saveFile into a testable function
 */
const writeit = util.promisify(fs.writeFile);
const saveFile = (file, buffer) => writeit(file, buffer)

/**
 * convertBufffer turns the information given into readable stuff in upper cse
 */
const convertBuffer = (buffer) =>Buffer.from(buffer.toString().trim().toUpperCase())

//server emit functions

/**
 * puts out an event that speaks and throws an error
 */
const throwError = (err) => {
  socket.emit('speak', `err ${err}`)
}

/**
 * puts out an event that is a saved status
 */
const savedStatus = (file) => {
  socket.emit('speak', `saved ${file} was modified` );
}

/**
 * puts everything together that does the events
 */
const alterFile = (file) => {
  loadFile(file)
    .then((buffer) =>{ convertBuffer(buffer)})
    .then((buffer)=> { saveFile(file,buffer)})
    .then( (success) => { savedStatus(file)} )
    .catch( (error) => throwError(error) );
  
};

/**
* takes the given request and brings back the file that we want to change
 */
let file = process.argv.slice(2).shift();
alterFile(file);

/**
 * listener for saved to terminate app.js
 */
socket.on('saved', () => socket.disconnect());

/**
 * listener for error to terminate app.js
 */
socket.on('err', () => socket.disconnect());
