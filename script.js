console.log(`script.js`);

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const sliderHightCanvas = document.getElementById("sliderHightCanvas");
const sliderScaleImage = document.getElementById("sliderScaleImage");
const imageInput = document.getElementById("imageInput");
const colorPicker = document.getElementById("colorPicker");
const sliderHightGradient = document.getElementById("sliderHightGradient");
const textAreaTitle = document.getElementById("textAreaTitle");
const textAreaText = document.getElementById("textAreaText");
const textAreaSign = document.getElementById("textAreaSign");
const colorText = document.getElementById("colorText");
const colorSign = document.getElementById("colorSign");
const downloadButton = document.getElementById("downloadButton");

const BASE_CANVAS_HIGHT = 1920;

const H_LINE_TITLE = 880; //уровень названия
const W_LINE_TEXT = 110;
const H_LINE_SIGN = -130; //уровень подписи (от низа)

let H_GRAD = parseInt(sliderHightGradient.value); //размер градиента
let RGB_GRAD = [0, 0, 0]; //цвет градиента

let X_IMG = 0; //положение картинки
let Y_IMG = 0; //положение картинки
let NAT_H_IMG = 200;
let NAT_W_IMG = 500;
let H_IMG = 200;
let W_IMG = 500;
let SCALE_IMG = parseFloat(sliderScaleImage.value); //масштаб картинки

let IS_DRAG = false;
let X_DOWN = 0;
let Y_DOWN = 0;
let X_BIMG = 0;
let Y_BIMG = 0;

let TEXT_TITLE = textAreaTitle.value;
let TEXT_TEXT = textAreaText.value;
let TEXT_SIGN = textAreaSign.value;

let COLOR_TEXT = colorText.value;
let COLOR_SIGN = colorSign.value;

let IMG = new Image();
IMG.src = "./images/image_poetry.png";

let IMG_LIKE = new Image();
IMG_LIKE.src = "./images/img-like-dislike.png";
let SCALE_IMG_LIKE = 0.17;

document.fonts.ready.then(() => {
  //console.log("Шрифты загружены");
  updateCanvas();
});

IMG.onload = () => {
  NAT_W_IMG = IMG.naturalWidth;
  NAT_H_IMG = IMG.naturalHeight;
  W_IMG = NAT_W_IMG * SCALE_IMG;
  H_IMG = NAT_H_IMG * SCALE_IMG;

  updateCanvas();
};

IMG_LIKE.onload = () => {
  updateCanvas();
};

function clearCanvas(ctx) {
  ctx.fillStyle = "#4CAF50";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function updateCanvas() {
  clearCanvas(ctx);

  drawImage(ctx, IMG);

  drawGradient(ctx, [canvas.width, canvas.height], RGB_GRAD, H_GRAD);

  drawTitle(ctx, W_LINE_TEXT, H_LINE_TITLE - 90, 100, COLOR_TEXT, TEXT_TITLE);
  drawText(ctx, W_LINE_TEXT, H_LINE_TITLE - 50, 55, COLOR_TEXT, TEXT_TEXT);

  drawSign(
    ctx,
    W_LINE_TEXT,
    canvas.height + H_LINE_SIGN,
    55,
    COLOR_SIGN,
    TEXT_SIGN
  );
  drawColoredIMG(
    ctx,
    canvas.width - 380,
    canvas.height + H_LINE_SIGN - 90,
    SCALE_IMG_LIKE,
    COLOR_SIGN,
    IMG_LIKE
  ); /* */

  drawRoundedRect(ctx, [canvas.width, canvas.height], 20, 25);
}

function downloadCanvas() {
  var imageURL = canvas.toDataURL("image/png");

  var link = document.createElement("a");
  link.href = imageURL;
  link.download = TEXT_TITLE + ".png";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function test(ctx, color) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawColoredIMG(ctx, x, y, scale, color, img) {
  const tempCanvas = document.createElement("canvas");
  const tempCtx = tempCanvas.getContext("2d");

  tempCanvas.width = img.width;
  tempCanvas.height = img.height;

  tempCtx.drawImage(img, 0, 0);

  tempCtx.globalCompositeOperation = "source-in";
  tempCtx.fillStyle = color;
  tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

  ctx.drawImage(tempCanvas, x, y, img.width * scale, img.height * scale);
}

function drawTitle(ctx, x, y, lineHeight, color, text) {
  const lines = text.split("\n");
  const len = lines.length;
  ctx.font = '110px "Seravek-Bold"';
  ctx.fillStyle = color;
  lines.forEach((line, index) => {
    ctx.fillText(line, x, y + (index - len) * lineHeight);
  });
}

function drawText(ctx, x, y, lineHeight, color, text) {
  const lines = text.split("\n");

  ctx.font = '40px "Menlo-Regular"';
  ctx.fillStyle = color;
  lines.forEach((line, index) => {
    ctx.fillText(line, x, y + index * lineHeight);
  });
}

function drawSign(ctx, x, y, lineHeight, color, text) {
  const lines = text.split("\n");
  const len = lines.length;
  ctx.font = '40px "Seravek-Bold"';
  ctx.fillStyle = color;
  lines.forEach((line, index) => {
    ctx.fillText(line, x, y + (index - len / 2) * lineHeight);
  });
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

function hexToRgb(hex) {
  hex = hex.replace("#", "");
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

document.getElementById("toggleButton").addEventListener("click", () => {
  const sidebar = document.getElementById("sidebar");
  if (sidebar.style.right === "0px") {
    sidebar.style.right = "-250px";
  } else {
    sidebar.style.right = "0px";
  }
});

downloadButton.addEventListener("click", () => {
  downloadCanvas();
});

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
  document.fonts.ready.then(() => {
    //console.log("Шрифты загружены");
    updateCanvas();
  });
  updateCanvas();
});

sliderScaleImage.addEventListener("input", (event) => {
  SCALE_IMG = parseFloat(event.target.value);
  W_IMG = NAT_W_IMG * SCALE_IMG;
  H_IMG = NAT_H_IMG * SCALE_IMG;
  updateCanvas();
});

imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        IMG = img;
        NAT_W_IMG = IMG.naturalWidth;
        NAT_H_IMG = IMG.naturalHeight;
        W_IMG = NAT_W_IMG * SCALE_IMG;
        H_IMG = NAT_H_IMG * SCALE_IMG;
        updateCanvas();
      };

      img.onerror = () => {
        console.error("Ошибка при загрузке изображения");
      };
    };

    reader.readAsDataURL(file); // Конвертируем файл в base64 строку
  } else {
    console.error("Выбран файл не является изображением");
  }
  updateCanvas();
});

sliderHightGradient.addEventListener("input", (event) => {
  H_GRAD = parseInt(event.target.value);
  updateCanvas();
});

colorPicker.addEventListener("input", (event) => {
  hexColor = event.target.value;
  let rgb = hexToRgb(hexColor);
  RGB_GRAD = [rgb.r, rgb.g, rgb.b];
  updateCanvas();
  //console.log('Выбранный цвет:', currentColor);
});

textAreaTitle.addEventListener("input", () => {
  TEXT_TITLE = textAreaTitle.value;
  updateCanvas();
});

textAreaText.addEventListener("input", () => {
  TEXT_TEXT = textAreaText.value;
  updateCanvas();
});

textAreaSign.addEventListener("input", () => {
  TEXT_SIGN = textAreaSign.value;
  updateCanvas();
});

colorText.addEventListener("input", (event) => {
  COLOR_TEXT = event.target.value;
  updateCanvas();
});

colorSign.addEventListener("input", (event) => {
  COLOR_SIGN = event.target.value;
  updateCanvas();
});
