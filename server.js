console.log('sei bravissima');

//per richiamare express, con il reqiore òa variabile diventa una funzione
var express = require('express');
//per attivarlo
var app = express();

//il numero è quello di localhost:xxxx
var port = process.env.PORT || 3000;
//che cartella voglio usare
app.use(express.static('public'));

//x creare una nuova connessione
var server = app.listen(port);

//x vedere il mio link
console.log('http://localhost'+port);

//fare lo stesso di esxpress con socket
//socket permette di inviare informazioni a tutti i clients
var socket = require('socket.io');

//scrivere un codice che verrà aggiornato ogni volta che si aggiornerà il server
var io = socket(server);

//quando un altro cliente è attaccato al server
//quando c'è una nuova connessione fai partire la funzione new Connection
//la nuova connessione è il cliente, ciè gli altri sketch
io.on('connection', newConnection);

function newConnection(socket){
  console.log(socket.id);

  //riceve informazioni da sketch che si chiama 'mouse'
  socket.on('mouse', mouseMessage);
  //creare funzione mouseMessage
  function mouseMessage(receiveData){
    console.log(receiveData);

  //inviare dal server le informazioni a tutti gli altri clients ma non ha chi l'ha creato
    socket.broadcast.emit('mouseBroadcast', receiveData);
  }
}
