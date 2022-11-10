//https://plugins.jetbrains.com/plugin/17380-uml-javascript-and-typescript



let maze, mazeGen;
let p,e;
let squares;
let cells;
let screenSize = 800;
let size;
let mazecounter = 1;
let limitedview = false;
let gamestatus = 'menu';
let mazeSlider , enemySlider , viewCheckBox;
let play, options, menu;
let mazeSliderValue = 2 , enemySliderValue = 2;
let mazeSize = 11;
let score = 0;

function setup() {
    mazeGen = new MazeGen(mazeSize)




    // set the current maze to one of the regenerated mazes
    maze = pickMaze(mazecounter);

    squares = [];
    cells = maze.length;
    size = (screenSize/cells);

    noStroke();




    createCanvas(screenSize,screenSize + 50);

    //create all the boxes for the pixel array to display the mazes and push them into an array called squares
    for(let row = 0; row < cells; row++){
        for(let col = 0; col < cells; col++){
            let b = new box(row, col);

            squares.push(b);
        }
    }

    //generate the player and the enemies
    p = new player();
    p.playersconstuctor();
    e = new enemy();
    e.playersconstuctor();


    //create the button objects with all the data they need
    let bwidth = 200;
    let bheight = 50;
    play = new Button(screenSize/2 - bwidth/2,screenSize/3 - bheight, bwidth , bheight,'play');
    options = new Button(screenSize/2 - bwidth/2,2*screenSize / 3  -bheight, bwidth , bheight, 'options');
    menu = new Button(10, screenSize - 60, 100, 40,  'menu');


    //create the sliders & check box for the options screen and hide them as not on options screen as default when launched
    mazeSlider = createSlider(1,5,mazeSliderValue);
    mazeSlider.hide();
    enemySlider = createSlider(0,3,enemySliderValue);
    enemySlider.hide();
    viewCheckBox = createCheckbox('Limited View', limitedview);
    viewCheckBox.hide();

}

function draw() {

    if(gamestatus === 'game'){
        background(220);
        //if current level is > than the amount of levels selected in the options menu then go back to menu
        if(mazecounter > mazeSlider.value()){
            gamestatus = 'endScreen';
            mazeSliderValue = 3;
        }

        mazeSlider.hide();
        enemySlider.hide();

        for(let i = 0; i < squares.length; i++){
            squares[i].display();
        }
        textSize(40);
        fill('black');
        stroke(255)
        text('Lives: '+ p.lives , 15 , screenSize + 40)

        text('Score: '+Math.round(score/10) , screenSize-300, screenSize+40)



        score ++
        p.move();
        p.walldetection();
        p.edgedetection();
        p.display();
        p.finishedMaze();



        let path = e.BFS()
        e.enemymove(path);
        e.touchingPlayer();
        e.edgedetection();
        e.display();

        console.log(e.speed)

    }
    else if(gamestatus === 'menu'){

        mazecounter = 1;
        mazeSize = 11;
        mazeSlider.hide();
        enemySlider.hide();
        viewCheckBox.hide();
        background(220);
        play.display();
        play.click();
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
    else if(gamestatus==='endScreen'){
        background(155);

        textSize(40);
        fill('black');
        stroke(255);
        if(!p.dead){
            text('You Scored: '+Math.round(score/10)+' Well Done', 100,100)
        }
        else if(p.dead){
            text('You are dead, Try again', 100,100)
        }

        menu.display();
        menu.click();
    }

}
function pickMaze(){
    let maze = []
    maze = mazeGen.maze.map(function(arr) {
        return arr.slice();
    });
    return maze;
}








