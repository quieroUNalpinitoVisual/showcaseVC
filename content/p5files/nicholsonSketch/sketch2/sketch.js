let lumaShader;
let img;
let grey_scale;
let hsl

function preload() {
  lumaShader = readShader('/showcasevc/p5files/nicholsonSketch/sketch2/luma.frag', { varyings: Tree.texcoords2 });
  // image source: https://en.wikipedia.org/wiki/HSL_and_HSV#/media/File:Fire_breathing_2_Luc_Viatour.jpg
  img = loadImage('/showcasevc/sketches/images3/descarga.png');
}

function setup() {
  createCanvas(700, 500, WEBGL);
  noStroke();
  textureMode(NORMAL);
  shader(lumaShader);
  grey_scale = createCheckbox('luma', false);
  grey_scale.position(10, 10);
  grey_scale.style('color', 'white');
  hsl = createCheckbox('hsl', false);
  hsl.position(10, 25);
  hsl.style('color', 'white');
  lumaShader.setUniform('texture', img);
}

function draw() {
  background(0);
  quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);
}

function keyPressed() {
  if (key == 'g') {
    hsl.checked(false)
    grey_scale.checked(!(grey_scale.checked()))
    lumaShader.setUniform('grey_scale', grey_scale.checked());
    lumaShader.setUniform('hsl', hsl.checked());
    lumaShader.setUniform('texture', img);
}
  
  if (key == 'l') {
    grey_scale.checked(false)
    hsl.checked(!(hsl.checked()))
    lumaShader.setUniform('hsl', hsl.checked());
    lumaShader.setUniform('grey_scale', grey_scale.checked());
    lumaShader.setUniform('texture', img);
  }}
