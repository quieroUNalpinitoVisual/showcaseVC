
new p5((p) => {

    let myCanvas, img, button1;

    p.preload = function() {
        img = p.loadImage('/showcasevc/sketches/lenna.png')
    }

    p.setup = function () {
        myCanvas = p.createCanvas(400,500);
        img.resize(400,400);
        p.image(img, 0, 100);

        button1 = p.createButton('button1');
        button1.position(0,myCanvas.y);
        console.log(myCanvas.y)

    };

  }, "masking2");
  