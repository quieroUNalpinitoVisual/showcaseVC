# Image Processing

En esta sección tambien vamos a tener como referencia nuestra primera entrega en la sección de masking para afianzar los conceptos y comparar el rendimiento.

### **Desarrollo de los Ejercicios**
#### Controles
Haz click y presiona una de las siguientes teclas:

    ⬅️ Resetear
    ➡️ Aplicar Máscara de Ridge

#### Imagen
{{< p5-iframe ver="1.4.1" sketch="/showcasevc/p5files/shadersJohan/imageProc.js" lib1="https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.js" lib2="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="530" height="530" >}}

#### Video 

(puede tardar en cargar unos segundos)     
{{< p5-iframe ver="1.4.1" sketch="/showcasevc/p5files/shadersJohan/videoProc.js" lib1="https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.js" lib2="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="330" height="330" >}}

## Implementación

#### Imagen

{{< expand >}}
    let baseimg;
    let rstimg;
    let maskShader;

    function preload(){
        maskShader = readShader("/showcasevc/p5files/shadersJohan/mask.frag",{varyings: Tree.texcoords});
        baseimg = loadImage('/showcasevc/sketches/mayonesito.jpg');
        rstimg = baseimg;
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
        image(rstimg,-250,-250);
        shader(maskShader);
        maskShader.setUniform('texture',baseimg);
        maskShader.setUniform('texOffset',[1/500,1/500]);
        maskShader.setUniform('mask',[-1,-1,-1,-1,8,-1,-1,-1,-1]);
        maskShader.setUniform('dosom',false);
    }

    function keyPressed () {

        if(keyCode === RIGHT_ARROW){
            applyMask();
        }
        if(keyCode === LEFT_ARROW){
            resetMask();
        }
    }

    function resetMask(){
        maskShader.setUniform('dosom',false);
        quad(-250,-250,250,-250,250,250,-250,250);
    }

    function applyMask(){
        maskShader.setUniform('dosom',true);
        quad(-250,-250,250,-250,250,250,-250,250);
    }
{{< /expand >}}

#### Video

{{< expand >}}
    let basevid;
    let maskShader;
    let isVidReady = false;
    let dosom = false;

    function onVideoLoad(){
        isVidReady = true;
    }

    function preload(){
        maskShader = readShader("/showcasevc/p5files/shadersJohan/mask.frag",{varyings: Tree.texcoords});
        basevid = createVideo('/showcasevc/sketches/fingers.webm',onVideoLoad());
        basevid.hide();
    }

    function setup() {
        createCanvas(300, 300, WEBGL);
        basevid.size(300,300);
        noStroke();
    }
    
    function draw() {
        background(0);
        if(isVidReady){
            quad(-150,-150,150,-150,150,150,-150,150);
        }
        basevid.loop();
        shader(maskShader);
        maskShader.setUniform('texture',basevid);
        maskShader.setUniform('texOffset',[1/300,1/300]);
        maskShader.setUniform('mask',[-1,-1,-1,-1,8,-1,-1,-1,-1]);
        maskShader.setUniform('dosom',dosom);
    }

    function keyPressed () {
        if(keyCode === RIGHT_ARROW){
            applyMask();
        }
        if(keyCode === LEFT_ARROW){
            resetMask();
        }
    }

    function resetMask(){
        dosom = false;
        maskShader.setUniform('dosom',dosom);
        if(isVidReady){
            quad(-150,-150,150,-150,150,150,-150,150);
        }
    }

    function applyMask(){
        dosom = true;
        maskShader.setUniform('dosom',dosom);
        if(isVidReady){
            quad(-150,-150,150,-150,150,150,-150,150);
        }
    }

{{< /expand >}}

#### mask.frag

{{< expand >}}

    precision mediump float;

    uniform sampler2D texture;
    uniform vec2 texOffset;
    // holds the 3x3 kernel
    uniform float mask[9];
    uniform bool dosom;

    // we need our interpolated tex coord
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

## Conclusiones

- La aplicacion de máscaras mediante el uso de shaders es notablemente más rapido gracias al uso de la tarjeta gráfica del computador. Esto se puede hacer tangible no solo en la velocidad del proceso, sino que tambien en el hecho de que podemos implementar el mismo shader para imagenes en video y poder realizar el proceso en tiempo real en lugar de tener que esperar aproximadamente 20 segundos +/- 1, a poder realizarlo varias veces por segundo.
- La cantidad de código escrito por nosotros es menor y mas eficiente gracias a las librerias y los shaders que se usaron.
