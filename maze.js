class MazeGen {
    constructor(size) {

        this.size = size
        this.maze = new Array(this.size);

        for (let i = 0; i < this.maze.length; i++) {
            this.maze[i] = new Array(this.size);
            for (let j = 0; j < this.maze.length; j++) {
                this.maze[i][j] = 0
            }

        }

        this.maze = this.PrimsAlgorithm()
        this.maze = this.MakeIntoGraph()
        this.maze[1][0] = 3;
        this.maze[this.maze.length - 2][this.maze.length - 1] = 2;

    }


    PrimsAlgorithm() {
        this.frontAvailable = [0, 0, 0, 0];
        this.currentCell = [1, 1];
        while (this.Complete(this.maze, this.size) === false) {
            //Console.WriteLine("Maze is not ready");

            this.maze[this.currentCell[0]][this.currentCell[1]] = 1;
            this.frontAvailable = this.Frontier(this.maze, this.currentCell);
            //While the list of frontier cells is not empty
            while (this.frontAvailable[0] !== 0 || this.frontAvailable[1] !== 0 || this.frontAvailable[2] !== 0 || this.frontAvailable[3] !== 0) {
                //pick a random way
                this.picked = false;
                this.numSelected = 5;
                while (this.picked === false) {

                    this.numSelected = Math.floor(Math.random() * 5);
                    if (this.frontAvailable[this.numSelected] === 1) {
                        this.picked = true;
                    }
                }
                //'Move to cell'
                this.maze = this.MoveSquare();
                this.frontAvailable = this.Frontier();
                //Maze.PrintWhole(maze);
            }
            //List of frontier Cells is now empty
            //Move to random cell and check if it is a path
            this.currentCell = this.NewCurrent();
        }

        return this.maze;
    }


    Frontier() {

        this.available = [0, 0, 0, 0];
        //left check
        if (((this.currentCell[1]) - 2) >= 0 && this.maze[this.currentCell[0]][(this.currentCell[1]) - 2] === 0) {
            this.available[0] = 1;
        } else {
            this.available[0] = 0;
        }
        //up check
        if (((this.currentCell[0]) - 2) >= 0 && this.maze[(this.currentCell[0]) - 2][(this.currentCell[1])] === 0) {
            this.available[1] = 1;
        } else {
            this.available[1] = 0;
        }
        //right check
        if (this.currentCell[1] + 2 < this.maze.length) {
            if (this.maze[this.currentCell[0]][(this.currentCell[1]) + 2] === 0) {
                this.available[2] = 1;
            }
        } else {
            this.available[2] = 0;
        }
        //down check
        if (this.currentCell[0] + 2 < this.maze.length) {
            if (this.maze[this.currentCell[0] + 2][this.currentCell[1]] === 0) {
                this.available[3] = 1;
            }
        } else {
            this.available[3] = 0;
        }

        return this.available;
    }


    NewCurrent() {

        this.found = false
        this.currentCell = [];

        while (this.found === false) {


            this.cellX = Math.floor(Math.random() * (this.maze.length - 3) / 2)
            this.cellX = this.cellX * 2 + 1

            this.cellY = Math.floor(Math.random() * (this.maze.length - 3) / 2)
            this.cellY = this.cellY * 2 + 1

            if (this.maze[this.cellX][this.cellY] === 1) {
                this.currentCell[0] = this.cellX;
                this.currentCell[1] = this.cellY;
                this.found = true
            }
        }
        return this.currentCell;
    }


    MoveSquare() {
        if (this.numSelected === 0) {
            this.maze[this.currentCell[0]][(this.currentCell[1]) - 2] = 1;
            this.maze[this.currentCell[0]][(this.currentCell[1]) - 1] = 1;
            this.currentCell[1] = this.currentCell[1] - 2;
        }
        if (this.numSelected === 1) {
            this.maze[(this.currentCell[0]) - 2][(this.currentCell[1])] = 1;
            this.maze[(this.currentCell[0]) - 1][(this.currentCell[1])] = 1;
            this.currentCell[0] = this.currentCell[0] - 2;
        }
        if (this.numSelected === 2) {
            this.maze[this.currentCell[0]][(this.currentCell[1]) + 2] = 1;
            this.maze[this.currentCell[0]][(this.currentCell[1]) + 1] = 1;
            this.currentCell[1] = this.currentCell[1] + 2;
        }
        if (this.numSelected === 3) {
            this.maze[(this.currentCell[0]) + 2][(this.currentCell[1])] = 1;
            this.maze[(this.currentCell[0]) + 1][(this.currentCell[1])] = 1;
            this.currentCell[0] = this.currentCell[0] + 2;
        }
        return this.maze;
    }


    Complete() {
        let counter = 0;
        //Console.WriteLine(counter);
        for (let i = 0; i < (this.size - 1) / 2; i++) {
            for (let j = 0; j < (this.size - 1) / 2; j++) {
                let X = (2 * i) + 1;
                let Y = (2 * j) + 1;
                if (this.maze[X][Y] === 1) {
                    counter++;
                }
            }
        }
        return counter === (this.size - 1) / 2 * (this.size - 1) / 2;

    }

    display() {
        console.table(this.maze);

    }

    MakeIntoGraph() {

        this.breaks = this.size - 7;
        for(let i = 0; i < this.breaks; i++) {
            this.breakFound = false
            this.counter = 0
            while (!this.breakFound && this.counter < 10) {
                this.counter++
                this.breakX = Math.floor(Math.random() * (this.maze.length - 3)) + 1



                this.breakY = Math.floor(Math.random() * (this.maze.length - 3)) + 1



                if (this.IsPath()) {
                    this.maze[this.breakX][this.breakY] = 1
                    this.breakFound = true
                }
            }



        }
        return this.maze;


    }

    IsPath() {
        if (this.maze[this.breakX][this.breakY] === 0) {

            if (((this.maze[this.breakX - 1][this.breakY] === 1 && this.maze[this.breakX + 1][this.breakY] === 1) && (this.maze[this.breakX][this.breakY - 1] === 0 && this.maze[this.breakX][this.breakY + 1] === 0)) || ((this.maze[this.breakX - 1][this.breakY] === 0 && this.maze[this.breakX + 1][this.breakY] === 0) && (this.maze[this.breakX][this.breakY - 1] === 1 && this.maze[this.breakX][this.breakY + 1] === 1))) {
                return true
            }

        }
        return false
    }

}