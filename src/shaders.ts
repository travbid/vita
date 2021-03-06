
export const vsSource = `
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

export const fsSource = `
varying lowp vec4 vColour;
varying highp vec3 vLighting;

void main() {
	gl_FragColor = vec4(vColour.rgb * vLighting, vColour.a);
	// gl_FragColor = vColour;
}
`;


export const vsEdgeSource = `
attribute vec4 aVertexPosition;
// attribute vec3 aVertexNormal;
attribute vec4 aVertexColour;

// uniform mat4 uNormalMatrix;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying lowp vec4 vColour;
// varying highp vec3 vLighting;

void main() {
	gl_Position = ` +
	`(uProjectionMatrix * uModelViewMatrix * aVertexPosition) - vec4(0.0, 0.0, 0.00048828125, 0.0);
	vColour = aVertexColour;
}
`;

export const fsEdgeSource = `
varying lowp vec4 vColour;
// varying highp vec3 vLighting;

void main() {
	gl_FragColor = vColour;
}
`;
