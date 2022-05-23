const CANVDIM = 500;
const QUADDIM = 50;
const LENGTH = 10;
let can;
let board;
let x1;
let x2;
let x3;
let y1;
let y2;
let y3;

function setup () {
    can = createCanvas(CANVDIM , CANVDIM);
}

function draw() {
    background('#000000');
    noLoop();
    noSmooth();
    board = createQuadrille(QUADDIM,QUADDIM);
    x1 = random(QUADDIM);
    x2 = random(QUADDIM);
    x3 = random(QUADDIM);
    y1 = random(QUADDIM);
    y2 = random(QUADDIM);
    y3 = random(QUADDIM);
    rasterizeTriangle(y3,x3,y1,x1,y2,x2,
    ({ pattern: xyza }) => color(xyza), [red(0), green(255), blue(0), alpha(255)]);
    stroke(255);
    strokeWeight(2);
    line(x1*LENGTH,y1*LENGTH,x2*LENGTH,y2*LENGTH);
    line(x2*LENGTH,y2*LENGTH,x3*LENGTH,y3*LENGTH);
    line(x3*LENGTH,y3*LENGTH,x1*LENGTH,y1*LENGTH);
    drawQuadrille(board, {cellLength: LENGTH, outline: 'magenta', board: true});
    updatePixels();
    loadPixels();
}

function smoothing () {
  console.log('dibujando triangulo real');
  drawtriang();
  console.log('supersampleando');
  supersamp();
  console.log('AA realizado');
  rasterizeTriangle(y3,x3,y1,x1,y2,x2,
    ({ pattern: xyza }) => color(xyza), [red(random(0)), green(255), blue(random(0)), alpha(255)]);
  drawQuadrille(board, {cellLength: LENGTH, outline: 'magenta', board: true});
  console.log('AA dibujado');
}

function retriang () {
    clearq();
    background('#000000');
    x1 = random(QUADDIM);
    x2 = random(QUADDIM);
    x3 = random(QUADDIM);
    y1 = random(QUADDIM);
    y2 = random(QUADDIM);
    y3 = random(QUADDIM);
    rasterizeTriangle(y3,x3,y1,x1,y2,x2,
    ({ pattern: xyza }) => color(xyza), [red(random(0)), green(255), blue(random(0)), alpha(255)]);
    stroke(255);
    strokeWeight(2);
    line(x1*LENGTH,y1*LENGTH,x2*LENGTH,y2*LENGTH);
    line(x2*LENGTH,y2*LENGTH,x3*LENGTH,y3*LENGTH);
    line(x3*LENGTH,y3*LENGTH,x1*LENGTH,y1*LENGTH);
    drawQuadrille(board, {cellLength: LENGTH, outline: 'magenta', board: true});
}

function consoleve () {
  console.log(board);
}

function keyPressed () {
  if(keyCode === LEFT_ARROW){
      smoothing();
  }
  if(keyCode === RIGHT_ARROW){
      retriang();
  }
  if(keyCode === DOWN_ARROW){
      consoleve();
  }
}

function drawtriang(){
  triangle(x1*LENGTH,y1*LENGTH,x2*LENGTH,y2*LENGTH,x3*LENGTH,y3*LENGTH,);
  rasterizeTriangle(y3,x3,y1,x1,y2,x2,
    ({ pattern: xyza }) => color(xyza), [red(random(0)), green(255), blue(random(0)), alpha(255)]);
  drawQuadrille(board, {cellLength: LENGTH, outline: 'magenta', board: true});
}

function supersamp(){
  let total = 64;
  for (let i = 0; i < QUADDIM ; i ++) {
    for (let j = 0; j < QUADDIM ; j ++) {
      let count = 0;
      let si = LENGTH * i +1;
      let sj = LENGTH * j + 1;
      for (; si < LENGTH * i + LENGTH - 1 ; si ++) {
        for (; sj < LENGTH * j + LENGTH - 1 ; sj ++) {
          //console.log(si,sj);
          //console.log(get(si,sj)[0])
          if(get(si,sj)[0] != 0){
            count += 1;
          }
        }
      }
      let shade = (count/total)*10;
      //console.log(shade);
      board._memory2D[j][i]=[red(0), green(255*shade), blue(0), alpha(255)];
    }
  }
}

function rasterizeTriangle(row0, col0, row1, col1, row2, col2, shader, pattern0, pattern1 = pattern0, pattern2 = pattern0) {
    if (Array.isArray(pattern0) && Array.isArray(pattern1) && Array.isArray(pattern2)) {
      for (let i = 0; i < this.height; i++) {
        for (let j = 0; j < this.width; j++) {
          let coords = barycentric_coords(i, j, row0, col0, row1, col1, row2, col2);
          // interpolate all pattern attributes for the current cell only if it is inside the triangle
          if (coords.w0 >= 0 && coords.w1 >= 0 && coords.w2 >= 0) {
            let length = Math.max(pattern0.length, pattern1.length, pattern2.length);
            let _pattern = new Array(length);
            for (let k = 0; k < _pattern.length; k++) {
              _pattern[k] = (pattern0[k] ?? 0) * coords.w0 + (pattern1[k] ?? 0) * coords.w1 + (pattern2[k] ?? 0) * coords.w2;
            }
            // call shader using the interpolated patterns to compute the current cell color
            board._memory2D[i][j] = shader({ pattern: _pattern, row: i, col: j });
          }
        }
      }
    }
  }

 function barycentric_coords(row, col, row0, col0, row1, col1, row2, col2) {
    let edges = edge_functions(row, col, row0, col0, row1, col1, row2, col2);
    let area = parallelogram_area(row0, col0, row1, col1, row2, col2);
    return { w0: edges.e12 / area, w1: edges.e20 / area, w2: edges.e01 / area };
  }

  function parallelogram_area(row0, col0, row1, col1, row2, col2) {
    return (col1 - col0) * (row2 - row0) - (col2 - col0) * (row1 - row0);
  }

  /**
   * Returns the (row0, col0), (row1, col1), (row2, col2) triangle edge_functions
   * at (row, col) as the {e01, e12, e20} object literal.
   */
  function edge_functions(row, col, row0, col0, row1, col1, row2, col2) {
    let e01 = (row0 - row1) * col + (col1 - col0) * row + (col0 * row1 - row0 * col1);
    let e12 = (row1 - row2) * col + (col2 - col1) * row + (col1 * row2 - row1 * col2);
    let e20 = (row2 - row0) * col + (col0 - col2) * row + (col2 * row0 - row2 * col0);
    return { e01, e12, e20 };
  }

  function clearq() {
    if (arguments.length === 0) {
      board._memory2D = board._memory2D.map(x => x.map(y => y = 0));
    }
    if (arguments.length === 1 && typeof arguments[0] === 'number') {
      board._memory2D[arguments[0]].fill(0);
    }
    if (arguments.length === 2 && typeof arguments[0] === 'number' && typeof arguments[1] === 'number') {
      board._memory2D[arguments[0]][arguments[1]] = 0;
    }
  }