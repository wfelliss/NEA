

class Button{
    constructor(x , y , w, h, name){
        this.name = name;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.col = color('#D3D3D3');

    }
    display(){
        fill(100);
        noStroke();
        if(this.isMouseInside(this.x, this.y ,this.w , this.h)){
            fill(200);
        }
        rect(this.x,this.y,this.w,this.h , (this.w/5),(this.w/5));
        textSize(32);
        fill(this.col);
        //textAlign(CENTER);
        if(this.name === 'menu'){
            text(this.name,this.x + this.w/8 ,this.y + 2*this.h / 3);
        }
        else if(this.name === 'options'){
            text(this.name,this.x + this.w/4,this.y + 2*this.h / 3);
        }
        else if(this.name === 'play'){
            text(this.name,this.x + this.w/3,this.y + 2*this.h / 3);
        }



    }

    click(){
        if(this.isMouseInside(this.x, this.y ,this.w , this.h) && mouseIsPressed){
            if(this.name === 'play'){
                gamestatus = 'game';
                setup();
            }
            else if(this.name === 'options'){
                gamestatus = 'options';
            }
            else if(this.name === 'menu'){
                gamestatus = 'menu';
            }
        }

    }
    isMouseInside(x, y, w, h){
        return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
    }
}