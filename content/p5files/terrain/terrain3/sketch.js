let terrain = [];
var cols, rows;
var scl = 10;
var w = 1560;
var h = 1560;
cols = w/scl;
rows = h/scl;
var flying = 0;
let ctx;

function setup() {
  createCanvas (600, 600, WEBGL);
  angleMode(DEGREES);
  rectMode(CENTER);
  colorMode(HSB);
  noStroke();
  ctx = canvas.getContext('3d');
}

function draw() {
  
  flying -= 0.1;
  var yoff=0;
  for (let y=0; y < rows; y++){
    xoff = flying;
    terrain.push([]);
    for (let x=0; x < cols; x++){
        terrain[y][x] = map(noise(xoff,yoff),0,1,0,100);
        xoff += 0.2;
      }
    yoff+=0.2;
  }
  background(0);
  //stroke(255);
  rotateX(60);
  translate(-width, -height/2);
  
    for (var y=1; y < rows-1; y++){
      for (var x=1; x < cols-1; x++){
      beginShape(TRIANGLE_FAN);
        
      fill(50, 19, (terrain[x][y])/2);
      vertex(x*scl,y*scl, terrain[x][y]);
      
      fill(50, 19,(terrain[x][y+1])/2);
      vertex(x*scl,(y+1)*scl, terrain[x][y+1]);
      
      fill(50, 19,(terrain[x+1][y])/2);
      vertex((x+1)*scl,y*scl, terrain[x+1][y]);
      
      fill(50, 19,(terrain[x][y])/2);
      vertex(x*scl,y*scl, terrain[x][y]);
      
      fill(50, 19,(terrain[x][y-1])/2);
      vertex(x*scl,(y-1)*scl, terrain[x][y-1]);
      
      fill(50, 19,(terrain[x-1][y])/2);
      vertex((x-1)*scl,y*scl, terrain[x-1][y]);
      endShape();
      
    }
   
  }
  
 
}