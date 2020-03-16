function preload(){
  // put preload code here
}

var socket;

function setup() {
  createCanvas(windowWidth,windowHeight);


//load the socket.io library
  socket = io();

//ogni volta che ricevi informazioni da mouseBroadcast fai qualcosa
  socket.on('mouseBroadcast', newDrawing);
//descrivo la funzione, cosa deve fare
  function newDrawing(receiveData){
    fill('yellow');
    ellipse(receiveData.x, receiveData.y, 5);
  }


  // put setup code here
}

function draw() {
  background('aquamarine');

  fill('white');
  ellipse(mouseX,mouseY, 10);

  //creare var con informazioni da inviare al server
  var sendData = {
    x:mouseX,
    y:mouseY
  }

  //inviare informazioni
  socket.emit('mouse', sendData);

  // put drawing code here
}

function mouseDragged(){

}
