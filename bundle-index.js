window["index"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		1: 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "bundle-" + ({}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	function promiseResolve() { return Promise.resolve(); }
/******/
/******/ 	var wasmImportObjects = {
/******/ 		2: function() {
/******/ 			return {
/******/
/******/ 			};
/******/ 		},
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/
/******/ 		// Fetch + compile chunk loading for webassembly
/******/
/******/ 		var wasmModules = {"0":[2]}[chunkId] || [];
/******/
/******/ 		wasmModules.forEach(function(wasmModuleId) {
/******/ 			var installedWasmModuleData = installedWasmModules[wasmModuleId];
/******/
/******/ 			// a Promise means "currently loading" or "already loaded".
/******/ 			if(installedWasmModuleData)
/******/ 				promises.push(installedWasmModuleData);
/******/ 			else {
/******/ 				var importObject = wasmImportObjects[wasmModuleId]();
/******/ 				var req = fetch(__webpack_require__.p + "" + {"2":"ce30c5c8476d33f1ff52"}[wasmModuleId] + ".module.wasm");
/******/ 				var promise;
/******/ 				if(importObject instanceof Promise && typeof WebAssembly.compileStreaming === 'function') {
/******/ 					promise = Promise.all([WebAssembly.compileStreaming(req), importObject]).then(function(items) {
/******/ 						return WebAssembly.instantiate(items[0], items[1]);
/******/ 					});
/******/ 				} else if(typeof WebAssembly.instantiateStreaming === 'function') {
/******/ 					promise = WebAssembly.instantiateStreaming(req, importObject);
/******/ 				} else {
/******/ 					var bytesPromise = req.then(function(x) { return x.arrayBuffer(); });
/******/ 					promise = bytesPromise.then(function(bytes) {
/******/ 						return WebAssembly.instantiate(bytes, importObject);
/******/ 					});
/******/ 				}
/******/ 				promises.push(installedWasmModules[wasmModuleId] = promise.then(function(res) {
/******/ 					return __webpack_require__.w[wasmModuleId] = (res.instance || res).exports;
/******/ 				}));
/******/ 			}
/******/ 		});
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// object with all WebAssembly.instance exports
/******/ 	__webpack_require__.w = {};
/******/
/******/ 	var jsonpArray = window["webpackJsonpindex"] = window["webpackJsonpindex"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "resizeCanvas", function() { return /* binding */ resizeCanvas; });
__webpack_require__.d(__webpack_exports__, "onScroll", function() { return /* binding */ onScroll; });
__webpack_require__.d(__webpack_exports__, "showProject", function() { return /* binding */ showProject; });
__webpack_require__.d(__webpack_exports__, "restoreProjects", function() { return /* binding */ restoreProjects; });

// CONCATENATED MODULE: ./src/matrix.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// WebAssembly must be loaded asynchronously so Webpack can split it out.
// NOTE: https://github.com/rustwasm/wasm-bindgen/issues/700
// If you get the error:
// "WebAssembly module is included in initial chunk.
// This is not allowed, because WebAssembly download and compilation must happen asynchronous.
// Add an async splitpoint (i. e. import()) somewhere between your entrypoint and the WebAssembly module"
// Change your tsconfig to module: esnext
// Or load the WASM module from a plain Javascript file (non-Typescript)
let invertMat4 = undefined;
let rotateMat4 = undefined;
const loadWasm = () => __awaiter(void 0, void 0, void 0, function* () {
    const { invertMat4x4, rotateMat4x4 } = yield __webpack_require__.e(/* import() */ 0).then(__webpack_require__.bind(null, 3));
    invertMat4 = invertMat4x4;
    rotateMat4 = rotateMat4x4;
});
loadWasm();
class Mat4 {
    constructor() {
        this.m = new Float64Array([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ]);
    }
    // constructor() { }
    clone() {
        const cl = new Mat4();
        cl.m = new Float64Array(this.m); // map((a: number[]) => (a.slice(0)));
        return cl;
    }
    data() {
        const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (const i in this.m) {
            data[i] = this.m[i];
        }
        return data;
    }
    invert() {
        if (invertMat4 == undefined) {
            return;
        }
        invertMat4(this.m);
    }
    multiplied(other) {
        const ret = new Float64Array([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ]);
        const m = this.m;
        const b = other.data();
        ret[0] = (b[0] * m[0]) + (b[4] * m[1]) + (b[8] * m[2]) + (b[12] * m[3]);
        ret[1] = (b[1] * m[0]) + (b[5] * m[1]) + (b[9] * m[2]) + (b[13] * m[3]);
        ret[2] = (b[2] * m[0]) + (b[6] * m[1]) + (b[10] * m[2]) + (b[14] * m[3]);
        ret[3] = (b[3] * m[0]) + (b[7] * m[1]) + (b[11] * m[2]) + (b[15] * m[3]);
        ret[4] = (b[0] * m[4]) + (b[4] * m[5]) + (b[8] * m[6]) + (b[12] * m[7]);
        ret[5] = (b[1] * m[4]) + (b[5] * m[5]) + (b[9] * m[6]) + (b[13] * m[7]);
        ret[6] = (b[2] * m[4]) + (b[6] * m[5]) + (b[10] * m[6]) + (b[14] * m[7]);
        ret[7] = (b[3] * m[4]) + (b[7] * m[5]) + (b[11] * m[6]) + (b[15] * m[7]);
        ret[8] = (b[0] * m[8]) + (b[4] * m[9]) + (b[8] * m[10]) + (b[12] * m[11]);
        ret[9] = (b[1] * m[8]) + (b[5] * m[9]) + (b[9] * m[10]) + (b[13] * m[11]);
        ret[10] = (b[2] * m[8]) + (b[6] * m[9]) + (b[10] * m[10]) + (b[14] * m[11]);
        ret[11] = (b[3] * m[8]) + (b[7] * m[9]) + (b[11] * m[10]) + (b[15] * m[11]);
        ret[12] = (b[0] * m[12]) + (b[4] * m[13]) + (b[8] * m[14]) + (b[12] * m[15]);
        ret[13] = (b[1] * m[12]) + (b[5] * m[13]) + (b[9] * m[14]) + (b[13] * m[15]);
        ret[14] = (b[2] * m[12]) + (b[6] * m[13]) + (b[10] * m[14]) + (b[14] * m[15]);
        ret[15] = (b[3] * m[12]) + (b[7] * m[13]) + (b[11] * m[14]) + (b[15] * m[15]);
        const mat = new Mat4();
        mat.m = ret;
        return mat;
    }
    perspective(fov, aspect, near, far) {
        let h;
        let w;
        if (aspect > 1.0) {
            h = 2 * near * Math.tan(fov / 2.0);
            w = h * aspect;
        }
        else {
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
    rotate(rad, axis) {
        if (rotateMat4 === undefined) {
            return;
        }
        rotateMat4(this.m, rad, new Float64Array(axis));
    }
    translate(x, y, z) {
        this.m[3] += x;
        this.m[7] += y;
        this.m[11] += z;
    }
    transposed() {
        const m = this.m;
        return [
            m[0], m[4], m[8], m[12],
            m[1], m[5], m[9], m[13],
            m[2], m[6], m[10], m[14],
            m[3], m[7], m[11], m[15],
        ];
    }
}

// CONCATENATED MODULE: ./src/model.ts
// @ts-ignore: An import path cannot end with a '.ts' extension

class MeshModel {
    constructor(numVertices, numIndices) {
        this.vertices = new Float32Array(numVertices);
        this.normals = new Float32Array(numVertices);
        this.vIndices = new Uint32Array(numIndices);
        this.eIndices = new Uint32Array(numIndices);
        this.count = numVertices;
    }
}
class FacesModel {
    constructor(n) {
        this.vertices = new Float32Array(n * 3);
        this.normals = new Float32Array(n * 3);
        this.vIndices = new Uint32Array(n * 3);
    }
}
class EdgesModel {
    constructor(n) {
        this.vertices = new Float32Array(n * 3);
        this.eIndices = new Uint32Array(n * 2);
    }
}
class model_DefaultCollection {
    constructor() {
        this.renderModels = new Array();
        this.modelMatrix = new Mat4();
    }
    addRenderModel(renderModel) {
        this.renderModels.push(renderModel);
    }
    setMatrix(mat) {
        this.modelMatrix = mat;
    }
    setup(gl) {
        for (let i = 0, len = this.renderModels.length; i < len; i++) {
            this.renderModels[i].setup(gl);
        }
    }
    draw(gl, viewMatrix, projectionMatrix) {
        const modelViewMatrix = viewMatrix.multiplied(this.modelMatrix);
        const normalMatrix = modelViewMatrix.clone();
        normalMatrix.invert();
        for (let i = 0, len = this.renderModels.length; i < len; i++) {
            this.renderModels[i].draw(gl, normalMatrix, modelViewMatrix, projectionMatrix);
        }
    }
}

// CONCATENATED MODULE: ./src/render_model.ts
class RenderModel {
    constructor(gl, programInfo, mode, vertices, normals, indices, colourFormula) {
        this.numIndices = 0;
        this.programInfo = programInfo;
        this.vertices = vertices;
        this.normals = normals;
        this.buffer = this.initBuffers(gl, indices, colourFormula);
        this.mode = mode;
        this.numIndices = indices.length;
    }
    initBuffers(gl, indices, colourFormula) {
        const positionBuffer = gl.createBuffer();
        if (positionBuffer === null) {
            console.log("gl.createBuffer() returned null");
            return null;
        }
        // Select this as the one to apply buffer operations to
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        // Pass the list of positions into WebGL to build the shape.
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);
        const normalBuffer = gl.createBuffer();
        if (normalBuffer === null) {
            console.log("gl.createBuffer() returned null");
            return null;
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.normals, gl.STATIC_DRAW);
        // Convert the array of colors into a table for all the vertices.
        const colours = new Float32Array(this.vertices.length * 4 / 3);
        colourFormula(colours);
        const colourBuffer = gl.createBuffer();
        if (colourBuffer === null) {
            console.log("gl.createBuffer() returned null");
            return null;
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, colourBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, colours, gl.STATIC_DRAW);
        const indexBuffer = gl.createBuffer();
        if (indexBuffer === null) {
            console.log("gl.createBuffer() returned null");
            return null;
        }
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        // Now send the element array to GL
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
        return {
            position: positionBuffer,
            normal: normalBuffer,
            colour: colourBuffer,
            indices: indexBuffer,
        };
    }
    setup(gl) {
        // console.log("render_model setup");
        // Tell WebGL how to pull out the positions from the position
        // buffer into the vertexPosition attribute.
        const programInfo = this.programInfo;
        if (this.buffer === null) {
            console.log("!!! model buffer === null");
            return;
        }
        const buffers = this.buffer;
        {
            const numComponents = 3; // pull out 3 values per iteration
            const type = gl.FLOAT; // the data in the buffer is 32bit floats
            const normalize = false; // don't normalize
            const stride = 0; // how many bytes to get from one set of values to the next
            // 0 = use type and numComponents above
            const offset = 0; // how many bytes inside the buffer to start from
            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
            gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, numComponents, type, normalize, stride, offset);
            gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
        }
        // Tell WebGL how to pull out the normals from
        // the normal buffer into the vertexNormal attribute.
        if (programInfo.attribLocations.vertexNormal !== null) {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
            gl.vertexAttribPointer(programInfo.attribLocations.vertexNormal, numComponents, type, normalize, stride, offset);
            gl.enableVertexAttribArray(programInfo.attribLocations.vertexNormal);
        }
        {
            const numComponents = 4;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.colour);
            gl.vertexAttribPointer(programInfo.attribLocations.vertexColour, numComponents, type, normalize, stride, offset);
            gl.enableVertexAttribArray(programInfo.attribLocations.vertexColour);
        }
        // Tell WebGL which indices to use to index the vertices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
    }
    draw(gl, normalMatrix, modelViewMatrix, projMat) {
        gl.useProgram(this.programInfo.program);
        this.setup(gl);
        gl.uniformMatrix4fv(this.programInfo.uniformLocations.projectionMatrix, false, projMat.transposed());
        if (this.programInfo.uniformLocations.normalMatrix !== null) {
            gl.uniformMatrix4fv(this.programInfo.uniformLocations.normalMatrix, false, normalMatrix.data());
        }
        gl.uniformMatrix4fv(this.programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix.transposed());
        const offset = 0;
        gl.drawElements(this.mode, this.numIndices, gl.UNSIGNED_SHORT, offset);
    }
}
;

// CONCATENATED MODULE: ./src/scene.ts
// @ts-ignore: An import path cannot end with a '.ts' extension

class scene_Scene {
    constructor(gl) {
        this.projectionMatrix = new Mat4();
        this.models = new Array();
        this.viewMatrix = new Mat4();
        this.gl = gl;
        this.setup();
    }
    addModel(model) {
        model.setup(this.gl);
        this.models.push(model);
    }
    clear() {
        // Fast clear array
        this.models.length = 0;
    }
    setup() {
        const gl = this.gl;
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.clearColor(0.2, 0.2, 0.2, 1.0); // Clear to grey, fully opaque
        // gl.colorMask(false, false, false, true);
        gl.clearDepth(1.0); // Clear everything
        gl.enable(gl.DEPTH_TEST); // Enable depth testing
        gl.enable(gl.BLEND);
        // gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
        const fov = 37.8 * Math.PI / 180.0; // in radians
        const canvas = gl.canvas;
        const aspect = canvas.clientWidth / canvas.clientHeight;
        const zNear = 0.125;
        const zFar = 10.0;
        this.projectionMatrix = new Mat4();
        this.projectionMatrix.perspective(fov, aspect, zNear, zFar);
    }
    reset() {
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.setup();
    }
    setView(mat) {
        this.viewMatrix = mat;
    }
    draw() {
        const gl = this.gl;
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        for (let i = 0, len = this.models.length; i < len; i++) {
            this.models[i].draw(this.gl, this.viewMatrix, this.projectionMatrix);
        }
    }
}
;

// CONCATENATED MODULE: ./src/shaders.ts
const vsSource = `
attribute vec4 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec4 aVertexColour;

uniform mat4 uNormalMatrix;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying lowp vec4 vColour;
varying highp vec3 vLighting;

void main() {
	gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
	vColour = aVertexColour;

	// Apply lighting effect
	highp vec3 ambientLight = vec3(0.1, 0.1, 0.1);
	highp vec3 directionalLightColor = vec3(1, 1, 1);
	highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

	highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

	highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
	vLighting = ambientLight + (directionalLightColor * directional);
}
`;
const fsSource = `
varying lowp vec4 vColour;
varying highp vec3 vLighting;

void main() {
	gl_FragColor = vec4(vColour.rgb * vLighting, vColour.a);
	// gl_FragColor = vColour;
}
`;
const vsEdgeSource = `
attribute vec4 aVertexPosition;
// attribute vec3 aVertexNormal;
attribute vec4 aVertexColour;

// uniform mat4 uNormalMatrix;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying lowp vec4 vColour;
// varying highp vec3 vLighting;

void main() {
	gl_Position = (uProjectionMatrix * uModelViewMatrix * aVertexPosition) - vec4(0.0, 0.0, 0.00048828125, 0.0);
	vColour = aVertexColour;
}
`;
const fsEdgeSource = `
varying lowp vec4 vColour;
// varying highp vec3 vLighting;

void main() {
	gl_FragColor = vColour;
}
`;

// CONCATENATED MODULE: ./src/project-items/calibration.ts
// @ts-ignore: An import path cannot end with a '.ts' extension

class calibration_CalibrationCollection {
    constructor() {
        this.renderModels = new Array();
        this.sceneMatrix = new Mat4();
        this.modelMatrix = new Mat4();
        this.wall = null;
        this.sceneMatrix.translate(0, 0.0, 2.5);
    }
    recalculate(gl, rot) {
        if (this.wall === null) {
            return;
        }
        const r = (1.0 - Math.cos(rot)) / 2.0; // Put in range 0-1, starting at 0
        const w = 0.2;
        const c = w * 6 * Math.sqrt(2);
        const mul = r * Math.atan(c) / Math.atan(6 * w);
        for (let i = 0; i < 9; i++) {
            const dy = (i - 4) * w;
            const dy2 = dy * dy;
            for (let j = 0; j < 13; j++) {
                const dx = (j - 6) * w;
                const l = Math.sqrt((dx * dx) + (dy2));
                const m = Math.cos(Math.atan(l) * mul);
                this.wall.vertices[(i * 13 + j) * 3 + 0] = dx * m;
                this.wall.vertices[(i * 13 + j) * 3 + 1] = dy * m;
            }
        }
        ;
        // console.log(calibration.wall.buffer?.position ?? null);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.wall.buffer.position);
        gl.bufferData(gl.ARRAY_BUFFER, this.wall.vertices, gl.STATIC_DRAW);
    }
    setMatrix(mat) {
        this.modelMatrix = mat;
    }
    setup(gl) {
        for (let i = 0, len = this.renderModels.length; i < len; i++) {
            this.renderModels[i].setup(gl);
        }
    }
    draw(gl, viewMatrix, projectionMatrix) {
        var _a;
        const modelViewMatrix = viewMatrix.multiplied(this.sceneMatrix).multiplied(this.modelMatrix);
        const normalMatrix = modelViewMatrix.clone();
        normalMatrix.invert();
        (_a = this.wall) === null || _a === void 0 ? void 0 : _a.draw(gl, normalMatrix, modelViewMatrix, projectionMatrix);
    }
}
function generate(vertices, normals, indices) {
    // Generate Calibration wall
    const w = 0.1;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 13; j++) {
            // vertices[(i * 13 + j) * 3 + 0] = (j - 6) * w;
            // vertices[(i * 13 + j) * 3 + 1] = (i - 4) * w;
            vertices[(i * 13 + j) * 3 + 2] = 0.0;
            normals[(i * 13 + j) * 3 + 0] = -0.5;
            normals[(i * 13 + j) * 3 + 1] = 0.5;
            normals[(i * 13 + j) * 3 + 2] = -1.0;
        }
    }
    ;
    const arr = new Uint32Array(12 * 8 * 3);
    let i = 0;
    for (let jx = 0; jx < 8; jx++) {
        for (let ix = 0; ix < 12; ix++) {
            // if(jx===6 && ix>4){ break;}
            if (jx % 2 === 0 && ix % 2 === 1) {
                continue;
            }
            if (jx % 2 === 1 && ix % 2 === 0) {
                continue;
            }
            // const i = (jx * 12 + off) * 6;
            arr[i++] = (jx * 13 + ix) + 0;
            arr[i++] = (jx * 13 + ix) + 13;
            arr[i++] = (jx * 13 + ix) + 1;
            arr[i++] = (jx * 13 + ix) + 1;
            arr[i++] = (jx * 13 + ix) + 14;
            arr[i++] = (jx * 13 + ix) + 13;
        }
    }
    indices.set(arr, 0);
}

