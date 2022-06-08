precision mediump float;

// uniforms are defined and sent by the sketch
uniform sampler2D texture;

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;

// returns luma of given texel
float luma(vec3 texel) {
  return 0.333 * texel.r + 0.333 * texel.g + 0.333 * texel.b;
}

void main() {
  // texture2D(texture, texcoords2) samples texture at texcoords2 
  // and returns the normalized texel color
  vec4 texel = texture2D(texture, texcoords2);
  gl_FragColor = vec4((vec3(luma(texel.rgb))), 1.0);
}