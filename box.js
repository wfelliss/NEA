class box {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.rowPos = this.row * size;
        this.colPos = this.col * size;

    }

    display() {

        if (maze[this.col][this.row] === 1) {
            noStroke();
            fill(230);
        }

        if (maze[this.col][this.row] === 0) {

            fill(100);
        }
        if (maze[this.col][this.row] === 2) {
            fill('rgba(0,255,0, 0.25)');
        }
        if (maze[this.col][this.row] === 3) {
            fill('rgba(255,0,0, 0.25)');
        }


        if(limitedview){
            let xpos;
            let ypos;
            xpos = Math.round(p.y / size);
            ypos = Math.round(p.x / size);

            if(this.col > xpos + 3 || this.col < xpos - 3){
                fill(10);
            }
            if(this.row > ypos + 3 || this.row < ypos - 3){
                fill(10);
            }
        }




        rect(this.rowPos, this.colPos, size);
        stroke(10);
    }

}

