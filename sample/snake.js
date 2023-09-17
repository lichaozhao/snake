// Set up the canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Set up the game variables
let snake = [{ x: 10, y: 10 }];
let food = { x: Math.floor(Math.random() * (canvasWidth / 10)) * 10, y: Math.floor(Math.random() * (canvasHeight / 10)) * 10 };
let direction = "right";
let score = 0;
let obstacles = [
    { x: 100, y: 100 },
    { x: 200, y: 200 },
    { x: 300, y: 300 }
];

// Set up the game loop
function gameLoop() {
    // Move the snake
    let head = { x: snake[0].x, y: snake[0].y };
    switch (direction) {
        case "up":
            head.y -= 10;
            break;
        case "down":
            head.y += 10;
            break;
        case "left":
            head.x -= 10;
            break;
        case "right":
            head.x += 10;
            break;
    }
    snake.unshift(head);

    // Check for collision with food
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = { x: Math.floor(Math.random() * (canvasWidth / 10)) * 10, y: Math.floor(Math.random() * (canvasHeight / 10)) * 10 };
    } else {
        snake.pop();
    }

    // Check for collision with walls or obstacles
    if (head.x < 0) {
        head.x = canvasWidth - 10;
    } else if (head.x >= canvasWidth) {
        head.x = 0;
    }
    if (head.y < 0) {
        head.y = canvasHeight - 10;
    } else if (head.y >= canvasHeight) {
        head.y = 0;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            clearInterval(intervalId);
            document.removeEventListener("keydown", handleKeyDown);
            alert("Game over! Press Enter to restart.");
            document.addEventListener("keydown", handleRestart);
        }
    }
    for (let i = 0; i < obstacles.length; i++) {
        if (head.x === obstacles[i].x && head.y === obstacles[i].y) {
            clearInterval(intervalId);
            document.removeEventListener("keydown", handleKeyDown);
            alert("Game over! Press Enter to restart.");
            document.addEventListener("keydown", handleRestart);
        }
    }

    // Draw the game
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "green";
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
    }
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 10, 10);
    ctx.fillStyle = "gray";
    for (let i = 0; i < obstacles.length; i++) {
        ctx.fillRect(obstacles[i].x, obstacles[i].y, 10, 10);
    }
    document.getElementById("score").innerHTML = `Score: ${score}`;
}

let intervalId = setInterval(gameLoop, 100);

// Set up the keyboard controls
function handleKeyDown(event) {
    switch (event.keyCode) {
        case 38: // up arrow
            if (direction !== "down") {
                direction = "up";
            }
            break;
        case 40: // down arrow
            if (direction !== "up") {
                direction = "down";
            }
            break;
        case 37: // left arrow
            if (direction !== "right") {
                direction = "left";
            }
            break;
        case 39: // right arrow
            if (direction !== "left") {
                direction = "right";
            }
            break;
    }
}
document.addEventListener("keydown", handleKeyDown);

// Handle game restart
function handleRestart(event) {
    if (event.keyCode === 13) { // Enter key
        location.reload();
    }
}

// Set up touch controls
let touchStartX = null;
let touchStartY = null;
document.addEventListener("touchstart", event => {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
    event.preventDefault();
});
document.addEventListener("touchmove", event => {
    if (touchStartX === null || touchStartY === null) {
        return;
    }
    let touchEndX = event.touches[0].clientX;
    let touchEndY = event.touches[0].clientY;
    let dx = touchEndX - touchStartX;
    let dy = touchEndY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0 && direction !== "left") {
            direction = "right";
        } else if (dx < 0 && direction !== "right") {
            direction = "left";
        }
    } else {
        if (dy > 0 && direction !== "up") {
            direction = "down";
        } else if (dy < 0 && direction !== "down") {
            direction = "up";
        }
    }
    touchStartX = null;
    touchStartY = null;
    event.preventDefault();
});


