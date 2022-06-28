# Edge Anti Aliasing

Seccion de pruebas de el algoritmo propuesto para realizar Edge AA con shaders. Esta sección es una continuación de anteriores entregas en las cuales ya habiamos tratado el tema de mascaras de convolución mediante software y sus efectos en la detección de bordes ademas de nuestra entrega acerca de los algoritmos de Super Sampling.

### **Pruebas del Algoritmo**
#### Controles 🕹️
Haz click y presiona una de las siguientes teclas:

<!--    ⬆️ Resetear -->
    ⬅️ Aplicar Máscara de Ridge
    ➡️ Edge Anti Aliasing

{{< p5-iframe ver="1.4.1" sketch="/showcasevc/p5files/edgeaa/edgeaa.js" lib1="https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.js" lib2="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="530" height="530" >}}

## Implementación

Para logar implementar lo que haria el algoritmo de Edge AA hicimos uso de dos conjuntos de shaders distintos, uno para poder utilizar la mascara de convolucion correspondiente a Ridge para guardar en un archivo que despues usariamos como insumo para nuestro shader custom basado en mascaras que realiza el suavizado de las texturas mediante promedios de colores en un area de 3x3 circundante al borde solo en los lugares donde el color de la mascara de ridge es muy marcada ( con un valor de 0.2 en todas las componentes de color).

#### edgeaa.js

{{< expand >}}
    let baseimg;
    let edgemask;
    let antialias;
    let edgeimg;
    let edged = false;

    function preload(){
        edgemask = readShader("/showcasevc/p5files/edgeaa/edgemask.frag",{varyings: Tree.texcoords});
        antialias = readShader("/showcasevc/p5files/edgeaa/antialias.frag",{varyings: Tree.texcoords});
        baseimg = loadImage('/showcasevc/sketches/mayonesito.jpg');
        edgeimg = loadImage('/showcasevc/sketches/bordesmayonesito.png');
    }

    function setup() {
        createCanvas(500, 500, WEBGL);
        noStroke();
        noLoop();
        textureMode(NORMAL);
        loadPixels();
    }

    function draw() {
        background(0);
        image(baseimg,-250,-250);
    }

    function keyPressed () {

        if(keyCode === RIGHT_ARROW){
            applyAA();
        }
        if(keyCode === LEFT_ARROW){
            applyMask();
        }
        if(keyCode === UP_ARROW){
            resetImg();
        }
    }

    function resetImg(){
        edged = false;
        edgemask.setUniform('dosom',false);
        quad(-250,-250,250,-250,250,250,-250,250);
    }

    function applyAA(){
        if(edged){
            shader(antialias);
            antialias.setUniform('textureimg',baseimg);
            antialias.setUniform('textureedge',edgeimg);
            antialias.setUniform('texOffset',[1/500,1/500]);
            quad(-250,-250,250,-250,250,250,-250,250);
        }
    }

    function applyMask(){
        background(0);
        shader(edgemask);
        edgemask.setUniform('dosom',true);
        edgemask.setUniform('texture',baseimg);
        edgemask.setUniform('texOffset',[1/500,1/500]);
        edgemask.setUniform('mask',[-1,-1,-1,-1,8,-1,-1,-1,-1]);
        quad(-250,-250,250,-250,250,250,-250,250);
        edged = true;
    }

{{< /expand >}}

#### edgemask.frag

{{< expand >}}
    precision mediump float;

    uniform sampler2D texture;
    uniform vec2 texOffset;
    // holds the 3x3 kernel
    uniform float mask[9];
    uniform bool dosom;

    varying vec2 texcoords2;

    void main() {
    // 1. Use offset to move along texture space.
    // In this case to find the texcoords of the texel neighbours.
    vec2 tc0 = texcoords2 + vec2(-texOffset.s, -texOffset.t);
    vec2 tc1 = texcoords2 + vec2(         0.0, -texOffset.t);
    vec2 tc2 = texcoords2 + vec2(+texOffset.s, -texOffset.t);
    vec2 tc3 = texcoords2 + vec2(-texOffset.s,          0.0);
    // origin (current fragment texcoords)
    vec2 tc4 = texcoords2 + vec2(         0.0,          0.0);
    vec2 tc5 = texcoords2 + vec2(+texOffset.s,          0.0);
    vec2 tc6 = texcoords2 + vec2(-texOffset.s, +texOffset.t);
    vec2 tc7 = texcoords2 + vec2(         0.0, +texOffset.t);
    vec2 tc8 = texcoords2 + vec2(+texOffset.s, +texOffset.t);

    // 2. Sample texel neighbours within the rgba array
    vec4 rgba[9];
    rgba[0] = texture2D(texture, tc0);
    rgba[1] = texture2D(texture, tc1);
    rgba[2] = texture2D(texture, tc2);
    rgba[3] = texture2D(texture, tc3);
    rgba[4] = texture2D(texture, tc4);
    rgba[5] = texture2D(texture, tc5);
    rgba[6] = texture2D(texture, tc6);
    rgba[7] = texture2D(texture, tc7);
    rgba[8] = texture2D(texture, tc8);

    // 3. Apply convolution kernel
    vec4 convolution;
    for (int i = 0; i < 9; i++) {
        convolution += rgba[i]*mask[i];
    }

    // 4. Set color from convolution
    gl_FragColor = dosom ? vec4(convolution.rgb, 1.0) : rgba[4]; 
    }
{{< /expand >}}

#### antialias.frag

{{< expand >}}
    precision mediump float;

    uniform sampler2D textureimg;
    uniform sampler2D textureedge;
    uniform vec2 texOffset;
    // we need our interpolated tex coord
    varying vec2 texcoords2;

    void main() {
    vec4 edgepoint = texture2D(textureedge, texcoords2 + vec2(0.0));
    vec2 tc0 = texcoords2 + vec2(-texOffset.s, -texOffset.t);
    vec2 tc1 = texcoords2 + vec2(         0.0, -texOffset.t);
    vec2 tc2 = texcoords2 + vec2(+texOffset.s, -texOffset.t);
    vec2 tc3 = texcoords2 + vec2(-texOffset.s,          0.0);
    vec2 tc4 = texcoords2 + vec2(         0.0,          0.0);
    vec2 tc5 = texcoords2 + vec2(+texOffset.s,          0.0);
    vec2 tc6 = texcoords2 + vec2(-texOffset.s, +texOffset.t);
    vec2 tc7 = texcoords2 + vec2(         0.0, +texOffset.t);
    vec2 tc8 = texcoords2 + vec2(+texOffset.s, +texOffset.t);

    vec4 rgba[9];
    rgba[0] = texture2D(textureimg, tc0);
    rgba[1] = texture2D(textureimg, tc1);
    rgba[2] = texture2D(textureimg, tc2);
    rgba[3] = texture2D(textureimg, tc3);
    rgba[4] = texture2D(textureimg, tc4);
    rgba[5] = texture2D(textureimg, tc5);
    rgba[6] = texture2D(textureimg, tc6);
    rgba[7] = texture2D(textureimg, tc7);
    rgba[8] = texture2D(textureimg, tc8);

    vec4 sum = vec4(0.0);
    for (int i = 0; i < 9; i++) {
        sum += rgba[i];
    }
    
    if( (edgepoint.r > 0.2 ) && (edgepoint.g > 0.2 ) && (edgepoint.b > 0.2 )){
        gl_FragColor = sum*vec4(1.0/9.0);
    }else{
        gl_FragColor = texture2D(textureimg, texcoords2 + vec2(0.0,0.0));
    }
    }
{{< /expand >}}

## Resultados

![Pre AA](/showcasevc/sketches/comparacionmayonesitos.png)

Como podemos ver en la anterior imagen los colores presentes bajo el ojo pero sobre el pico del pato de la imagen estan intactos, donde no se presentaban bordes. Pero en una zona mas rica en bordes como lo es a la izquierda del ojo y en el ojo mismo nuestro algoritmo realizo el trabajo de suavizado perfectamente para evitar los escalones en cada pixel y tener una imagen menos agreste en los bordes.

## Conclusiones

- El algoritmo de EdgeAA nos permite mas que una mejor aplicacion del algoritmo de Super Sampling, una versión mas eficiente de esta misma. Esto debido a que la variación que realiza respecto a otros métodos es la no aplicación de forma general a la imagen sino en áreas especificas y con un énfasis que se puede acomodar por el usuario o parametrizador
- el valor de corte de 0.2 en las componentes de color de la imagen de bordes nos permitio una aplicacion aceptable en la imagen sin llegar a los artefactos que se llegan a presentar si realizaramos un corte en 0.5 o en 0.1 por el sobreuso o el poco uso del suavizado.
