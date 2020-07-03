// @ts-ignore: An import path cannot end with a '.ts' extension
import { ProgramInfo } from "./interfaces.ts";
// @ts-ignore: An import path cannot end with a '.ts' extension
import { Mat4 } from "./matrix.ts";
// @ts-ignore: An import path cannot end with a '.ts' extension
import { DefaultCollection, EdgesModel, FacesModel, MeshModel } from "./model.ts";
// @ts-ignore: An import path cannot end with a '.ts' extension
import { RenderModel } from "./render_model.ts";
// @ts-ignore: An import path cannot end with a '.ts' extension
import { Scene } from "./scene.ts";
// @ts-ignore: An import path cannot end with a '.ts' extension
import { vsSource, fsSource, vsEdgeSource, fsEdgeSource } from "./shaders.ts";
// @ts-ignore: An import path cannot end with a '.ts' extension
import { CalibrationCollection, generate as generateCali } from "./project-items/calibration.ts"
// @ts-ignore: An import path cannot end with a '.ts' extension
import { SV100Collection, generate as generateSV100 } from "./project-items/sv100.ts"
// @ts-ignore: An import path cannot end with a '.ts' extension
import { SuperMDCollection, generateLaser as generateSMDLaser, generateSonar as generateSMDSonar, generatePipe as generateSMDPipe } from "./project-items/supermd.ts"

const humanFigure = new MeshModel((1860 + 4) * 1.5, 1860 * 3);
const sv100Pod = new MeshModel(522, 348);
const sv100Laser = new EdgesModel(24, 24);
const sv100Manhole = new EdgesModel(40, 40);
const sv100Lights = new FacesModel(16);
const supermdFloat = new MeshModel(3765, 840 * 3);
const supermdLaser = generateSMDLaser();
const supermdSonar = generateSMDSonar();
const supermdPipe = generateSMDPipe();
const calibrationWall = new FacesModel(13 * 9);

const human = new DefaultCollection();
const calibration = new CalibrationCollection();
const sv100 = new SV100Collection();
const supermd = new SuperMDCollection();

let scene: Scene;
let animationStart = 0;

const ids = [
	"title",
	"work-history",
	"project-selection",
	"tech-tools",
	"education",
	"interests",
	"brag",
	// "contact",
];
const layout = {
	"title": [0, 0],
	"work-history": [0, 0],
	"project-selection": [0, 0],
	"tech-tools": [0, 0],
	"education": [0, 0],
	"interests": [0, 0],
	"brag": [0, 0],
	// "contact": [0, 0],
};

let mode: string = "";

function facesFormula(colours: Float32Array): void {
	for (let j = 0; j < colours.length * 4; j += 4) {
		colours[j + 0] = 0.0625;
		colours[j + 1] = 0.0625;
		colours[j + 2] = 0.0625;
		colours[j + 3] = 1.0;
	}
}

function edgesFormula(colours: Float32Array): void {
	for (let j = 0; j < colours.length * 4; j += 4) {
		colours[j + 0] = 0.25;
		colours[j + 1] = 0.25;
		colours[j + 2] = 0.25;
		colours[j + 3] = 1.00;
	}
}

function laserFormula(colours: Float32Array): void {
	for (let j = 0; j < colours.length; j += 4) {
		colours[j + 0] = 1.00;
		colours[j + 1] = 0.125;
		colours[j + 2] = 0.125;
		colours[j + 3] = 1.00;
	}
}

function sonarFormula(colours: Float32Array): void {
	for (let j = 0; j < colours.length; j += 4) {
		colours[j + 0] = 0.125;
		colours[j + 1] = 0.125;
		colours[j + 2] = 1.0;
		colours[j + 3] = 1.0;
	}
}

function manholeFormula(colours: Float32Array): void {
	for (let j = 0; j < colours.length; j += 4) {
		colours[j + 0] = 0.5;
		colours[j + 1] = 0.5;
		colours[j + 2] = 0.5;
		colours[j + 3] = 1.00;
	}
}

function lightsFormula(colours: Float32Array): void {
	for (let j = 0; j < colours.length * 4; j += 4) {
		colours[j + 0] = 0.25;
		colours[j + 1] = 0.25;
		colours[j + 2] = 0.25;
		colours[j + 3] = 0.2;
	}
}

