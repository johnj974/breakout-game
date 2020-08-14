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
        this.gamestate = GAMESTATE.MENU;
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.gameObjects = [];
        this.lives = 3;
        new InputHandler(this.paddle, this);
    }

    start()
    {
        if (this.gamestate !== GAMESTATE.MENU) return;
        let bricks = buildLevel(this, level1);
        this.gameObjects = [this.ball, this.paddle, ...bricks]

        this.gamestate = GAMESTATE.RUNNING;

    }

    update(deltaTime)
    {
        if(this.lives === 0)
        {
            this.gamestate = GAMESTATE.GAMEOVER
        }
        if(this.gamestate === GAMESTATE.PAUSED || this.gamestate === GAMESTATE.MENU || this.gamestate === GAMESTATE.GAMEOVER)
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

        if(this.gamestate == GAMESTATE.MENU)
        {
            context.rect(0, 0, this.gameWidth, this.gameHeight);
            context.fillStyle = "rgba(0,0,0,1)";
            context.fill();
            context.font = "30px Arial"
            context.fillStyle = "white"
            context.textAlign = "center"
            context.fillText("Press SPACEBAR To Start", this.gameWidth/2, this.gameHeight/2)
        }

         if(this.gamestate == GAMESTATE.GAMEOVER)
        {
            context.rect(0, 0, this.gameWidth, this.gameHeight);
            context.fillStyle = "rgba(0,0,0,1)";
            context.fill();
            context.font = "30px Arial"
            context.fillStyle = "white"
            context.textAlign = "center"
            context.fillText("GAME OVER", this.gameWidth/2, this.gameHeight/2)
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
 