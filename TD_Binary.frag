
// Example Pixel Shader
uniform vec2 _MainTex_TexelSize;
uniform vec2 _DitherTex_TexelSize;

uniform float _Scale;
uniform vec3 _Color0;
uniform vec3 _Color1;
uniform float _Opacity;

out vec4 fragColor;

void main()
{
    vec4 source = texture(sTD2DInputs[0], vUV.st);
    vec2 uv = vUV.st;

	vec2 dither_uv = uv * _DitherTex_TexelSize;
	dither_uv /= _MainTex_TexelSize * _Scale;
	float dither = texture(sTD2DInputs[1], dither_uv).a + 0.5 / 256;
	
	float rlum = 0.298912 * source.r + 0.586611 * source.g + 0.114478 * source.b;
	vec3 rgb = rlum < dither ? _Color0 : _Color1;
	vec4 color = vec4(mix(source.rgb, rgb, _Opacity), source.a);
	fragColor = TDOutputSwizzle(color);
}
