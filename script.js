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
