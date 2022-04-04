
new p5((p) => {

    var baseimg, img, bord, button1, button2, button3, button4, button5, button6, buttonbor;

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
        p.drawimg(img);

        button1 = p.createButton('sharpen');
        button1.position(0,500);
        button1.mousePressed(p.matrix1);
        button2 = p.createButton('ridge');
        button2.position(0,530);
        button2.mousePressed(p.matrix2);
        button3 = p.createButton('m3 0');
        button3.position(0,560);
        button3.mousePressed(p.matrix3);
        button4 = p.createButton('m3 1 (azul)');
        button4.position(0,590);
        button4.mousePressed(p.matrix4);
        button5 = p.createButton('m3 1 al 9');
        button5.position(0,620);
        button5.mousePressed(p.matrix5);
        button6 = p.createButton('reset');
        button6.position(0,650);
        button6.mousePressed(p.resetimg);

        bord.resize(400,400);
        p.image(bord, 0, 650,400,400);
        buttonbor = p.createButton('borders');
        buttonbor.position(0,1100);
        buttonbor.mousePressed(p.calcborders);
    };

    p.drawimg = function(showimg){
        p.square(0,200,400);
        showimg.updatePixels();
        p.image(showimg, 0, 200,400,400);
    }

    p.resetimg = function(){
        baseimg.updatePixels();
        img = baseimg;
        img.updatePixels();
        p.drawimg(img);
    }

    p.convolute = function (matrix, matrixsize){
        let rtotal = 0.0;
        let gtotal = 0.0;
        let btotal = 0.0;
        let preconv = img;
        let postconv = img;
        let loc = 0;
        for (let i = 1; i < 399; i++){
            for (let j = 1; j < 399; j++){
                loc = (i+400*j)*4;
                rtotal = 0.0;
                gtotal = 0.0;
                btotal = 0.0;
                for (let k = 0; k < matrixsize; k++){
                    for (let l = 0; l < matrixsize; l++){
                        rtotal += (preconv.pixels[loc]) * matrix[k][l];
                        gtotal += (preconv.pixels[loc + 1]) * matrix[k][l];
                        btotal += (preconv.pixels[loc + 2]) * matrix[k][l];
                    }
                }
                rtotal = p.constrain(rtotal, 0, 255);
                gtotal = p.constrain(gtotal, 0, 255);
                btotal = p.constrain(btotal, 0, 255);
                let c = p.color(rtotal,gtotal,btotal);
                postconv.pixels[loc] = p.red(c);
                postconv.pixels[loc + 1] = p.green(c);
                postconv.pixels[loc + 2] = p.blue(c);
                postconv.pixels[loc + 3] = p.alpha(c);
            }
        }
        postconv.updatePixels();
        img = postconv;
        img.updatePixels();
        p.square(0,200,400);
        p.drawimg(img,0,200);
    }

    p.matrix1 = function(){
        let matrix = [[2,1,2],
                    [1,7,1],
                    [2,1,2]];
        let msize = 3;
        p.convolute(matrix,msize);
    }
    
    p.matrix2 = function(){
        let matrix = [[1,1,1],
                    [1,9,1],
                    [1,1,1]];
        let msize = 3;
        p.convolute(matrix,msize);
    }

    p.matrix3 = function(){
        let matrix = [[0,0,0],
                    [0,0,0],
                    [0,0,0]];
        let msize = 3;
        p.convolute(matrix,msize);
    }

    p.matrix4 = function(){
        let matrix = [[1,1,1],
                    [1,1,1],
                    [1,1,1]];
        let msize = 3;
        p.convolute(matrix,msize);
    }

    p.matrix5 = function(){
        let matrix = [[0,1,0],
                    [0,0,0],
                    [0,0,0]];
        let msize = 3;
        p.convolute(matrix,msize);
    }

    p.calcborders = function(){
        let prebord = img;
        prebord.filter(p.GRAY);
        console.log(prebord);
        bord = prebord;
        p.image(bord, 0, 650,400,400);
    }

  }, "masking2");
  