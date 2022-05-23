//Based on zl25drexel's p5.js 
//https://editor.p5js.org/zl25drexel/sketches/9K3PnFQQ_

const SPEED = 10, MOVES = 20;

function randomInt(max){
    return Math.floor(Math.random()*max);
}

class Cubie{
    constructor(x, y, z, idx){

        this.idx = idx;
        this.update(x,y,z);
        this.highlight = false;
        this.faces = [];
        this.faces[0] = new Face(createVector(0, 0, -1), color(0,0,255));
        this.faces[1] = new Face(createVector(0, 0, 1), color(0,255,0));
        this.faces[2] = new Face(createVector(0, 1, 0), color(255,255,255));
        this.faces[3] = new Face(createVector(0, -1, 0), color(255,255,0));
        this.faces[4] = new Face(createVector(1, 0, 0), color(255,150,0));
        this.faces[5] = new Face(createVector(-1, 0, 0), color(255,0,0));
    }

    update(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
        this.m = new p5.Matrix();
        this.m.translate([x, y, z]);

    }

    turnFacesZ(dir) {
        this.faces.forEach(f =>{
            f.turnZ(dir*HALF_PI);
        });
    }

    turnFacesY(dir) {
        this.faces.forEach(f =>{
            f.turnY(dir*HALF_PI);
        });
    }

    turnFacesX(dir) {
        this.faces.forEach(f =>{
            f.turnX(dir*HALF_PI);
        });
    }

    draw(){
        // fill(this.highlight? 0 : 255);
        noFill();
        stroke(0);
        strokeWeight(3);
        push();
        let idx = 0;
        let mat4 = this.m.mat4;
        applyMatrix(
            mat4[idx++],mat4[idx++],mat4[idx++],mat4[idx++],
            mat4[idx++],mat4[idx++],mat4[idx++],mat4[idx++],
            mat4[idx++],mat4[idx++],mat4[idx++],mat4[idx++],
            mat4[idx++],mat4[idx++],mat4[idx++],mat4[idx++]
        );
        box(1);

        this.faces.forEach(f =>{
            f.draw();
        });
        pop();

    }

    drawIdx(){
        push();
        translate(0,0,1);
        fill(0);
        text(this.idx, 0, 0);
        pop();
    }

}

class Face{

    constructor(normal, color){
        this.normal = normal;
        this.color = color;
    }

    turnZ(angle) {
        this.normal = createVector(
            round(this.normal.x * cos(angle) - this.normal.y * sin(angle)),
            round(this.normal.x * sin(angle) + this.normal.y * cos(angle)),
            round(this.normal.z));
    }

    turnY(angle) {
        this.normal = createVector(
            round(this.normal.x * cos(angle) - this.normal.z * sin(angle)),
            round(this.normal.y),
            round(this.normal.x * sin(angle) + this.normal.z * cos(angle)));

    }

    turnX(angle) {
        this.normal = createVector(
            round(this.normal.x),
            round(this.normal.y * cos(angle) - this.normal.z * sin(angle)),
            round(this.normal.y * sin(angle) + this.normal.z * cos(angle))
        );
    }
    draw(){
        push();
        fill(this.color);
        noStroke();
        rectMode(CENTER);
        translate(this.normal.x/2, this.normal.y/2, this.normal.z/2);
        if (abs(this.normal.x) > 0) {
            rotateY(HALF_PI);
        } else if (abs(this.normal.y) > 0) {
            rotateX(HALF_PI);
        }
        square(0, 0, 1);
        pop();
    }



}

class Move{
    constructor(x, y, z, dir){
        this.x = x;
        this.y = y;
        this.z = z;
        this.dir = dir;
        this.angle = 0;
    }
    copy() {
        return new Move(this.x, this.y, this.z, this.dir);
    }

    reverse() {
        this.dir *= -1;
    }
    start(){
        this.animating = true;
        this.finished = false;
    }
    update(){
        if(this.animating){
            this.angle += this.dir * .01 * SPEED;
            if (abs(this.angle) > HALF_PI) {
                this.angle = 0;
                this.animating = false;
                this.finished = true;
                if (abs(this.z) > 0) {
                    turnZ(this.z, this.dir);
                } else if (abs(this.x) > 0) {
                    turnX(this.x, this.dir);
                } else if (abs(this.y) > 0) {
                    turnY(this.y, this.dir);
                }
            }
        }

    }
}

function keyPressed(){

    if(key == ' '){
        if(this.counter == 0){
            this.currentMove = this.sequence[counter];
            this.currentMove.start();
        }else if(this.counter == this.sequence.length - 1){
            this.counter = 0;
            this.currentMove = this.sequence[counter];
            this.currentMove.start();
        }
    }else{
        //applyMove(key);
    }
}


