// @ts-ignore: An import path cannot end with a '.ts' extension
import { Mat4 } from "../matrix.ts";
// @ts-ignore: An import path cannot end with a '.ts' extension
import { Model, ModelCollection } from "../model.ts";
// @ts-ignore: An import path cannot end with a '.ts' extension
import { RenderModel } from "../render_model.ts";

export class SV100Collection implements ModelCollection {
	private renderModels = new Array<RenderModel>();
	private sceneMatrix: Mat4 = new Mat4();
	private modelMatrix: Mat4 = new Mat4();

	public manhole: RenderModel | null = null;
	public podFaces: RenderModel | null = null;
	public podEdges: RenderModel | null = null;
	public tripodFaces: RenderModel | null = null;
	public tripodEdges: RenderModel | null = null;
	public laser: RenderModel | null = null;
	public lights: RenderModel | null = null;

	constructor() {
		this.sceneMatrix.translate(0, 0.0, 2.5);
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
		const tmp = viewMatrix.multiplied(this.sceneMatrix);
		const modelViewMatrix = tmp.multiplied(this.modelMatrix);
		const normalMatrix: Mat4 = modelViewMatrix.clone();
		normalMatrix.invert();

		this.manhole?.draw(gl, normalMatrix, tmp, projectionMatrix);
		this.tripodFaces?.draw(gl, normalMatrix, tmp, projectionMatrix);
		this.tripodEdges?.draw(gl, normalMatrix, tmp, projectionMatrix);
		this.podFaces?.draw(gl, normalMatrix, modelViewMatrix, projectionMatrix);
		this.podEdges?.draw(gl, normalMatrix, modelViewMatrix, projectionMatrix);
		this.laser?.draw(gl, normalMatrix, modelViewMatrix, projectionMatrix);
		this.lights?.draw(gl, normalMatrix, modelViewMatrix, projectionMatrix);
	}
}

