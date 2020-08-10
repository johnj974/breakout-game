export default class Paddle
{
    constructor(gameWidth, gameHeight)
    {
        this.width = 150;
        this.height = 20;
        this.gameWidth = gameWidth;
        this.maxSpeed = 7;      // sets paddle maxspeed
        this.speed = 0;         // sets initial speed of paddle
        this.position = 
        {
            x: gameWidth / 2 - this.width / 2,
            y: gameHeight - this.height -10,
        }
    }

    moveLeft()
    {
        this.speed = -this.maxSpeed;
    }

    moveRight()
    {
        this.speed = this.maxSpeed;
    }

    stop()
    {
        this.speed = 0;
    }

    draw(context)
    {
        context.fillStyle = "#0f0";
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update(deltaTime)
    {
        this.position.x += this.speed;
        if(this.position.x < 0) this.position.x = 0;      // stops the paddle from running of the canvas on the left side
        if(this.position.x + this.width > this.gameWidth) this.position.x = this.gameWidth - this.width;
    }

}