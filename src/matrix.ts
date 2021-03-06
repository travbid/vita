// WebAssembly must be loaded asynchronously so Webpack can split it out.
// NOTE: https://github.com/rustwasm/wasm-bindgen/issues/700
// If you get the error:
// "WebAssembly module is included in initial chunk.
// This is not allowed, because WebAssembly download and compilation must happen asynchronous.
// Add an async splitpoint (i. e. import()) somewhere between your entrypoint
// and the WebAssembly module"
// Change your tsconfig to module: esnext
// Or load the WASM module from a plain Javascript file (non-Typescript)
let invertMat4: ((arg0: Float64Array) => void) | undefined = undefined;
let rotateMat4: (
	(arg0: Float64Array, arg1: number, arg2: Float64Array) => void
) | undefined = undefined;

const loadWasm = async(): Promise<void> => {
	const { invertMat4x4, rotateMat4x4 } = await import("../vita-wasm/pkg");
	invertMat4 = invertMat4x4;
	rotateMat4 = rotateMat4x4;
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
		if (invertMat4 === undefined) { return; }
		invertMat4(this.m);
	}
	multiplied(other: Mat4): Mat4 {
		const ret = new Float64Array([
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1,
		]);
		const m = this.m;
		const b = other.data();
		ret[0] = (b[0] * m[0]) + (b[4] * m[1]) + (b[8]  * m[2]) + (b[12] * m[3]);
		ret[1] = (b[1] * m[0]) + (b[5] * m[1]) + (b[9]  * m[2]) + (b[13] * m[3]);
		ret[2] = (b[2] * m[0]) + (b[6] * m[1]) + (b[10] * m[2]) + (b[14] * m[3]);
		ret[3] = (b[3] * m[0]) + (b[7] * m[1]) + (b[11] * m[2]) + (b[15] * m[3]);

		ret[4] = (b[0] * m[4]) + (b[4] * m[5]) + (b[8]  * m[6]) + (b[12] * m[7]);
		ret[5] = (b[1] * m[4]) + (b[5] * m[5]) + (b[9]  * m[6]) + (b[13] * m[7]);
		ret[6] = (b[2] * m[4]) + (b[6] * m[5]) + (b[10] * m[6]) + (b[14] * m[7]);
		ret[7] = (b[3] * m[4]) + (b[7] * m[5]) + (b[11] * m[6]) + (b[15] * m[7]);

		ret[8]  = (b[0] * m[8]) + (b[4] * m[9]) + (b[8]  * m[10]) + (b[12] * m[11]);
		ret[9]  = (b[1] * m[8]) + (b[5] * m[9]) + (b[9]  * m[10]) + (b[13] * m[11]);
		ret[10] = (b[2] * m[8]) + (b[6] * m[9]) + (b[10] * m[10]) + (b[14] * m[11]);
		ret[11] = (b[3] * m[8]) + (b[7] * m[9]) + (b[11] * m[10]) + (b[15] * m[11]);

		ret[12] = (b[0] * m[12]) + (b[4] * m[13]) + (b[8]  * m[14]) + (b[12] * m[15]);
		ret[13] = (b[1] * m[12]) + (b[5] * m[13]) + (b[9]  * m[14]) + (b[13] * m[15]);
		ret[14] = (b[2] * m[12]) + (b[6] * m[13]) + (b[10] * m[14]) + (b[14] * m[15]);
		ret[15] = (b[3] * m[12]) + (b[7] * m[13]) + (b[11] * m[14]) + (b[15] * m[15]);

		const mat = new Mat4();
		mat.m = ret;
		return mat;
	}
	perspective(fov: number, aspect: number, near: number, far: number): void {
		let h: number;
		let w: number;
		if (aspect > 1.0) {
			h = 2 * near * Math.tan(fov / 2.0);
			w = h * aspect;
		} else {
			w = 2 * near * Math.tan(fov / 2.0);
			h = w / aspect;
		}
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
			m[0], m[4], m[8],  m[12],
			m[1], m[5], m[9],  m[13],
			m[2], m[6], m[10], m[14],
			m[3], m[7], m[11], m[15],
		];
	}
}
