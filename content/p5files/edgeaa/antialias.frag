precision mediump float;

uniform sampler2D textureimg;
uniform sampler2D textureedge;
uniform vec2 texOffset;
// we need our interpolated tex coord
varying vec2 texcoords2;

void main() {
  if(textureedge){

  }
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
  rgba[0] = texture2D(textureimg, tc0);
  rgba[1] = texture2D(textureimg, tc1);
  rgba[2] = texture2D(textureimg, tc2);
  rgba[3] = texture2D(textureimg, tc3);
  rgba[4] = texture2D(textureimg, tc4);
  rgba[5] = texture2D(textureimg, tc5);
  rgba[6] = texture2D(textureimg, tc6);
  rgba[7] = texture2D(textureimg, tc7);
  rgba[8] = texture2D(textureimg, tc8);

  vec4 sum;
  for (int i = 0; i < 9; i++) {
    sum += rgba[i];
  }

  // 4. Set color from convolution
  //gl_FragColor = vec4(sum.rgb/9, 1.0); 
  gl_FragColor = sum*vec4(1/9);
}