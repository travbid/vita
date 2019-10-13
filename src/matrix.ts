// WebAssembly must be loaded asynchronously so Webpack can split it out.
// NOTE: https://github.com/rustwasm/wasm-bindgen/issues/700
// If you get the error:
// "WebAssembly module is included in initial chunk.
// This is not allowed, because WebAssembly download and compilation must happen asynchronous.
// Add an async splitpoint (i. e. import()) somewhere between your entrypoint and the WebAssembly module"
// Change your tsconfig to module: esnext
// Or load the WASM module from a plain Javascript file (non-Typescript)
let wasm: any;
const loadWasm = async () => {
	wasm = await import('../vita-wasm/pkg');
	console.log("wasm loaded");
	console.log(wasm);
};
loadWasm();

// const loadWasm = async () => {
// 	wasm = await import('../vita-wasm/pkg');
// };
// loadWasm();

export class mat4 {
	private m = [
		[1, 0, 0, 0],
		[0, 1, 0, 0],
		[0, 0, 1, 0],
		[0, 0, 0, 1],
	];
	constructor() { }
	clone(): mat4 {
		const cl = new mat4();
		cl.m = this.m.map((a: number[]) => (a.slice(0)));
		return cl;
	}
	data(): number[] {
		const m = this.m;
		return [
			m[0][0], m[0][1], m[0][2], m[0][3],
			m[1][0], m[1][1], m[1][2], m[1][3],
			m[2][0], m[2][1], m[2][2], m[2][3],
			m[3][0], m[3][1], m[3][2], m[3][3],
		];
	}
	invert() {
		if (wasm === undefined) { return; }
		wasm.invert_mat4x4(this.m)
		return;

		let a00 = this.m[0][0], a01 = this.m[1][0], a02 = this.m[2][0], a03 = this.m[3][0];
		let a10 = this.m[0][1], a11 = this.m[1][1], a12 = this.m[2][1], a13 = this.m[3][1];
		let a20 = this.m[0][2], a21 = this.m[1][2], a22 = this.m[2][2], a23 = this.m[3][2];
		let a30 = this.m[0][3], a31 = this.m[1][3], a32 = this.m[2][3], a33 = this.m[3][3];

		let b00 = a00 * a11 - a01 * a10;
		let b01 = a00 * a12 - a02 * a10;
		let b02 = a00 * a13 - a03 * a10;
		let b03 = a01 * a12 - a02 * a11;
		let b04 = a01 * a13 - a03 * a11;
		let b05 = a02 * a13 - a03 * a12;
		let b06 = a20 * a31 - a21 * a30;
		let b07 = a20 * a32 - a22 * a30;
		let b08 = a20 * a33 - a23 * a30;
		let b09 = a21 * a32 - a22 * a31;
		let b10 = a21 * a33 - a23 * a31;
		let b11 = a22 * a33 - a23 * a32;

		// Calculate the determinant
		let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

		if (!det) { return; }
		det = 1.0 / det;

		this.m[0][0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
		this.m[1][0] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
		this.m[2][0] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
		this.m[3][0] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
		this.m[0][1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
		this.m[1][1] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
		this.m[2][1] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
		this.m[3][1] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
		this.m[0][2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
		this.m[1][2] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
		this.m[2][2] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
		this.m[3][2] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
		this.m[0][3] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
		this.m[1][3] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
		this.m[2][3] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
		this.m[3][3] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
	}
	perspective(fov: number, aspect: number, near: number, far: number) {
		const h = 2 * near * Math.tan(fov);
		const w = h * aspect;
		this.m = [
			[near / w, 0, 0, 0],
			[0, near / h, 0, 0],
			[0, 0, -(far + near) / (far - near), -(2 * far * near) / (far - near)],
			[0, 0, -1, 0],
		];
	}
	rotate(rad: number, axis: [number, number, number]) {
		const EPSILON = 0.00001;
		let x = axis[0], y = axis[1], z = axis[2];
		let len = Math.hypot(x, y, z);

		if (len < EPSILON) { return null; }

		len = 1 / len;
		x *= len;
		y *= len;
		z *= len;

		const s = Math.sin(rad);
		const c = Math.cos(rad);
		const t = 1 - c;

		// Construct the elements of the rotation matrix
		let b00 = x * x * t + c, b01 = y * x * t + z * s, b02 = z * x * t - y * s;
		let b10 = x * y * t - z * s, b11 = y * y * t + c, b12 = z * y * t + x * s;
		let b20 = x * z * t + y * s, b21 = y * z * t - x * s, b22 = z * z * t + c;

		let a00 = this.m[0][0], a01 = this.m[1][0], a02 = this.m[2][0], a03 = this.m[3][0];
		let a10 = this.m[0][1], a11 = this.m[1][1], a12 = this.m[2][1], a13 = this.m[3][1];
		let a20 = this.m[0][2], a21 = this.m[1][2], a22 = this.m[2][2], a23 = this.m[3][2];

		// Perform rotation-specific matrix multiplication
		this.m[0][0] = a00 * b00 + a10 * b01 + a20 * b02;
		this.m[1][0] = a01 * b00 + a11 * b01 + a21 * b02;
		this.m[2][0] = a02 * b00 + a12 * b01 + a22 * b02;
		this.m[3][0] = a03 * b00 + a13 * b01 + a23 * b02;
		this.m[0][1] = a00 * b10 + a10 * b11 + a20 * b12;
		this.m[1][1] = a01 * b10 + a11 * b11 + a21 * b12;
		this.m[2][1] = a02 * b10 + a12 * b11 + a22 * b12;
		this.m[3][1] = a03 * b10 + a13 * b11 + a23 * b12;
		this.m[0][2] = a00 * b20 + a10 * b21 + a20 * b22;
		this.m[1][2] = a01 * b20 + a11 * b21 + a21 * b22;
		this.m[2][2] = a02 * b20 + a12 * b21 + a22 * b22;
		this.m[3][2] = a03 * b20 + a13 * b21 + a23 * b22;
	}
	translate(x: number, y: number, z: number) {
		this.m[0][3] += x;
		this.m[1][3] += y;
		this.m[2][3] += z;
	}
	transpose(): number[] {
		const m = this.m;
		return [
			m[0][0], m[1][0], m[2][0], m[3][0],
			m[0][1], m[1][1], m[2][1], m[3][1],
			m[0][2], m[1][2], m[2][2], m[3][2],
			m[0][3], m[1][3], m[2][3], m[3][3],
		];
	}
}
