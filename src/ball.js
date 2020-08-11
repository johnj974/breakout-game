export default class Ball
{
    constructor(game)
    {
        this.image = document.getElementById("img_ball");
        this.size = 16;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;
        this.speed = 
        {
            x : 4,
            y : 2,
        }
        this.position =
        {
            x : 10,
            y : 10,
        }
    }
    draw(context)
    {
         context.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);      // draws the ball at position 10x and 10y
    }
    update(deltaTime)
    {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        // if the ball hit wall on left or right of screen
        if(this.position.x + this.size > this.gameWidth || this.position.x < 0)     // this keeps the ball within our canvas on the x axis
        {
            this.speed.x = -this.speed.x;
        }

        // if the ball hits the top or bottom of the screen
        if(this.position.y + this.size > this.gameHeight || this.position.y < 0)     // this keeps the ball within our canvas on the y axis
        {
            this.speed.y = -this.speed.y;
        }

        // logic for collision between ball and paddle
        let bottomOfBall = this.position.y + this.size;
        let topOfPaddle = this.game.paddle.position.y;
        let leftSideOfPaddle = this.game.paddle.position.x;
        let rightSideOfPaddle = this.game.paddle.position.x + this.game.paddle.width;

        if (bottomOfBall >= topOfPaddle && this.position.x >= leftSideOfPaddle && this.position.x + this.size <= rightSideOfPaddle)
        {
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.size;
        }
    }
}