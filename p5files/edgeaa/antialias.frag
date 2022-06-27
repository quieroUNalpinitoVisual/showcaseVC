precision mediump float;

uniform sampler2D textureimg;
uniform sampler2D textureedge;
uniform vec2 texOffset;
// we need our interpolated tex coord
varying vec2 texcoords2;

void main() {
  vec4 edgepoint = texture2D(textureedge, texcoords2 + vec2(0.0));
  vec2 tc0 = texcoords2 + vec2(-texOffset.s, -texOffset.t);
  vec2 tc1 = texcoords2 + vec2(         0.0, -texOffset.t);
  vec2 tc2 = texcoords2 + vec2(+texOffset.s, -texOffset.t);
  vec2 tc3 = texcoords2 + vec2(-texOffset.s,          0.0);
  vec2 tc4 = texcoords2 + vec2(         0.0,          0.0);
  vec2 tc5 = texcoords2 + vec2(+texOffset.s,          0.0);
  vec2 tc6 = texcoords2 + vec2(-texOffset.s, +texOffset.t);
  vec2 tc7 = texcoords2 + vec2(         0.0, +texOffset.t);
  vec2 tc8 = texcoords2 + vec2(+texOffset.s, +texOffset.t);

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

  vec4 sum = vec4(0.0);
  for (int i = 0; i < 9; i++) {
    sum += rgba[i];
  }

  //gl_FragColor = vec4(sum.rgb/9, 1.0); 
  
  if( (edgepoint.r > 0.2 ) && (edgepoint.g > 0.2 ) && (edgepoint.b > 0.2 )){
    gl_FragColor = sum*vec4(1.0/9.0);
  }else{
    gl_FragColor = texture2D(textureimg, texcoords2 + vec2(0.0,0.0));
  }
}