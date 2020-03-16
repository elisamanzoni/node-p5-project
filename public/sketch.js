function preload(){
  // put preload code here
}

var socket;

function setup() {
  createCanvas(windowWidth,windowHeight);
  background('aquamarine');

  var button = createButton('Play');
  button.mouseClicked(play);


//load the socket.io library
  socket = io();

  //ogni volta che ricevi informazioni da mouseBroadcast fai qualcosa
    socket.on('mouseBroadcast', newDrawing);
  //descrivo la funzione, cosa deve fare
    function newDrawing(receiveData){
      fill('yellow');
      ellipse(receiveData.x, receiveData.y, 5);
    }

    //ogni volta che ricevi informazioni da mouseBroadcast fai qualcosa
      socket.on('rectBroadcast', newDrawing2);
    //descrivo la funzione, cosa deve fare
      function newDrawing2(receiveData){
        fill('yellow');
        rect(receiveData.x, receiveData.y, 30, 30);
      }




  // put setup code here
}

function draw() {



  // put drawing code here
}

function mouseDragged(){

    fill('white');
    ellipse(mouseX,mouseY, 10);

    //creare var con informazioni da inviare al server
    var sendData = {
      x:mouseX,
      y:mouseY
    }

    //inviare informazioni
    socket.emit('mouse', sendData);



}

function play(){
  console.log('play');

  var x_rect = random(0,windowWidth);
  var y_rect = random(0,windowHeight)

  fill('blue');
  rect(x_rect, y_rect, 30, 30);

  var sendData = {
    x:x_rect,
    y:y_rect
  }

  //inviare informazioni
  socket.emit('rect', sendData);

}
