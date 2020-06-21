// @ts-ignore: An import path cannot end with a '.ts' extension
import { Mat4 } from "./matrix.ts";

// @ts-ignore: An import path cannot end with a '.ts' extension
import { RenderModel } from "./render_model.ts";

export class MeshModel {
	public readonly vertices: Float32Array;
	public readonly normals: Float32Array;
	public readonly vIndices: Uint32Array;
	public readonly eIndices: Uint32Array;
	public readonly count: number;

	constructor(numVertices: number, numIndices: number) {
		this.vertices = new Float32Array(numVertices);
		this.normals = new Float32Array(numVertices);
		this.vIndices = new Uint32Array(numIndices);
		this.eIndices = new Uint32Array(numIndices);
		this.count = numVertices;
	}
}

export class FacesModel {
	public readonly vertices: Float32Array;
	public readonly normals: Float32Array;
	public readonly vIndices: Uint32Array;
	constructor(n: number) {
		this.vertices = new Float32Array(n * 3);
		this.normals = new Float32Array(n * 3);
		this.vIndices = new Uint32Array(n * 3);
	}
}

export class EdgesModel {
	public readonly vertices: Float32Array;
	public readonly eIndices: Uint32Array;
	constructor(n: number) {
		this.vertices = new Float32Array(n * 3);
		this.eIndices = new Uint32Array(n * 2);
	}
}

export interface ModelCollection {
	setMatrix: (mat: Mat4) => void;
	setup: (gl: WebGLRenderingContext) => void;
	draw: (gl: WebGLRenderingContext, viewMatrix: Mat4, projectionMatrix: Mat4) => void;
}

export class DefaultCollection implements ModelCollection {
	private renderModels = new Array<RenderModel>();
	private modelMatrix: Mat4 = new Mat4();

	addRenderModel(renderModel: RenderModel): void {
		this.renderModels.push(renderModel);
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
		const modelViewMatrix = viewMatrix.multiplied(this.modelMatrix);
		const normalMatrix: Mat4 = modelViewMatrix.clone();
		normalMatrix.invert();

		for (let i = 0, len = this.renderModels.length; i < len; i++) {
			this.renderModels[i].draw(gl, normalMatrix, modelViewMatrix, projectionMatrix);
		}
	}
}


