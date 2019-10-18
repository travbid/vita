// @ts-ignore: An import path cannot end with a '.ts' extension
import { vsSource, fsSource } from "./shaders.ts";
// @ts-ignore: An import path cannot end with a '.ts' extension
import { Mat4 } from "./matrix.ts";
// @ts-ignore: An import path cannot end with a '.ts' extension
import { Cube } from "./shapes.ts"

interface ProgramInfo {
	program: WebGLProgram;
	attribLocations: {
		vertexPosition: number;
		vertexNormal: number;
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

function setupFaces(scene: Scene): void {
	// Tell WebGL how to pull out the positions from the position
	// buffer into the vertexPosition attribute.
	const gl = scene.gl;
	const programInfo = scene.programInfo;
	const buffers = scene.faceBuffers;
	{
		const numComponents = 3;  // pull out 2 values per iteration
		const type = scene.gl.FLOAT;    // the data in the buffer is 32bit floats
		const normalize = false;  // don't normalize
		const stride = 0;         // how many bytes to get from one set of values to the next
		// 0 = use type and numComponents above
		const offset = 0;         // how many bytes inside the buffer to start from
		gl.bindBuffer(gl.ARRAY_BUFFER, scene.faceBuffers.position);
		gl.vertexAttribPointer(
			scene.programInfo.attribLocations.vertexPosition,
			numComponents,
			type,
			normalize,
			stride,
			offset);
		gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
	}
	// Tell WebGL how to pull out the normals from
	// the normal buffer into the vertexNormal attribute.
	{
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
	// In this case, it has already been bound in initBuffers(),
	// but could changed / swapped
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
}

function setupEdges(scene: Scene): void {
	// Tell WebGL how to pull out the positions from the position
	// buffer into the vertexPosition attribute.
	const gl = scene.gl;
	const edgeBuffers = scene.edgeBuffers;
	const programInfo = scene.programInfo;
	{
		const numComponents = 3;  // pull out 2 values per iteration
		const type = gl.FLOAT;    // the data in the buffer is 32bit floats
		const normalize = false;  // don't normalize
		const stride = 0;         // how many bytes to get from one set of values to the next
		// 0 = use type and numComponents above
		// const offset = 0;         // how many bytes inside the buffer to start from
		gl.bindBuffer(gl.ARRAY_BUFFER, edgeBuffers.position);
		gl.vertexAttribPointer(
			programInfo.attribLocations.vertexPosition,
			numComponents,
			type,
			normalize,
			stride,
			0);
		gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
	}
	// Tell WebGL how to pull out the normals from
	// the normal buffer into the vertexNormal attribute.
	{
		const numComponents = 3;
		const type = gl.FLOAT;
		const normalize = false;
		const stride = 0;
		const offset = 0;
		gl.bindBuffer(gl.ARRAY_BUFFER, edgeBuffers.normal);
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
		gl.bindBuffer(gl.ARRAY_BUFFER, edgeBuffers.colour);
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
	// In this case, it has already been bound in initBuffers(),
	// but could changed / swapped
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, edgeBuffers.indices);
}

class Scene {
	public isPlaying: boolean = true
	public then: number = 0;
	public pausedAt: number = 0;
	public gl: WebGLRenderingContext;
	public programInfo: ProgramInfo;
	public faceBuffers: Buffer; // | null
	public edgeBuffers: Buffer; // | null
	constructor(gl: WebGLRenderingContext, programInfo: ProgramInfo, faceBuffers: Buffer, edgeBuffers: Buffer) {
		this.gl = gl;
		this.programInfo = programInfo;
		this.faceBuffers = faceBuffers;
		this.edgeBuffers = edgeBuffers;
	}

	setup(): void {
		const gl = this.gl;
		const programInfo = this.programInfo;
		const buffers = this.faceBuffers;

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
		const fov = 45 * Math.PI / 180.0;   // in radians
		const canvas = gl.canvas as HTMLCanvasElement;
		const aspect = canvas.clientWidth / canvas.clientHeight;
		const zNear = 0.1;
		const zFar = 100.0;
		const projectionMatrix = new Mat4();
		projectionMatrix.perspective(fov, aspect, zNear, zFar); // Mat4.create();

		// Set the drawing position to the "identity" point, which is the center of the scene.
		const modelViewMatrix = new Mat4(); // Mat4.create();

		// Tell WebGL how to pull out the positions from the position
		// buffer into the vertexPosition attribute.
		{
			const numComponents = 3;  // pull out 2 values per iteration
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

			// gl.bindBuffer(gl.ARRAY_BUFFER, edgeBuffers.position);
			// gl.vertexAttribPointer(
			// 	programInfo.attribLocations.vertexPosition,
			// 	numComponents,
			// 	type,
			// 	normalize,
			// 	stride,
			// 	0);
			// gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
		}
		// Tell WebGL how to pull out the normals from
		// the normal buffer into the vertexNormal attribute.
		{
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

			// gl.bindBuffer(gl.ARRAY_BUFFER, edgeBuffers.normal);
			// gl.vertexAttribPointer(
			// 	programInfo.attribLocations.vertexNormal,
			// 	numComponents,
			// 	type,
			// 	normalize,
			// 	stride,
			// 	offset);
			// gl.enableVertexAttribArray(programInfo.attribLocations.vertexNormal);
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

			// gl.bindBuffer(gl.ARRAY_BUFFER, edgeBuffers.colour);
			// gl.vertexAttribPointer(
			// 	programInfo.attribLocations.vertexColour,
			// 	numComponents,
			// 	type,
			// 	normalize,
			// 	stride,
			// 	offset);
			// gl.enableVertexAttribArray(programInfo.attribLocations.vertexColour);
		}

		// Tell WebGL which indices to use to index the vertices
		// In this case, it has already been bound in initBuffers(),
		// but could changed / swapped
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

		gl.useProgram(programInfo.program); // Tell WebGL to use our program when drawing

		const normalMatrix = modelViewMatrix.clone();
		normalMatrix.invert();

		// Transpose row-major to column major before setting uniformMatrix4fv()
		// Set the shader uniforms
		gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix.transposed());
		gl.uniformMatrix4fv(programInfo.uniformLocations.normalMatrix, false, normalMatrix.data());
		gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix.transposed());
	}

	reset(): void {
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.setup();
	}

	draw(deltaTime: number): void {
		const gl = this.gl;
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		// Set the drawing position to the "identity" point, which is the center of the scene.
		const modelViewMatrix = new Mat4(); // Mat4.create();

		// Now move the drawing position a bit to where we want to start drawing the square.
		const rot = deltaTime * 0.5;
		modelViewMatrix.translate(0, 0, -6);
		modelViewMatrix.rotate(rot, [0, 0, 1]);
		modelViewMatrix.rotate(rot, [0, 1, 0]);
		gl.uniformMatrix4fv(this.programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix.transposed());

		if (this.faceBuffers === null || this.edgeBuffers === null) {
			console.log("Buffer === null", this.faceBuffers, this.edgeBuffers);
			return;
		}

		const offset = 0;
		const vertexCount = 36;
		setupFaces(this);
		gl.drawElements(gl.TRIANGLES, vertexCount, gl.UNSIGNED_SHORT, offset);
		// gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, edgeBuffers.indices);
		setupEdges(this);
		gl.drawElements(gl.LINES, 24, gl.UNSIGNED_SHORT, 0);
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
	console.log(vertexShader);
	console.log(fragmentShader);

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

function initEdgeBuffers(gl: WebGLRenderingContext): Buffer | null {
	const positionBuffer: WebGLBuffer | null = gl.createBuffer(); // Create a buffer for the square's positions.
	if (positionBuffer === null) {
		console.log("gl.createBuffer() returned null");
		return null;
	}

	// Select this as the one to apply buffer operations to
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

	const positions = [
		-1.0, -1.0, 1.0, // Front face
		1.0, -1.0, 1.0,
		1.0, 1.0, 1.0,
		-1.0, 1.0, 1.0,

		-1.0, -1.0, -1.0, // Back face
		-1.0, 1.0, -1.0,
		1.0, 1.0, -1.0,
		1.0, -1.0, -1.0,
	];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
	const normalBuffer: WebGLBuffer | null = gl.createBuffer();
	if (normalBuffer === null) {
		console.log("gl.createBuffer() returned null");
		return null;
	}
	gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

	const vertexNormals = [
		0.0, 0.0, 1.0, // Front
		0.0, 0.0, 1.0,
		0.0, 0.0, 1.0,
		0.0, 0.0, 1.0,

		0.0, 0.0, -1.0, // Back
		0.0, 0.0, -1.0,
		0.0, 0.0, -1.0,
		0.0, 0.0, -1.0,
	];

	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);

	// Convert the array of colors into a table for all the vertices.
	let colours: number[] = [];
	for (let j = 0; j < 8; ++j) {
		// Repeat each color four times for the four vertices of the face
		colours = colours.concat(0, 0, 0, 0.5);
	}

	const colourBuffer: WebGLBuffer | null = gl.createBuffer();
	if (colourBuffer === null) {
		console.log("gl.createBuffer() returned null");
		return null;
	}
	gl.bindBuffer(gl.ARRAY_BUFFER, colourBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colours), gl.STATIC_DRAW);

	const indexBuffer: WebGLBuffer | null = gl.createBuffer();
	if (indexBuffer === null) {
		console.log("gl.createBuffer() returned null");
		return null;
	}
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	// This array defines each face as two triangles, using the indices
	// into the vertex array to specify each triangle's position.
	const indices = [
		0, 1, 1, 2, 2, 3, 3, 0,
		4, 5, 5, 6, 6, 7, 7, 4,
		0, 4, 1, 7, 2, 6, 3, 5
	];

	// Now send the element array to GL
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

	return {
		position: positionBuffer,
		normal: normalBuffer,
		colour: colourBuffer,
		indices: indexBuffer,
	};

}

function initBuffers(gl: WebGLRenderingContext): Buffer | null {
	const positionBuffer: WebGLBuffer | null = gl.createBuffer(); // Create a buffer for the square's positions.
	if (positionBuffer === null) {
		console.log("gl.createBuffer() returned null");
		return null;
	}

	// Select this as the one to apply buffer operations to
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	// Pass the list of positions into WebGL to build the shape.
	// We do this by creating a Float32Array from the JavaScript array,
	// then use it to fill the current buffer.
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Cube.positions()), gl.STATIC_DRAW);

	const normalBuffer: WebGLBuffer | null = gl.createBuffer();
	if (normalBuffer === null) {
		console.log("gl.createBuffer() returned null");
		return null;
	}
	gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Cube.normals()), gl.STATIC_DRAW);

	const faceColors: number[][] = [
		[0.10, 0.5, 0.5, 0.5],   // Front face: cyan
		[0.15, 0.90, 0.10, 0.5], // Back face: red
		[0.10, 0.75, 0.10, 0.5], // Top face: green
		[0.10, 0.10, 0.75, 0.5], // Bottom face: blue
		[0.75, 0.75, 0.10, 0.5], // Right face: yellow
		[0.75, 0.10, 0.75, 0.5], // Left face: purple
	];

	// Convert the array of colors into a table for all the vertices.
	let colours: number[] = [];
	for (let j = 0; j < faceColors.length; ++j) {
		const c = faceColors[j];
		// Repeat each color four times for the four vertices of the face
		colours = colours.concat(c, c, c, c);
	}

	const colourBuffer: WebGLBuffer | null = gl.createBuffer();
	if (colourBuffer === null) {
		console.log("gl.createBuffer() returned null");
		return null;
	}
	gl.bindBuffer(gl.ARRAY_BUFFER, colourBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colours), gl.STATIC_DRAW);

	const indexBuffer: WebGLBuffer | null = gl.createBuffer();
	if (indexBuffer === null) {
		console.log("gl.createBuffer() returned null");
		return null;
	}
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	// This array defines each face as two triangles, using the indices
	// into the vertex array to specify each triangle's position.
	const indices = [
		0, 1, 2, 0, 2, 3,       // front
		4, 5, 6, 4, 6, 7,       // back
		8, 9, 10, 8, 10, 11,    // top
		12, 13, 14, 12, 14, 15, // bottom
		16, 17, 18, 16, 18, 19, // right
		20, 21, 22, 20, 22, 23, // left

		0, 1, 1, 2, 2, 3, 3, 0,
		4, 5, 5, 6, 6, 7, 7, 4,
		0, 4, 1, 7, 2, 6, 3, 5
	];

	// Now send the element array to GL
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

	return {
		position: positionBuffer,
		normal: normalBuffer,
		colour: colourBuffer,
		indices: indexBuffer,
	};
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

	// Set canvas to dille window
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
	// const gl: WebGLRenderingContext = ctx;
	const gl = ctx;

	const tmp = initShaderProgram(gl, vsSource, fsSource);
	if (tmp === null) {
		console.log("iniShaderProgram() returned null");
		return;
	}
	const shaderProgram: WebGLProgram = tmp;

	// const programInfo: IProgramInfo = {
	const programInfo = {
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

	const edgeBuffers = initEdgeBuffers(gl);
	if (edgeBuffers === null) {
		console.log("initEdgeBuffers() returned null");
		return;
	}
	const faceBuffers = initBuffers(gl);
	if (faceBuffers === null) {
		console.log("initBuffers() returned null");
		return;
	}

	scene = new Scene(gl, programInfo, faceBuffers, edgeBuffers);
	scene.setup();
	requestAnimationFrame(render);
}

main();

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
