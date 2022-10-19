class mazeGen{
    static Generate(size)
    {
        //Generate A Blank Maze
        let maze = new Array(size);

        for(let i = 0; i < maze.length; i++) {
            maze[i] = new Array(size);
            for(let j = 0; j < maze.length; j++){
                maze[i][j] = 0
            }

        }

        maze = PrimsAlgorithm(maze, size);
        maze[1][0] = 3;
        maze[maze.length - 2][ maze.length - 1] = 2;
        return maze;
    }

    PrimsAlgorithm(maze,size)
    {
        let frontAvailable = [0,0,0,0];
        let currentCell = [1,1];
        while (Complete(maze, size) === false)
        {
            //Console.WriteLine("Maze is not ready");

            maze[currentCell[0]][ currentCell[1]] = 1;
            frontAvailable = Frontier(maze, currentCell);
            //While the list of frontier cells is not empty
            while (frontAvailable[0] !== 0 || frontAvailable[1] !== 0 || frontAvailable[2] !== 0 || frontAvailable[3] !== 0)
            {
                //pick a random way
                let picked = false;
                let numSelected = 5;
                while (picked === false)
                {

                    numSelected = Math.floor(Math.random() * 5);
                    if (frontAvailable[numSelected] === 1)
                    {
                        picked = true;
                    }
                }
                //'Move to cell'
                MoveSquare(numSelected, maze, currentCell);
                frontAvailable = Frontier(maze, currentCell);
                //Maze.PrintWhole(maze);
            }
            //List of frontier Cells is now empty
            //Move to random cell and check if it is a path
            currentCell = NewCurrent(maze);
        }

        return maze;
    }

    Frontier(maze, currentCell)
    {

        let available = [0,0,0,0];
        //left check
        if (((currentCell[1]) - 2) >= 0 && maze[currentCell[0]][ (currentCell[1]) - 2] === 0)
        {
            available[0] = 1;
        }
        else
        {
            available[0] = 0;
        }
        //up check
        if (((currentCell[0]) - 2) >= 0 && maze[(currentCell[0]) - 2][ (currentCell[1])] === 0)
        {
            available[1] = 1;
        }
        else
        {
            available[1] = 0;
        }
        //right check
        if (currentCell[1] + 2 < maze.length)
        {
            if (maze[currentCell[0]][ (currentCell[1]) + 2] === 0)
            {
                available[2] = 1;
            }
        }
        else
        {
            available[2] = 0;
        }
        //down check
        if (currentCell[0] + 2 < maze.length)
        {
            if (maze[currentCell[0] + 2][ currentCell[1]] === 0)
            {
                available[3] = 1;
            }
        }
        else
        {
            available[3] = 0;
        }

        return available;
    }

    NewCurrent(maze)
    {

        let found = false;
        let currentCell = [];

        while (found === false)
        {


            let cellX = Math.floor(Math.random() * (maze.length-3)/2)
            cellX = cellX*2 +1

            let cellY = Math.floor(Math.random() * (maze.length-3)/2)
            cellY = cellY*2 +1

            if (maze[cellX][cellY] === 1)
            {
                currentCell[0] = cellX;
                currentCell[1] = cellY;
                found = true;
            }
        }
        return currentCell;
    }

    MoveSquare(numSelected, maze, currentCell)
    {
        if (numSelected === 0)
        {
            maze[currentCell[0]][ (currentCell[1]) - 2] = 1;
            maze[currentCell[0]][ (currentCell[1]) - 1] = 1;
            currentCell[1] = currentCell[1] - 2;
        }
        if (numSelected === 1)
        {
            maze[(currentCell[0]) - 2][ (currentCell[1])] = 1;
            maze[(currentCell[0]) - 1][ (currentCell[1])] = 1;
            currentCell[0] = currentCell[0] - 2;
        }
        if (numSelected === 2)
        {
            maze[currentCell[0]][ (currentCell[1]) + 2] = 1;
            maze[currentCell[0]][ (currentCell[1]) + 1] = 1;
            currentCell[1] = currentCell[1] + 2;
        }
        if (numSelected === 3)
        {
            maze[(currentCell[0]) + 2][ (currentCell[1])] = 1;
            maze[(currentCell[0]) + 1][ (currentCell[1])] = 1;
            currentCell[0] = currentCell[0] + 2;
        }
        return maze;
    }

    Complete(maze, size)
    {
        let counter = 0;
        //Console.WriteLine(counter);
        for(let i = 0; i < (size - 1) / 2; i++)
        {
            for(let j = 0; j < (size - 1) / 2; j++)
            {
                let X = (2 * i) + 1;
                let Y = (2 * j) + 1;
                if (maze[X][Y] === 1)
                {
                    counter++;
                }
            }
        }
        return counter === (size - 1) / 2 * (size - 1) / 2;

    }
}

