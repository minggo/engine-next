uniform sampler2D texture;
varying vec2 uv0;
varying vec4 v_fragmentColor;

void main () {
  vec4 o = v_fragmentColor;
  o *= texture2D(texture, uv0);
  gl_FragColor = o;
}