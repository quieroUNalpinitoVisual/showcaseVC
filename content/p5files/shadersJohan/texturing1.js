let baseimg;
let lumaShader;
let greyimg;

function preload(){
    lumaShader = readShader("/showcasevc/p5files/shadersJohan/luma.frag",{varyings: Tree.texcoords});
    baseimg = loadImage('/showcasevc/sketches/mayonesito.jpg');
}

function setup() {
    createCanvas(500, 500, WEBGL);
    noStroke();
    textureMode(NORMAL);
}
  
function draw() {
    noLoop();
    resetimg();
}

function keyPressed () {
    if(keyCode === LEFT_ARROW){
        HSVV();
    } else
    if(keyCode === RIGHT_ARROW){
        HSLL();
    } else
    if(keyCode === DOWN_ARROW){
        average();
    } else
    if(keyCode === UP_ARROW){
        resetimg();
    }
}

function resetimg(){
    console.log('deberia volver a color');
    background(0);
    image(baseimg,-250,-250);
    loadPixels();
}

function HSVV(){
    console.log("TODO");
}

function HSLL(){
    console.log("TODO");
}

function average(){
    shader(lumaShader);
    lumaShader.setUniform('texture',baseimg);
    lumaShader.setUniform('greyimg', true);
}