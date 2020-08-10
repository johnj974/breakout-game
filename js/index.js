/*  example on how to draw a square on the canvas
context.fillStyle = "#f00"  // adding color to the square
context.fillRect(20, 20, 50, 50);  // start drawing at 20 on the x axis and 20 on the y axis a size 50 x 50
*/

import Paddle from '/js/paddle.js';
import InputHandler from '/js/input.js';
import Ball from '/js/ball.js';

// grabbing the gamescreen element and assigning it to a canvas variable
let canvas = document.getElementById("gameScreen");
// this allows me to draw onto the canvas
let context = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

// this clears the screen each time there is a change made to our canvas
context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);
paddle.draw(context);

let ball = new Ball(GAME_WIDTH, GAME_HEIGHT);

// adding the input handler function here
new InputHandler(paddle);


// The Game Loop
let lastTime = 0;

function gameLoop(timestamp)
{
   let deltaTime = timestamp - lastTime;    // calculation of passed time
   lastTime = timestamp;                    // re initialisation of lastTime variable
   context.clearRect(0, 0, 800, 600);       // clears the screen

   paddle.update(deltaTime);                // updates the paddle
   paddle.draw(context);                    // redraws the paddle

   ball.update(deltaTime)                   // updates the ball
   ball.draw(context);                      // draws the ball
   requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)             // this will include a timestamp

