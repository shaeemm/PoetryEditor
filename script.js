const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Заливаем весь канвас цветом
ctx.fillStyle = "#4CAF50";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Рисуем текст в центре
ctx.fillStyle = "white";
ctx.font = "200px Arial";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText("Hello Canvas!", canvas.width / 2, canvas.height / 2);
