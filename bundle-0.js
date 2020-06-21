(window["webpackJsonpindex"] = window["webpackJsonpindex"] || []).push([[0],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Instantiate WebAssembly module
var wasmExports = __webpack_require__.w[module.i];

// export exports from WebAssembly module
module.exports = wasmExports;
// exec imports from WebAssembly module (for esm order)


// exec wasm module
wasmExports["i"]()

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "parseSTL", function() { return /* reexport */ parseSTL; });
__webpack_require__.d(__webpack_exports__, "parseSTLMesh", function() { return /* reexport */ parseSTLMesh; });
__webpack_require__.d(__webpack_exports__, "invertMat4x4", function() { return /* reexport */ invertMat4x4; });
__webpack_require__.d(__webpack_exports__, "invertedMat4x4", function() { return /* reexport */ invertedMat4x4; });
__webpack_require__.d(__webpack_exports__, "rotateMat4x4", function() { return /* reexport */ rotateMat4x4; });

// EXTERNAL MODULE: ./vita-wasm/pkg/index_bg.wasm
var index_bg = __webpack_require__(2);

// CONCATENATED MODULE: ./vita-wasm/pkg/index_bg.js


let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== index_bg["e" /* memory */].buffer) {
        cachegetUint8Memory0 = new Uint8Array(index_bg["e" /* memory */].buffer);
    }
    return cachegetUint8Memory0;
}

let WASM_VECTOR_LEN = 0;

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1);
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

let cachegetFloat32Memory0 = null;
function getFloat32Memory0() {
    if (cachegetFloat32Memory0 === null || cachegetFloat32Memory0.buffer !== index_bg["e" /* memory */].buffer) {
        cachegetFloat32Memory0 = new Float32Array(index_bg["e" /* memory */].buffer);
    }
    return cachegetFloat32Memory0;
}

function passArrayF32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4);
    getFloat32Memory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

let cachegetUint32Memory0 = null;
function getUint32Memory0() {
    if (cachegetUint32Memory0 === null || cachegetUint32Memory0.buffer !== index_bg["e" /* memory */].buffer) {
        cachegetUint32Memory0 = new Uint32Array(index_bg["e" /* memory */].buffer);
    }
    return cachegetUint32Memory0;
}

function passArray32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4);
    getUint32Memory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== index_bg["e" /* memory */].buffer) {
        cachegetInt32Memory0 = new Int32Array(index_bg["e" /* memory */].buffer);
    }
    return cachegetInt32Memory0;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}
/**
* Parse an STL file into a list of vertices, normals, and edges without edges
* between coincident, parallel faces.
* @param {Uint8Array} buf
* @param {Float32Array} vertices
* @param {Float32Array} normals
* @param {Uint32Array} v_indices
* @param {Uint32Array} e_indices
* @returns {string | undefined}
*/
function parseSTL(buf, vertices, normals, v_indices, e_indices) {
    try {
        var ptr0 = passArray8ToWasm0(buf, index_bg["b" /* __wbindgen_malloc */]);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passArrayF32ToWasm0(vertices, index_bg["b" /* __wbindgen_malloc */]);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = passArrayF32ToWasm0(normals, index_bg["b" /* __wbindgen_malloc */]);
        var len2 = WASM_VECTOR_LEN;
        var ptr3 = passArray32ToWasm0(v_indices, index_bg["b" /* __wbindgen_malloc */]);
        var len3 = WASM_VECTOR_LEN;
        var ptr4 = passArray32ToWasm0(e_indices, index_bg["b" /* __wbindgen_malloc */]);
        var len4 = WASM_VECTOR_LEN;
        index_bg["f" /* parseSTL */](8, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4);
        var r0 = getInt32Memory0()[8 / 4 + 0];
        var r1 = getInt32Memory0()[8 / 4 + 1];
        let v5;
        if (r0 !== 0) {
            v5 = getStringFromWasm0(r0, r1).slice();
            index_bg["a" /* __wbindgen_free */](r0, r1 * 1);
        }
        return v5;
    } finally {
        vertices.set(getFloat32Memory0().subarray(ptr1 / 4, ptr1 / 4 + len1));
        index_bg["a" /* __wbindgen_free */](ptr1, len1 * 4);
        normals.set(getFloat32Memory0().subarray(ptr2 / 4, ptr2 / 4 + len2));
        index_bg["a" /* __wbindgen_free */](ptr2, len2 * 4);
        v_indices.set(getUint32Memory0().subarray(ptr3 / 4, ptr3 / 4 + len3));
        index_bg["a" /* __wbindgen_free */](ptr3, len3 * 4);
        e_indices.set(getUint32Memory0().subarray(ptr4 / 4, ptr4 / 4 + len4));
        index_bg["a" /* __wbindgen_free */](ptr4, len4 * 4);
    }
}

