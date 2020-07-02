// @ts-ignore: An import path cannot end with a '.ts' extension
import { Mat4 } from "./matrix.ts";
// @ts-ignore: An import path cannot end with a '.ts' extension
import { ModelCollection } from "./model.ts";

export class Scene {
	// private isPlaying: boolean = true
	// private then: number = 0;
	// private pausedAt: number = 0;
	public gl: WebGLRenderingContext;
	private projectionMatrix: Mat4 = new Mat4();
	private models: Array<ModelCollection> = new Array<ModelCollection>();
	private viewMatrix: Mat4 = new Mat4();

	constructor(gl: WebGLRenderingContext) {
		this.gl = gl;
		this.setup();
	}

	addModel(model: ModelCollection): void {
		model.setup(this.gl);
		this.models.push(model);
	}

	clear(): void {
		// Fast clear array
		this.models.length = 0;
	}

	setup(): void {
		const gl = this.gl;

		gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
		gl.clearColor(0.2, 0.2, 0.2, 1.0);  // Clear to grey, fully opaque
		// gl.colorMask(false, false, false, true);
		gl.clearDepth(1.0);                 // Clear everything
		gl.enable(gl.DEPTH_TEST);           // Enable depth testing
		gl.enable(gl.BLEND);
		// gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

		const fov = 30.0 * Math.PI / 180.0; // in radians
		const canvas = gl.canvas as HTMLCanvasElement;
		const aspect = canvas.clientWidth / canvas.clientHeight;
		const zNear = 0.125;
		const zFar = 20.0;
		this.projectionMatrix = new Mat4();
		this.projectionMatrix.perspective(fov, aspect, zNear, zFar);
	}

	reset(): void {
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.setup();
	}

	setView(mat: Mat4): void {
		this.viewMatrix = mat;
	}

	draw(): void {
		const gl = this.gl;
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		for (let i = 0, len = this.models.length; i < len; i++) {
			this.models[i].draw(this.gl, this.viewMatrix, this.projectionMatrix);
		}
	}
};
