

function preload(){
  // put preload code here
}

var socket;
var number = 0;

function setup() {
  createCanvas(500,500);
  background('aquamarine');

  var button = createButton('Play');
  button.mouseClicked(play);

  var buttonNumber = createButton(number);
  buttonNumber.mouseClicked(numberPiuUno);


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

      //ogni volta che ricevi informazioni da mouseBroadcast fai qualcosa
        socket.on('numberBroadcast', new_number);
      //descrivo la funzione, cosa deve fare
        function new_number(receiveData){
          number ++;
          console.log('giocatori online: ' + number);
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

  var x_rect = random(0,width);
  var y_rect = random(0,height);

  fill('orange');
  rect(x_rect, y_rect, 30, 30);

  var sendData = {
    x:x_rect,
    y:y_rect
  }

  //inviare informazioni
  socket.emit('rect', sendData);

}

function numberPiuUno(){
  number ++;
  console.log('you are the number ' + number);

  var sendData = {
    number:number
  }

  //inviare informazioni
  socket.emit('number', sendData);

}
