
export interface ProgramInfo {
	program: WebGLProgram;
	attribLocations: {
		vertexPosition: number;
		vertexNormal: number | null;
		vertexColour: number;
	};
	uniformLocations: {
		projectionMatrix: WebGLUniformLocation | null;
		normalMatrix: WebGLUniformLocation | null;
		modelViewMatrix: WebGLUniformLocation | null;
	};
}

export interface Buffer {
	position: WebGLBuffer;
	normal: WebGLBuffer;
	colour: WebGLBuffer;
	indices: WebGLBuffer;
};
