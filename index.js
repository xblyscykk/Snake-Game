var blocksize = 25;
var rows = 20;
var cols = 20;
var board;
var context;
let i;
var points = 0;

//position of the snake
var snakeX = 5 * blocksize;
var snakeY = 5 * blocksize;

//position of the food
var foodX;
var foodY;

//speed of the snake
var velocityX = 0;
var velocityY = 0;

//body of the snake
var snakeBody = [];


var CurrentDirection;

window.onload = function(){

    board = document.getElementById("board");
    board.width = cols*blocksize;
    board.height = rows*blocksize;
    context = board.getContext("2d"); // <-- used for drawing

    document.addEventListener("keyup", keys); // <-- we will use this to move the snake
    SpawnFood(); // call only once to spawn the first food
    setInterval(update, 1000/10); // refresh the board every 10 fps
}


function update(){


    if (CurrentDirection == "UP"){
        velocityY = -1;
        velocityX = 0;
    }
    else if (CurrentDirection == "DOWN"){
        velocityY = 1;
        velocityX = 0;
    }
    else if (CurrentDirection == "RIGHT"){
        velocityY = 0;
        velocityX = 1;
    }
    else if (CurrentDirection == "LEFT"){
        velocityY = 0;
        velocityX = -1;
    }
    //board
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    //food
    context.fillStyle = "green";
    context.fillRect(foodX, foodY, blocksize, blocksize);
    
    for (i = snakeBody.length-1; i > 0; i--){ // this fixes the trail issue
        snakeBody[i] = snakeBody[i-1];
    }

    if (snakeBody.length){ // increasing the body length
        snakeBody[0] = [snakeX, snakeY];
    }

    for (i = 0; i < snakeBody.length; i++){ // this adds body to the snake however, the trail is left behind so we need to fix it
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blocksize, blocksize);
    }

    if (snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY]); // basically push food into the body of the snake
        SpawnFood(); // spawn new food when we colide with the snake
        points++;
        document.getElementById("points").innerHTML = `Points: ${points}`;
    }
    
    //snake
    context.fillStyle = "yellow";
    context.fillRect(snakeX, snakeY, blocksize, blocksize);
    //add velocity to the snake position
    snakeX += velocityX * blocksize; // multiply by blocksize so it moves along with the grid
    snakeY += velocityY * blocksize;


    for (i = 0; i < snakeBody.length; i++){ // this triggers a game over when the snake colides with its tail
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            alert("Game Over!");
        }
    }

    if (snakeX < 0 || snakeX > cols*blocksize || snakeY < 0 || snakeY > rows*blocksize){
        alert("Game Over!");
    }



}


function keys(e){ //function from the event listener

    if (e.code == "ArrowUp" && velocityY != 1){ // we will add this to avoid conflicts with the position of the snake
        CurrentDirection = "UP";
    }
    else if (e.code == "ArrowDown" && velocityY != -1){
        CurrentDirection = "DOWN";
    }
    else if (e.code == "ArrowRight" && velocityX != -1){
        CurrentDirection = "RIGHT";
    }
    else if (e.code == "ArrowLeft" && velocityX != 1){
        CurrentDirection = "LEFT";
    }
}

function SpawnFood(){
    // this function will spawn food randomly
    foodX = Math.floor(Math.random() * cols) * blocksize;
    foodY = Math.floor(Math.random() * rows) * blocksize;

}