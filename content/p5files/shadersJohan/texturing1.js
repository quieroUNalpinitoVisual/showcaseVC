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
        resetimg();
    }
    if(keyCode === RIGHT_ARROW){
        average();
    }
    if(keyCode === DOWN_ARROW){
        HSLL();
    }
    if(keyCode === UP_ARROW){
        HSVV();
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
    shader(lumaShader);
    lumaShader.setUniform('mode',2);
    lumaShader.setUniform('texture',baseimg);
}

function average(){
    shader(lumaShader);
    lumaShader.setUniform('mode',1);
    lumaShader.setUniform('texture',baseimg);
}