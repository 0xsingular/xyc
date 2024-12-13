const canvas = document.getElementById("commitCanvas");
const ctx = canvas.getContext("2d");
const commitCounter = document.getElementById("commitCounter");

function drawDot(x, y, color) {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2); // Draw a circle (dot)
    ctx.fillStyle = color;
    ctx.fill();
}

function generateDots(commitCount) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    for (let i = 0; i < commitCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random color
        drawDot(x, y, color);
    }
}

let commitCount = 0;
const socket = new WebSocket("ws://localhost:3000");

socket.onmessage = (event) => {
    commitCount = parseInt(event.data);
    commitCounter.innerText = commitCount;
    generateDots(commitCount);
};

socket.onopen = () => console.log("Connected to WebSocket");
socket.onerror = (error) => console.error("WebSocket Error:", error);
