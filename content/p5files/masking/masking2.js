
new p5((p) => {

    let myCanvas,baseimg, img, bord, button1, button2, button3, button4, button5, button6, buttonbor;

    p.preload = function() {
        img = p.loadImage('/showcasevc/sketches/lenna.png');
        baseimg = p.loadImage('/showcasevc/sketches/lenna.png');
        bord = p.loadImage('/showcasevc/sketches/lenna.png');
    }

    p.setup = function () {
        p.pixelDensity(1);
        myCanvas = p.createCanvas(400,1100);
        img.resize(400,400);
        baseimg.resize(400,400);
        img.loadPixels();
        baseimg.loadPixels();
        p.image(img, 0, 200);

        button1 = p.createButton('M3 9 rodeado de -1');
        button1.position(0,500);
        button1.mousePressed(p.matrix1);
        button2 = p.createButton('button2');
        button2.position(0,530);
        button3 = p.createButton('button3');
        button3.position(0,560);
        button4 = p.createButton('m3 1 rodeado de 9');
        button4.position(0,590);
        button4.mousePressed(p.matrix4);
        button5 = p.createButton('m5 9 rodeado de -1');
        button5.position(0,620);
        button5.mousePressed(p.matrix5);
        button6 = p.createButton('reset');
        button6.position(0,650);
        button6.mousePressed(p.resetimg);

        bord.resize(400,400);
        p.image(bord, 0, 650);
        buttonbor = p.createButton('borders');
        buttonbor.position(0,1100);
        buttonbor.mousePressed(p.calcborders);
    };

    p.drawimg = function(img){
        p.square(0,200,400)
        console.log(img)
        p.image(img, 0, 200);
    }

    p.resetimg = function(){
        img = baseimg;
        p.image(img, 0, 200);
    }

    p.convolute = function (matrix, matrixsize){
        let preconv = img;
        let postconv = preconv;
        let loc = 0;
        for (let i = 1; i < 399; i++){
            for (let j = 1; j < 399; j++){
                loc = (i+400*j)*4;
                let rtotal, gtotal, btotal = 0.0;
                for (let k = 0; k < matrixsize; k++){
                    for (let l = 0; l < matrixsize; l++){
                        rtotal += (preconv.pixels[loc]) * matrix[k][l];
                        gtotal += (preconv.pixels[loc + 1]) * matrix[k][l];
                        btotal += (preconv.pixels[loc + 2]) * matrix[k][l];
                    }
                } 
                postconv.pixels[loc] = rtotal;
                postconv.pixels[loc + 1] = gtotal;
                postconv.pixels[loc + 2] = btotal;
            }
        }
        img = postconv;
        p.drawimg(postconv);
    }

    p.matrix1 = function(){
        matrix = [[-1,-1,-1],
                    [-1,9,-1],
                    [-1,-1,-1]];
        msize = 3;
        p.convolute(matrix,msize);
    }
    p.matrix2 = function(){
        matrix = [[-1,-1,-1],
                    [-1,9,-1],
                    [-1,-1,-1]];
        msize = 3;
        p.convolute(matrix,msize);
    }
    p.matrix3 = function(){
        matrix = [[-1,-1,-1],
                    [-1,9,-1],
                    [-1,-1,-1]];
        msize = 3;
        p.convolute(matrix,msize);
    }
    p.matrix4 = function(){
        matrix = [[9,9,9],
                    [9,1,9],
                    [9,9,9]];
        msize = 3;
        p.convolute(matrix,msize);
    }
    p.matrix5 = function(){
        matrix = [[-1,-1,-1,-1,-1],
                    [-1,-1,-1,-1,-1],
                    [-1,-1,9,-1,-1],
                    [-1,-1,-1,-1,-1],
                    [-1,-1,-1,-1,-1],];
        msize = 5;
        p.convolute(matrix,msize);
    }
    p.calcborders = function(){
        let prebord = img;
        prebord.filter(p.GRAY);
        console.log(prebord);
        bord = prebord;
        p.image(bord, 0, 650);
    }

  }, "masking2");
  