function applyMove(move) {

    switch (move) {
        case 'f':
            turnZ(1, 1);
            break;
        case 'F':
            turnZ(1, -1);
            break;
        case 'b':
            turnZ(-1, 1);
            break;
        case 'B':
            turnZ(-1, -1);
            break;
        case 'u':
            turnY(1, 1);
            break;
        case 'U':
            turnY(1, -1);
            break;
        case 'd':
            turnY(-1, 1);
            break;
        case 'D':
            turnY(-1, -1);
            break;
        case 'l':
            turnX(-1, 1);
            break;
        case 'L':
            turnX(-1, -1);
            break;
        case 'r':
            turnX(1, 1);
            break;
        case 'R':
            turnX(1, -1);
            break;
    }

}

function turnZ(idx, dir){
    for (cube of CUBES) {
        if(cube.z == idx){
            let m = new p5.Matrix();
            m.rotate(dir*HALF_PI, [0,0,1]);
            m.translate([cube.x, cube.y, 1]);
            cube.update(m.mat4[12], m.mat4[13], cube.z);
            cube.turnFacesZ(dir);
        }
    }
}

function turnY(idx, dir){
    for (cube of CUBES) {
        if(cube.y == idx){
            let m = new p5.Matrix();
            m.rotate(dir*HALF_PI, [0,-1,0]);
            m.translate([cube.x, 0, cube.z]);
            cube.update(m.mat4[12], cube.y,  m.mat4[14]);
            cube.turnFacesY(dir);
        }
    }
}

function turnX(idx, dir){
    for (cube of CUBES) {
        if(cube.x == idx){
            let m = new p5.Matrix();
            m.rotate(dir*HALF_PI, [1,0,0]);
            m.translate([0, cube.y, cube.z]);
            cube.update(cube.x, m.mat4[13],  m.mat4[14]);
            cube.turnFacesX(dir);
        }
    }
}


const CUBES = [];
const ALLMOVES = [
    new Move(0, 1, 0, 1),
    new Move(0, 1, 0, -1),
    new Move(0, -1, 0, 1),
    new Move(0, -1, 0, -1),
    new Move(1, 0, 0, 1),
    new Move(1, 0, 0, -1),
    new Move(-1, 0, 0, 1),
    new Move(-1, 0, 0, -1),
    new Move(0, 0, 1, 1),
    new Move(0, 0, 1, -1),
    new Move(0, 0, -1, 1),
    new Move(0, 0, -1, -1)];

let counter = 0;
let text;
let fbo1, fbo2;
let cam1, cam2;
let length=485;

function setup() {

  createCanvas(length*2, length, WEBGL);
  fbo1 = createGraphics(width/2, height, WEBGL);
  fbo2 = createGraphics(width/2, height, WEBGL);

  fbo2.ortho(-fbo2.width / 2, fbo2.width / 2, -fbo2.height / 2, fbo2.height / 2, 1, 10000)

  for(var x=-1; x<2; x++){
      for(var y=-1; y<2; y++){
          for(var z=-1; z<2; z++){
              CUBES.push(new Cubie(x, y, z, CUBES.length));
          }
      }
  }
  this.sequence = [];
  let reverseSequence = [];
  for (let i = 0; i <MOVES; i++) {
      let move = ALLMOVES[randomInt(ALLMOVES.length)];
      this.sequence.push(move);
      let reverse = move.copy();
      reverse.reverse();
      reverseSequence.push(reverse);
  }

  reverseSequence.reverse();
  this.sequence = this.sequence.concat(reverseSequence);

  this.counter = 0;
  this.currentMove = this.sequence[counter];


}

function draw() {
    background(51);
    orbitControl();
    // debugMode();

    scale(50);
    rotateX(-.5);
    rotateY(.5);
    rotateZ(.1);
    this.currentMove.update();
    if(this.currentMove.finished){
        if(this.counter < this.sequence.length-1){
            this.counter ++;
            this.currentMove = this.sequence[this.counter];
            this.currentMove.start();
        }
    }

    for (cube of CUBES) {
        push();
        if (abs(cube.z) > 0 && cube.z == this.currentMove.z) {
            rotateZ(this.currentMove.angle);
        } else if (abs(cube.x) > 0 && cube.x == this.currentMove.x) {
            rotateX(this.currentMove.angle);
        } else if (abs(cube.y) > 0 && cube.y ==this.currentMove.y) {
            rotateY(-this.currentMove.angle);
        }
        cube.draw();
        pop();
    }


}


