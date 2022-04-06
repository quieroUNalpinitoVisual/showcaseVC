// took from here: https://www.youtube.com/watch?v=IKB1hWWedMk

new p5((p) => {
  const w = 1200, h = 900, scl = 20;
  let cols, rows;
  let terrain = [];
  let flying = 0;
  let changeColor, change, c1 = p.color(144, 247, 124), c2 = p.color(138, 95, 22);

  p.setup = function () {
    p.createCanvas(400, 400, p.WEBGL);
    cols = w / scl;
    rows = h / scl;

    for(let x = 0; x < cols; x++){
      terrain[x] = [];
      for(let y = 0; y < rows; y++){
        terrain[x][y] = 0;
      }
    }
  };

  p.draw = function () {
    flying -= 0.05;
    let yoff = flying;
    for(let y = 0; y < rows; y++){
      let xoff = 0;
      for(let x = 0; x < cols; x++){
        terrain[x][y] = p.map(p.noise(xoff, yoff), 0, 1, -100, 100);
        xoff += 0.2;
      }
      yoff += 0.2;
    }
    p.background(p.color(242, 136, 240));
    p.stroke(150);
    p.noFill();

    p.rotateX(p.PI/3);
    p.translate(-w/2,-h/2);

    for(let y = 0; y < rows-1; y++){
      p.beginShape(p.TRIANGLE_STRIP);
      for(let x = 0; x < cols; x++){
        change = p.map(terrain[x][y],-100,100,0,1);
        changeColor = p.lerpColor(c1,c2,change);
        p.fill(changeColor);
        p.vertex(x*scl, y*scl, terrain[x][y]);
        p.vertex(x*scl, (y+1)*scl, terrain[x][y+1]);
      }
      p.endShape();
    }
  };
}, "terraind2");
