export const resizeCanvasToDisplaySize = (canvas: HTMLCanvasElement) => {
	// Lookup the size the browser is displaying the canvas in CSS pixels.
	const displayWidth = canvas.clientWidth;
	const displayHeight = canvas.clientHeight;

    console.log(displayWidth, displayHeight);

	// Check if the canvas is not the same size.
	const needResize = canvas.width !== displayWidth || canvas.height !== displayHeight;

	if (needResize) {
		// Make the canvas the same size
		canvas.width = displayWidth;
		canvas.height = displayHeight;
	}

	return needResize;
};

export const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
	let shader = gl.createShader(type);

	if (!shader) {
		throw new Error('Error creating shader');
	}

	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	if (success) {
		return shader;
	}

	console.error(gl.getShaderInfoLog(shader));
	gl.deleteShader(shader);
};

export const createProgram = (
	gl: WebGLRenderingContext,
	vertShader: WebGLShader,
	fragShader: WebGLShader
) => {
	let program = gl.createProgram();

	if (!program) {
		throw new Error('Error creating program');
	}

	gl.attachShader(program, vertShader);
	gl.attachShader(program, fragShader);
	gl.linkProgram(program);

	let success = gl.getProgramParameter(program, gl.LINK_STATUS);
	if (success) {
		return program;
	}

	console.error(gl.getProgramInfoLog(program));
	gl.deleteProgram(program);
};

export const readShaderFile = async (name: string, type: string): Promise<string> => {
	if (type === 'frag') {
		const frag = await fetch(`/shaders/${name}/frag.shader`);
		return await frag.text();
	} else if (type === 'vert') {
		const vert = await fetch(`/shaders/${name}/vert.shader`);
		return await vert.text();
	}

	throw new Error('Invalid shader type, must be either "frag" or "vert"');
};
