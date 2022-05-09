var canvas = document.getElementById('Canvas');
var context = canvas.getContext("2d");

canvas.width = 960;
canvas.height = 540;

// Initialize variables
var x = 0;
var y = 0;
var dx = 1;
var dy = 1;
var distance = 0;
var velocity = 2.5;
var time = 0;
var frames = 0;
var frame_number = 0;
var x_start = 0;
var y_start = 0;
var indice = 0;

// Rectangle image
var rectangle = new Image();
rectangle.src = "https://upload.wikimedia.org/wikipedia/commons/6/6b/A_sample_of_the_transparent_rectangle.svg";

var Marker = function () {
    this.XPos = 0;
    this.YPos = 0;
}

const Markers = new Array();

var mouseClicked = function (mouse) {
    // Get corrent mouse coords
    var rect = canvas.getBoundingClientRect();
    var mouseXPos = (mouse.x - rect.left);
    var mouseYPos = (mouse.y - rect.top);

    console.log("Marcador añadido");

    // Move the marker when placed to a better location
    var marker = new Marker();
    marker.XPos = mouseXPos;
    marker.YPos = mouseYPos;

    // Limito el número de marcadores a 2
    if (indice < 10){
        indice++;
        Markers.push(marker);
    }
    if (indice==1){
        x_start = Markers[0].XPos;
        y_start = Markers[0].YPos;
        x = x_start;
        y = y_start;
    }
    if (indice >= 2){
        //dx = (Markers[1].XPos-Markers[0].XPos)/50;
        //dy = (Markers[1].YPos-Markers[0].YPos)/50;
        distance = Math.sqrt(Math.pow(Markers[1].XPos-Markers[0].XPos,2) + Math.pow(Markers[1].YPos-Markers[0].YPos,2))
        console.log(distance);
        time = distance/velocity;
        dx = (Markers[1].XPos-Markers[0].XPos)/time;
        dy = (Markers[1].YPos-Markers[0].YPos)/time;
        frames = time;
        console.log(frames);
    }
}

// Add mouse click event listener to canvas
canvas.addEventListener("mousedown", mouseClicked, false);

var main = function () {
        draw();
};

function drawMarker(x,y,number) {
    context.beginPath();
    context.arc(x, y, 15, 0, Math.PI*2);
    context.fillStyle = "deeppink";
    context.fill();
    context.fillStyle = "#000";
    context.font = "12px Arial";
    context.fillText(number.toString(),x-4,y+4)
    context.closePath();
}

function drawBall(x,y) {
    context.beginPath();
    context.arc(x, y, 30, 0, Math.PI*2);
    context.fillStyle = "#0095DD";
    context.fill();
    context.closePath();
}

function drawLine(x1,y1,x2,y2) {
    context.beginPath();
    context.setLineDash([5, 15]);
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke(); 
}

var draw = function () {
    // Clear Canvas
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.drawImage(rectangle, 0, 0, 960, 540);

    // Draw markers
    
    if (frame_number > frames){
        x=x_start;
        y=y_start;
        console.log(x)
        console.log(y)
        frame_number=0;
    }
    if(indice>=2){
        frame_number++;
        //console.log(frame_number);
        drawLine(x_start,y_start,Markers[1].XPos,Markers[1].YPos)
        drawBall(x,y);
        
        x += dx;
        y += dy;
    }  
    for (var i = 0; i < Markers.length; i++) {
        var tempMarker = Markers[i];
        // Draw marker
        drawMarker(tempMarker.XPos,tempMarker.YPos,i+1);
    }
};

setInterval(main, (1000 / 120)); // Refresh 30 times a second