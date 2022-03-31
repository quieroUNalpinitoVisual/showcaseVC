
new p5((p) => {
    p.setup = function () {
        p.createCanvas(400,400);
        p.loadImage('/showcasevc/sketches/lenna.png', img => {
            img.resize(400,400);
            p.image(img, 0, 0);
          });
    };
  }, "masking1");
  