export function generate(laser: Model, manhole: Model, lights: Model): void {
	{
		// Generate laser ring edges
		const d = 0.5; // Diameter in metres
		const n = 16;
		for (let i = 0; i < n; i++) {
			const ix = i * 3;
			const angle = i * (2.0 * Math.PI / n);
			laser.vertices.set([Math.sin(angle) * d, -0.16, Math.cos(angle) * d], ix);
			laser.eIndices[i * 2 + 0] = i;
			laser.eIndices[i * 2 + 1] = i + 1;
		}
		laser.eIndices[(n * 2) - 1] = 0;

		const ni = 8;
		const di = 0.025;
		for (let i = n; i < (n + ni); i++) {
			const ix = i * 3;
			const angle = (i - n) * (2.0 * Math.PI / ni);
			laser.vertices.set([Math.sin(angle) * di, -0.16, Math.cos(angle) * di], ix);
			laser.eIndices[i * 2 + 0] = i;
			laser.eIndices[i * 2 + 1] = i + 1;
		}
		laser.eIndices[((n + ni) * 2) - 1] = n;
	}
	{
		// Generate manhole
		const ri = 0.5; // Radius in metres
		const rOuter = 0.6;
		const n = 8 + 1;
		for (let i = 0; i < n; i++) {
			const ix = i * 3;
			const angle = i * ((Math.PI / (n - 1))) - (Math.PI / 2.0);

			manhole.vertices[(ix + (0 * n * 3)) + 0] = Math.sin(angle) * ri;
			manhole.vertices[(ix + (0 * n * 3)) + 1] = 1.0;
			manhole.vertices[(ix + (0 * n * 3)) + 2] = Math.cos(angle) * ri;

			manhole.vertices[(ix + (1 * n * 3)) + 0] = Math.sin(angle) * rOuter;
			manhole.vertices[(ix + (1 * n * 3)) + 1] = 1.0;
			manhole.vertices[(ix + (1 * n * 3)) + 2] = Math.cos(angle) * rOuter;

			manhole.vertices[(ix + (2 * n * 3)) + 0] = Math.sin(angle) * ri;
			manhole.vertices[(ix + (2 * n * 3)) + 1] = -1.0;
			manhole.vertices[(ix + (2 * n * 3)) + 2] = Math.cos(angle) * ri;

			manhole.vertices[(ix + (3 * n * 3)) + 0] = Math.sin(angle) * rOuter;
			manhole.vertices[(ix + (3 * n * 3)) + 1] = -1.0;
			manhole.vertices[(ix + (3 * n * 3)) + 2] = Math.cos(angle) * rOuter;

			manhole.eIndices[i * 2 + 0] = i;
			manhole.eIndices[i * 2 + 1] = i + 1;

			manhole.eIndices[2 * (i + n) + 0] = i + n;
			manhole.eIndices[2 * (i + n) + 1] = i + n + 1;

			manhole.eIndices[2 * (i + (2 * n)) + 0] = i + (2 * n);
			manhole.eIndices[2 * (i + (2 * n)) + 1] = i + (2 * n) + 1;

			manhole.eIndices[2 * (i + (3 * n)) + 0] = i + (3 * n);
			manhole.eIndices[2 * (i + (3 * n)) + 1] = i + (3 * n) + 1;
		}
		manhole.eIndices[(1 * n * 2) - 1] = (n * 2) - 1;
		manhole.eIndices[(2 * n * 2) - 1] = (n * 4) - 1;
		manhole.eIndices[(3 * n * 2) - 1] = (n * 1) - 1;
		manhole.eIndices[(4 * n * 2) - 1] = (n * 3) - 1;

		let ix = 4 * n * 2;
		manhole.eIndices[ix++] = 0;
		manhole.eIndices[ix++] = n;

		manhole.eIndices[ix++] = n;
		manhole.eIndices[ix++] = n * 3;

		manhole.eIndices[ix++] = n * 3;
		manhole.eIndices[ix++] = n * 2;

		manhole.eIndices[ix++] = n * 2;
		manhole.eIndices[ix++] = n * 0;
	}
	{
		// Generate lights
		const near = 0.125;
		const far = 0.5;
		const sm = 0.05;
		const lg = 0.25;
		lights.vertices.set([
			near, sm, sm, // top left (right side)
			near, sm, -sm, // top right
			near, -sm, -sm, // bottom right
			near, -sm, sm, // bottom left
			far, lg, lg,
			far, lg, -lg,
			far, -lg, -lg,
			far, -lg, lg,
			-near, sm, sm, // top left (left side)
			-near, sm, -sm, // bottom left
			-near, -sm, -sm, // bottom right
			-near, -sm, sm, // top right
			-far, lg, lg,
			-far, lg, -lg,
			-far, -lg, -lg,
			-far, -lg, lg,
		], 0);

		const magA = 0.4;
		const magB = 0.6;
		lights.normals.set([
			-0.5, 0.0, -0.5, -0.5, 0.0, -0.5,
			-0.5, 0.5, 0.0, -0.5, 0.5, 0.0,
			-0.5, 0.0, 0.5, -0.5, 0.0, 0.5,
			-0.5, -0.5, 0.0, -0.5, -0.5, 0.0,
			-0.5, 0.0, -0.5, -0.5, 0.0, -0.5,
			-0.5, 0.5, 0.0, -0.5, 0.5, 0.0,
			-0.5, 0.0, 0.5, -0.5, 0.0, 0.5,
			-0.5, -0.5, 0.0, -0.5, -0.5, 0.0], 0);

		const n = 8;
		const m = 24;
		for (let i = 0; i < 2; i++) {
			const rm = i * m;
			const rn = i * n;
			lights.vIndices[0 + rm] = 3 + rn;
			lights.vIndices[1 + rm] = 0 + rn;
			lights.vIndices[2 + rm] = 7 + rn;
			lights.vIndices[3 + rm] = 0 + rn;
			lights.vIndices[4 + rm] = 4 + rn;
			lights.vIndices[5 + rm] = 7 + rn;

			lights.vIndices[6 + rm] = 0 + rn;
			lights.vIndices[7 + rm] = 1 + rn;
			lights.vIndices[8 + rm] = 4 + rn;
			lights.vIndices[9 + rm] = 1 + rn;
			lights.vIndices[10 + rm] = 5 + rn;
			lights.vIndices[11 + rm] = 4 + rn;

			lights.vIndices[12 + rm] = 2 + rn;
			lights.vIndices[13 + rm] = 3 + rn;
			lights.vIndices[14 + rm] = 6 + rn;
			lights.vIndices[15 + rm] = 3 + rn;
			lights.vIndices[16 + rm] = 7 + rn;
			lights.vIndices[17 + rm] = 6 + rn;

			lights.vIndices[18 + rm] = 1 + rn;
			lights.vIndices[19 + rm] = 2 + rn;
			lights.vIndices[20 + rm] = 5 + rn;
			lights.vIndices[21 + rm] = 2 + rn;
			lights.vIndices[22 + rm] = 6 + rn;
			lights.vIndices[23 + rm] = 5 + rn;
		}
	}
}
