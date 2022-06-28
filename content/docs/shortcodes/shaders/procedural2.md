## Offset patterns:

Un ejemplo de un patron compensado (offset patterns) es un muro de ladrillos, donde por cada fila alterna tenemos un ladrillo desplazado en x.

Para simular esto lo que hacemos es saber en que fial desplazamos el ladrillo, esto lo logramos verificando si estamos en una fila par o una impar con la función mod() of 2.0:  y = mod(x,2.0).

oprima cualquier tecla para reiniciar:

{{< p5-iframe ver="1.4.1" sketch="/showcasevc/p5files/nicholsonSketch/procedural2/sketch.js" lib1="https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.js" lib2="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="440" height="440" >}}

### Implementación:

En la línea 15 del  código del fragment es donde estamos usando la función para "detectar" filas impares y darles un desplazamiento de media unidad en x.

En la línea 33 se amplía la relación de aspecto del sistema de coordenadas para imitar el aspecto de un "ladrillo moderno".

{{< expand truchet.frag >}}

    // Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

    #ifdef GL_ES
    precision mediump float;
    #endif

    uniform vec2 u_resolution;
    uniform float u_time;
    uniform float u_zoom;

    vec2 brickTile(vec2 _st, float _zoom) {

        _st *= u_zoom;

        // Here is where the offset is happening
        _st.x += step(1., mod(_st.y,2.0)) * 0.5;

        return fract(_st);
    }

    float box(vec2 _st, vec2 _size){

        _size = vec2(0.5)-_size*0.5;
        vec2 uv = smoothstep(_size,_size+vec2(1e-4),_st);
        uv *= smoothstep(_size,_size+vec2(1e-4),vec2(1.0)-_st);
        return uv.x*uv.y;
    }

    void main(void){

        vec2 st = gl_FragCoord.xy/u_resolution.xy;
        vec3 color = vec3(0.0);

        // Modern metric brick of 215mm x 102.5mm x 65mm
        // http://www.jaharrison.me.uk/Brickwork/Sizes.html
        st /= vec2(2.15,0.65)/1.5;

        // Apply the brick tiling
        st = brickTile(st,5.0);

        color = vec3(box(st,vec2(0.9)));

        gl_FragColor = vec4(color,1.0);
    }

{{< /expand >}}

Podemos agregar una linea que asigne color al sistema de coordenadas asignado a rojo y verde: 

oprima cualquier tecla para reiniciar:

{{< p5-iframe ver="1.4.1" sketch="/showcasevc/p5files/nicholsonSketch/procedural3/sketch.js" lib1="https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.js" lib2="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="440" height="440" >}}

{{< expand truchet.frag >}}

    // Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

    #ifdef GL_ES
    precision mediump float;
    #endif

    uniform vec2 u_resolution;
    uniform float u_time;
    uniform float u_zoom;

    vec2 brickTile(vec2 _st, float _zoom) {

        _st *= u_zoom;

        // Here is where the offset is happening
        _st.x += step(1., mod(_st.y,2.0)) * 0.5;

        return fract(_st);
    }

    float box(vec2 _st, vec2 _size){

        _size = vec2(0.5)-_size*0.5;
        vec2 uv = smoothstep(_size,_size+vec2(1e-4),_st);
        uv *= smoothstep(_size,_size+vec2(1e-4),vec2(1.0)-_st);
        return uv.x*uv.y;
    }

    void main(void){

        vec2 st = gl_FragCoord.xy/u_resolution.xy;
        vec3 color = vec3(0.0);

        // Modern metric brick of 215mm x 102.5mm x 65mm
        // http://www.jaharrison.me.uk/Brickwork/Sizes.html
        st /= vec2(2.15,0.65)/1.5;

        // Apply the brick tiling
        st = brickTile(st,5.0);

        color = vec3(box(st,vec2(0.9)));
        color = vec3(st,0.0);
        gl_FragColor = vec4(color,1.0);
    }

{{< /expand >}}

O incluso aplicarlo a una forma diferente: 

oprima cualquier tecla para reiniciar:

{{< p5-iframe ver="1.4.1" sketch="/showcasevc/p5files/nicholsonSketch/procedural4/sketch.js" lib1="https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.js" lib2="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="440" height="440" >}}

### **Conclusiones:**

- Este comportamiento lo podemos ejecutar con columnas , con columans y filas al tiempo y hacer que se muevan sincronicamente en diferentes direcciones, manteniendo el deplazamiento de coordenadas.

- En esta pagian hay 3 sketch con textura en iguras 3d y todas se ejecutan fluidamente sin consumir demasiados recursos.