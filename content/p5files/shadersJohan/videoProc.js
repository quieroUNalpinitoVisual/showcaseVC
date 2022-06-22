let basevid;
let rstimg;
let maskShader;
let isVidReady = false;
let dosom = false;

function onVideoLoad(){
    isVidReady = true;
}

function preload(){
    maskShader = readShader("/showcasevc/p5files/shadersJohan/mask.frag",{varyings: Tree.texcoords});
    basevid = createVideo('/showcasevc/sketches/fingers.webm',onVideoLoad());
    basevid.hide();
}

function setup() {
    createCanvas(300, 300, WEBGL);
    basevid.size(300,300);
    noStroke();
}
  
function draw() {
    background(0);
    if(isVidReady){
        //image(basevid,-150,-150,width,height);
        quad(-150,-150,150,-150,150,150,-150,150);
    }
    basevid.loop();
    shader(maskShader);
    maskShader.setUniform('texture',basevid);
    maskShader.setUniform('texOffset',[1/300,1/300]);
    maskShader.setUniform('mask',[-1,-1,-1,-1,8,-1,-1,-1,-1]);
    maskShader.setUniform('dosom',dosom);
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
    dosom = false;
    maskShader.setUniform('dosom',dosom);
    if(isVidReady){
        //image(basevid,-150,-150,width,height);
        quad(-150,-150,150,-150,150,150,-150,150);
    }
}

function applyMask(){
    dosom = true;
    maskShader.setUniform('dosom',dosom);
    if(isVidReady){
        //image(basevid,-150,-150,width,height);
        quad(-150,-150,150,-150,150,150,-150,150);
    }
}
