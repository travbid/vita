// @ts-ignore: An import path cannot end with a '.ts' extension
import { vsSource, fsSource, vsEdgeSource, fsEdgeSource } from "./shaders.ts";
// @ts-ignore: An import path cannot end with a '.ts' extension
import { Mat4 } from "./matrix.ts";

const vertices = new Float32Array(4200);
const normals = new Float32Array(4200);
const vIndices = new Uint32Array(8388);
const eIndices = new Uint32Array(8388);

interface ProgramInfo {
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

interface Buffer {
	position: WebGLBuffer;
	normal: WebGLBuffer;
	colour: WebGLBuffer;
	indices: WebGLBuffer;
};

function facesFormula(colours: Float32Array): void {
	for (let j = 0; j < colours.length * 4; j += 4) {
		colours[j + 0] = 0.2 + Math.random() * 0.45;
		colours[j + 1] = 0.2 + Math.random() * 0.7;
		colours[j + 2] = 0.96;
		colours[j + 3] = 0.5;
	}
}

function edgesFormula(colours: Float32Array): void {
	for (let j = 0; j < colours.length * 4; j += 4) {
		colours[j + 0] = 1.0;
		colours[j + 1] = 1.0;
		colours[j + 2] = 1.0;
		colours[j + 3] = 0.1;
	}
}

class RenderModel {
	private programInfo: ProgramInfo;
	private buffer: Buffer | null;
	private mode: number;
	private numIndices: number = 0;
	// public colourFormula: (arg0: Float32Array) => void = edgesFormula;
	constructor(gl: WebGLRenderingContext, programInfo: ProgramInfo, mode: number, indices: Uint32Array, colourFormula: (arg0: Float32Array) => void) {
		this.programInfo = programInfo;
		this.buffer = RenderModel.initBuffers(gl, indices, colourFormula);
		// if (buf !== null) { this.buffer = buf; }
		this.mode = mode;
		this.numIndices = indices.length;
	}

	private static initBuffers(gl: WebGLRenderingContext, indices: Uint32Array, colourFormula: (arg0: Float32Array) => void): Buffer | null {
		console.log("RenderModel.initBuffers");
		const positionBuffer: WebGLBuffer | null = gl.createBuffer();
		if (positionBuffer === null) {
			console.log("gl.createBuffer() returned null");
			return null;
		}
		// Select this as the one to apply buffer operations to
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		// Pass the list of positions into WebGL to build the shape.
		// We do this by creating a Float32Array from the JavaScript array,
		// then use it to fill the current buffer.
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

		const normalBuffer: WebGLBuffer | null = gl.createBuffer();
		if (normalBuffer === null) {
			console.log("gl.createBuffer() returned null");
			return null;
		}
		gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

		// Convert the array of colors into a table for all the vertices.
		const colours = new Float32Array(indices.length);
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

	draw(gl: WebGLRenderingContext, normalMatrix: Mat4, modelViewMatrix: Mat4, projMat: Mat4): void {
		gl.useProgram(this.programInfo.program);
		this.setup(gl);
		gl.uniformMatrix4fv(this.programInfo.uniformLocations.projectionMatrix, false, projMat.transposed());
		if (this.programInfo.uniformLocations.normalMatrix !== null) {
			gl.uniformMatrix4fv(this.programInfo.uniformLocations.normalMatrix, false, normalMatrix.data());
		}
		gl.uniformMatrix4fv(this.programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix.transposed());
		const offset = 0;
		gl.drawElements(this.mode, this.numIndices, gl.UNSIGNED_SHORT, offset);
	}
};

class Scene {
	public isPlaying: boolean = true
	public then: number = 0;
	public pausedAt: number = 0;
	public gl: WebGLRenderingContext;
	public faceModel: RenderModel;
	public edgeModel: RenderModel;
	public projectionMatrix: Mat4 = new Mat4();
	constructor(gl: WebGLRenderingContext, faceModel: RenderModel, edgeModel: RenderModel) {
		this.gl = gl;
		this.faceModel = faceModel;
		this.edgeModel = edgeModel;
		this.setup();
	}

