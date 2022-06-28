---
bookCollapseSection: true
---
# Shaders 

## Fragment Shaders


## Introducción:

Como etapa final de la materia dimos un vistazo al tema de shaders y su aplicación en distintos ejemplos expuestos por el profesor, como lo son Coloring, Testuring, Image Processing, and Procedural Texturing. Y para esta entrega final profundizamos en cada uno de estos temas e hicimos nuestras propias modificaciones y propias implementaciones para entender y mostrar que nuevas cosas se pueden hacer con shaders.

Adicionalmente aplicamos estos conocimientos adquiridos a una entrega anterior en la que se aplicaron tecnicas de antialising, obteniendo unos resultados interesantes.

## Revisión de literatura/Antecedentes:

### Shader (Sombreador):

Es un programa que ejecuta o realiza cálculos matematicos para manipular los atributos de una o varias primitivas gráficas. Es una tencnología que ha experimentado una rápida evolución destinada a proporcionar al programador una interacción con la unidad de procesamiento gráfico (GPU) hasta ahora imposible. Los sombreadores son utilizados para realizar transformaciones de vértices o coloreado de píxeles, entre otras labores, con el propósito de crear efectos especiales, como iluminación, fuego o niebla.

Las unidades que ejecutan los programas shaders están en todas las GPU y a día de hoy hay decenas de estas en cada GPU, incluyendo las de gama baja. Desde el momento en que para un procesador un píxel, un triángulo, un vértice o el mapa de una proteína no son más que datos, las unidades que se utilizan para ejecutar estos programas son iguales independientemente del tipo de shader.

### Vertex Shader: 

En español Sombreador de vértices, es una herramienta capaz de trabajar con la estructura de vértices de figuras modeladas en 3D, y realizar operaciones matemáticas sobre ella para definir colores, texturas e incidencia de la luz.

<img src="../../../images/shaders/vertexShader.png"  />

### Fragment Shader:

En español El sombreador de fragmentos, se encarga de calcular la salida de color de sus píxeles.

Un sombreador de fragmentos es lo mismo que un sombreador de píxeles. 

Una diferencia principal es que un sombreador de vértices puede manipular los atributos de los vértices los cuáles son los puntos de las esquinas de tus polígonos. 

El sombreador de fragmentos, por otro lado, se encarga de cómo se ven los píxeles entre los vértices. Se interpolan entre los vértices definidos siguiendo reglas específicas.


#### Referencias
[The Book Shaders (Vivo, Patricio & Lowe, Jen)](https://thebookofshaders.com/)

[Hard Zone](https://hardzone.es/reportajes/que-es/mesh-shaders/)

[Vertex Shader](https://es.wikipedia.org/wiki/Sombreador_de_v%C3%A9rtices)