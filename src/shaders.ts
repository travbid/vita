

// Vertex shader program
export const vsSource: string = `
attribute vec4 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec4 aVertexColour;

uniform mat4 uNormalMatrix;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying lowp vec4 vColour;
varying highp vec3 vLighting;

void main() {
	gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
	vColour = aVertexColour;

	// Apply lighting effect
	highp vec3 ambientLight = vec3(0.1, 0.1, 0.1);
	highp vec3 directionalLightColor = vec3(1, 1, 1);
	highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

	highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

	highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
	vLighting = ambientLight + (directionalLightColor * directional);
}
`;

export const gsSource: string = `
varying in vec3 vPos[3];
varying in vec3 vNorm[3];
varying out vec3 worldNorm;
varying out vec3 worldPos;
uniform mediump vec2 WIN_SCALE;
noperspective varying vec3 dist;

void main() {
	mediump vec2 p0 = WIN_SCALE * gl_PositionIn[0].xy / gl_PositionIn[0].w;
	mediump vec2 p1 = WIN_SCALE * gl_PositionIn[1].xy / gl_PositionIn[1].w;
	mediump vec2 p2 = WIN_SCALE * gl_PositionIn[2].xy / gl_PositionIn[2].w;
	mediump vec2 v0 = p2-p1;
	mediump vec2 v1 = p2-p0;
	mediump vec2 v2 = p1-p0;
	mediump float area = abs(v1.x*v2.y - v1.y * v2.x);

	dist = vec3(area/length(v0),0,0);
	worldPos = vPos[0];
	worldNorm = vNorm[0];
	gl_Position = gl_PositionIn[0];
	EmitVertex();

	dist = vec3(0,area/length(v1),0);
	worldPos = vPos[1];
	worldNorm = vNorm[1];
	gl_Position = gl_PositionIn[1];
	EmitVertex();

	dist = vec3(0,0,area/length(v2));
	worldPos = vPos[2];
	worldNorm = vNorm[2];
	gl_Position = gl_PositionIn[2];
	EmitVertex();

	EndPrimitive();
}
`;

export const fsSource: string = `
varying lowp vec4 vColour;
varying highp vec3 vLighting;

void main() {
	gl_FragColor = vec4(vColour.rgb * vLighting, vColour.a);
}
`;