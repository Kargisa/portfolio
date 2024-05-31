import { createProgram, createShader, readShaderFile, resizeCanvasToDisplaySize } from "./helper";

let program: WebGLProgram;
let gl: WebGLRenderingContext;
let canvas: HTMLCanvasElement;

export const initializeWebGL = async (can: HTMLCanvasElement) => {
	canvas = can;
	const taskGL = canvas.getContext('webgl');

	if (!taskGL) {
		console.error('WebGL not supported');
		return;
	}

	gl = taskGL;

	const vertexShaderSource = await readShaderFile('test', 'vert');
	const fragmentShaderSource = await readShaderFile('test', 'frag');

	const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)!;
	const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)!;

	program = createProgram(gl, vertexShader, fragmentShader)!;

	draw();
};

const draw = () => {
	const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');

	// Create a buffer and put three 2d clip space points in it
	const positionBuffer = gl.createBuffer();

	// Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

	var positions = [0, 0, 0, 0.5, 0.7, 0];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

	resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);

	// Tell WebGL how to convert from clip space to pixels
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

	// Clear the canvas
	gl.clearColor(0, 0, 0, 0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	// Tell it to use our program (pair of shaders)
	gl.useProgram(program);

	// Turn on the attribute
	gl.enableVertexAttribArray(positionAttributeLocation);

	// Bind the position buffer.
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

	// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
	const size = 2; // 2 components per iteration
	const type = gl.FLOAT; // the data is 32bit floats
	const normalize = false; // don't normalize the data
	const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
	const offset = 0; // start at the beginning of the buffer
	gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

	// draw
	const primitiveType = gl.TRIANGLES;
	const count = 3;
	gl.drawArrays(primitiveType, offset, count);
};
