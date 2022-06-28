# Procedural Texturing
En esta sección aplicamos el ejemplo visto en clase desde el cual se generaba una textura proceduralmente aplicando el patrón *truchet tiles*, pero en este caso, sobre un objeto distinto.

### **Desarrollo del Ejercicio**

El objetivo de la texturización procesal es generar una textura mediante un algoritmo de tal manera que el resultado se pueda asignar a una forma como textura. La textura de procedimiento requiere el uso de un objeto de búfer de cuadro que en p5.js se implementa como un objeto p5.Graphics.

## Truchet Tiles: 

En el caso de mosaicos Truchet, donde un solo elemento de diseño se puede presentar de cuatro maneras diferentes:

<img src="../../../../images/shaders/truchet-00.png"  />

Al cambiar el patrón entre mosaicos, es posible construir un conjunto infinito de diseños complejos.

{{< p5-iframe ver="1.4.1" sketch="/showcasevc/p5files/nicholsonSketch/procedural/sketch.js" lib1="https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.js" lib2="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="440" height="440" >}}

{{< expand sketch.js >}}


let pg;
let truchetShader;
let frames=0;
let frames2=0.5;

function preload() {
  // shader adapted from here: https://thebookofshaders.com/09/
  truchetShader = readShader('/showcasevc/p5files/nicholsonSketch/procedural/truchet.frag', { matrices: Tree.NONE, varyings: Tree.NONE });
}

function setup() {
  createCanvas(400, 400, WEBGL);
  // create frame buffer object to render the procedural texture
  pg = createGraphics(400, 400, WEBGL);
  textureMode(NORMAL);
  noStroke();
  pg.noStroke();
  pg.textureMode(NORMAL);
  // use truchetShader to render onto pg
  pg.shader(truchetShader);
  // emitResolution, see:
  // https://github.com/VisualComputing/p5.treegl#macros
  pg.emitResolution(truchetShader);
  // https://p5js.org/reference/#/p5.Shader/setUniform
  truchetShader.setUniform('u_zoom', 3);
  // pg clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  // set pg as texture
  texture(pg);
}

function draw() {
  background(33);
  
  orbitControl();
  rotateZ(frames * 0.005);
  rotateX(frames * 0.005);
  rotateY(frames * 0.005);

  truchetShader.setUniform('u_zoom', int(map(frames2, 0, width, 1, 30)));
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  frames++;
  frames2 = frames2 + 0.5;
  
  sphere(150,200);
}

function mouseMoved() {
  // https://p5js.org/reference/#/p5.Shader/setUniform
  truchetShader.setUniform('u_zoom', int(map(mouseX, 0, width, 1, 30)));
  // pg clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
}

{{< /expand >}}


{{< expand truchet.frag >}}

// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_zoom;

vec2 rotate2D (vec2 _st, float _angle) {
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

vec2 tile (vec2 _st, float _zoom) {
    _st *= u_zoom;
    return fract(_st);
}

vec2 rotateTilePattern(vec2 _st){

    //  Scale the coordinate system by 2x2
    _st *= 2.0;

    //  Give each cell an index number
    //  according to its position
    float index = 0.0;
    index += step(1., mod(_st.x,2.0));
    index += step(1., mod(_st.y,2.0))*2.0;

    //      |
    //  2   |   3
    //      |
    //--------------
    //      |
    //  0   |   1
    //      |

    // Make each cell between 0.0 - 1.0
    _st = fract(_st);

    // Rotate each cell according to the index
    if(index == 1.0){
        //  Rotate cell 1 by 90 degrees
        _st = rotate2D(_st,PI*0.5);
    } else if(index == 2.0){
        //  Rotate cell 2 by -90 degrees
        _st = rotate2D(_st,PI*-0.5);
    } else if(index == 3.0){
        //  Rotate cell 3 by 180 degrees
        _st = rotate2D(_st,PI);
    }

    return _st;
}

void main (void) {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    st = tile(st,3.0);
    st = rotateTilePattern(st);

    // Make more interesting combinations
    st = tile(st,2.0);
    
    st = rotate2D(st,-PI*u_time*0.25);
    //st = rotateTilePattern(st*2.);
    st = tile(st,2.0);
    st = rotate2D(st,PI*u_time*0.25);
    //st = rotateTilePattern(st*2.);
    st = tile(st,2.0);

    // step(st.x,st.y) just makes a b&w triangles
    // but you can use whatever design you want.
    gl_FragColor = vec4(vec3(step(st.x,st.y)),1.0);
}

{{< /expand >}}
### **Implementación**

#### sketch.js
{{< expand >}}

        let pg;
        let truchetShader;
        let frames=0;
        let frames2=100;

        function preload() {
          // shader adapted from here: https://thebookofshaders.com/09/
          truchetShader = readShader('/showcasevc/p5files/nicholsonSketch/procedural/truchet.frag', { matrices: Tree.NONE, varyings: Tree.NONE });
        }

        function setup() {
          createCanvas(400, 400, WEBGL);
          // create frame buffer object to render the procedural texture
          pg = createGraphics(400, 400, WEBGL);
          textureMode(NORMAL);
          noStroke();
          pg.noStroke();
          pg.textureMode(NORMAL);
          // use truchetShader to render onto pg
          pg.shader(truchetShader);
          // emitResolution, see:
          // https://github.com/VisualComputing/p5.treegl#macros
          pg.emitResolution(truchetShader);
          // https://p5js.org/reference/#/p5.Shader/setUniform
          truchetShader.setUniform('u_zoom', 3);
          // pg clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
          pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
          // set pg as texture
          texture(pg);
        }

        function draw() {
          background(33);
          
          orbitControl();
          rotateZ(frames * 0.005);
          rotateX(frames * 0.005);
          rotateY(frames * 0.005);

          truchetShader.setUniform('u_zoom', int(map(frames2*0.1, 0, width, 1, 30)));
          pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
          frames++;
          frames2 = frames2 + 2;
          
          sphere(100,200);
        }

        function mouseMoved() {
          // https://p5js.org/reference/#/p5.Shader/setUniform
          truchetShader.setUniform('u_zoom', int(map(mouseX, 0, width, 1, 30)));
          // pg clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
          pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
        }
{{< /expand >}}
