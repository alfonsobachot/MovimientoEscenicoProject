var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx = -1;
var dy = -2;

var indice;

var rectangle = new Image();
rectangle.src = "https://upload.wikimedia.org/wikipedia/commons/6/6b/A_sample_of_the_transparent_rectangle.svg";

var Marker = function () {
    this.Sprite = new Image();
    this.Sprite.src = "http://www.clker.com/cliparts/a/9/3/e/1194984754884631372button-blue_benji_park_01.svg.med.png"
    this.Width = 20;
    this.Height = 20;
    this.XPos = 0;
    this.YPos = 0;
}

var Markers = new Array();

var mouseClicked = function (mouse) {
    // Get corrent mouse coords
    var rect = canvas.getBoundingClientRect();
    var mouseXPos = (mouse.x - rect.left);
    var mouseYPos = (mouse.y - rect.top);

    console.log("Marcador añadido");

    // Move the marker when placed to a better location
    var marker = new Marker();
    marker.XPos = mouseXPos - (marker.Width / 2);
    marker.YPos = mouseYPos - marker.Height;

    // Limito el número de marcadores a 2
    if (indice < 2){
        indice++;
        Markers.push(marker);
    }
}

canvas.addEventListener("mousedown", mouseClicked, false);

var main = function () {
    draw();
};

var firstLoad = function () {
    ctx.font = "15px Georgia";
    ctx.textAlign = "center";
}

firstLoad();

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(rectangle, 0, 0, 480, 270);
    
    for (var i = 0; i < Markers.length; i++) {
        console.log("Dibujo marcador");
        var tempMarker = Markers[i];
        // Draw marker
        ctx.drawImage(tempMarker.Sprite, tempMarker.XPos, tempMarker.YPos, tempMarker.Width, tempMarker.Height);

        // Calculate postion text
        var markerText = "X:" + tempMarker.XPos + ", Y:" + parseInt(tempMarker.YPos);

        // Draw a simple box so you can see the position
        var textMeasurements = ctx.measureText(markerText);
        ctx.fillStyle = "#666";
        ctx.globalAlpha = 0.7;
        ctx.fillRect(tempMarker.XPos - (textMeasurements.width / 2), tempMarker.YPos - 15, textMeasurements.width, 20);
        ctx.globalAlpha = 1;

        // Draw position above
        ctx.fillStyle = "#000";
        ctx.fillText(markerText, tempMarker.XPos, tempMarker.YPos);
    }
    drawBall();
    x += dx;
    y += dy;
}

setInterval(main, (1000/60));