/// Creates a shader of the given type, uploads the source and compiles it.
function loadShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
	const tmp = gl.createShader(type);
	if (tmp === null) {
		console.log("gl.createShader(" + type + ") returned null");
		return null;
	}
	const shader: WebGLShader = tmp;
	gl.shaderSource(shader, source); // Send the source to the shader object
	gl.compileShader(shader); // Compile the shader program

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { // See if it compiled successfully
		console.log('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
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
		console.log('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
		return null;
	}

	return shaderProgram;
}

function transition(now: number): void {
	const period = 1_000.0;
	let p = (now - animationStart) / period;
	p = Math.min(p, 1.0);
	p = (1.0 - Math.cos(p * Math.PI)) / 2.0;
	const viewMatrix = new Mat4();
	viewMatrix.rotate(p * Math.PI, [0, 1, 0]);
	scene?.setView(viewMatrix);

	// const rot = 0.5 * Math.PI * window.pageYOffset / window.innerHeight;
	scene?.draw();
	if (now - animationStart > period) { return; }

	requestAnimationFrame(transition);
}

function transitionBack(now: number): void {
	const period = 1_000.0;
	let p = (now - animationStart) / period;
	p = 1.0 - Math.min(p, 1.0);
	p = (1.0 - Math.cos(p * Math.PI)) / 2.0;
	const viewMatrix = new Mat4();
	viewMatrix.rotate(p * Math.PI, [0, 1, 0]);
	scene.setView(viewMatrix);

	scene.draw();
	if (now - animationStart > period) {
		scene.clear();
		scene.addModel(human);
		return;
	}
	requestAnimationFrame(transitionBack);
}

function render(now: number): void {
	if (scene === undefined) { return; }

	// const t1 = performance.now();
	scene.draw();
	// const t2 = performance.now();
	// console.log("render:", t2-t1, "ms");
}

function updateLayoutScroll(): void {
	const pageTop = window.scrollY;
	const pageBotttom = window.scrollY + window.innerHeight;
	for (let i = 0; i < ids.length; i++) {
		const id = ids[i];
		// @ts-ignore
		const elLayout = layout[id];
		const elTop = elLayout[0];
		const elBottom = elLayout[0] + elLayout[1];
		if (pageBotttom > elTop && pageTop < elBottom) {
			const topProp = (pageBotttom - elTop) / window.innerHeight;
			const bottomProp = (elBottom - pageTop) / window.innerHeight;
			const viewEl = document.getElementById(id);
			if (viewEl === null) {
				console.log("!!! Element with id", id, "is null");
				continue;
			}
			if (0.0 < topProp && topProp < 0.333) {
				viewEl.style.opacity = (topProp / 0.333).toString();
			} else if (0.0 < bottomProp && bottomProp < 0.333) {
				viewEl.style.opacity = (bottomProp / 0.333).toString();
			} else {
				viewEl.style.opacity = "1";
			}
		}
	}
}

function updateModelScroll(): void {
	const rot = 0.5 * Math.PI * window.pageYOffset / window.innerHeight;

	const hModelMatrix = new Mat4();
	hModelMatrix.rotate(rot, [0, 1, 0]);
	hModelMatrix.translate(0, (rot / 25.0) - 1.6, -0.45);
	human.setMatrix(hModelMatrix);

	switch (mode) {
		case "sv100":
			{
				const sModelMatrix = new Mat4();
				sModelMatrix.rotate((rot - 4.93125) / 12.5, [0, 1, 0]);
				sModelMatrix.translate(0, 1.0 - (rot / 6.25), 0);
				sv100.setMatrix(sModelMatrix);
				break;
			}

		case "fisheye-calibration":
			calibration.recalculate(scene.gl, rot);
			break;

		case "supermd":
			{
				const viewMatrix = new Mat4();
				const modelMatrix = new Mat4();

				viewMatrix.translate(0.67 * rot, 0.0, 0.0);
				viewMatrix.rotate(((rot * 2.5) - 22.5) * Math.PI / 180.0, [1, 0, 0]);
				viewMatrix.rotate(rot / 8.0, [0, 1, 0]);
				viewMatrix.translate(0.0, 0.0, 12.0 + rot / 2);

				modelMatrix.translate(0, 0.0, 2.0 - rot);
				supermd.setView(viewMatrix);
				supermd.setModel(modelMatrix);
				break;
			}
	}
}

function updateScroll(): void {
	updateLayoutScroll();
	updateModelScroll();
}

function recalcLayout(): void {
	// Calculate new div layout
	const elements = [];
	for (let i = 0; i < ids.length; i++) {
		const id = ids[i];
		const el = document.getElementById(id);
		if (el === null) {
			console.log("el is null", id);
			continue;
		}
		el.style.transform = "";
		elements.push(el);
	}
	for (let i = 0; i < elements.length; i++) {
		const id = ids[i];
		const el = elements[i];
		// @ts-ignore
		layout[id][0] = window.pageYOffset + el.getBoundingClientRect().top
		// @ts-ignore
		layout[id][1] = el.offsetHeight;
	}
}

function resizeCanvas(): void {
	if (scene === undefined) { return; }

	scene.gl.canvas.width = window.innerWidth;
	scene.gl.canvas.height = window.innerHeight;

	scene.reset();
	requestAnimationFrame(updateScroll);
	requestAnimationFrame(render);
}

export function onResize(): void {
	recalcLayout();
	resizeCanvas();
}

const loadWasm = async (gl: WebGLRenderingContext, faceProgram: ProgramInfo, edgeProgram: ProgramInfo): Promise<void> => {
	const { parseSTL, parseSTLMesh } = await import('../vita-wasm/pkg');

	fetch("human.stl").then((value: Response) => {
		value.arrayBuffer().then((val: ArrayBuffer) => {
			const arr = new Uint8Array(val);
			const t1 = performance.now();
			const err = parseSTLMesh(arr, humanFigure.vertices, humanFigure.normals, humanFigure.vIndices, humanFigure.eIndices);
			const t2 = performance.now();
			console.log(t2 - t1, "milliseconds (Human)");
			console.log("ParseSTLMesh:", err);

			const hfaceModel = new RenderModel(gl, faceProgram, gl.TRIANGLES, humanFigure.vertices, humanFigure.normals, humanFigure.vIndices, facesFormula);
			const hedgeModel = new RenderModel(gl, edgeProgram, gl.LINES, humanFigure.vertices, humanFigure.normals, humanFigure.eIndices, edgesFormula);
			human.addRenderModel(hfaceModel);
			human.addRenderModel(hedgeModel);
			scene.addModel(human);

			requestAnimationFrame(updateModelScroll);
			requestAnimationFrame(render);

			const canvas: HTMLCanvasElement = document.getElementById("gl_canvas") as HTMLCanvasElement;
			canvas.style.opacity = "1";
		});
	});

	fetch("sv100.stl").then((value: Response) => {
		value.arrayBuffer().then((val: ArrayBuffer) => {
			const arr = new Uint8Array(val);
			const t1 = performance.now();
			const err = parseSTL(arr, sv100Pod.vertices, sv100Pod.normals, sv100Pod.vIndices, sv100Pod.eIndices);
			const t2 = performance.now();
			console.log(t2 - t1, "milliseconds (SV100)");
			console.log("parseSTL:", err);

			generateSV100(sv100Laser, sv100Manhole, sv100Lights);
			const sfaceModel = new RenderModel(gl, faceProgram, gl.TRIANGLES, sv100Pod.vertices, sv100Pod.normals, sv100Pod.vIndices, facesFormula);
			const sedgeModel = new RenderModel(gl, edgeProgram, gl.LINES, sv100Pod.vertices, sv100Pod.normals, sv100Pod.eIndices, edgesFormula);
			const slaserModel = new RenderModel(gl, edgeProgram, gl.LINES, sv100Laser.vertices, new Float32Array(), sv100Laser.eIndices, laserFormula);
			const smanholeModel = new RenderModel(gl, edgeProgram, gl.LINES, sv100Manhole.vertices, new Float32Array(), sv100Manhole.eIndices, manholeFormula);
			const slightModel = new RenderModel(gl, faceProgram, gl.TRIANGLES, sv100Lights.vertices, sv100Lights.normals, sv100Lights.vIndices, lightsFormula);
			sv100.podFaces = sfaceModel;
			sv100.podEdges = sedgeModel;
			sv100.laser = slaserModel;
			sv100.manhole = smanholeModel;
			sv100.lights = slightModel;
		});
	});

	fetch("supermd.stl").then((value: Response) => {
		value.arrayBuffer().then((val: ArrayBuffer) => {
			const arr = new Uint8Array(val);
			const t1 = performance.now();
			const err = parseSTL(arr, supermdFloat.vertices, supermdFloat.normals, supermdFloat.vIndices, supermdFloat.eIndices);
			const t2 = performance.now();
			console.log(t2 - t1, "milliseconds (SuperMD)");
			console.log("parseSTL:", err);

			const faceModel = new RenderModel(gl, faceProgram, gl.TRIANGLES, supermdFloat.vertices, supermdFloat.normals, supermdFloat.vIndices, facesFormula);
			const edgeModel = new RenderModel(gl, edgeProgram, gl.LINES, supermdFloat.vertices, supermdFloat.normals, supermdFloat.eIndices, edgesFormula);
			const laserModel = new RenderModel(gl, edgeProgram, gl.LINES, supermdLaser.vertices, new Float32Array(), supermdLaser.eIndices, laserFormula);
			const sonarModel = new RenderModel(gl, edgeProgram, gl.LINES, supermdSonar.vertices, new Float32Array(), supermdSonar.eIndices, sonarFormula);
			const pipeModel = new RenderModel(gl, edgeProgram, gl.LINES, supermdPipe.vertices, new Float32Array(), supermdPipe.eIndices, manholeFormula);
			supermd.floatFaces = faceModel;
			supermd.floatEdges = edgeModel;
			supermd.laser = laserModel;
			supermd.sonar = sonarModel;
			supermd.pipe = pipeModel;
		});
	});

	generateCali(calibrationWall.vertices, calibrationWall.normals, calibrationWall.vIndices);
	const calibrationModel = new RenderModel(gl, faceProgram, gl.TRIANGLES, calibrationWall.vertices, calibrationWall.normals, calibrationWall.vIndices, manholeFormula);
	calibration.wall = calibrationModel;
}

function main(): void {
	const canvas: HTMLCanvasElement = document.getElementById("gl_canvas") as HTMLCanvasElement;

	// Set canvas to fill window
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	const ctx = canvas.getContext("webgl", {
		// premultipliedAlpha: false,  // Ask for non-premultiplied alpha
		// alpha: false,
	});
	if (ctx === null) {
		console.log("Unable to initialise WebGL");
		return;
	}
	const gl: WebGLRenderingContext = ctx;

	const tmp = initShaderProgram(gl, vsSource, fsSource);
	if (tmp === null) {
		console.log("iniShaderProgram() returned null");
		return;
	}
	const shaderProgram: WebGLProgram = tmp;

	const faceProgram: ProgramInfo = {
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
	const edgeProgram: ProgramInfo = {
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

	scene = new Scene(gl);

	loadWasm(gl, faceProgram, edgeProgram);

	resizeCanvas(); // resizeCanvas calls requestAnimationFrame(render)
}

export function onScroll(): void {
	requestAnimationFrame(updateScroll);
	requestAnimationFrame(render);
}

function showProject(projName: string): void {
	const el = document.getElementById("content");
	if (el === null) {
		console.log("!!! el === null");
		return;
	}

	el.classList.add("leftscreen");

	const projectDiv = document.getElementById(projName);
	if (projectDiv == null) {
		console.log("!!! projectDiv === null");
		return;
	}

	projectDiv.classList.add("focused");

	switch (projName) {
		case "sv100":
			scene?.addModel(sv100);
			mode = projName
			break;
		case "fisheye-calibration":
			scene?.addModel(calibration);
			calibration.recalculate(scene.gl, 0.5 * Math.PI * window.pageYOffset / window.innerHeight);
			mode = projName;
			break;
		case "supermd":
			scene?.addModel(supermd);
			mode = projName
			break;
	}
	if (mode != "") {
		requestAnimationFrame(updateModelScroll);
		animationStart = performance.now();
		requestAnimationFrame(transition);
	}

	window.scrollTo({ top: layout["project-selection"][0], behavior: "smooth" });
}

function restoreProjects(): void {
	const projectDiv = document.getElementById("projects");
	if (projectDiv !== null) {
		const len = projectDiv.children.length;
		for (let i = 0; i < len; i++) {
			const el = projectDiv.children[i];
			if (el.id !== "project-selection") {
				el.classList.remove("focused");
				// el.classList.add("offscreen");
			}
		}
	} else {
		console.log("!!! projectDiv === null");
	}

	// const el = document.getElementById("project-selection");
	const el = document.getElementById("content");
	if (el !== null) {
		el.classList.remove("leftscreen");
	} else {
		console.log("!!! el === null");
	}

	scene.setView(new Mat4());
	animationStart = performance.now();
	if (mode !== "") {
		requestAnimationFrame(transitionBack);
	}
	mode = "";
}

export function navigateToProject(projName: string): void {
	window.history.pushState({}, "", "#" + projName);
	showProject(projName);
}
export function navigateToHome(): void {
	window.history.pushState({}, "", "/");
	restoreProjects();
}

window.onpopstate = function (ev: PopStateEvent): void {
	ev.preventDefault();
	if (document.location.hash !== "") {
		showProject(document.location.hash.substr(1));
	} else {
		restoreProjects();
	}
}

if ('scrollRestoration' in window.history) {
	history.scrollRestoration = "manual";
}

window.onload = (): void => {
	onResize();
	if (document.location.hash !== "") {
		showProject(document.location.hash.substr(1));
	}
}

window.onresize = onResize;

main();
