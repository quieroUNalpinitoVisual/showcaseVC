let baseimg;
let lumaShader;
let greyimg;

function preload(){
    lumaShader = readShader("/showcasevc/p5files/shadersDaniel/luma.frag",{varyings: Tree.texcoords});
    baseimg = loadImage('/showcasevc/sketches/lenna.png');
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
    image(baseimg,-250,-250);
    loadPixels();
}

function HSVV(){

}

function HSLL(){

}

function average(){
    lumaShader.setUniform('greyimg', true);
}
