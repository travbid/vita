// @ts-ignore: An import path cannot end with a '.ts' extension
import { ProgramInfo, Buffer } from "./interfaces.ts";
// @ts-ignore: An import path cannot end with a '.ts' extension
import { Mat4 } from "./matrix.ts";

export class RenderModel {
	private readonly programInfo: ProgramInfo;
	public readonly vertices: Float32Array;
	public readonly normals: Float32Array;
	public readonly buffer: Buffer | null;
	private readonly mode: number;
	private readonly numIndices: number = 0;

	constructor(gl: WebGLRenderingContext, programInfo: ProgramInfo, mode: number,
		vertices: Float32Array, normals: Float32Array, indices: Uint32Array,
		colourFormula: (arg0: Float32Array) => void) {
		this.programInfo = programInfo;
		this.vertices = vertices;
		this.normals = normals;
		this.buffer = this.initBuffers(gl, indices, colourFormula);
		this.mode = mode;
		this.numIndices = indices.length;
	}

	private initBuffers(gl: WebGLRenderingContext, indices: Uint32Array,
		colourFormula: (arg0: Float32Array) => void): Buffer | null {
		const positionBuffer: WebGLBuffer | null = gl.createBuffer();
		if (positionBuffer === null) {
			console.log("gl.createBuffer() returned null");
			return null;
		}
		// Select this as the one to apply buffer operations to
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		// Pass the list of positions into WebGL to build the shape.
		gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);

		const normalBuffer: WebGLBuffer | null = gl.createBuffer();
		if (normalBuffer === null) {
			console.log("gl.createBuffer() returned null");
			return null;
		}
		gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, this.normals, gl.STATIC_DRAW);

		// Convert the array of colors into a table for all the vertices.
		const colours = new Float32Array(this.vertices.length * 4 / 3);
		colourFormula(colours);

		const colourBuffer: WebGLBuffer | null = gl.createBuffer();
		if (colourBuffer === null) {
			console.log("gl.createBuffer() returned null");
			return null;
		}
		gl.bindBuffer(gl.ARRAY_BUFFER, colourBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, colours, gl.STATIC_DRAW);

		const indexBuffer: WebGLBuffer | null = gl.createBuffer();
		if (indexBuffer === null) {
			console.log("gl.createBuffer() returned null");
			return null;
		}
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
		// Now send the element array to GL
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

		return {
			position: positionBuffer,
			normal: normalBuffer,
			colour: colourBuffer,
			indices: indexBuffer,
		};
	}

	setup(gl: WebGLRenderingContext): void {
		// console.log("render_model setup");
		// Tell WebGL how to pull out the positions from the position
		// buffer into the vertexPosition attribute.
		const programInfo = this.programInfo;
		if (this.buffer === null) { console.log("!!! model buffer === null"); return; }
		const buffers = this.buffer;
		{
			const numComponents = 3;  // pull out 3 values per iteration
			const type = gl.FLOAT;    // the data in the buffer is 32bit floats
			const normalize = false;  // don't normalize
			const stride = 0;         // how many bytes to get from one set of values to the next
			// 0 = use type and numComponents above
			const offset = 0;         // how many bytes inside the buffer to start from
			gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
			gl.vertexAttribPointer(
				programInfo.attribLocations.vertexPosition,
				numComponents,
				type,
				normalize,
				stride,
				offset);
			gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
		}
		// Tell WebGL how to pull out the normals from
		// the normal buffer into the vertexNormal attribute.
		if (programInfo.attribLocations.vertexNormal !== null) {
			const numComponents = 3;
			const type = gl.FLOAT;
			const normalize = false;
			const stride = 0;
			const offset = 0;
			gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
			gl.vertexAttribPointer(
				programInfo.attribLocations.vertexNormal,
				numComponents,
				type,
				normalize,
				stride,
				offset);
			gl.enableVertexAttribArray(programInfo.attribLocations.vertexNormal);
		}
		{
			const numComponents = 4;
			const type = gl.FLOAT;
			const normalize = false;
			const stride = 0;
			const offset = 0;
			gl.bindBuffer(gl.ARRAY_BUFFER, buffers.colour);
			gl.vertexAttribPointer(
				programInfo.attribLocations.vertexColour,
				numComponents,
				type,
				normalize,
				stride,
				offset);
			gl.enableVertexAttribArray(programInfo.attribLocations.vertexColour);
		}

		// Tell WebGL which indices to use to index the vertices
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
	}

	draw(gl: WebGLRenderingContext, normalMatrix: Mat4, modelViewMatrix: Mat4,
		projMat: Mat4): void {
		gl.useProgram(this.programInfo.program);
		this.setup(gl);

		const uniforms = this.programInfo.uniformLocations;
		gl.uniformMatrix4fv(uniforms.projectionMatrix, false, projMat.transposed());
		if (uniforms.normalMatrix !== null) {
			gl.uniformMatrix4fv(uniforms.normalMatrix, false, normalMatrix.data());
		}
		gl.uniformMatrix4fv(uniforms.modelViewMatrix, false, modelViewMatrix.transposed());

		const offset = 0;
		gl.drawElements(this.mode, this.numIndices, gl.UNSIGNED_SHORT, offset);
	}
}
