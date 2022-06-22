let baseimg;
let basevid;
let rstimg;
let maskShader;

function preload(){
    maskShader = readShader("/showcasevc/p5files/shadersJohan/mask.frag",{varyings: Tree.texcoords});
    baseimg = loadImage('/showcasevc/sketches/mayonesito.jpg');
    rstimg = baseimg;
}

function setup() {
    createCanvas(500, 500, WEBGL);
    noStroke();
    noLoop();
    textureMode(NORMAL);
    loadPixels();
}
  
function draw() {
    background(0);
    image(rstimg,-250,-250);
    shader(maskShader);
    maskShader.setUniform('texture',baseimg);
    maskShader.setUniform('texOffset',[1/500,1/500]);
    maskShader.setUniform('mask',[-1,-1,-1,-1,8,-1,-1,-1,-1]);
    maskShader.setUniform('dosom',false);
}

function keyPressed () {

    if(keyCode === RIGHT_ARROW){
        applyMask();
    }
    if(keyCode === LEFT_ARROW){
        resetMask();
    }
}

function resetMask(){
    maskShader.setUniform('dosom',false);
    quad(-250,-250,250,-250,250,250,-250,250);
}

function applyMask(){
    maskShader.setUniform('dosom',true);
    quad(-250,-250,250,-250,250,250,-250,250);
}