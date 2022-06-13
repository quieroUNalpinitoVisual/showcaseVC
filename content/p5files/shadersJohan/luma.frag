precision mediump float;

// uniforms are defined and sent by the sketch
uniform sampler2D texture;
uniform int mode;

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;

// returns luma of given texel
float luma(vec3 texel) {
  if(mode == 1){
    return 0.333 * texel.r + 0.333 * texel.g + 0.333 * texel.b;
  }
  if(mode == 2){
    float max = 0;
    float min = 0;
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
    return (max+min)/2;
  }
  if(mode == 3){
    return 0.333 * texel.r + 0.333 * texel.g + 0.333 * texel.b;
  }
}

void main() {
  // texture2D(texture, texcoords2) samples texture at texcoords2 
  // and returns the normalized texel color
  vec4 texel = texture2D(texture, texcoords2);
  gl_FragColor = vec4((vec3(luma(texel.rgb))), 1.0);
}