// @ts-ignore: An import path cannot end with a '.ts' extension
import { Mat4 } from "../matrix.ts";
// @ts-ignore: An import path cannot end with a '.ts' extension
import { EdgesModel, ModelCollection } from "../model.ts";
// @ts-ignore: An import path cannot end with a '.ts' extension
import { RenderModel } from "../render_model.ts";

export class SuperMDCollection implements ModelCollection {
	private renderModels = new Array<RenderModel>();
	private viewMatrix: Mat4 = new Mat4();
	private modelMatrix: Mat4 = new Mat4();

	public pipe: RenderModel | null = null;
	public floatFaces: RenderModel | null = null;
	public floatEdges: RenderModel | null = null;
	public laser: RenderModel | null = null;
	public sonar: RenderModel | null = null;

	constructor() {
		// this.sceneMatrix.translate(0, 0.0, 5.0);
	}

	setModel(mat: Mat4): void {
		const mod = new Mat4();
		mod.translate(0.0, -0.4, 0.0);
		this.modelMatrix = mat.multiplied(mod);
	}

	setView(mat: Mat4): void {
		this.viewMatrix = mat;
	}

	setup(gl: WebGLRenderingContext): void {
		for (let i = 0, len = this.renderModels.length; i < len; i++) {
			this.renderModels[i].setup(gl);
		}
	}

	draw(gl: WebGLRenderingContext, viewMatrix: Mat4, projectionMatrix: Mat4): void {
		const tmp = viewMatrix.multiplied(this.viewMatrix);
		const modelViewMatrix = tmp.multiplied(this.modelMatrix);
		const normalMatrix: Mat4 = modelViewMatrix.clone();
		normalMatrix.invert();

		this.pipe?.draw(gl, normalMatrix, tmp, projectionMatrix);
		this.floatFaces?.draw(gl, normalMatrix, modelViewMatrix, projectionMatrix);
		this.floatEdges?.draw(gl, normalMatrix, modelViewMatrix, projectionMatrix);
		this.laser?.draw(gl, normalMatrix, modelViewMatrix, projectionMatrix);
		this.sonar?.draw(gl, normalMatrix, modelViewMatrix, projectionMatrix);
	}
}

export function generateLaser(): EdgesModel {
	const laser = new EdgesModel(18, 17);

	const d = 1.5; // Diameter in metres
	const n = 16;
	for (let i = 0; i <= (n / 2) + 1; i++) {
		const ix = i * 3;
		const angle = (i-0.5) * (2.0 * Math.PI / n);
		laser.vertices.set([Math.cos(angle) * d, (Math.sin(angle) * d) + 0.4, -0.65], ix);
		laser.eIndices[i * 2 + 0] = i;
		laser.eIndices[i * 2 + 1] = i + 1;
	}

	const ni = 8;
	const di = 0.046875;
	for (let i = (n/2+2); i < ((n/2+2) + ni); i++) {
		const ix = i * 3;
		const angle = i * (2.0 * Math.PI / ni);
		laser.vertices.set([Math.cos(angle) * di, (Math.sin(angle) * di) + 0.4, -0.65], ix);
		laser.eIndices[i * 2 + 0] = i;
		laser.eIndices[i * 2 + 1] = i + 1;
	}
	laser.eIndices[((n/2+1)) * 2 + 0] = ((n/2+2) + ni-1);
	laser.eIndices[((n/2+1)) * 2 + 1] = ((n/2)+2);

	return laser;
}

export function generateSonar(): EdgesModel {
	const laser = new EdgesModel(8, 7);

	const d = 1.5; // Diameter in metres
	const n = 16;
	for (let i = 0; i <= (n / 2) - 1; i++) {
		const ix = i * 3;
		const angle = (i+0.5) * (2.0 * Math.PI / n);
		laser.vertices.set([Math.cos(angle) * d, -(Math.sin(angle) * d) + 0.4, -0.65], ix);
		laser.eIndices[i * 2 + 0] = i;
		laser.eIndices[i * 2 + 1] = i + 1;
	}
	laser.eIndices[((n/2)+1)*2] = 1;

	const ni = 8;
	for (let i = n; i < (n + ni); i++) {
		laser.eIndices[i * 2 + 0] = i;
		laser.eIndices[i * 2 + 1] = i + 1;
	}
	laser.eIndices[((n + ni) * 2) - 1] = n;

	return laser;
}

