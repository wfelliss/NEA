//https://plugins.jetbrains.com/plugin/17380-uml-javascript-and-typescript



let mazeCopy, maze, maze1, maze2, maze3;
let squares;
let cells;
let screenSize = 500;
let size;
let mazecounter = 1;
let limitedview = false;
let gamestatus = 'menu';
let mazeSlider , enemySlider , viewCheckBox;
let mazeSliderValue = 2 , enemySliderValue = 2;



function setup() {
    //frameRate(20);
    maze1 = new MazeGen(11)
    maze2 = new MazeGen(13)
    maze3 = new MazeGen(15)
    //console.table(maze1.maze)
    //console.warn('maze1')
    //console.table(maze2.maze)
    //console.warn('maze2')
    //console.table(maze3.maze)
    //console.warn('maze3')
    maze = pickMaze(mazecounter);
    //console.table(maze);
    squares = [];
    cells = maze.length;
    size = (screenSize/cells);
    //maze = swap(maze, cells);
    noStroke();


    //console.clear();

    createCanvas(screenSize,screenSize);
    for( var row = 0; row < cells; row++){
        for( var col = 0; col < cells; col++){
            b = new box(row, col);

            squares.push(b);
        }
    }
    background(150);
    p = new player();
    p.playersconstuctor();
    e = new enemy();
    e.playersconstuctor();

    let bwidth = 200;
    let bheight = 50;
    play = new Button(screenSize/2 - bwidth/2,screenSize/3 - bheight, bwidth , bheight,'play');
    options = new Button(screenSize/2 - bwidth/2,2*screenSize / 3  -bheight, bwidth , bheight, 'options');
    menu = new Button(10, screenSize - 60, 100, 40,  'menu');

    mazeSlider = createSlider(1,5,mazeSliderValue);
    mazeSlider.hide();
    enemySlider = createSlider(0,3,enemySliderValue);
    enemySlider.hide();
    viewCheckBox = createCheckbox('Limited View', limitedview);
    viewCheckBox.hide();
    //console.clear();
}

function draw() {

    if(gamestatus === 'game'){

        if(mazecounter > mazeSlider.value()){
            gamestatus = 'menu';
            mazeSliderValue = 3;
        }

        mazeSlider.hide();
        enemySlider.hide();
        maze = pickMaze(mazecounter);
        //console.table(maze);
        for(let i = 0; i < squares.length; i++){
            squares[i].display();
        }

        background(220);




        p.move();
        p.walldetection();
        p.edgedetection();
        p.display();
        p.finishedMaze();

        console.table(maze)
        let path = e.DPS()
        console.table(maze)


        /*for(var i = 0 ; i < path.length; i ++){
          circle((path[i][1])*size  + size/2 , path[i][0]*size   + size/2 , 10);
        }
        */
        e.enemymove(path)
        e.walldetection();
        e.edgedetection();
        e.display();


        noLoop(0)
    }
    else if(gamestatus === 'menu'){
        mazecounter = 1;
        mazeSlider.hide();
        enemySlider.hide();
        viewCheckBox.hide();
        background(220);
        play.display();
        play.click()
        options.display();
        options.click();
    }
    else if(gamestatus === 'options'){
        background(220);
        textStyle(NORMAL);

        textSize(15);
        fill(0);
        mazeSlider.show();
        mazeSlider.position(screenSize/3, screenSize/3);
        text('Number of Levels:' , mazeSlider.x , screenSize/3 -10);
        mazeSliderValue = mazeSlider.value();
        text(mazeSliderValue, mazeSlider.x +10 + mazeSlider.width, screenSize/3 + 15);

        enemySlider.show();
        enemySlider.position(screenSize/3 , (screenSize/2));
        text('Number of Enemies:' , enemySlider.x , screenSize/2 -10);
        enemySliderValue = enemySlider.value();
        text(enemySliderValue, enemySlider.x +10 + enemySlider.width, screenSize/2 + 15);

        viewCheckBox.show();
        viewCheckBox.position(screenSize/3 , (2*(screenSize)/5));
        limitedview = viewCheckBox.checked();

        menu.display();
        menu.click();


    }


}
function pickMaze(){
    let maze


    if(mazecounter === 1){
        maze = maze1.maze;

    }
    if(mazecounter === 2){
        maze = maze2.maze

    }
    if(mazecounter === 3){
        maze = maze3.maze

    }
    return maze;
}

function swap(maze , cells){
    for(var i =0 ; i < cells ; i++){
        for(var j =0 ; j < cells ; j++){
            if(maze[i][j] === 0){
                maze[i][j] = 6;
            }
        }
    }

    for(var i =0 ; i < cells ; i++){
        for(var j =0 ; j < cells ; j++){
            if(maze[i][j] === 1){
                maze[i][j] = 0;
            }
        }
    }

    for(var i =0 ; i < cells ; i++){
        for(var j =0 ; j < cells ; j++){
            if(maze[i][j] === 6){
                maze[i][j] = 1;
            }
        }
    }
    return maze;
}







