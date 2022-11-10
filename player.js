class player{
    playersconstuctor(){
        this.x = (0.2*size)*1.25;
        this.y = size*1.25;
        this.playersize = size/2;
        this.direction = "+x"
        this.speed = Math.round(size/15);
        this.colour = ('#FFFFFF')
        this.lives = 3;
        this.dead = false;

    }
    edgedetection(){
        if(this.x < 0){
            this.wallmove();
        }
        if(this.x + this.playersize + 2> screenSize){
            this.wallmove();
        }
    }
    wallmove(){
        if(this.direction === "+x"){
            this.x -= this.speed;
        }
        if(this.direction === "-x"){
            this.x += this.speed;
        }
        if(this.direction === "+y"){
            this.y -= this.speed;
        }
        if(this.direction === "-y"){
            this.y += this.speed;
        }
    }


    walldetection(){
        let xbox;
        let ybox;
        //bottom right
        xbox = Math.round(this.y / size);
        ybox = Math.round(this.x / size);

        if(maze[xbox][ybox] === 0){
            this.wallmove();
        }
        //top right
        xbox = Math.round((this.y - this.playersize)/ size);
        ybox = Math.round(this.x / size);

        if(maze[xbox][ybox] === 0){
            this.wallmove();
        }
        //bottom left
        xbox = Math.round((this.y/ size));
        ybox = Math.round((this.x - this.playersize) / size);

        if(maze[xbox][ybox] === 0){
            this.wallmove();
        }
        //top left
        xbox = Math.round((this.y - this.playersize)/ size);
        ybox = Math.round((this.x - this.playersize) / size);

        if(maze[xbox][ybox] === 0){
            this.wallmove();
        }

    }
    finishedMaze(){


        if((Math.round(this.x / size) === (maze.length-1))){
            mazecounter++
            mazeSize +=2

            setup();
            return true;
        }
        else{ return false}
    }
    move(){

        if (keyIsPressed) {
            if (keyCode === RIGHT_ARROW) {
                this.direction = "+x"
                this.x +=this.speed;
                return;
            }
            if (keyCode === LEFT_ARROW) {
                this.direction = "-x"
                this.x -= this.speed;
                return;
            }
            if (keyCode === UP_ARROW) {
                this.direction = "-y"
                this.y -= this.speed;
                return;
            }
            if (keyCode === DOWN_ARROW) {
                this.direction = "+y"
                this.y +=this.speed;

            }
        }
    }

    display(){
        stroke(0);
        fill(this.colour);
        rect(this.x, this.y, this.playersize, this.playersize, 3,3,3,3)
    }

}