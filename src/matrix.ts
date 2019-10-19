// WebAssembly must be loaded asynchronously so Webpack can split it out.
// NOTE: https://github.com/rustwasm/wasm-bindgen/issues/700
// If you get the error:
// "WebAssembly module is included in initial chunk.
// This is not allowed, because WebAssembly download and compilation must happen asynchronous.
// Add an async splitpoint (i. e. import()) somewhere between your entrypoint and the WebAssembly module"
// Change your tsconfig to module: esnext
// Or load the WASM module from a plain Javascript file (non-Typescript)
let invertMat4: ((arg0: Float64Array) => void) | undefined = undefined;
let rotateMat4: ((arg0: Float64Array, arg1: number, arg2: Float64Array) => void) | undefined = undefined;
const loadWasm = async (): Promise<void> => {
	const { invertMat4x4, rotateMat4x4 } = await import('../vita-wasm/pkg');
	invertMat4 = invertMat4x4;
	rotateMat4 = rotateMat4x4;
	console.log(invertMat4x4);
};
loadWasm();

export class Mat4 {
	private m: Float64Array = new Float64Array([
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1,
	]);
	// constructor() { }
	clone(): Mat4 {
		const cl = new Mat4();
		cl.m = new Float64Array(this.m); // map((a: number[]) => (a.slice(0)));
		return cl;
	}
	data(): number[] {
		const data: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		for (const i in this.m) {
			data[i] = this.m[i];
		}
		return data;
	}
	invert(): void {
		if (invertMat4 == undefined) { return; }
		invertMat4(this.m)
	}
	perspective(fov: number, aspect: number, near: number, far: number): void {
		const h = 2 * near * Math.tan(fov);
		const w = h * aspect;
		this.m = new Float64Array([
			near / w, 0, 0, 0,
			0, near / h, 0, 0,
			0, 0, -(far + near) / (far - near), -(2 * far * near) / (far - near),
			0, 0, -1, 0,
		]);
	}
	rotate(rad: number, axis: number[]): void {
		if (rotateMat4 === undefined) { return; }
		rotateMat4(this.m, rad, new Float64Array(axis));
	}
	translate(x: number, y: number, z: number): void {
		this.m[3] += x;
		this.m[7] += y;
		this.m[11] += z;
	}
	transposed(): number[] {
		const m = this.m;
		return [
			m[0], m[4], m[8], m[12],
			m[1], m[5], m[9], m[13],
			m[2], m[6], m[10], m[14],
			m[3], m[7], m[11], m[15],
		];
	}
}
