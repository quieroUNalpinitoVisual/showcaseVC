
new p5((p) => {

    let myCanvas, img, bord, button1, button2, button3, button4, button5, button6, buttonbor;

    p.preload = function() {
        img = p.loadImage('/showcasevc/sketches/lenna.png');
        bord = p.loadImage('/showcasevc/sketches/lenna.png');
    }

    p.setup = function () {
        myCanvas = p.createCanvas(400,1100);
        img.resize(400,400);
        img.loadPixels();
        p.image(img, 0, 200);

        button1 = p.createButton('button1');
        button1.position(0,500);
        button1.mousePressed(p.matrix1);
        button2 = p.createButton('button2');
        button2.position(0,530);
        button3 = p.createButton('button3');
        button3.position(0,560);
        button4 = p.createButton('button4');
        button4.position(0,590);
        button5 = p.createButton('button5');
        button5.position(0,620);
        button6 = p.createButton('button6');
        button6.position(0,650);

        bord.resize(400,400);
        p.image(bord, 0, 650);
        buttonbor = p.createButton('borders');
        buttonbor.position(0,1100);
        buttonbor.mousePressed(p.calcborders);
    };

    p.convolute = function (matrix, matrixsize){
        let preconv = img;
        let postconv = preconv;
        let loc = 0;
        for (let i = 1; i < 399; i++){
            for (let j = 1; j < 399; j++){
                console.log('processing');
                loc = (i+400*j)*4;
                let rtotal, gtotal, btotal = 0.0;
                for (let k = 1; i < matrixsize; k++){
                    for (let l = 1; j < matrixsize; l++){
                        rtotal += (preconv.pixels[loc]) * matrix[k][l];
                        gtotal += (preconv.pixels[loc + 1]) * matrix[k][l];
                        btotal += (preconv.pixels[loc + 2]) * matrix[k][l];
                    }
                }
                rtotal = constrain(rtotal, 0, 255);
                gtotal = constrain(gtotal, 0, 255);
                btotal = constrain(btotal, 0, 255); 
                postconv.pixels[loc] = rtotal;
                postconv.pixels[loc + 1] = gtotal;
                postconv.pixels[loc + 2] = btotal;
                console.log('processing');
            }
        }
        img = postconv;
        p.image(img, 0, 200);
    }

    p.matrix1 = function(){
        matrix = [[-1,-1,-1],
                    [-1,9,-1],
                    [-1,-1,-1]];
        msize = 3;
    }

    p.calcborders = function(){
        let prebord = img;
        prebord.filter(p.GRAY);
        console.log(prebord);
        bord = prebord;
        p.image(bord, 0, 650);
    }

  }, "masking2");
  