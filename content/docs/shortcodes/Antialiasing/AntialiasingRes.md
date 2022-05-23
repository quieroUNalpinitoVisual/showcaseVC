# Academic report

## Introducción:

El Antialiasing (suavizado, antiescalonamiento o suavizado de bordes) son un conjunto de tecnicas diferentes las cuales quieren evitar el solapamiento de los bordes debida a representar una señal de alta resolución en un monitor de baja resolución.

## Literatura:

### Métodos de AA:

Para lograr el efecto del antialiasing se realizan varios métodos con distintas aproximaciones:

**Super sampling:**   
Basicamente consiste en realizar un análogo de el muestreo de una señal analoga y aumentar el muestreo de la misma para obtener mejores datos.    
**Multi-sampling:**   
Se parece al algoritmo de super sampling pero difiere con el al momento de calculo de cada pixel, donde en SSAA se realizan varios calculos por pixel, en MSAA se realiza solo un calculo por pixel.   
**Edge AA:**   
Es un método propuesto por Deferred Shading en STALKER. En este se realiza primero un calculo de bordes de una imagen y a partir de esto se usa como máscara para saber en que lugares se debe realizar el algoritmo de AA.    
**AA Morfológico:**   
En este método de dividen las areas de pixeles con colores similares en 3 tipos: Z, L y U. Tanto Z como U se pueden componer de tipos L. Ya con las areas de tipo L distinguidas usa modelado de triangulos para realizar el calculo del antialiasing.   
**Deep Learning Super Sample:**   
Este algortimo desarrollado por Nvidia hace uso de los subprocesadores de tipo Tensor en las nuevas graficas de la compañia para implementar Super Sampling mediante una IA.      
**AMD FidelityFX Contrast Adaptive Sharpening:**   
Este algoritmo de antialiasing temporal es desarrollado por AMD technologies y posee una base de codigo abierto para su uso. Ademas de proveer antialiasing, tambien posee funciones de escalamiento y sharpening.    

## Implementación

En el apartado de AntialiasingLab se puede encontrar un ejemplo de implementacion de SSAA basado en la facilidad que tenemos de obtener la referencia real de la figura que estamos modelando, en este caso es un triángulo aleatorio que se dibuja en una cuadrilla.

En la funcion que describimos a continuacion en el expandible encontramos los loops que recorren la simulacion de una imagen de mas alta resolución (64 a 1) y van hayando donde el triangulo discreto (en este caso dibujado con la funcion de Quadrille.js) y el triangulo real que se dibuja con la primitiva triangle() de p5. Damos un peso relativo de acuerdo a cuantos pixeles de la imagen de alta resolucion poseen el triangulo y lo dibujamos luego en la cuadrilla de menor resolución

{{< expand >}}
### p5 code
    function supersamp(){
    let total = 64;
    for (let i = 0; i < QUADDIM ; i ++) {
        for (let j = 0; j < QUADDIM ; j ++) {
        let count = 0;
        let si = LENGTH * i +1;
        let sj = LENGTH * j + 1;
        for (; si < LENGTH * i + LENGTH - 1 ; si ++) {
            for (; sj < LENGTH * j + LENGTH - 1 ; sj ++) {
            if(get(si,sj)[0] != 0){
                count += 1;
            }
            }
        }
        let shade = (count/total)*10;
        board._memory2D[j][i]=[red(0), green(255*shade), blue(0), alpha(255)];
        }
    }
    }
{{< /expand >}}

## Resultados

Pre AA

![Pre AA](/showcasevc/sketches/preaa.png)

Post AA

![Pre AA](/showcasevc/sketches/postaa.png)

## Conclusiones

- El algoritmo es capaz de ser paralelizable para un mejor rendimiento.
- Dada la base tan robusta y sencilla del SS este ha derivado en otros métodos como el DLSS.
- La información inicial deberia ser capaz de obtenerse sin bordes para dibujarlos con AA (QuadrilleJS en los bordes "ïnferiores").
- Junto con el calculo de bordes daria un muy buen resultado con el algoritmo de Edge AA.
- Entre mucho mayor sea la resolucion del super sampling, se obtienen profundidades de colores intermedias mas precisas, pero llega un punto en que
no se notara la diferencia.

## Referencias

[Algoritmos de antialiasing - Gabriel Mañana Guichón](https://repositorio.unal.edu.co/handle/unal/33687)     
[Nvidia DLSS](https://www.nvidia.com/es-la/geforce/technologies/dlss/)     
[AMD FidelityFx CAS](https://gpuopen.com/fidelityfx-cas/)     
[Mas algoritmos de Antialiasing](https://programmerclick.com/article/25221176739/)     
[QuadrilleJS](https://objetos.github.io/p5.quadrille.js/)    