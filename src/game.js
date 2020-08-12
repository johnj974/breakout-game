import Paddle from '/src/paddle.js';
import InputHandler from '/src/input.js';
import Ball from '/src/ball.js';
import Brick from "/src/brick.js";
import {buildLevel, level1} from "/src/level.js"

const GAMESTATE = 
{
    PAUSED : 0,
    RUNNING : 1,
    MENU : 2,
    GAMEOVER : 3
}


export default class Game
{
    constructor(gameWidth, gameHeight)
    {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }

    start()
    {
        this.gamestate = GAMESTATE.RUNNING;
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        let bricks = buildLevel(this, level1);
       
        this.gameObjects = [this.ball, this.paddle, ...bricks]

        // adding the input handler function here
        new InputHandler(this.paddle, this);
    }

    update(deltaTime)
    {
        if(this.gamestate == GAMESTATE.PAUSED)
        {
            return;
        }
        this.gameObjects.forEach(object => object.update(deltaTime))  // this updates the objects in our gameObjects array
        this.gameObjects = this.gameObjects.filter(object => !object.markedForDeletion)
    }

    draw(context)
    {
        this.gameObjects.forEach(object => object.draw(context))    // this draws the objects in our gameObjects array
        if(this.gamestate == GAMESTATE.PAUSED)
        {
            context.rect(0, 0, this.gameWidth, this.gameHeight);
            context.fillStyle = "rgba(0,0,0,0.5)";
            context.fill();
            context.font = "30px Arial"
            context.fillStyle = "white"
            context.textAlign = "center"
            context.fillText("Paused", this.gameWidth/2, this.gameHeight/2)
        }
    }

    togglePause()
    {
        if(this.gamestate == GAMESTATE.PAUSED)
        {
            this.gamestate = GAMESTATE.RUNNING;
        }
        else
        {
            this.gamestate = GAMESTATE.PAUSED;
        }
    }
}
 