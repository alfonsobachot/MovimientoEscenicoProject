var canvas = document.getElementById('Canvas');
var context = canvas.getContext("2d");

canvas.width = 960;
canvas.height = 540;

document.getElementById('toggleAnimation').addEventListener('click', function () {
    enableAnimation = !enableAnimation;
    dx = BallPosition[1].dX;
    dy = BallPosition[1].dY;
    x = BallPosition[0].xStart;
    y = BallPosition[0].yStart;
    segmentoDibujado = 0;
    console.log(BallPosition.length);
    frame_number = 0;
});

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
var x_end = 0;
var y_end = 0;
var indice = 0;

let enableAnimation = false;
let segmentoDibujado = 0;

// Rectangle image
var rectangle = new Image();
rectangle.src = "https://upload.wikimedia.org/wikipedia/commons/6/6b/A_sample_of_the_transparent_rectangle.svg";

var Marker = function () {
    this.XPos = 0;
    this.YPos = 0;
}

const Markers = new Array();

const BallPosition = new Array();

let MovementData = function () {
    this.xStart = 0;
    this.yStart = 0;
    this.dX = 0;
    this.dY = 0;
    this.velocity = 0;
    this.distance = 0;
    this.time = 0;
}

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

    let movementData = new MovementData();

    // Limito el número de marcadores a 2
    indice++;
    Markers.push(marker);
    console.log(Markers)


    //BallPosition[Markers.length - 1].yStart = Markers[Markers.length - 1].YPos;
    movementData.xStart = Markers[Markers.length - 1].XPos;
    movementData.yStart = Markers[Markers.length - 1].YPos;
    if (indice == 1) {
        x_start = Markers[0].XPos;
        y_start = Markers[0].YPos;
        x = x_start;
        y = y_start;
    }
    if (indice >= 2) {
        //dx = (Markers[1].XPos-Markers[0].XPos)/50;
        //dy = (Markers[1].YPos-Markers[0].YPos)/50;
        x_end = Markers[1].XPos;
        y_end = Markers[1].YPos;
        distance = Math.sqrt(Math.pow(Markers[Markers.length - 1].XPos - Markers[Markers.length - 2].XPos, 2) + Math.pow(Markers[Markers.length - 1].YPos - Markers[Markers.length - 2].YPos, 2))

        console.log(distance);
        time = distance / velocity;
        dx = (Markers[Markers.length - 1].XPos - Markers[Markers.length - 2].XPos) / time;
        dy = (Markers[Markers.length - 1].YPos - Markers[Markers.length - 2].YPos) / time;

        frames = time;
        console.log(frames);
    }
    movementData.distance = distance;
    movementData.dX = dx;
    movementData.dY = dy;
    movementData.velocity = velocity;
    movementData.time = time;
    BallPosition.push(movementData);
    console.log("movementData", movementData);
    console.log("BallPosition", BallPosition);
}

// Add mouse click event listener to canvas
canvas.addEventListener("mousedown", mouseClicked, false);

var main = function () {
    draw();
};

function drawMarker(x, y, number) {
    context.beginPath();
    context.arc(x, y, 15, 0, Math.PI * 2);
    context.fillStyle = "deeppink";
    context.fill();
    context.fillStyle = "#000";
    context.font = "12px Arial";
    context.fillText(number.toString(), x - 4, y + 4)
    context.closePath();
}

function drawBall(x, y) {
    context.beginPath();
    context.arc(x, y, 15, 0, Math.PI * 2);
    context.fillStyle = "#0095DD";
    context.fill();
    context.closePath();
}

function drawLine(x1, y1, x2, y2) {
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

    for (var i = 0; i < Markers.length - 1; i++) {
        if (Markers.length > 1) {
            drawLine(Markers[i].XPos, Markers[i].YPos, Markers[i + 1].XPos, Markers[i + 1].YPos)
        }
    }
    for (var i = 0; i < Markers.length; i++) {
        var tempMarker = Markers[i];
        // Draw marker
        drawMarker(tempMarker.XPos, tempMarker.YPos, i + 1);

    }

    // Draw markers
    /*
        if (frame_number > frames) { //reset animación
            x = x_start;
            y = y_start;
            console.log(BallPosition)
            console.log(y)
            frame_number = 0;
            //enableAnimation = false;
        } */
    /*
        if ((x > x_end || y > y_end) && Markers.length > 1) { //reset animación
            console.log("entro aqui")
            segmentoDibujado++;
            x = Markers[segmentoDibujado].XPos;
            y = Markers[segmentoDibujado].YPos;;
            console.log(x)
            console.log(y)
            frame_number = 0;
            //enableAnimation = false;
        } */
    if (Markers.length >= 2 && enableAnimation) { //cambiar a "al pulsar botón"
        frame_number++;

        //console.log(frame_number);
        //drawLine(x_start,y_start,Markers[1].XPos,Markers[1].YPos)
        drawBall(x, y);
        if (frame_number > BallPosition[segmentoDibujado + 1]?.time) {
            segmentoDibujado++;
            console.log(segmentoDibujado)
            if (segmentoDibujado + 1 == BallPosition.length) {
                console.log('termino');
                enableAnimation = false;
                segmentoDibujado = 0;
                x = BallPosition[0].xStart;
                y = BallPosition[0].yStart;
            }
            x = BallPosition[segmentoDibujado].xStart;
            y = BallPosition[segmentoDibujado].yStart;
            dx = BallPosition[segmentoDibujado + 1].dX;
            dy = BallPosition[segmentoDibujado + 1].dY;
            frame_number = 0;
        }
        x += dx;
        y += dy;
    }
    
    
};

setInterval(main, (1000 / 120)); // Refresh 30 times a second