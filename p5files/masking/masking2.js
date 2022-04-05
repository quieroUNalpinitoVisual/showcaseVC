
new p5((p) => {

    var baseimg, img, bord, button1, button2, button3, button4, button5, button6, buttonbor;

    p.preload = function() {
        img = p.loadImage('/showcasevc/sketches/lenna.png');
        baseimg = p.loadImage('/showcasevc/sketches/lenna.png');
        bord = p.createImage(400,400);
    }

    p.setup = function () {
        p.pixelDensity(1);
        myCanvas = p.createCanvas(400,1500);
        img.resize(400,400);
        baseimg.resize(400,400);
        img.loadPixels();
        baseimg.loadPixels();
        p.drawimg(img);

        button1 = p.createButton('sharpen');
        button1.position(0,500);
        button1.mousePressed(p.matrix1);
        button2 = p.createButton('ridge 1');
        button2.position(0,530);
        button2.mousePressed(p.matrix2);
        button3 = p.createButton('ridge 2');
        button3.position(0,560);
        button3.mousePressed(p.matrix3);
        button4 = p.createButton('identity');
        button4.position(0,590);
        button4.mousePressed(p.matrix4);
        button5 = p.createButton('box blur');
        button5.position(0,620);
        button5.mousePressed(p.matrix5);
        button6 = p.createButton('reset');
        button6.position(0,650);
        button6.mousePressed(p.resetimg);

        bord.loadPixels();
        p.image(bord, 0, 650,400,400);
        buttonbor = p.createButton('borders');
        buttonbor.position(0,1500);
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

    p.convolute = function (matrix){
        img.loadPixels();
        let rtotal = 0.0;
        let gtotal = 0.0;
        let btotal = 0.0;
        let postconv = p.createImage(400,400);
        for (let i = 1; i < 399; i++){
            for (let j = 1; j < 399; j++){
                rtotal = 0.0;
                gtotal = 0.0;
                btotal = 0.0;
                for (let k = -1; k <= 1; k++){
                    for (let l = -1; l <= 1; l++){
                        let xpos = i+k;
                        let ypos = j+l;
                        let red = p.red(img.get(xpos,ypos));
                        let green = p.blue(img.get(xpos,ypos));
                        let blue = p.green(img.get(xpos,ypos));
                        rtotal += red * matrix[k+1][l+1];
                        gtotal += green * matrix[k+1][l+1];
                        btotal += blue * matrix[k+1][l+1];
                    }
                }
                rtotal = p.constrain(rtotal, 0, 255);
                gtotal = p.constrain(gtotal, 0, 255);
                btotal = p.constrain(btotal, 0, 255);
                //console.log(rtotal+' '+gtotal+' '+btotal);
                let c = p.color(rtotal,gtotal,btotal);
                postconv.set(i,j,c);
            }
        }
        postconv.updatePixels();
        img = postconv;
        img.updatePixels();
        p.square(0,200,400);
        p.drawimg(img,0,200);
        //p.histogram();
    }

    p.matrix1 = function(){
        let matrix = [[0,-1,0],
                    [-1,5,-1],
                    [0,-1,0]];
        p.convolute(matrix);
    }
    
    p.matrix2 = function(){
        let matrix = [[0,-1,0],
                    [-1,4,-1],
                    [0,-1,0]];
        p.convolute(matrix);
    }

    p.matrix3 = function(){
        let matrix = [[-1,-1,-1],
                    [-1,8,-1],
                    [-1,-1,-1]];
        p.convolute(matrix);
    }

    p.matrix4 = function(){
        let matrix = [[0,0,0],
                    [0,1,0],
                    [0,0,0]];
        p.convolute(matrix);
    }

    p.matrix5 = function(){
        let matrix = [[1/9,1/9,1/9],
                    [1/9,1/9,1/9],
                    [1/9,1/9,1/9]];
        p.convolute(matrix);
    }

    p.calcborders = function(){
        let prebord = img;
        prebord.filter(p.GRAY);
        console.log(prebord);
        bord = prebord;
        p.image(bord, 0, 1050,400,400);
    }

    p.histogram = function(){
        let histogram;
        for (var x = 0; x < img.width; x+=5) {
            for (var y = 0; y < img.height; y+=5) {
              var loc = (x + y * img.width) * 4;
              var h = pixels[loc];
              var s = pixels[loc + 1];
              var l = pixels[loc + 2];
              var a = pixels[loc + 3];
              b = p.int(l);
              histogram[b]++
            }
        }
        p.stroke(300,100,80);
        p.push();
        p.translate(10,0);
        for (x = 0; x <= maxRange; x++) {
            index = histogram[x];
        
            y1=p.int(p.map(index, 0, p.max(histogram), height, height-200));
                y2 = height
            xPos = p.map(x,0,maxRange,0, width-20)
            p.line(xPos, y1, xPos, y2);
        }
        p.pop();
    }

  }, "masking2");
  