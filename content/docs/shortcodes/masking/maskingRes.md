# Masking Results

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
{{< /expand >}}