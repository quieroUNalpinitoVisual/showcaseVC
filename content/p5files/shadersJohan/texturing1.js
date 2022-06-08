let baseimg;
let lumaShader;
let greyimg;

function preload(){
    lumaShader = readShader("/showcasevc/p5files/shadersJohan/luma.frag",{varyings: Tree.texcoords});
    baseimg = loadImage('/showcasevc/sketches/mayonesito.jpg');
}

function setup() {
    createCanvas(500, 500,WEBGL);
    noStroke();
    textureMode(NORMAL);
    shader(lumaShader);
    lumaShader.setUniform('texture',baseimg);
}
  
function draw() {
    reset();
}

function keyPressed () {
    if(keyCode === LEFT_ARROW){
        HSVV();
    }
    if(keyCode === RIGHT_ARROW){
        HSLL();
    }
    if(keyCode === DOWN_ARROW){
        average();
    }
    if(keycode === UP_ARROW){
        reset();
    }
}

function reset(){
    image(baseimg,0,0);
    loadPixels();
}

function HSVV(){

}

function HSLL(){

}

function average(){
    lumaShader.setUniform('greyimg', true);
}