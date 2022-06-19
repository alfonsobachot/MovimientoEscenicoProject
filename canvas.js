var canvas = document.getElementById("Canvas");
var context = canvas.getContext("2d");

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

var accept = document.getElementById("accept");

var mainHeight = document.getElementById("mainHeight");
var mainWidth = document.getElementById("mainWidth");
let mainBPM = document.getElementById("mainBPM");

mainHeight.value = "5";
mainWidth.value = "10";
mainBPM.value = "60";

var button = [];
var inputVelocity = [];
var wrapperVelocity = [];

span.onclick = function () {
  modal.style.display = "none";
};

accept.onclick = function () {
  bpmRatio = mainBPM.value / 60;
  drawGrid(mainHeight.value, mainWidth.value);
  modal.style.display = "none";
};

const MAX_WIDTH = 960;

canvas.width = 960;
canvas.height = 480;
canvas.style.height = 480;

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
  inputVelocity[indice].value = 8;
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
    newDancer.setAttribute("id", "dancer-" + (dancerIndex + 1));
    newDancer.setAttribute("class", "dancer");
    newDancer.innerHTML = "Performer " + (dancerIndex + 1);
    document.getElementById("footer-dancer").appendChild(newDancer);
    document
      .getElementById("dancer-" + (dancerIndex + 1))
      .addEventListener("click", function () {
        let id = parseInt(this.id.split("-")[1]);
        switchDancer(id);
      });
    dancer.push([]);
  }
};

const deleteLastMarker = function () {
  let divToRemove = document.getElementsByClassName(
    "wrapperVelocity-" + dancerIndex
  );
  divToRemove[divToRemove.length - 1]?.remove();
  dancer[dancerIndex].pop();
};

const updateVelocity = function () {
  var arrayVelocity = document.getElementsByName(
    "inputVelocity-" + dancerIndex
  );
  for (i = 0; i < arrayVelocity.length; i++) {
    let oldVelocity = dancer[dancerIndex][i + 1].velocity;
    let oldDistance = dancer[dancerIndex][i + 1].distance;
    let newVelocity = oldDistance / arrayVelocity[i].value / (60 / bpmRatio);
    let velocityRatio = newVelocity / oldVelocity;
    dancer[dancerIndex][i + 1].velocity = newVelocity;
    dancer[dancerIndex][i + 1].time = (arrayVelocity[i].value * 60) / bpmRatio;
    dancer[dancerIndex][i + 1].dX =
      dancer[dancerIndex][i + 1].dX * velocityRatio;
    dancer[dancerIndex][i + 1].dY =
      dancer[dancerIndex][i + 1].dY * velocityRatio;
  }
};

const drawScenario = function (height, width) {
  let buttonWrapper = document.getElementById("buttonWrapper");
  let pixelMetro = MAX_WIDTH / width;
  canvas.height = pixelMetro * height;
  buttonWrapper.style.height = pixelMetro * height + 24 + "px";
};

const drawGrid = function (height, width) {
  let pixelMetro = MAX_WIDTH / width;
  context.beginPath();
  context.setLineDash([]);
  context.moveTo(0.5, 0.5);
  context.lineTo(0.5, pixelMetro * height - 0.5);
  context.stroke();
  context.beginPath();
  context.setLineDash([]);
  context.moveTo(0.5, pixelMetro * height - 0.5);
  context.lineTo(pixelMetro * width - 0.5, pixelMetro * height - 0.5);
  context.stroke();
  context.beginPath();
  context.setLineDash([]);
  context.moveTo(0.5, 0.5);
  context.lineTo(pixelMetro * width - 0.5, 0.5);
  context.stroke();
  context.beginPath();
  context.setLineDash([]);
  context.moveTo(pixelMetro * width - 0.5, 0.5);
  context.lineTo(pixelMetro * width - 0.5, pixelMetro * height - 0.5);
  context.stroke();
  for (i = 1; i < width; i++) {
    context.beginPath();
    context.setLineDash([]);
    context.moveTo((960 * i) / width, 0);
    context.lineTo((960 * i) / width, pixelMetro * height);
    context.stroke();
  }
  for (i = 1; i < height; i++) {
    context.beginPath();
    context.setLineDash([]);
    context.moveTo(0, (pixelMetro * height * i) / height);
    context.lineTo(960, (pixelMetro * height * i) / height);
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
      bpmTotal = 0;
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
let bpmTotal = 0;
let bpmRatio = mainBPM.value / 60;

let enableAnimation = false;
let segmentoDibujado = 0;

let dancerIndex = 0;

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

  // Move the marker when placed to a better location
  var marker = new Marker();
  marker.XPos = mouseXPos;
  marker.YPos = mouseYPos;

  let movementData = new MovementData();

  indice++;
  Markers.push(marker);

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

  drawScenario(mainHeight.value, mainWidth.value);
  drawGrid(mainHeight.value, mainWidth.value);

  for (var i = 0; i < dancer.length; i++) {
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

  for (var i = 0; i < dancer.length; i++) {
    for (var j = 0; j < dancer[i].length; j++) {
      if (dancer.length > 0) {
        drawMarker(dancer[i][j].xStart, dancer[i][j].yStart, j + 1, i);
      }
    }
  }

  if (Markers.length >= 2 && enableAnimation) {
    frame_number++;
    total_frames++;
    if (total_frames === 60 / bpmRatio) {
      bpmTotal++;
      total_frames = 0;
    }

    drawBall(x, y);
    if (frame_number > dancer[dancerIndex][segmentoDibujado + 1]?.time) {
      segmentoDibujado++;
      total_frames--;
      if (segmentoDibujado + 1 == dancer[dancerIndex].length) {
        enableAnimation = false;
        segmentoDibujado = 0;
        x = dancer[dancerIndex][0].xStart;
        y = dancer[dancerIndex][0].yStart;
      }
      x = dancer[dancerIndex][segmentoDibujado].xStart;
      y = dancer[dancerIndex][segmentoDibujado].yStart;
      dx = dancer[dancerIndex][segmentoDibujado + 1].dX;
      dy = dancer[dancerIndex][segmentoDibujado + 1].dY;
      frame_number = 0;
    }
    x += dx;
    y += dy;
    document.getElementById("beats").innerHTML = bpmTotal;
  }
};

setInterval(main, 1000 / 59); // Refresh 120 times a second
