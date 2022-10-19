class enemy extends player{
    playersconstuctor(x,y){
        super.playersconstuctor();
        //super(x);
        //super(y);
        this.direction = "+x";
        this.x = 7*size + size*0.25
        this.y = 7*size + size*0.25
        this.enemysize = size/2;
        this.colour = ('#FF4222')
    }

    enemymove(path, enemypos){
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
    DPS(position, end, maze) {
        maze = pickMaze(mazecounter);
        maze = swap(maze , cells);
        var queue = [];

        maze[position[0]][position[1]] = 1;
        queue.push([position]); // store a path, not just a position

        while (queue.length > 0) {
            var path = queue.shift(); // get the path out of the queue
            var pos = path[path.length-1]; // ... and then the last position from it
            var direction = [
                [pos[0] + 1, pos[1]],
                [pos[0], pos[1] + 1],
                [pos[0] - 1, pos[1]],
                [pos[0], pos[1] - 1]
            ];

            for (var i = 0; i < direction.length; i++) {
                // Perform this check first:
                if (direction[i][0] == end[0] && direction[i][1] == end[1]) {
                    // return the path that led to the find
                    return path.concat([end]);
                }

                if (direction[i][0] < 0 || direction[i][0] >= maze.length
                    || direction[i][1] < 0 || direction[i][1] >= maze[0].length
                    || maze[direction[i][0]][direction[i][1]] != 0) {
                    continue;
                }

                maze[direction[i][0]][direction[i][1]] = 1;
                // extend and push the path on the queue
                queue.push(path.concat([direction[i]]));
            }
        }
    }

}