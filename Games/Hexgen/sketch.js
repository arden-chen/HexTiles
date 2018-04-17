var p;
var px, py

const g = 9.81;


function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    p = new player(300, 200, 10);
    px = 300;
    py = 200;
    console.log(width, height);
}

function draw() {
    background(255);
    if (keyIsDown(LEFT_ARROW)) {
        px -= 2;
    } else if (keyIsDown(RIGHT_ARROW)) {
        px += 2;
    }
    stroke(0);
    noFill();
    rect(150, 150, 600, 10);
    rect(150, 300, 600, 10);
    p.x = px;
    p.y = py;
    p.draw();
}

function player(x, y, w) {
    this.x = x;
    this.y = y;
    
    this.gacc = w*g;
    this.onground = false;
    
    this.width = w;

    this.draw = function () {
        stroke(0);
        fill(0);
        ellipse(this.x, this.y, this.width);
    }
    
    this.gforce = function(){ // Only called if this object has to accelerate due to gravity. Will not be called if object is on a platform.
        
    }  
}

function platform(x,y,w,l){ // arr of tiles that are in this platform. Platforms will always be parallel to the ground(CAN BE CHANGED)
                            // constructor is like rect()
    this.draw = function(){
        rect(x,y,w,l);
    }
}
