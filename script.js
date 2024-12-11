const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const sliderHightCanvas = document.getElementById("sliderHightCanvas");

const BASE_CANVAS_HIGHT = 1920;

const H_LINE_TITLE = 500; //уровень названия
let H_GRAD = 250; //размер градиента
let RGB_GRAD = [50, 50, 50]; //цвет градиента

let X_IMG = 0;
let Y_IMG = 0;
let H_IMG = 200;
let W_IMG = 500;

let IS_DRAG = false;
let X_DOWN = 0;
let Y_DOWN = 0;
let X_BIMG = 0;
let Y_BIMG = 0;

document.getElementById("toggleButton").addEventListener("click", () => {
  const sidebar = document.getElementById("sidebar");
  if (sidebar.style.right === "0px") {
    sidebar.style.right = "-250px";
  } else {
    sidebar.style.right = "0px";
  }
});

const img = new Image();
img.src = "./images/image_poetry.png";

img.onload = () => {
  updateCanvas();
};

function clearCanvas(ctx) {
  ctx.fillStyle = "#4CAF50";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function updateCanvas() {
  clearCanvas(ctx);
  drawImage(ctx, img);
  drawGradient(ctx, [canvas.width, canvas.height], RGB_GRAD, H_GRAD);
  drawRoundedRect(ctx, [canvas.width, canvas.height], 30, 30);
}

function drawImage(ctx, img) {
  ctx.drawImage(img, X_IMG, Y_IMG, W_IMG, H_IMG);
}

function drawGradient(ctx, canvSize, RGB, H) {
  [R, G, B] = RGB;
  [width, height] = canvSize;

  const gradient = ctx.createLinearGradient(
    0,
    H_LINE_TITLE,
    0,
    H_LINE_TITLE - H
  );
  gradient.addColorStop(0, `rgb(${R},${G},${B},1)`);
  gradient.addColorStop(1, `rgb(${R},${G},${B},0)`);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

function drawRoundedRect(ctx, canvSize, radius, strokeWidth) {
  let x = 0;
  let y = 0;
  [width, height] = canvSize;
  let rad = radius + strokeWidth;

  ctx.beginPath();
  ctx.lineWidth = 2 * strokeWidth;
  ctx.strokeStyle = "white";
  ctx.moveTo(x + rad, y);
  ctx.arcTo(x + width, y, x + width, y + height, rad); // Верхний правый угол
  ctx.arcTo(x + width, y + height, x, y + height, rad); // Нижний правый угол
  ctx.arcTo(x, y + height, x, y, rad); // Нижний левый угол
  ctx.arcTo(x, y, x + width, y, rad); // Верхний левый угол
  ctx.stroke();
}

// Функция для обработки координат
function getCoordinates(event) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  let clientX, clientY;

  if (event.touches) {
    const touch = event.touches[0];
    clientX = touch.clientX;
    clientY = touch.clientY;
  } else {
    clientX = event.clientX;
    clientY = event.clientY;
  }

  const x = (clientX - rect.left) * scaleX;
  const y = (clientY - rect.top) * scaleY;

  return { x, y };
}

// Обработчики событий
canvas.addEventListener("mousemove", (event) => {
  const coords = getCoordinates(event);
  if (IS_DRAG) {
    //console.log("Mouse move:", coords);
    //console.log(`X_BIMG = ${X_BIMG}, Y_BIMG = ${Y_BIMG}`);
    //console.log(`X_DOWN = ${X_DOWN}, Y_DOWN = ${Y_DOWN}`);
    X_IMG = X_BIMG + coords.x - X_DOWN;
    Y_IMG = Y_BIMG + coords.y - Y_DOWN;
    updateCanvas();
  }
});

canvas.addEventListener("mousedown", (event) => {
  const coords = getCoordinates(event);

  if (
    coords.x - X_IMG > 0 &&
    coords.x - X_IMG < W_IMG &&
    coords.y - Y_IMG > 0 &&
    coords.y - Y_IMG < H_IMG
  ) {
    X_BIMG = X_IMG;
    Y_BIMG = Y_IMG;
    X_DOWN = coords.x;
    Y_DOWN = coords.y;
    IS_DRAG = true;

    //console.log("Mouse down:", coords);
    //console.log(`X_BIMG = ${X_BIMG}, Y_BIMG = ${Y_BIMG}`);
    //console.log(`X_DOWN = ${X_DOWN}, Y_DOWN = ${Y_DOWN}`);
  }
});

canvas.addEventListener("mouseup", (event) => {
  const coords = getCoordinates(event);
  IS_DRAG = false;
  //console.log("Mouse up:", coords);
  //console.log(`X_IMG = ${X_IMG}, Y_IMG = ${Y_IMG}`);
});

canvas.addEventListener("touchstart", (event) => {
  const coords = getCoordinates(event);
  if (
    coords.x - X_IMG > 0 &&
    coords.x - X_IMG < W_IMG &&
    coords.y - Y_IMG > 0 &&
    coords.y - Y_IMG < H_IMG
  ) {
    X_BIMG = X_IMG;
    Y_BIMG = Y_IMG;
    X_DOWN = coords.x;
    Y_DOWN = coords.y;
    IS_DRAG = true;

    //console.log("Touch start:", coords);
    //console.log(`X_BIMG = ${X_BIMG}, Y_BIMG = ${Y_BIMG}`);
    //console.log(`X_DOWN = ${X_DOWN}, Y_DOWN = ${Y_DOWN}`);
  }
});

canvas.addEventListener("touchmove", (event) => {
  const coords = getCoordinates(event);
  if (IS_DRAG) {
    //console.log("Touch move:", coords);
    //console.log(`X_BIMG = ${X_BIMG}, Y_BIMG = ${Y_BIMG}`);
    //console.log(`X_DOWN = ${X_DOWN}, Y_DOWN = ${Y_DOWN}`);
    X_IMG = X_BIMG + coords.x - X_DOWN;
    Y_IMG = Y_BIMG + coords.y - Y_DOWN;
    updateCanvas();
  }
});

canvas.addEventListener("touchend", (event) => {
  IS_DRAG = false;
  console.log("Touch end");
});

sliderHightCanvas.addEventListener("input", (event) => {
  canvas.height = parseInt(event.target.value) + parseInt(BASE_CANVAS_HIGHT);
  updateCanvas();
});
