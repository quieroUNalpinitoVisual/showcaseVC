let baseimg;
let edgemask;
let antialias;
let edgeimg;
let edged = false;

function preload(){
    edgemask = readShader("/showcasevc/p5files/edgeaa/edgemask.frag",{varyings: Tree.texcoords});
    antialias = readShader("/showcasevc/p5files/edgeaa/antialias.frag",{varyings: Tree.texcoords});
    baseimg = loadImage('/showcasevc/sketches/mayonesito.jpg');
    edgeimg = baseimg;
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
    shader(edgemask);
    edgemask.setUniform('texture',edgeimg);
    edgemask.setUniform('texOffset',[1/500,1/500]);
    edgemask.setUniform('mask',[-1,-1,-1,-1,8,-1,-1,-1,-1]);
    edgemask.setUniform('dosom',false);
    quad(-250,-250,250,-250,250,250,-250,250);
}

function keyPressed () {

    if(keyCode === RIGHT_ARROW){
        applyAA();
    }
    if(keyCode === LEFT_ARROW){
        applyMask();
    }
    if(keyCode === UP_ARROW){
        resetImg();
    }
}

function resetImg(){
    edged = false;
    edgemask.setUniform('dosom',false);
    quad(-250,-250,250,-250,250,250,-250,250);
}

function applyAA(){
    if(edged){
        shader(antialias);
        antialias.setUniform('textureimg',baseimg);
        antialias.setUniform('textureedge',edgeimg);
        antialias.setUniform('texOffset',[1/500,1/500]);
        quad(-250,-250,250,-250,250,250,-250,250);
    }
}

function applyMask(){
    edged = true;
    edgemask.setUniform('dosom',true);
    quad(-250,-250,250,-250,250,250,-250,250);
}
