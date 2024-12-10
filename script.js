const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

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

drawRoundedRect(ctx, [canvas.width, canvas.height], 30, 30);

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