// CONCATENATED MODULE: ./src/project-items/sv100.ts
// @ts-ignore: An import path cannot end with a '.ts' extension

class sv100_SV100Collection {
    constructor() {
        this.renderModels = new Array();
        this.sceneMatrix = new Mat4();
        this.modelMatrix = new Mat4();
        this.manhole = null;
        this.podFaces = null;
        this.podEdges = null;
        this.tripodFaces = null;
        this.tripodEdges = null;
        this.laser = null;
        this.lights = null;
        this.sceneMatrix.translate(0, 0.0, 2.5);
    }
    setMatrix(mat) {
        this.modelMatrix = mat;
    }
    setup(gl) {
        for (let i = 0, len = this.renderModels.length; i < len; i++) {
            this.renderModels[i].setup(gl);
        }
    }
    draw(gl, viewMatrix, projectionMatrix) {
        var _a, _b, _c, _d, _e, _f, _g;
        const tmp = viewMatrix.multiplied(this.sceneMatrix);
        const modelViewMatrix = tmp.multiplied(this.modelMatrix);
        const normalMatrix = modelViewMatrix.clone();
        normalMatrix.invert();
        (_a = this.manhole) === null || _a === void 0 ? void 0 : _a.draw(gl, normalMatrix, tmp, projectionMatrix);
        (_b = this.tripodFaces) === null || _b === void 0 ? void 0 : _b.draw(gl, normalMatrix, tmp, projectionMatrix);
        (_c = this.tripodEdges) === null || _c === void 0 ? void 0 : _c.draw(gl, normalMatrix, tmp, projectionMatrix);
        (_d = this.podFaces) === null || _d === void 0 ? void 0 : _d.draw(gl, normalMatrix, modelViewMatrix, projectionMatrix);
        (_e = this.podEdges) === null || _e === void 0 ? void 0 : _e.draw(gl, normalMatrix, modelViewMatrix, projectionMatrix);
        (_f = this.laser) === null || _f === void 0 ? void 0 : _f.draw(gl, normalMatrix, modelViewMatrix, projectionMatrix);
        (_g = this.lights) === null || _g === void 0 ? void 0 : _g.draw(gl, normalMatrix, modelViewMatrix, projectionMatrix);
    }
}
function sv100_generate(laser, manhole, lights) {
    {
        // Generate laser ring edges
        const d = 0.5; // Diameter in metres
        const n = 16;
        for (let i = 0; i < n; i++) {
            const ix = i * 3;
            const angle = i * (2.0 * Math.PI / n);
            laser.vertices[ix + 0] = Math.sin(angle) * d;
            laser.vertices[ix + 1] = 0.21;
            laser.vertices[ix + 2] = Math.cos(angle) * d;
            laser.eIndices[i * 2 + 0] = i;
            laser.eIndices[i * 2 + 1] = i + 1;
        }
        laser.eIndices[(n * 2) - 1] = 0;
    }
    {
        // Generate manhole
        const ri = 0.5; // Radius in metres
        const rOuter = 0.6;
        const n = 8 + 1;
        for (let i = 0; i < n; i++) {
            const ix = i * 3;
            const angle = i * ((Math.PI / (n - 1))) - (Math.PI / 2.0);
            manhole.vertices[(ix + (0 * n * 3)) + 0] = Math.sin(angle) * ri;
            manhole.vertices[(ix + (0 * n * 3)) + 1] = 1.0;
            manhole.vertices[(ix + (0 * n * 3)) + 2] = Math.cos(angle) * ri;
            manhole.vertices[(ix + (1 * n * 3)) + 0] = Math.sin(angle) * rOuter;
            manhole.vertices[(ix + (1 * n * 3)) + 1] = 1.0;
            manhole.vertices[(ix + (1 * n * 3)) + 2] = Math.cos(angle) * rOuter;
            manhole.vertices[(ix + (2 * n * 3)) + 0] = Math.sin(angle) * ri;
            manhole.vertices[(ix + (2 * n * 3)) + 1] = -1.0;
            manhole.vertices[(ix + (2 * n * 3)) + 2] = Math.cos(angle) * ri;
            manhole.vertices[(ix + (3 * n * 3)) + 0] = Math.sin(angle) * rOuter;
            manhole.vertices[(ix + (3 * n * 3)) + 1] = -1.0;
            manhole.vertices[(ix + (3 * n * 3)) + 2] = Math.cos(angle) * rOuter;
            manhole.eIndices[i * 2 + 0] = i;
            manhole.eIndices[i * 2 + 1] = i + 1;
            manhole.eIndices[2 * (i + n) + 0] = i + n;
            manhole.eIndices[2 * (i + n) + 1] = i + n + 1;
            manhole.eIndices[2 * (i + (2 * n)) + 0] = i + (2 * n);
            manhole.eIndices[2 * (i + (2 * n)) + 1] = i + (2 * n) + 1;
            manhole.eIndices[2 * (i + (3 * n)) + 0] = i + (3 * n);
            manhole.eIndices[2 * (i + (3 * n)) + 1] = i + (3 * n) + 1;
        }
        manhole.eIndices[(1 * n * 2) - 1] = (n * 2) - 1;
        manhole.eIndices[(2 * n * 2) - 1] = (n * 4) - 1;
        manhole.eIndices[(3 * n * 2) - 1] = (n * 1) - 1;
        manhole.eIndices[(4 * n * 2) - 1] = (n * 3) - 1;
        let ix = 4 * n * 2;
        manhole.eIndices[ix++] = 0;
        manhole.eIndices[ix++] = n;
        manhole.eIndices[ix++] = n;
        manhole.eIndices[ix++] = n * 3;
        manhole.eIndices[ix++] = n * 3;
        manhole.eIndices[ix++] = n * 2;
        manhole.eIndices[ix++] = n * 2;
        manhole.eIndices[ix++] = n * 0;
    }
    {
        // Generate lights
        const near = 0.125;
        const far = 0.5;
        const sm = 0.05;
        const lg = 0.25;
        lights.vertices.set([
            near, sm, sm,
            near, sm, -sm,
            near, -sm, -sm,
            near, -sm, sm,
            far, lg, lg,
            far, lg, -lg,
            far, -lg, -lg,
            far, -lg, lg,
            -near, sm, sm,
            -near, sm, -sm,
            -near, -sm, -sm,
            -near, -sm, sm,
            -far, lg, lg,
            -far, lg, -lg,
            -far, -lg, -lg,
            -far, -lg, lg,
        ], 0);
        const magA = 0.4;
        const magB = 0.6;
        lights.normals.set([
            -0.5, 0.0, -0.5, -0.5, 0.0, -0.5,
            -0.5, 0.5, 0.0, -0.5, 0.5, 0.0,
            -0.5, 0.0, 0.5, -0.5, 0.0, 0.5,
            -0.5, -0.5, 0.0, -0.5, -0.5, 0.0,
            -0.5, 0.0, -0.5, -0.5, 0.0, -0.5,
            -0.5, 0.5, 0.0, -0.5, 0.5, 0.0,
            -0.5, 0.0, 0.5, -0.5, 0.0, 0.5,
            -0.5, -0.5, 0.0, -0.5, -0.5, 0.0
        ], 0);
        const n = 8;
        const m = 24;
        for (let i = 0; i < 2; i++) {
            const rm = i * m;
            const rn = i * n;
            lights.vIndices[0 + rm] = 3 + rn;
            lights.vIndices[1 + rm] = 0 + rn;
            lights.vIndices[2 + rm] = 7 + rn;
            lights.vIndices[3 + rm] = 0 + rn;
            lights.vIndices[4 + rm] = 4 + rn;
            lights.vIndices[5 + rm] = 7 + rn;
            lights.vIndices[6 + rm] = 0 + rn;
            lights.vIndices[7 + rm] = 1 + rn;
            lights.vIndices[8 + rm] = 4 + rn;
            lights.vIndices[9 + rm] = 1 + rn;
            lights.vIndices[10 + rm] = 5 + rn;
            lights.vIndices[11 + rm] = 4 + rn;
            lights.vIndices[12 + rm] = 2 + rn;
            lights.vIndices[13 + rm] = 3 + rn;
            lights.vIndices[14 + rm] = 6 + rn;
            lights.vIndices[15 + rm] = 3 + rn;
            lights.vIndices[16 + rm] = 7 + rn;
            lights.vIndices[17 + rm] = 6 + rn;
            lights.vIndices[18 + rm] = 1 + rn;
            lights.vIndices[19 + rm] = 2 + rn;
            lights.vIndices[20 + rm] = 5 + rn;
            lights.vIndices[21 + rm] = 2 + rn;
            lights.vIndices[22 + rm] = 6 + rn;
            lights.vIndices[23 + rm] = 5 + rn;
        }
    }
}

