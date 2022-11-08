class enemy extends player{
    playersconstuctor(x,y){
        super.playersconstuctor();
        //super(x);
        //super(y);
        this.direction = "+x";
        this.x = 7*size + size*0.25
        this.y = 7*size + size*0.25
        this.colour = ('#FF4222')
    }

    enemymove(path){
        //circle(this.x , this.y ,10)
        let nextY = (path[1][0] * size) + size/2;
        let nextX = path[1][1] * size + size/2;
        if(this.x + p.playersize/2 < nextX){
            this.x+= 1
            this.direction = "+x"
        }
        if(this.x + p.playersize/2 > nextX){
            this.x-= 1
            this.direction = "-x"
        }

        if(this.y + p.playersize/2 < nextY){
            this.y+= 1
            this.direction = "+y"
        }
        if(this.y + p.playersize/2 > nextY){
            this.y-= 1
            this.direction = "-y"
        }


    }
    BFS() {
        this.playerpos = [0, 0]
        this.enemypos = [0, 0]
        this.CurrentMaze = [0][0]

        this.playerpos[0] = Math.round(p.y / size)
        this.playerpos[1] = Math.round(p.x / size)

        this.enemypos[0] = Math.round(this.y / size)
        this.enemypos[1] = Math.round(this.x / size)


        this.CurrentMaze = pickMaze(mazecounter)
        //console.table(this.CurrentMaze)
        this.CurrentMaze = this.Swap()
        //console.table(this.CurrentMaze)
        let queue = [];

        this.CurrentMaze[this.enemypos[0]][this.enemypos[1]] = 1;
        queue.push([this.enemypos]); // store a path, not just a position
        //console.table(maze1.maze)
        while (queue.length > 0) {
            //console.table(this.CurrentMaze)
            let path = queue.shift(); // get the path out of the queue
            let pos = path[path.length - 1]; // ... and then the last position from it
            let direction = [
                [pos[0] + 1, pos[1]],
                [pos[0], pos[1] + 1],
                [pos[0] - 1, pos[1]],
                [pos[0], pos[1] - 1]
            ];

            for (let i = 0; i < direction.length; i++) {
                // Perform this check first:
                if (direction[i][0] === this.playerpos[0] && direction[i][1] === this.playerpos[1]) {
                    // return the path that led to the find
                    //console.table(maze1.maze);
                    return path.concat([this.playerpos]);
                }

                if (direction[i][0] < 0 || direction[i][0] >= this.CurrentMaze.length
                    || direction[i][1] < 0 || direction[i][1] >= this.CurrentMaze[0].length
                    || this.CurrentMaze[direction[i][0]][direction[i][1]] !== 0) {
                    continue;
                }

                this.CurrentMaze[direction[i][0]][direction[i][1]] = 1;
                // extend and push the path on the queue
                queue.push(path.concat([direction[i]]));
            }
        }
    }
    Swap(){
        for(var i =0 ; i < cells ; i++){
            for(var j =0 ; j < cells ; j++){
                if(this.CurrentMaze[i][j] === 0){
                    this.CurrentMaze[i][j] = 6;
                }
            }
        }

        for(var k =0 ; k < cells ; k++){
            for(var l =0 ; l < cells ; l++){
                if(this.CurrentMaze[k][l] === 1){
                    this.CurrentMaze[k][l] = 0;
                }
            }
        }

        for(var m =0 ; m < cells ; m++){
            for(var n =0 ; n < cells ; n++){
                if(this.CurrentMaze[m][n] === 6){
                    this.CurrentMaze[m][n] = 1;
                }
            }
        }
        return this.CurrentMaze;
    }


}