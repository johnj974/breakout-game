import Paddle from '/src/paddle.js';
import InputHandler from '/src/input.js';
import Ball from '/src/ball.js';
import Brick from "/src/brick.js";


export default class Game
{
    constructor(gameWidth, gameHeight)
    {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }

    start()
    {
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        let bricks = []
        for (let i = 0; i < 10; i++)
        {
            bricks.push(new Brick(this, {x : i*52, y:30}));  
        }
        this.gameObjects = [this.ball, this.paddle, ...bricks]

        // adding the input handler function here
        new InputHandler(this.paddle);
    }

    update(deltaTime)
    {
       this.gameObjects.forEach(object => object.update(deltaTime))  // this updates the objects in our gameObjects array
    }

    draw(context)
    {
        this.gameObjects.forEach(object => object.draw(context))    // this draws the objects in our gameObjects array
    }
}
 