const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const H_LINE_TITLE = 500; //уровень названия

document.getElementById("toggleButton").addEventListener("click", () => {
  const sidebar = document.getElementById("sidebar");
  if (sidebar.style.right === "0px") {
    sidebar.style.right = "-250px";
  } else {
    sidebar.style.right = "0px";
  }
});

// Заливаем весь канвас цветом
ctx.fillStyle = "#4CAF50";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Рисуем текст в центре
ctx.fillStyle = "white";
ctx.font = "100px Arial";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText("Hello Canvas!", canvas.width / 2, canvas.height / 2);

drawGradient(ctx, [canvas.width, canvas.height], [255, 128, 50], 250);
drawRoundedRect(ctx, [canvas.width, canvas.height], 30, 30);

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
