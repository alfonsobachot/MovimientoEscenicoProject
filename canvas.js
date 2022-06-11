var canvas = document.getElementById("Canvas");
var context = canvas.getContext("2d");

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

var accept = document.getElementById("accept");

var mainHeight = document.getElementById("mainHeight");
var mainWidth = document.getElementById("mainWidth");

mainHeight.value = "5";
mainWidth.value = "10";

var button = [];
var inputVelocity = [];
var wrapperVelocity = [];

span.onclick = function () {
  modal.style.display = "none";
};

accept.onclick = function () {
  drawGrid(mainHeight.value, mainWidth.value);
  modal.style.display = "none";
};

canvas.width = 960;
canvas.height = 540;

const dancerColors = [
  "deeppink",
  "lightblue",
  "lightgreen",
  "coral",
  "lightyellow",
];

const addDiv = function (dancerIndex) {
  wrapperVelocity[indice] = document.createElement("div");
  wrapperVelocity[indice].setAttribute("id", "wrapperVelocity-" + indice);
  wrapperVelocity[indice].setAttribute(
    "class",
    "wrapperVelocity-" + dancerIndex
  );
  button[indice] = document.createElement("p");
  inputVelocity[indice] = document.createElement("input");
  button[indice].setAttribute("id", "segment-" + indice);
  button[indice].setAttribute("class", "textVelocity");
  inputVelocity[indice].setAttribute("id", "input-" + indice);
  inputVelocity[indice].setAttribute("class", "inputVelocity");
  inputVelocity[indice].setAttribute("name", "inputVelocity-" + dancerIndex);
  button[indice].innerHTML =
    "Beats movement " +
    dancer[dancerIndex].length +
    "-" +
    (dancer[dancerIndex].length + 1) +
    ": ";
  inputVelocity[indice].value = 60;
  document.getElementById("buttonWrapper").appendChild(wrapperVelocity[indice]);
  document
    .getElementById("wrapperVelocity-" + indice)
    .appendChild(button[indice]);
  document
    .getElementById("wrapperVelocity-" + indice)
    .appendChild(inputVelocity[indice]);
};

const switchDancer = function (dancerNumber) {
  let divsMovementIndex = document.getElementsByClassName(
    "wrapperVelocity-" + dancerIndex
  );
  for (i = 0; i < divsMovementIndex.length; i++) {
    divsMovementIndex[i].style.display = "none";
  }
  dancerIndex = dancerNumber - 1;
  divsMovementIndex = document.getElementsByClassName(
    "wrapperVelocity-" + dancerIndex
  );
  for (i = 0; i < divsMovementIndex.length; i++) {
    divsMovementIndex[i].style.display = "flex";
  }
  console.log(dancerIndex, dancerNumber);
  document.getElementById("activeDancer").innerHTML = dancerNumber;
  x = dancer[dancerIndex][dancer[dancerIndex].length - 1].xStart;
  y = dancer[dancerIndex][dancer[dancerIndex].length - 1].yStart;
};

const createNewDancer = function () {
  if (dancer.length < 5) {
    let divsMovementIndex = document.getElementsByClassName(
      "wrapperVelocity-" + dancerIndex
    );
    for (i = 0; i < divsMovementIndex.length; i++) {
      divsMovementIndex[i].style.display = "none";
    }
    dancerIndex = dancer.length;
    document.getElementById("activeDancer").innerHTML = dancerIndex + 1;
    newDancer = document.createElement("button");
    newDancer.setAttribute("id", dancerIndex + 1);
    newDancer.setAttribute("class", "dancer");
    newDancer.innerHTML = "Dancer " + (dancerIndex + 1);
    document.getElementById("footer-dancer").appendChild(newDancer);
    document
      .getElementById(dancerIndex + 1)
      .addEventListener("click", function () {
        let id = parseInt(this.id);
        switchDancer(id);
        console.log(dancerIndex, id);
      });
    dancer.push([]);
  }
};

const deleteLastMarker = function () {
  // if (indice > 0) {
  //Markers.pop();
  //BallPosition.pop();
  button[indice]?.remove();
  inputVelocity[indice]?.remove();
  wrapperVelocity[indice]?.remove();

  // dancers
  dancer[dancerIndex].pop();

  // indice--;
  console.log("dancerIndex ", dancerIndex, dancer);
  // }
};