// CONCATENATED MODULE: ./src/index.ts
var src_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-ignore: An import path cannot end with a '.ts' extension

// @ts-ignore: An import path cannot end with a '.ts' extension

// @ts-ignore: An import path cannot end with a '.ts' extension

// @ts-ignore: An import path cannot end with a '.ts' extension

// @ts-ignore: An import path cannot end with a '.ts' extension

// @ts-ignore: An import path cannot end with a '.ts' extension

// @ts-ignore: An import path cannot end with a '.ts' extension

const humanFigure = new MeshModel((2796 + 4) * 1.5, 2796 * 3);
const sv100Pod = new MeshModel(384, 256);
const sv100Laser = new EdgesModel(16);
const sv100Manhole = new EdgesModel(40);
const sv100Lights = new FacesModel(16);
const calibrationWall = new FacesModel(13 * 9);
const human = new model_DefaultCollection();
const calibration = new calibration_CalibrationCollection();
const sv100 = new sv100_SV100Collection();
let scene;
let animationStart = 0;
const ids = [
    "title",
    "work-history",
    "project-selection",
    "tech-tools",
    "education",
    "interests",
    "brag",
];
const layout = {
    "title": [0, 0],
    "work-history": [0, 0],
    "project-selection": [0, 0],
    "tech-tools": [0, 0],
    "education": [0, 0],
    "interests": [0, 0],
    "brag": [0, 0],
};
let mode = "";
function facesFormula(colours) {
    for (let j = 0; j < colours.length * 4; j += 4) {
        colours[j + 0] = 0.0625;
        colours[j + 1] = 0.0625;
        colours[j + 2] = 0.0625;
        colours[j + 3] = 1.0;
    }
}
function edgesFormula(colours) {
    for (let j = 0; j < colours.length * 4; j += 4) {
        colours[j + 0] = 0.25;
        colours[j + 1] = 0.25;
        colours[j + 2] = 0.25;
        colours[j + 3] = 1.00;
    }
}
function laserFormula(colours) {
    for (let j = 0; j < colours.length; j += 4) {
        colours[j + 0] = 1.00;
        colours[j + 1] = 0.125;
        colours[j + 2] = 0.125;
        colours[j + 3] = 1.00;
    }
}
function manholeFormula(colours) {
    for (let j = 0; j < colours.length; j += 4) {
        colours[j + 0] = 0.5;
        colours[j + 1] = 0.5;
        colours[j + 2] = 0.5;
        colours[j + 3] = 1.00;
    }
}
function lightsFormula(colours) {
    for (let j = 0; j < colours.length * 4; j += 4) {
        colours[j + 0] = 0.25;
        colours[j + 1] = 0.25;
        colours[j + 2] = 0.25;
        colours[j + 3] = 0.2;
    }
}
/// Creates a shader of the given type, uploads the source and compiles it.
function loadShader(gl, type, source) {
    const tmp = gl.createShader(type);
    if (tmp === null) {
        console.log("gl.createShader(" + type + ") returned null");
        return null;
    }
    const shader = tmp;
    gl.shaderSource(shader, source); // Send the source to the shader object
    gl.compileShader(shader); // Compile the shader program
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { // See if it compiled successfully
        console.log('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}
/// Initialize a shader program, so WebGL knows how to draw our data
function initShaderProgram(gl, vsSource, fsSource) {
    let tmp = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    if (tmp === null) {
        console.log("loadShader(vertex) returned null");
        return null;
    }
    const vertexShader = tmp;
    tmp = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (tmp === null) {
        console.log("loadShader(fragment) returned null");
        return null;
    }
    const fragmentShader = tmp;
    // Create the shader program
    tmp = gl.createProgram();
    if (tmp === null) {
        console.log("gl.createProgram() returned null");
        return null;
    }
    const shaderProgram = tmp;
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    // If creating the shader program failed, alert
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.log('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
        return null;
    }
    return shaderProgram;
}
function transition(now) {
    const period = 1000;
    let p = (now - animationStart) / period;
    p = Math.min(p, 1.0);
    p = (1.0 - Math.cos(p * Math.PI)) / 2.0;
    const viewMatrix = new Mat4();
    viewMatrix.rotate(p * Math.PI, [0, 1, 0]);
    scene.setView(viewMatrix);
    // const rot = 0.5 * Math.PI * window.pageYOffset / window.innerHeight;
    scene.draw();
    if (now - animationStart > period) {
        return;
    }
    requestAnimationFrame(transition);
}
function transitionBack(now) {
    const period = 1000;
    let p = (now - animationStart) / period;
    p = 1.0 - Math.min(p, 1.0);
    p = (1.0 - Math.cos(p * Math.PI)) / 2.0;
    const viewMatrix = new Mat4();
    viewMatrix.rotate(p * Math.PI, [0, 1, 0]);
    scene.setView(viewMatrix);
    // const rot = 0.5 * Math.PI * window.pageYOffset / window.innerHeight;
    scene.draw();
    if (now - animationStart > period) {
        scene.clear();
        scene.addModel(human);
        return;
    }
    requestAnimationFrame(transitionBack);
}
function render(now) {
    if (scene === undefined) {
        return;
    }
    // const t1 = performance.now();
    scene.draw();
    // const t2 = performance.now();
    // console.log("render:", t2-t1, "ms");
}
function updateScroll() {
    const pageTop = window.scrollY;
    const pageBotttom = window.scrollY + window.innerHeight;
    for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        // @ts-ignore
        const elLayout = layout[id];
        const elTop = elLayout[0];
        const elBottom = elLayout[0] + elLayout[1];
        if (pageBotttom > elTop && pageTop < elBottom) {
            const topProp = (pageBotttom - elTop) / window.innerHeight;
            const bottomProp = (elBottom - pageTop) / window.innerHeight;
            const viewEl = document.getElementById(id);
            if (viewEl === null) {
                console.log("!!! Element with id", id, "is null");
                continue;
            }
            if (0.0 < topProp && topProp < 0.333) {
                viewEl.style.opacity = (topProp / 0.333).toString();
                // viewEl.style.transform = "matrix(1,0,0,1,0," + ((0.5 - topProp) * 500).toString() + ")"
            }
            else if (0.0 < bottomProp && bottomProp < 0.333) {
                viewEl.style.opacity = (bottomProp / 0.333).toString();
                // viewEl.style.transform = "matrix(1,0,0,1,0," + ((bottomProp - 0.5) * 500).toString() + ")"
            }
            else {
                viewEl.style.opacity = "1";
                // viewEl.style.transform = "matrix(1,0,0,1,0,0)"
            }
        }
    }
    const rot = 0.5 * Math.PI * window.pageYOffset / window.innerHeight;
    const hModelMatrix = new Mat4();
    hModelMatrix.rotate(-Math.PI / 2.0, [1, 0, 0]);
    hModelMatrix.rotate(rot, [0, 1, 0]);
    hModelMatrix.translate(0, (rot / 25.0) - 1.6, -0.45);
    human.setMatrix(hModelMatrix);
    switch (mode) {
        case "sv100":
            const sModelMatrix = new Mat4();
            // sModelMatrix.rotate(rot / 25.0, [0, 1, 0]);
            sModelMatrix.rotate((rot - 4.93125) / 12.5, [0, 1, 0]);
            sModelMatrix.translate(0, (1.0 - 0.211) - (rot / 6.25), 0);
            sv100.setMatrix(sModelMatrix);
            break;
        case "fisheye-calibration":
            calibration.recalculate(scene.gl, rot);
            break;
    }
}
function resizeCanvas() {
    // Calculate new div layout
    const elements = [];
    for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        const el = document.getElementById(id);
        if (el === null) {
            continue;
        }
        el.style.transform = "";
        elements.push(el);
    }
    for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        const el = elements[i];
        // @ts-ignore
        layout[id][0] = window.pageYOffset + el.getBoundingClientRect().top;
        // @ts-ignore
        layout[id][1] = el.offsetHeight;
    }
    // Hack because innerHeight changes when showing/hiding bottom bar
    if (scene === undefined) {
        return;
    }
    scene.gl.canvas.width = window.innerWidth;
    scene.gl.canvas.height = window.innerHeight;
    scene.reset();
    requestAnimationFrame(render);
    requestAnimationFrame(updateScroll);
}
function main() {
    const canvas = document.getElementById("gl_canvas");
    canvas.style.opacity = "1";
    // Set canvas to fill window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("webgl", {
    // premultipliedAlpha: false,  // Ask for non-premultiplied alpha
    // alpha: false,
    });
    if (ctx === null) {
        console.log("Unable to initialise WebGL");
        return;
    }
    const gl = ctx;
    const tmp = initShaderProgram(gl, vsSource, fsSource);
    if (tmp === null) {
        console.log("iniShaderProgram() returned null");
        return;
    }
    const shaderProgram = tmp;
    const programInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
            vertexNormal: gl.getAttribLocation(shaderProgram, "aVertexNormal"),
            vertexColour: gl.getAttribLocation(shaderProgram, "aVertexColour"),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
            normalMatrix: gl.getUniformLocation(shaderProgram, "uNormalMatrix"),
        },
    };
    const tmp2 = initShaderProgram(gl, vsEdgeSource, fsEdgeSource);
    if (tmp2 === null) {
        console.log("iniShaderProgram() returned null");
        return;
    }
    const shaderProgram2 = tmp2;
    const programInfo2 = {
        program: shaderProgram2,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram2, 'aVertexPosition'),
            vertexNormal: null,
            vertexColour: gl.getAttribLocation(shaderProgram2, "aVertexColour"),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram2, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgram2, 'uModelViewMatrix'),
            normalMatrix: null,
        },
    };
    const hfaceModel = new RenderModel(gl, programInfo, gl.TRIANGLES, humanFigure.vertices, humanFigure.normals, humanFigure.vIndices, facesFormula);
    const hedgeModel = new RenderModel(gl, programInfo2, gl.LINES, humanFigure.vertices, humanFigure.normals, humanFigure.eIndices, edgesFormula);
    human.addRenderModel(hfaceModel);
    human.addRenderModel(hedgeModel);
    const sfaceModel = new RenderModel(gl, programInfo, gl.TRIANGLES, sv100Pod.vertices, sv100Pod.normals, sv100Pod.vIndices, facesFormula);
    const sedgeModel = new RenderModel(gl, programInfo2, gl.LINES, sv100Pod.vertices, sv100Pod.normals, sv100Pod.eIndices, edgesFormula);
    const slaserModel = new RenderModel(gl, programInfo2, gl.LINES, sv100Laser.vertices, new Float32Array(), sv100Laser.eIndices, laserFormula);
    const smanholeModel = new RenderModel(gl, programInfo2, gl.LINES, sv100Manhole.vertices, new Float32Array(), sv100Manhole.eIndices, manholeFormula);
    const slightModel = new RenderModel(gl, programInfo, gl.TRIANGLES, sv100Lights.vertices, sv100Lights.normals, sv100Lights.vIndices, lightsFormula);
    sv100.podFaces = sfaceModel;
    sv100.podEdges = sedgeModel;
    sv100.laser = slaserModel;
    sv100.manhole = smanholeModel;
    sv100.lights = slightModel;
    const calibrationModel = new RenderModel(gl, programInfo, gl.TRIANGLES, calibrationWall.vertices, calibrationWall.normals, calibrationWall.vIndices, manholeFormula);
    calibration.wall = calibrationModel;
    scene = new scene_Scene(gl);
    scene.addModel(human);
    resizeCanvas();
    requestAnimationFrame(render);
}
function onScroll() {
    requestAnimationFrame(updateScroll);
    requestAnimationFrame(render);
    // const el = document.getElementById("ontop2");
}
function showProject(projName) {
    const el = document.getElementById("content");
    if (el !== null) {
        el.classList.add("leftscreen");
    }
    else {
        console.log("!!! el === null");
    }
    const projectDiv = document.getElementById(projName);
    if (projectDiv !== null) {
        // projectDiv.classList.remove("offscreen");
        projectDiv.classList.add("focused");
    }
    else {
        console.log("!!! projectDiv === null");
    }
    switch (projName) {
        case "sv100":
            scene.addModel(sv100);
            mode = projName;
            break;
        case "fisheye-calibration":
            scene.addModel(calibration);
            calibration.recalculate(scene.gl, 0.5 * Math.PI * window.pageYOffset / window.innerHeight);
            mode = projName;
            break;
    }
    if (mode != "") {
        requestAnimationFrame(updateScroll);
        animationStart = performance.now();
        requestAnimationFrame(transition);
    }
    window.scrollTo({ top: layout["project-selection"][0], behavior: "smooth" });
}
function restoreProjects() {
    const projectDiv = document.getElementById("projects");
    if (projectDiv !== null) {
        const len = projectDiv.children.length;
        for (let i = 0; i < len; i++) {
            const el = projectDiv.children[i];
            if (el.id !== "project-selection") {
                el.classList.remove("focused");
                // el.classList.add("offscreen");
            }
        }
    }
    else {
        console.log("!!! projectDiv === null");
    }
    // const el = document.getElementById("project-selection");
    const el = document.getElementById("content");
    if (el !== null) {
        el.classList.remove("leftscreen");
    }
    else {
        console.log("!!! el === null");
    }
    scene.setView(new Mat4());
    animationStart = performance.now();
    if (mode !== "") {
        requestAnimationFrame(transitionBack);
    }
    mode = "";
}
const src_loadWasm = () => src_awaiter(void 0, void 0, void 0, function* () {
    const { parseSTL, parseSTLMesh } = yield __webpack_require__.e(/* import() */ 0).then(__webpack_require__.bind(null, 3));
    let humanLoaded = false;
    let sv100Loaded = false;
    fetch("untitled.stl").then((value) => {
        value.arrayBuffer().then((val) => {
            const arr = new Uint8Array(val);
            const t1 = performance.now();
            const err = parseSTLMesh(arr, humanFigure.vertices, humanFigure.normals, humanFigure.vIndices, humanFigure.eIndices);
            const t2 = performance.now();
            console.log("ParseSTLMesh:", err);
            console.log(t2 - t1, "milliseconds (Human)");
            if (sv100Loaded) {
                main();
            }
            else {
                humanLoaded = true;
            }
        });
    });
    fetch("sv100.stl").then((value) => {
        value.arrayBuffer().then((val) => {
            const arr = new Uint8Array(val);
            const t1 = performance.now();
            const err = parseSTL(arr, sv100Pod.vertices, sv100Pod.normals, sv100Pod.vIndices, sv100Pod.eIndices);
            const t2 = performance.now();
            console.log(t2 - t1, "milliseconds (SV100)");
            console.log("parseSTL:", err);
            if (humanLoaded) {
                main();
            }
            else {
                sv100Loaded = true;
            }
        });
    });
    sv100_generate(sv100Laser, sv100Manhole, sv100Lights);
    generate(calibrationWall.vertices, calibrationWall.normals, calibrationWall.vIndices);
});
src_loadWasm();


/***/ })
/******/ ]);