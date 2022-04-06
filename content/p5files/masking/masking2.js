
new p5((p) => {

    var baseimg, img, bord, button1, button2, button3, button4, button5, button6, buttonbor;

    p.preload = function() {
        img = p.loadImage('/showcasevc/sketches/lenna.png');
        baseimg = p.loadImage('/showcasevc/sketches/lenna.png');
        bord = p.createImage(400,400);
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
        button1.position(0,530);
        button1.mousePressed(p.matrix1);
        button2 = p.createButton('ridge 1');
        button2.position(0,560);
        button2.mousePressed(p.matrix2);
        button3 = p.createButton('ridge 2');
        button3.position(0,590);
        button3.mousePressed(p.matrix3);
        button4 = p.createButton('identity');
        button4.position(0,620);
        button4.mousePressed(p.matrix4);
        button5 = p.createButton('box blur');
        button5.position(0,650);
        button5.mousePressed(p.matrix5);
        button6 = p.createButton('reset');
        button6.position(0,680);
        button6.mousePressed(p.resetimg);

        bord.loadPixels();
        p.image(bord, 0, 650,400,400);
        buttonbor = p.createButton('borders');
        buttonbor.position(0,1120);
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
                let c = p.color(rtotal,gtotal,btotal);
                postconv.set(i,j,c);
            }
        }
        postconv.updatePixels();
        img = postconv;
        img.updatePixels();
        p.square(0,200,400);
        p.drawimg(img,0,200);
        console.log('convolucion realizada! :D');
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
        let prebord = p.createImage(400,400);
        for (let i = 0; i < 400; i++) {
            for (let j = 0; j < 400; j++) {
                let g = (p.red(img.get(i,j))+p.green(img.get(i,j))+p.blue(img.get(i,j)))/3;
                prebord.set(i,j,g);
            }
        }
        let med = [0,0,0,0,0,0,0,0,0];
        for (let r = 0; r < 3; r++) {
            for (let i = 1; i < 400-1; i++) {
                for (let j = 1; j < 400-1; j++) {
                    med[0] = prebord.get(i - 1,j - 1);
                    med[1] = prebord.get(i,j - 1);
                    med[2] = prebord.get(i + 1,j - 1);
                    med[3] = prebord.get(i - 1,j);
                    med[4] = prebord.get(i,j);
                    med[5] = prebord.get(i + 1,j);
                    med[6] = prebord.get(i - 1,j + 1);
                    med[7] = prebord.get(i,j + 1);
                    med[8] = prebord.get(i + 1,j + 1);
                    med.sort();
                    prebord.set(i,j,med[4]);
                }
            }
        }
        let gradx = p.zeroes([400,400]);
        let grady = p.zeroes([400,400]);
        for (let i = 0; i < 400-1; i++) {
            for (let j = 0; j < 400-1; j++) {
                gradx[i][j] = p.red(img.get(i+1,j)) - p.red(img.get(i,j));
                grady[i][j] = p.red(img.get(i,j+1)) - p.red(img.get(i,j));
            }
        }
        let gradmag = p.zeroes([400,400]);
        let gradang = p.zeroes([400,400]);
        for (let i = 0; i < 400-1; i++) {
            for (let j = 0; j < 400-1; j++) {
                gradmag[i][j]= p.abs(p.sqrt((gradx[i][j]*gradx[i][j])+(grady[i][j]*grady[i][j])));
                gradang[i][j]= p.atan2(grady[i][j],gradx[i][j]);
            }
        } 
        let borders = p.zeroes([400,400]);
        for (let i = 1; i < 400-1; i++) {
            for (let j = 1; j < 400-1; j++) {
                if (gradang[i][j] > 0 && gradang[i + 1][j] < 0) {
                    borders[i][j] = 1;
                } else if (gradang[i][j] < 0 && gradang[i + 1][j] > 0) {
                    borders[i][j] = 1;
                } else if (gradang[i][j] > 0 && gradang[i][j + 1] < 0) {
                    borders[i][j] = 1;
                } else if (gradang[i][j] < 0 && gradang[i][j + 1] > 0) {
                    borders[i][j] = 1;
                }
            }
        }
        for (let i = 1; i < 400-1; i++) {
            for (let j = 1; j < 400-1; j++) {
                if( borders[i][j-1] == 0 &&
                    borders[i-1][j] == 0 &&
                    borders[i+1][j] == 0 &&
                    borders[i][j+1] == 0 ){
                        borders[i][j] = 0;
                }
            }
        }
        let postbord = p.createImage(400,400);
        for (let i = 0; i < 400; i++) {
            for (let j = 0; j < 400; j++) {
                if (borders[i][j] == 1) {
                    //postbord.set(i, j, p.color(0,0,0));
                    postbord.set(i, j, p.color(255,255,255));
                } else {
                    //postbord.set(i, j, p.color(255,255,255));
                    postbord.set(i, j, p.color(0,0,0));
                }
            }
        }
        postbord.updatePixels();
        console.log(prebord);
        console.log(postbord);
        bord = postbord;
        p.image(bord, 0, 650,400,400);
    }

    p.zeroes = function(dimensions) {
        var array = [];
        for (var i = 0; i < dimensions[0]; ++i) {
            array.push(dimensions.length == 1 ? 0 : p.zeroes(dimensions.slice(1)));
        }
        return array;
    }

  }, "masking2");
  