/**
* Parse an STL file into a list of vertices, normals, and edges. Coincident
* points are assimilated into the same vertex. Normals are averaged out for
* each point.
* @param {Uint8Array} buf
* @param {Float32Array} vertices
* @param {Float32Array} normals
* @param {Uint32Array} v_indices
* @param {Uint32Array} e_indices
* @returns {string | undefined}
*/
function parseSTLMesh(buf, vertices, normals, v_indices, e_indices) {
    try {
        var ptr0 = passArray8ToWasm0(buf, index_bg["b" /* __wbindgen_malloc */]);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passArrayF32ToWasm0(vertices, index_bg["b" /* __wbindgen_malloc */]);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = passArrayF32ToWasm0(normals, index_bg["b" /* __wbindgen_malloc */]);
        var len2 = WASM_VECTOR_LEN;
        var ptr3 = passArray32ToWasm0(v_indices, index_bg["b" /* __wbindgen_malloc */]);
        var len3 = WASM_VECTOR_LEN;
        var ptr4 = passArray32ToWasm0(e_indices, index_bg["b" /* __wbindgen_malloc */]);
        var len4 = WASM_VECTOR_LEN;
        index_bg["g" /* parseSTLMesh */](8, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4);
        var r0 = getInt32Memory0()[8 / 4 + 0];
        var r1 = getInt32Memory0()[8 / 4 + 1];
        let v5;
        if (r0 !== 0) {
            v5 = getStringFromWasm0(r0, r1).slice();
            index_bg["a" /* __wbindgen_free */](r0, r1 * 1);
        }
        return v5;
    } finally {
        vertices.set(getFloat32Memory0().subarray(ptr1 / 4, ptr1 / 4 + len1));
        index_bg["a" /* __wbindgen_free */](ptr1, len1 * 4);
        normals.set(getFloat32Memory0().subarray(ptr2 / 4, ptr2 / 4 + len2));
        index_bg["a" /* __wbindgen_free */](ptr2, len2 * 4);
        v_indices.set(getUint32Memory0().subarray(ptr3 / 4, ptr3 / 4 + len3));
        index_bg["a" /* __wbindgen_free */](ptr3, len3 * 4);
        e_indices.set(getUint32Memory0().subarray(ptr4 / 4, ptr4 / 4 + len4));
        index_bg["a" /* __wbindgen_free */](ptr4, len4 * 4);
    }
}

let cachegetFloat64Memory0 = null;
function getFloat64Memory0() {
    if (cachegetFloat64Memory0 === null || cachegetFloat64Memory0.buffer !== index_bg["e" /* memory */].buffer) {
        cachegetFloat64Memory0 = new Float64Array(index_bg["e" /* memory */].buffer);
    }
    return cachegetFloat64Memory0;
}

function passArrayF64ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 8);
    getFloat64Memory0().set(arg, ptr / 8);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
/**
* @param {Float64Array} mat
*/
function invertMat4x4(mat) {
    try {
        var ptr0 = passArrayF64ToWasm0(mat, index_bg["b" /* __wbindgen_malloc */]);
        var len0 = WASM_VECTOR_LEN;
        index_bg["c" /* invertMat4x4 */](ptr0, len0);
    } finally {
        mat.set(getFloat64Memory0().subarray(ptr0 / 8, ptr0 / 8 + len0));
        index_bg["a" /* __wbindgen_free */](ptr0, len0 * 8);
    }
}

function getArrayF64FromWasm0(ptr, len) {
    return getFloat64Memory0().subarray(ptr / 8, ptr / 8 + len);
}
/**
* @param {Float64Array} mat
* @returns {Float64Array}
*/
function invertedMat4x4(mat) {
    var ptr0 = passArrayF64ToWasm0(mat, index_bg["b" /* __wbindgen_malloc */]);
    var len0 = WASM_VECTOR_LEN;
    index_bg["d" /* invertedMat4x4 */](8, ptr0, len0);
    var r0 = getInt32Memory0()[8 / 4 + 0];
    var r1 = getInt32Memory0()[8 / 4 + 1];
    var v1 = getArrayF64FromWasm0(r0, r1).slice();
    index_bg["a" /* __wbindgen_free */](r0, r1 * 8);
    return v1;
}

/**
* @param {Float64Array} mat
* @param {number} angle
* @param {Float64Array} axis
*/
function rotateMat4x4(mat, angle, axis) {
    try {
        var ptr0 = passArrayF64ToWasm0(mat, index_bg["b" /* __wbindgen_malloc */]);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passArrayF64ToWasm0(axis, index_bg["b" /* __wbindgen_malloc */]);
        var len1 = WASM_VECTOR_LEN;
        index_bg["h" /* rotateMat4x4 */](ptr0, len0, angle, ptr1, len1);
    } finally {
        mat.set(getFloat64Memory0().subarray(ptr0 / 8, ptr0 / 8 + len0));
        index_bg["a" /* __wbindgen_free */](ptr0, len0 * 8);
    }
}


// CONCATENATED MODULE: ./vita-wasm/pkg/index.js



/***/ })
]]);