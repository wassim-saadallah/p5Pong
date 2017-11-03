let ball;
let right_pad;
let left_pad;
let scoreA = 0;
let scoreB = 0;
let ballSpeed = 7;
let ballDir;

function setup() {
    createCanvas(600, 400);
    ball = new Ball(width / 2, height / 2, 30);
    ballDir = random(-7, 7);
    ball.vel = createVector(0, 0);
    left_pad = new Pad(5, height / 2, 50);
    right_pad = new Pad(width - 5, height / 2, 50);

    createP(`RIGHT PLAYER :<br/>
                up arrow : up<br/>
                down arrow : down`);
    createP(`LEFT PLAYER:<br/>
                up arrow : Q<br/>
                down arrow : W`);
    createP(`Press SPACEBAR to start a game`);
}




function draw() {
    background(51);
    //designing the initial scene
    stroke(255);
    strokeWeight(2);
    line(width / 2, 0, width / 2, height);
    ball.update();
    ball.show();
    left_pad.show();
    right_pad.show();
    strokeWeight(1);
    textSize(30);
    text(scoreB, 40, 40);
    text(scoreA, width - 60, 40);


    //end game
    if (ball.pos.x + 15 < 0) {
        scoreA++;
        ball.pos = createVector(width / 2, height / 2, 30);
        ball.vel = createVector(0, 0);

    }
    else if (ball.pos.x - 15 > width) {
        scoreB++;
        ball.pos = createVector(width / 2, height / 2, 30);
        ball.vel = createVector(0, 0);
    }



    //collision detection
    collisionDectection()

    //controls
    controls();
}

//restart game
function keyPressed() {
    if (keyCode === 32) {
        ballDir = random(-7, 7);
        ball.vel = createVector(ballDir, ballDir);
        ball.vel.setMag(7);
    }
}




function controls() {
    if ((right_pad.pos.y + (right_pad.h) < height) && (right_pad.pos.y - (right_pad.h) > 0)) {
        if (keyIsDown(UP_ARROW)) {
            right_pad.update(-3);
        }
        else if (keyIsDown(DOWN_ARROW)) {
            right_pad.update(3);
        }
    }
    else if (right_pad.pos.y + (right_pad.h) >= height) {
        right_pad.pos.y -= 1;
    }
    else if (right_pad.pos.y - (right_pad.h) <= 0) {
        right_pad.pos.y += 1;
    }
    if ((left_pad.pos.y + (left_pad.h) < height) && (left_pad.pos.y - (left_pad.h) > 0)) {
        if (keyIsDown(81)) {
            left_pad.update(-3);
        }
        else if (keyIsDown(87)) {
            left_pad.update(3);
        }
    }
    else if (left_pad.pos.y + (left_pad.h) >= height) {
        left_pad.pos.y -= 1;
    }
    else if (left_pad.pos.y - (left_pad.h) <= 0) {
        left_pad.pos.y += 1;
    }
}

function collisionDectection() {
    if ((ball.pos.y - 15 < 0) || (ball.pos.y + 15 > height)) {
        ball.collideWall();
    }

    if ((ball.pos.x + 15 > right_pad.pos.x) &&
        ((ball.pos.y + 30 > right_pad.pos.y - (right_pad.h / 2)) && (ball.pos.y - 30 < right_pad.pos.y + (right_pad.h / 2)))) {
        if (keyIsDown(UP_ARROW)) {
            ball.collidePad(1);
        }
        else if (keyIsDown(DOWN_ARROW)) {
            ball.collidePad(-1);
        } else ball.collidePad();

    }

    if ((ball.pos.x - 15 < left_pad.pos.x) &&
        ((ball.pos.y + 30 > left_pad.pos.y - (left_pad.h / 2)) && (ball.pos.y - 30 < left_pad.pos.y + (left_pad.h / 2)))) {
        if (keyIsDown(81)) {
            ball.collidePad(1);
        }
        else if (keyIsDown(87)) {
            ball.collidePad(-1);
        }
        else ball.collidePad();
    }
}



class Pad {

    constructor(x, y, h) {
        this.pos = createVector(x, y);
        this.h = h;
    }

    show() {
        stroke(255);
        strokeWeight(10);
        line(this.pos.x, this.pos.y - this.h, this.pos.x, this.pos.y + this.h)
    }

    update(dir) {
        this.pos.y += 2 * dir;
    }
}


class Ball {

    constructor(x, y, r) {
        this.pos = createVector(x, y);
        this.r = r;
        this.vel = createVector(0, 0);
    }

    show() {
        fill(255);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.r);
    }

    update() {
        this.pos.add(this.vel);
    }

    collideWall() {
        this.vel.y *= -1;
    }

    collidePad(dir) {
        this.vel.x *= -1;
        if (dir)
            this.vel.y *= 1 + random(dir);
    }
}
