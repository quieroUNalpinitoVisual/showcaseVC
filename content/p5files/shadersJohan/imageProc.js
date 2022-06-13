let baseimg;
let lumaShader;
let greyimg;

function preload(){
    maskShader = readShader("/showcasevc/p5files/shadersJohan/mask.frag",{varyings: Tree.texcoords});
    baseimg = loadImage('/showcasevc/sketches/mayonesito.jpg');
}

function setup() {
    createCanvas(500, 500, WEBGL);
    noStroke();
    textureMode(NORMAL);
}
  
function draw() {
    noLoop();
    background(0);
    image(baseimg,-250,-250);
    shader(maskShader);
    maskShader.setUniform('texture',baseimg);
    maskShader.setUniform('texOffset',[1,1]);
    maskShader.setUniform('mask',[-1,-1,-1,-1,8,-1,-1,-1,-1]);
    image(baseimg,-250,-250);
}