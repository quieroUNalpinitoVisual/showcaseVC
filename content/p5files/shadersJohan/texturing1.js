let baseimg;
let rstimg;
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
    rstimg = baseimg;
    resetimg();
    shader(lumaShader);
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
    image(rstimg,-250,-250);
    loadPixels();
}

function HSVV(){
    lumaShader.setUniform('val',true);
    lumaShader.setUniform('texture',baseimg);
    image(baseimg,-250,-250);
    loadPixels();
}

function HSLL(){
    lumaShader.setUniform('lum',true);
    lumaShader.setUniform('texture',baseimg);
    image(baseimg,-250,-250);
    loadPixels();
}

function average(){
    lumaShader.setUniform('avg',true);
    lumaShader.setUniform('texture',baseimg);
    image(baseimg,-250,-250);
    loadPixels();
}