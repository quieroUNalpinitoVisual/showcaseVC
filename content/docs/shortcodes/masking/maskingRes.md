# Masking Results

## Conceptos

Lo primero que se realizó fue programar la función que permitirá la convolución de un kernel sobre una imagen de acuerdo con lo encontrado en [wikipedia](https://en.wikipedia.org/wiki/Kernel_(image_processing))

{{< expand >}}
### Wiki pseudocode
    for each image row in input image:
        for each pixel in image row:
            set accumulator to zero
            for each kernel row in kernel:
                for each element in kernel row:
                    if element position  corresponding* to pixel position then
                        multiply element value  corresponding* to pixel value
                        add result to accumulator
                 endif
            set output image pixel to accumulator
{{< /expand >}}

la implementación concreta es la siguiente

{{< expand >}}
### p5 code
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
                        let green = p.green(img.get(xpos,ypos));
                        let blue = p.blue(img.get(xpos,ypos));
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
{{< /expand >}}

Una derivada parcial nos indica como se mueve la pendiente en ese punto para la funcion (imagen)


![derivada parcial](/showcasevc/sketches/partial_derivative.png)
https://mathinsight.org/partial_derivative_limit_definition

codigo de detección de bordes:

{{< expand >}}
### p5 code
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
{{< /expand >}}

## Imagenes convolucionadas y bordes

Los siguientes resultados poseen un error en la funcion de convolucion que intercambia el valor de verdes por azules y viceversa, visible en el resultado de la convolución, pero esto mismo debido a que es una permutación no afecta el calculo de bordes el cual se hace a partir de la imagen en escala de grises.

### imagen base:

![Lenna](/showcasevc/sketches/lenna.png)

### identidad / sin mascara :

![Identidad](/showcasevc/sketches/ident.png)

### sharpen :

![Sharpen](/showcasevc/sketches/sharpen.png)

### ridge :

![Ridge1](/showcasevc/sketches/ridge1.png)
![Ridge2](/showcasevc/sketches/ridge2.png)

### box blur:

![box blur](/showcasevc/sketches/boxblur.png)

### composition:

![composition](/showcasevc/sketches/maskcomposition.png)