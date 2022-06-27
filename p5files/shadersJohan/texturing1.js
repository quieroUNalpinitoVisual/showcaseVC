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
    shader(lumaShader);
    background(0);
    lumaShader.setUniform('greyscale',false);
    lumaShader.setUniform('val',false);
    lumaShader.setUniform('lum',false);
    lumaShader.setUniform('avg',false);
    lumaShader.setUniform('texture',baseimg);
    quad(-250,-250,250,-250,250,250,-250,250);
    loadPixels();
    image(baseimg,-250,-250);
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
    background(0);
    lumaShader.setUniform('greyscale',false);
    lumaShader.setUniform('val',false);
    lumaShader.setUniform('lum',false);
    lumaShader.setUniform('avg',false);
    lumaShader.setUniform('texture',baseimg);
    quad(-250,-250,250,-250,250,250,-250,250);
    loadPixels();
}

function HSVV(){
    lumaShader.setUniform('greyscale',true);
    lumaShader.setUniform('val',true);
    lumaShader.setUniform('lum',false);
    lumaShader.setUniform('avg',false);
    lumaShader.setUniform('texture',baseimg);
    quad(-250,-250,250,-250,250,250,-250,250);
    loadPixels();
}

function HSLL(){
    lumaShader.setUniform('greyscale',true);
    lumaShader.setUniform('lum',true);
    lumaShader.setUniform('avg',false);
    lumaShader.setUniform('val',false);
    lumaShader.setUniform('texture',baseimg);
    quad(-250,-250,250,-250,250,250,-250,250);
    loadPixels();
}

function average(){
    lumaShader.setUniform('greyscale',true);
    lumaShader.setUniform('avg',true);
    lumaShader.setUniform('lum',false);
    lumaShader.setUniform('val',false);
    lumaShader.setUniform('texture',baseimg);
    quad(-250,-250,250,-250,250,250,-250,250);
    loadPixels();
}