	setup(): void {
		console.log("Scene setup");
		const gl = this.gl;

		gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
		gl.clearColor(0.2, 0.2, 0.2, 1.0);  // Clear to grey, fully opaque
		// gl.colorMask(false, false, false, true);
		gl.clearDepth(1.0);                 // Clear everything
		gl.enable(gl.DEPTH_TEST);           // Enable depth testing
		gl.enable(gl.BLEND);
		// gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

		// Clear the canvas before we start drawing on it.
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		// Create a perspective matrix, a special matrix that is
		// used to simulate the distortion of perspective in a camera.
		// Our field of view is 45 degrees, with a width/height
		// ratio that matches the display size of the canvas
		// and we only want to see objects between 0.1 units
		// and 100 units away from the camera.
		const fov = 45 * Math.PI / 180.0; // in radians
		const canvas = gl.canvas as HTMLCanvasElement;
		const aspect = canvas.clientWidth / canvas.clientHeight;
		const zNear = 0.075;
		const zFar = 10.0;
		this.projectionMatrix = new Mat4();
		this.projectionMatrix.perspective(fov, aspect, zNear, zFar);

		// Set the drawing position to the "identity" point, which is the center of the scene.
		const modelViewMatrix = new Mat4();
		const normalMatrix: Mat4 = modelViewMatrix.clone();
		normalMatrix.invert();

		this.faceModel.setup(gl);
		this.edgeModel.setup(gl);
	}

	reset(): void {
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.setup();
	}

	draw(deltaTime: number): void {
		const gl = this.gl;
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		// if (this.faceModel.buffer === null || this.edgeModel.buffer === null) {
		// 	console.log("Buffer === null", this.faceModel.buffer, this.edgeModel.buffer);
		// 	return;
		// }

		// Set the drawing position to the "identity" point, which is the center of the scene.
		const modelViewMatrix = new Mat4(); // Mat4.create();

		// Now move the drawing position a bit to where we want to start drawing the square.
		const rot = deltaTime * 0.5;

		modelViewMatrix.rotate(-8 * 3.14 / 16, [1, 0, 0]);
		modelViewMatrix.rotate(rot, [0, 1, 0]);
		modelViewMatrix.translate(0, -1.65, -0.5);

		const normalMatrix: Mat4 = modelViewMatrix.clone();
		normalMatrix.invert();

		this.faceModel.draw(this.gl, normalMatrix, modelViewMatrix, this.projectionMatrix);
		this.edgeModel.draw(this.gl, normalMatrix, modelViewMatrix, this.projectionMatrix);
	}
}
let scene: Scene;

/// Creates a shader of the given type, uploads the source and compiles it.
function loadShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
	const tmp = gl.createShader(type);
	if (tmp === null) {
		console.log("gl.createShader(" + type + ") returned null");
		return null;
	}
	const shader: WebGLShader = tmp;
	gl.shaderSource(shader, source);// Send the source to the shader object
	gl.compileShader(shader); // Compile the shader program

	// See if it compiled successfully
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
		gl.deleteShader(shader);
		return null;
	}

	return shader;
}

/// Initialize a shader program, so WebGL knows how to draw our data
function initShaderProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string): WebGLProgram | null {
	console.log("initShaderProgram");
	let tmp = loadShader(gl, gl.VERTEX_SHADER, vsSource);
	if (tmp === null) {
		console.log("loadShader(vertex) returned null");
		return null;
	}
	const vertexShader: WebGLShader = tmp;

	tmp = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
	if (tmp === null) {
		console.log("loadShader(fragment) returned null");
		return null;
	}
	const fragmentShader: WebGLShader = tmp

	// Create the shader program
	tmp = gl.createProgram();
	if (tmp === null) {
		console.log("gl.createProgram() returned null");
		return null;
	}
	const shaderProgram: WebGLProgram = tmp
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);

	// If creating the shader program failed, alert
	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
		return null;
	}

	return shaderProgram;
}

