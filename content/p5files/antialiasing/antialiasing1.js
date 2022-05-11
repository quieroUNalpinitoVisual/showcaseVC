const CANVDIM = 500;
const QUADDIM = 50;
const LENGTH = 10;
let board;
let triangle;
let matrix = [];

function setup () {
    createCanvas(CANVDIM , CANVDIM);
}

function draw() {
    background('#000000');
    noLoop();
    board = createQuadrille(QUADDIM,QUADDIM);
    rasterizeTriangle(random(QUADDIM),random(QUADDIM),random(QUADDIM),random(QUADDIM),random(QUADDIM),random(QUADDIM),
    ({ pattern: xyza }) => color(xyza), [red(random(255)), green(random(255)), blue(random(255)), alpha(255)]);
    drawQuadrille(board, {cellLength: LENGTH, outline: 'magenta', board: true});
}

function smoothing () {
    console.log(board);
}

function retriang () {
    board._memory2D[int(random(QUADDIM))][int(random(QUADDIM))] = color(red(255),blue(0),green(0));
}

function requad () {
    drawQuadrille(board, {cellLength: LENGTH, outline: 'magenta', board: true});
}

function keyPressed () {
    if(keyCode === LEFT_ARROW){
        smoothing();
    }
    if(keyCode === RIGHT_ARROW){
        retriang();
    }
    if(keyCode === DOWN_ARROW){
        requad();
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