export function generatePipe(): EdgesModel {
	const pipe = new EdgesModel(144, 160);
	const ri = 1.5; // Radius in metres
	const rOuter = 2.0;
	const n = 8 + 1;

	for (let seg = 0; seg < 2; seg++) {
		const voff = (8 * n) * seg;
		const eoff = (8 * (n+1) * 2) * seg;
		const start = -6.0 + (seg * 6.0);
		for (let i = 0; i < n; i++) {
			const ix = i * 3;
			const angle = i * ((Math.PI / (n - 1))) - (Math.PI / 2.0);

			const xi = -Math.cos(angle) * ri;
			const yi = Math.sin(angle) * ri;
			const xo = -Math.cos(angle) * rOuter;
			const yo = Math.sin(angle) * rOuter;
			const xs = -Math.cos(angle) * (rOuter + (rOuter - ri));
			const ys = Math.sin(angle) * (rOuter + (rOuter - ri));

			pipe.vertices.set([xi, yi, start + 6.0], ix + (0 * n * 3) + voff*3);
			pipe.vertices.set([xo, yo, start + 6.0], ix + (1 * n * 3) + voff*3);
			pipe.vertices.set([xi, yi, start + 0.0], ix + (2 * n * 3) + voff*3);
			pipe.vertices.set([xo, yo, start + 0.8], ix + (3 * n * 3) + voff*3);
			pipe.vertices.set([xo, yo, start + 0.0], ix + (4 * n * 3) + voff*3);
			pipe.vertices.set([xs, ys, start + 0.0], ix + (5 * n * 3) + voff*3);
			pipe.vertices.set([xs, ys, start - 0.5], ix + (6 * n * 3) + voff*3);
			pipe.vertices.set([xo, yo, start - 0.5], ix + (7 * n * 3) + voff*3);

			for (let j = 0; j < 8; j++) {
				pipe.eIndices[2 * (i + (j * n)) + 0 + eoff] = i + (j * n) + voff;
				pipe.eIndices[2 * (i + (j * n)) + 1 + eoff] = i + (j * n) + 1 + voff;
			}
		}
		pipe.eIndices[(1 * n * 2) + eoff - 1] = (n * 2) + voff -1;
		pipe.eIndices[(2 * n * 2) + eoff - 1] = (n * 4) + voff -1;
		pipe.eIndices[(3 * n * 2) + eoff - 1] = (n * 1) + voff -1;
		pipe.eIndices[(4 * n * 2) + eoff - 1] = (n * 6) + voff -1;
		pipe.eIndices[(5 * n * 2) + eoff - 1] = (n * 3) + voff -1;
		pipe.eIndices[(6 * n * 2) + eoff - 1] = (n * 7) + voff -1;
		pipe.eIndices[(7 * n * 2) + eoff - 1] = (n * 8) + voff -1;
		pipe.eIndices[(8 * n * 2) + eoff - 1] = (n * 5) + voff -1;

		const ix = 8 * n * 2 + eoff;
		pipe.eIndices.set([0 + voff, n + voff], ix + 0);
		pipe.eIndices.set([n*1 + voff, n*3 + voff], ix + 2);
		pipe.eIndices.set([n*2 + voff, n*4 + voff], ix + 4);
		pipe.eIndices.set([n*0 + voff, n*2 + voff], ix + 6);
		pipe.eIndices.set([n*3 + voff, n*5 + voff], ix + 8);
		pipe.eIndices.set([n*5 + voff, n*6 + voff], ix + 10);
		pipe.eIndices.set([n*6 + voff, n*7 + voff], ix + 12);
		pipe.eIndices.set([n*7 + voff, n*4 + voff], ix + 14);
	}

	return pipe;
}
