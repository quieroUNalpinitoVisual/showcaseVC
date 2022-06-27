precision mediump float;

// uniforms are defined and sent by the sketch
uniform bool grey_scale;
uniform bool hsl;
uniform sampler2D texture;

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;

// returns luma of given texel
float luma(vec3 texel) {
  return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}

float hsl_fun(vec3 texel) {
  return 0.333 * texel.r + 0.333 * texel.g + 0.333 * texel.b;
}

void main() {
  // texture2D(texture, texcoords2) samples texture at texcoords2 
  // and returns the normalized texel color
  vec4 texel = texture2D(texture, texcoords2);
  if (grey_scale){
    gl_FragColor = vec4((vec3(luma(texel.rgb))), 1.0);
  }else if(hsl){
    gl_FragColor = vec4((vec3(hsl_fun(texel.rgb))), 1.0);
  }
  else{
    gl_FragColor = texel;
  }
}