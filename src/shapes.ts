export class Cube  {
	private static vertices = [
		[-1.0, -1.0, 1.0], // Front face
		[1.0, -1.0, 1.0],
		[1.0, 1.0, 1.0],
		[-1.0, 1.0, 1.0],

		[-1.0, -1.0, -1.0], // Back face
		[-1.0, 1.0, -1.0],
		[1.0, 1.0, -1.0],
		[1.0, -1.0, -1.0],
	];
	// colors: [],
	private static vnormals = [
		[0.0, 0.0, 1.0], // Front
		[0.0, 0.0, -1.0], // Back
		[0.0, 1.0, 0.0], // Top
		[0.0, -1.0, 0.0], // Bottom
		[1.0, 0.0, 0.0], // Right
		[-1.0, 0.0, 0.0] // Left
	];
	// indices: []

	public static positions(): number[] {
		return [
			...this.vertices[0],
			...this.vertices[1],
			...this.vertices[2],
			...this.vertices[3],

			...this.vertices[4],
			...this.vertices[5],
			...this.vertices[6],
			...this.vertices[7],

			...this.vertices[5],
			...this.vertices[3],
			...this.vertices[2],
			...this.vertices[6],

			...this.vertices[4],
			...this.vertices[7],
			...this.vertices[1],
			...this.vertices[0],

			...this.vertices[7],
			...this.vertices[6],
			...this.vertices[2],
			...this.vertices[1],

			...this.vertices[4],
			...this.vertices[0],
			...this.vertices[3],
			...this.vertices[5],
		];
	}

	public static normals(): number[] {
		return [
			...this.vnormals[0],
			...this.vnormals[0],
			...this.vnormals[0],
			...this.vnormals[0],

			...this.vnormals[1],
			...this.vnormals[1],
			...this.vnormals[1],
			...this.vnormals[1],

			...this.vnormals[2],
			...this.vnormals[2],
			...this.vnormals[2],
			...this.vnormals[2],

			...this.vnormals[3],
			...this.vnormals[3],
			...this.vnormals[3],
			...this.vnormals[3],

			...this.vnormals[4],
			...this.vnormals[4],
			...this.vnormals[4],
			...this.vnormals[4],

			...this.vnormals[5],
			...this.vnormals[5],
			...this.vnormals[5],
			...this.vnormals[5],
		];
	}
};

