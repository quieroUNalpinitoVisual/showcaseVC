const CANVDIM = 500;
const QUADDIM = 50;
const LENGTH = 10;
let board
let quadrille;
let triangle;
let matrix = [];

function setup () {
    createCanvas(CANVDIM , CANVDIM);
}

function draw() {
    background('#000000');
    noLoop();
    board = createQuadrille(QUADDIM,QUADDIM);
    //triangle = p.triangle(p.random(CANVDIM),p.random(CANVDIM),p.random(CANVDIM),p.random(CANVDIM),p.random(CANVDIM),p.random(CANVDIM));
    drawQuadrille(board, {cellLength: LENGTH, outline: 'magenta', board: true});
    board.rasterizeTriangle(random(QUADDIM),random(QUADDIM),random(QUADDIM),random(QUADDIM),random(QUADDIM),random(QUADDIM));
}

function smoothing () {
    console.log(board);
}

function retriang () {
    background('#000000');
    //triangle = p.triangle(p.random(CANVDIM),p.random(CANVDIM),p.random(CANVDIM),p.random(CANVDIM),p.random(CANVDIM),p.random(CANVDIM));
    drawQuadrille(board, {cellLength: LENGTH, outline: 'magenta', board: true});
}

function keyPressed () {
    if(keyCode === LEFT_ARROW){
        smoothing();
    }
    if(keyCode === RIGHT_ARROW){
        retriang();
    }
}