// Draw the scene repeatedly
function render(now: number): void {
	if (!scene.isPlaying) { return; }

	now *= 0.001;  // convert to seconds
	const deltaTime = now - scene.then;

	scene.draw(deltaTime);

	requestAnimationFrame(render);
}

function main(): void {
	const canvas: HTMLCanvasElement = document.querySelector("#gl_canvas") as HTMLCanvasElement;

	// Set canvas to fill window
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	const ctx = canvas.getContext("webgl", {
		// premultipliedAlpha: false,  // Ask for non-premultiplied alpha
		// alpha: false,
	});
	if (ctx === null) {
		alert("Unable to initialise WebGL");
		return;
	}
	const gl: WebGLRenderingContext = ctx;

	const tmp = initShaderProgram(gl, vsSource, fsSource);
	if (tmp === null) {
		console.log("iniShaderProgram() returned null");
		return;
	}
	const shaderProgram: WebGLProgram = tmp;

	const programInfo: ProgramInfo = {
		program: shaderProgram,
		attribLocations: {
			vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
			vertexNormal: gl.getAttribLocation(shaderProgram, "aVertexNormal"),
			vertexColour: gl.getAttribLocation(shaderProgram, "aVertexColour"),
		},
		uniformLocations: {
			projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
			modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
			normalMatrix: gl.getUniformLocation(shaderProgram, "uNormalMatrix"),
		},
	};

	const tmp2 = initShaderProgram(gl, vsEdgeSource, fsEdgeSource);
	if (tmp2 === null) {
		console.log("iniShaderProgram() returned null");
		return;
	}
	const shaderProgram2: WebGLProgram = tmp2;
	const programInfo2: ProgramInfo = {
		program: shaderProgram2,
		attribLocations: {
			vertexPosition: gl.getAttribLocation(shaderProgram2, 'aVertexPosition'),
			vertexNormal: null, // gl.getAttribLocation(shaderProgram2, "aVertexNormal"),
			vertexColour: gl.getAttribLocation(shaderProgram2, "aVertexColour"),
		},
		uniformLocations: {
			projectionMatrix: gl.getUniformLocation(shaderProgram2, 'uProjectionMatrix'),
			modelViewMatrix: gl.getUniformLocation(shaderProgram2, 'uModelViewMatrix'),
			normalMatrix: null, // gl.getUniformLocation(shaderProgram2, "uNormalMatrix"),
		},
	};

	const faceModel = new RenderModel(gl, programInfo, gl.TRIANGLES, vIndices, facesFormula);
	const edgeModel = new RenderModel(gl, programInfo2, gl.LINES, eIndices, edgesFormula);

	scene = new Scene(gl, faceModel, edgeModel);
	requestAnimationFrame(render);
}

// main();
// console.log("window.devicePixelRatio:");
// console.log(window.devicePixelRatio);

export function togglePlay(): void {
	const now = performance.now() * 0.001;
	if (scene.isPlaying) {
		scene.isPlaying = false;
		scene.pausedAt = now;
	} else {
		scene.isPlaying = true;
		scene.then += now - scene.pausedAt;
		requestAnimationFrame(render);
	}
}

export function resizeCanvas(): void {
	console.log("ResizeCanvas");
	scene.gl.canvas.width = window.innerWidth;
	scene.gl.canvas.height = window.innerHeight;
	scene.reset();
	scene.draw(scene.pausedAt - scene.then);
}

const loadWasm = async (): Promise<void> => {
	console.log("loadWasm");
	const { parseSTL } = await import('../vita-wasm/pkg');
	console.log("index wasm loaded");
	// let info: Request = Request();
	fetch("untitled.stl").then((value: Response) => {
		console.log(value);
		value.arrayBuffer().then((val: ArrayBuffer) => {
			const arr = new Uint8Array(val);
			const t1 = performance.now();
			const err = parseSTL(arr, vertices, normals, vIndices, eIndices);
			const t2 = performance.now();
			console.log("ParseSTL:");
			console.log(err);
			console.log(t2 - t1, "milliseconds");
			main();
		});
	});
};
loadWasm();