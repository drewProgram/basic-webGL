"use_strict";
import resizeCanvas from './canvas-helper';

let vertexShaderSource = `#version 300 es

// an attribute is an in (input) to an vertex shader. It receives data from the buffer
in vec4 a_position;

// all shaders have a main function
void main() {
    // gl_Position is a special var a vertex shader is responsible for setting
    gl_Position = a_position;
}
`;

let fragmentShaderSource = `#version 300 es

// fragment shaders don't have a default precision so we need
// to pick one. highp is a good default. It means "higih precision"
precision highp float;

//  we need to declare an output for the fragment shader
out vec4 outColor;

void main() {
    // Just set the output to a constant reddish-purple
    outColor = vec4(1, 0, 0.5, 1);
}
`

/** @type {HTMLCanvasElement} */ 
export const canvas = document.querySelector('#c');

const gl = canvas.getContext('webgl2');
if (!gl) {
    // no webgl for you!
    console.error("You don't have webGL!");
}

function createShader(gl, type, source) {
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

// linking shaders into a program
function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    const success = gl.getProgramParameter(program, gl.LINK_STATUS);

    if (success) {
        return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

// vertex + fragment = program
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
const program = createProgram(gl, vertexShader, fragmentShader);

const positionAttributeLocation = gl.getAttribLocation(program, "a_position");

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// three 2d points
const positions = [
    0, 0,
    0, 0.5,
    0.7, 0,
];
// * Copies the positions array content into an Float array.
// * gl.bufferData copies that data to the positionBuffer on the GPU. It's using position buffer
// because we bound it to the ARRAY_BUFFER bind point above.
// * gl.STATIC_DRAW is a hint to webGL about how we'll the data, this tell to it that
// we are not likely to change this data much.
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

const vao = gl.createVertexArray();
gl.bindVertexArray(vao);
gl.enableVertexAttribArray(positionAttributeLocation);

// how to pull the data out of the buffer
let size = 2;             // 2 components per iteration
let type = gl.FLOAT;      // the data is 32 bit floats
let normalize = false;    // don't normalize the data
let stride = 0;           // 0 = move forward size * sizeof(type) each iteration to get the next position
let offset = 0;           // start at the beginning of the buffer
gl.vertexAttribPointer(
    positionAttributeLocation, size, type,
    normalize, stride, offset
);

resizeCanvas(gl.canvas);
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

// clear canvas
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

// tell it to use our program
gl.useProgram(program);

// bind the attribute/buffer set we want
gl.bindVertexArray(vao);

// ASK WEBGL TO EXECUTE OUR GLSL PROGRAM
let primitiveType = gl.TRIANGLES;
offset = 0;
let count = 3;
gl.drawArrays(primitiveType, offset, count);