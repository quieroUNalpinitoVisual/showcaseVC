# Texturing
En esta sección implementamos otros métodos propuestos para la visualización de la luz o el brillo, haciendo uso del *value* de HSV y *lightness* de HSL.

### **Desarrollo de los Ejercicios**
#### Controles 🕹️
Haz click y presiona una de las siguientes teclas:

    ⬅️ Resetear
    ⬇️ HSL ( L )
    ⬆️ HSV ( V )
    ➡️ Promedio

{{< p5-iframe ver="1.4.1" sketch="/showcasevc/p5files/shadersJohan/texturing1.js" lib1="https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.js" lib2="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="530" height="530" >}}


### **Implementación**

#### Promedio RGB
<div style="width:100%;height:0px;position:relative;padding-bottom:56.250%;"><iframe src="https://streamable.com/e/lf0l0i?autoplay=1" frameborder="0" width="100%" height="100%" allowfullscreen allow="autoplay" style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;"></iframe></div>

{{< expand >}}

    if(avg){
      return 0.3333 * texel.r + 0.3333 * texel.g + 0.3333 * texel.b + 0.1;
    }

{{< /expand >}}

#### HSV V
Teniendo en cuenta que el *value* del HSV corresponde al máximo entre los valores del RGB, entonces

<div style="width:100%;height:0px;position:relative;padding-bottom:56.250%;"><iframe src="https://streamable.com/e/q7aemw?autoplay=1" frameborder="0" width="100%" height="100%" allowfullscreen allow="autoplay" style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;"></iframe></div>

{{< expand >}}

    if(val){
      if ( texel.r > texel.g && texel.r > texel.b){
        return texel.r * 1.0 + 0.1;
      } else if (texel.g > texel.r && texel.g > texel.b){
        return texel.g * 1.0 + 0.1;
      } else if (texel.b > texel.r && texel.b > texel.g) {
        return texel.b * 1.0 + 0.1;
      }
    }

{{< /expand >}}

#### HSL L
A partir de los valores RGB se puede obtener el *lightness* a partir de el valor medio de estos, es decir:
<img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/ec4d7f3233b1387bb2aaf0827aaf4e90508d1e76"  />

<div style="width:100%;height:0px;position:relative;padding-bottom:56.250%;"><iframe src="https://streamable.com/e/ij7tot?autoplay=1" frameborder="0" width="100%" height="100%" allowfullscreen allow="autoplay" style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;"></iframe></div>

{{< expand >}}

    if(lum){
      float max = 0.0;
      float min = 0.0;
      if ( texel.r > texel.g && texel.r > texel.b){
        max = texel.r;
      } else if (texel.g > texel.r && texel.g > texel.b){
        max = texel.g;
      } else if (texel.b > texel.r && texel.b > texel.g) {
        max = texel.b;
      }
      if ( texel.r < texel.g && texel.r < texel.b){
        min = texel.r;
      } else if (texel.g < texel.r && texel.g < texel.b){
        min = texel.g;
      } else if (texel.b < texel.r && texel.b < texel.g) {
        min = texel.b;
      }
      return max * 0.5 + min * 0.5 + 0.1;
    }

{{< /expand >}}