const updateVelocity = function () {
  var arrayVelocity = document.getElementsByName(
    "inputVelocity-" + dancerIndex
  );
  for (i = 0; i < arrayVelocity.length; i++) {
    console.log("dancerIndex", dancerIndex, i);
    let oldVelocity = dancer[dancerIndex][i + 1].velocity;
    let oldTime = dancer[dancerIndex][i + 1].time;
    let oldDistance = dancer[dancerIndex][i + 1].distance;
    let newVelocity = oldDistance / arrayVelocity[i].value;
    let velocityRatio = newVelocity / oldVelocity;
    dancer[dancerIndex][i + 1].velocity = newVelocity;
    dancer[dancerIndex][i + 1].time = arrayVelocity[i].value;
    dancer[dancerIndex][i + 1].dX =
      dancer[dancerIndex][i + 1].dX * velocityRatio;
    dancer[dancerIndex][i + 1].dY =
      dancer[dancerIndex][i + 1].dY * velocityRatio;
  }
  console.log(BallPosition);
};

const drawGrid = function (height, width) {
  for (i = 1; i < width; i++) {
    context.beginPath();
    context.setLineDash([]);
    context.moveTo((960 * i) / width, 0);
    context.lineTo((960 * i) / width, 540);
    context.stroke();
  }
  for (i = 1; i < height; i++) {
    context.beginPath();
    context.setLineDash([]);
    context.moveTo(0, (540 * i) / height);
    context.lineTo(960, (540 * i) / height);
    context.stroke();
  }
};

document
  .getElementById("toggleAnimation")
  .addEventListener("click", function () {
    if (indice > 1) {
      updateVelocity();
      enableAnimation = !enableAnimation;
      dx = dancer[dancerIndex][1].dX;
      dy = dancer[dancerIndex][1].dY;
      x = dancer[dancerIndex][0].xStart;
      y = dancer[dancerIndex][0].yStart;
      total_frames = 0;
      segmentoDibujado = 0;
      frame_number = 0;
    }
  });

document
  .getElementById("deleteLastMarker")
  .addEventListener("click", function () {
    deleteLastMarker();
  });

document
  .getElementById("createNewDancer")
  .addEventListener("click", function () {
    createNewDancer();
  });

