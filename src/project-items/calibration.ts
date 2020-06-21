// @ts-ignore: An import path cannot end with a '.ts' extension
import { Mat4 } from "../matrix.ts";
// @ts-ignore: An import path cannot end with a '.ts' extension
import { ModelCollection } from "../model.ts";
// @ts-ignore: An import path cannot end with a '.ts' extension
import { RenderModel } from "../render_model.ts";

export class CalibrationCollection implements ModelCollection {
	private renderModels = new Array<RenderModel>();
	private sceneMatrix: Mat4 = new Mat4();
	private modelMatrix: Mat4 = new Mat4();

	public wall: RenderModel | null = null;

	constructor() {
		this.sceneMatrix.translate(0, 0.0, 2.5);
	}

	recalculate(gl: WebGLRenderingContext, rot: number): void {
		if (this.wall === null) { return; }
		const r = (1.0 - Math.cos(rot)) / 2.0; // Put in range 0-1, starting at 0
		const w = 0.2;
		const c = w * 6 * Math.sqrt(2);
		const mul = r * Math.atan(c) / Math.atan(6*w);
		for (let i = 0; i < 9; i++) {
			const dy = (i - 4) * w;
			const dy2 = dy * dy;
			for (let j = 0; j < 13; j++) {
				const dx = (j - 6) * w;
				const l = Math.sqrt((dx * dx) + (dy2));
				const m = Math.cos(Math.atan(l)*mul);
				this.wall.vertices[(i * 13 + j) * 3 + 0] = dx * m;
				this.wall.vertices[(i * 13 + j) * 3 + 1] = dy * m;
			}
		};
		// console.log(calibration.wall.buffer?.position ?? null);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.wall.buffer!.position);
		gl.bufferData(gl.ARRAY_BUFFER, this.wall.vertices, gl.STATIC_DRAW);
	}

	setMatrix(mat: Mat4): void {
		this.modelMatrix = mat;
	}

	setup(gl: WebGLRenderingContext): void {
		for (let i = 0, len = this.renderModels.length; i < len; i++) {
			this.renderModels[i].setup(gl);
		}
	}

	draw(gl: WebGLRenderingContext, viewMatrix: Mat4, projectionMatrix: Mat4): void {
		const modelViewMatrix = viewMatrix.multiplied(this.sceneMatrix).multiplied(this.modelMatrix);
		const normalMatrix: Mat4 = modelViewMatrix.clone();
		normalMatrix.invert();

		this.wall?.draw(gl, normalMatrix, modelViewMatrix, projectionMatrix);
	}
}

export function generate(vertices: Float32Array, normals: Float32Array, indices: Uint32Array): void {
	// Generate Calibration wall
	const w = 0.1;
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 13; j++) {
			// vertices[(i * 13 + j) * 3 + 0] = (j - 6) * w;
			// vertices[(i * 13 + j) * 3 + 1] = (i - 4) * w;
			vertices[(i * 13 + j) * 3 + 2] = 0.0;
			normals[(i * 13 + j) * 3 + 0] = -0.5;
			normals[(i * 13 + j) * 3 + 1] = 0.5;
			normals[(i * 13 + j) * 3 + 2] = -1.0;
		}
	};
	const arr = new Uint32Array(12 * 8 * 3);
	let i = 0;
	for (let jx = 0; jx < 8; jx++) {
		for (let ix = 0; ix < 12; ix++) {
			// if(jx===6 && ix>4){ break;}
			if (jx % 2 === 0 && ix % 2 === 1) { continue; }
			if (jx % 2 === 1 && ix % 2 === 0) { continue; }
			// const i = (jx * 12 + off) * 6;
			arr[i++] = (jx * 13 + ix) + 0;
			arr[i++] = (jx * 13 + ix) + 13;
			arr[i++] = (jx * 13 + ix) + 1;
			arr[i++] = (jx * 13 + ix) + 1;
			arr[i++] = (jx * 13 + ix) + 14;
			arr[i++] = (jx * 13 + ix) + 13;
		}
	}
	indices.set(arr, 0);
}
