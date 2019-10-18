// WebAssembly must be loaded asynchronously so Webpack can split it out.
// NOTE: https://github.com/rustwasm/wasm-bindgen/issues/700
// If you get the error:
// "WebAssembly module is included in initial chunk.
// This is not allowed, because WebAssembly download and compilation must happen asynchronous.
// Add an async splitpoint (i. e. import()) somewhere between your entrypoint and the WebAssembly module"
// Change your tsconfig to module: esnext
// Or load the WASM module from a plain Javascript file (non-Typescript)
let invertMat4x4: ((arg0: Float64Array) => void) | undefined = undefined;
const loadWasm = async (): Promise<void> => {
	const {invert_mat4x4} = await import('../vita-wasm/pkg');
	invertMat4x4 = invert_mat4x4;
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
		if (invertMat4x4 === undefined) { return; }
		invertMat4x4(this.m)
		return;
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
	rotate(rad: number, axis: [number, number, number]): void {
		const EPSILON = 0.00001;
		let x = axis[0], y = axis[1], z = axis[2];
		let len = Math.hypot(x, y, z);

		if (len < EPSILON) { return; }

		len = 1 / len;
		x *= len;
		y *= len;
		z *= len;

		const s = Math.sin(rad);
		const c = Math.cos(rad);
		const t = 1 - c;

		// Construct the elements of the rotation matrix
		const b00 = x * x * t + c, b01 = y * x * t + z * s, b02 = z * x * t - y * s;
		const b10 = x * y * t - z * s, b11 = y * y * t + c, b12 = z * y * t + x * s;
		const b20 = x * z * t + y * s, b21 = y * z * t - x * s, b22 = z * z * t + c;

		const a00 = this.m[0], a01 = this.m[4], a02 = this.m[8], a03 = this.m[12];
		const a10 = this.m[1], a11 = this.m[5], a12 = this.m[9], a13 = this.m[13];
		const a20 = this.m[2], a21 = this.m[6], a22 = this.m[10], a23 = this.m[14];

		// Perform rotation-specific matrix multiplication
		this.m[0] = a00 * b00 + a10 * b01 + a20 * b02;
		this.m[4] = a01 * b00 + a11 * b01 + a21 * b02;
		this.m[8] = a02 * b00 + a12 * b01 + a22 * b02;
		this.m[12] = a03 * b00 + a13 * b01 + a23 * b02;
		this.m[1] = a00 * b10 + a10 * b11 + a20 * b12;
		this.m[5] = a01 * b10 + a11 * b11 + a21 * b12;
		this.m[9] = a02 * b10 + a12 * b11 + a22 * b12;
		this.m[13] = a03 * b10 + a13 * b11 + a23 * b12;
		this.m[2] = a00 * b20 + a10 * b21 + a20 * b22;
		this.m[6] = a01 * b20 + a11 * b21 + a21 * b22;
		this.m[10] = a02 * b20 + a12 * b21 + a22 * b22;
		this.m[14] = a03 * b20 + a13 * b21 + a23 * b22;
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