document.getElementById("dancer-1").addEventListener("click", function () {
  switchDancer(1);
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

let total_frames = 0;

let enableAnimation = false;
let segmentoDibujado = 0;

let dancerIndex = 0;

// Rectangle image
var rectangle = new Image();
rectangle.src =
  "https://upload.wikimedia.org/wikipedia/commons/6/6b/A_sample_of_the_transparent_rectangle.svg";

var Marker = function () {
  this.XPos = 0;
  this.YPos = 0;
};

const Markers = new Array();

const dancer = new Array(new Array());

const BallPosition = new Array();

let MovementData = function () {
  this.xStart = 0;
  this.yStart = 0;
  this.dX = 0;
  this.dY = 0;
  this.velocity = 0;
  this.distance = 0;
  this.time = 0;
};

var mouseClicked = function (mouse) {
  // Get corrent mouse coords
  var rect = canvas.getBoundingClientRect();
  var mouseXPos = mouse.x - rect.left;
  var mouseYPos = mouse.y - rect.top;

  console.log("Marcador añadido");

  // Move the marker when placed to a better location
  var marker = new Marker();
  marker.XPos = mouseXPos;
  marker.YPos = mouseYPos;

  let movementData = new MovementData();

  indice++;
  Markers.push(marker);

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
    if (dancer[dancerIndex].length >= 1) {
      addDiv(dancerIndex);
    }

    //dx = (Markers[1].XPos-Markers[0].XPos)/50;
    //dy = (Markers[1].YPos-Markers[0].YPos)/50;
    x_end = Markers[1].XPos;
    y_end = Markers[1].YPos;
    distance = Math.sqrt(
      Math.pow(
        Markers[Markers.length - 1].XPos - Markers[Markers.length - 2].XPos,
        2
      ) +
        Math.pow(
          Markers[Markers.length - 1].YPos - Markers[Markers.length - 2].YPos,
          2
        )
    );

    time = distance / velocity;
    if (dancer[dancerIndex][dancer[dancerIndex].length - 1]) {
      dx =
        (Markers[Markers.length - 1].XPos -
          dancer[dancerIndex][dancer[dancerIndex].length - 1].xStart) /
        time;
      dy =
        (Markers[Markers.length - 1].YPos -
          dancer[dancerIndex][dancer[dancerIndex].length - 1].yStart) /
        time;
    } else {
      dx = 1;
      dy = 1;
    }

    frames = time;
  }
  movementData.distance = distance;
  movementData.dX = dx;
  movementData.dY = dy;
  movementData.velocity = velocity;
  movementData.time = time;
  BallPosition[BallPosition.length] = movementData;
  dancer[dancerIndex][dancer[dancerIndex].length] = movementData;
  console.log(dancer);
};

// Add mouse click event listener to canvas
canvas.addEventListener("mousedown", mouseClicked, false);

var main = function () {
  draw();
};

function drawMarker(x, y, number, dancerIndex) {
  context.beginPath();
  context.arc(x, y, 15, 0, Math.PI * 2);
  context.fillStyle = dancerColors[dancerIndex];
  context.fill();
  context.fillStyle = "#000";
  context.font = "12px Arial";
  context.fillText(number.toString(), x - 4, y + 4);
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

  drawGrid(mainHeight.value, mainWidth.value);
  /*
  for (var i = 0; i < Markers.length - 1; i++) {
    if (Markers.length > 1) {
      drawLine(
        Markers[i].XPos,
        Markers[i].YPos,
        Markers[i + 1].XPos,
        Markers[i + 1].YPos
      );
    }
  }*/

  for (var i = 0; i < dancer.length; i++) {
    console.log("for inside", dancer.length);
    for (var j = 0; j < dancer[i].length - 1; j++) {
      if (dancer.length > 0) {
        drawLine(
          dancer[i][j].xStart,
          dancer[i][j].yStart,
          dancer[i][j + 1].xStart,
          dancer[i][j + 1].yStart
        );
      }
    }
  }
  /*
  for (var i = 0; i < Markers.length; i++) {
    var tempMarker = Markers[i];
    // Draw marker
    drawMarker(tempMarker.XPos, tempMarker.YPos, i + 1);
  }*/

  for (var i = 0; i < dancer.length; i++) {
    //console.log("for inside", dancer.length);
    for (var j = 0; j < dancer[i].length; j++) {
      if (dancer.length > 0) {
        drawMarker(dancer[i][j].xStart, dancer[i][j].yStart, j + 1, i);
      }
    }
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

  if (Markers.length >= 2 && enableAnimation) {
    //cambiar a "al pulsar botón"
    frame_number++;
    total_frames++;
    
    //console.log(frame_number);
    //drawLine(x_start,y_start,Markers[1].XPos,Markers[1].YPos)
    drawBall(x, y);
    if (frame_number > dancer[dancerIndex][segmentoDibujado + 1]?.time) {
      segmentoDibujado++;
      total_frames--;
      if (segmentoDibujado + 1 == dancer[dancerIndex].length) {
        enableAnimation = false;
        segmentoDibujado = 0;
        x = dancer[dancerIndex][0].xStart;
        y = dancer[dancerIndex][0].yStart;
        //
      }
      x = dancer[dancerIndex][segmentoDibujado].xStart;
      y = dancer[dancerIndex][segmentoDibujado].yStart;
      dx = dancer[dancerIndex][segmentoDibujado + 1].dX;
      dy = dancer[dancerIndex][segmentoDibujado + 1].dY;
      frame_number = 0;
    }
    x += dx;
    y += dy;
    document.getElementById("beats").innerHTML = total_frames;
  }

  // dancer
  /*
  if (enableAnimation) {
    //console.log(frame_number);
    for (var i = 0; i < dancer.length; i++) {
      frame_number++;
      drawBall(x[i], y[i]);
      console.log('indice dancer', i)
      if (frame_number > dancer[i][segmentoDibujado + 1]?.time) {
        segmentoDibujado++;
        if (segmentoDibujado + 1 == dancer[0].length) {
          enableAnimation = false;
          segmentoDibujado = 0;
          x[i] = dancer[i][0].xStart;
          y[i] = dancer[i][0].yStart;
        }
        x[i] = dancer[i][segmentoDibujado].xStart;
        y[i] = dancer[i][segmentoDibujado].yStart;
        dx[i] = dancer[i][segmentoDibujado + 1].dX;
        dy[i] = dancer[i][segmentoDibujado + 1].dY;
        frame_number = 0;
      }
      x[i] += dx[i];
      y[i] += dy[i];
    }
  }*/
};

setInterval(main, 1000 / 120); // Refresh 120 times a second
