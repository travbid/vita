window.index=function(e){function t(t){for(var n,o,i=t[0],s=t[1],a=0,l=[];a<i.length;a++)o=i[a],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&l.push(r[o][0]),r[o]=0;for(n in s)Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n]);for(u&&u(t);l.length;)l.shift()()}var n={},r={1:0};var o={};var i={3:function(){return{}}};function s(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.e=function(e){var t=[],n=r[e];if(0!==n)if(n)t.push(n[2]);else{var a=new Promise((function(t,o){n=r[e]=[t,o]}));t.push(n[2]=a);var l,c=document.createElement("script");c.charset="utf-8",c.timeout=120,s.nc&&c.setAttribute("nonce",s.nc),c.src=function(e){return s.p+"bundle-"+({}[e]||e)+".js"}(e);var u=new Error;l=function(t){c.onerror=c.onload=null,clearTimeout(d);var n=r[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src;u.message="Loading chunk "+e+" failed.\n("+o+": "+i+")",u.name="ChunkLoadError",u.type=o,u.request=i,n[1](u)}r[e]=void 0}};var d=setTimeout((function(){l({type:"timeout",target:c})}),12e4);c.onerror=c.onload=l,document.head.appendChild(c)}return({0:[3]}[e]||[]).forEach((function(e){var n=o[e];if(n)t.push(n);else{var r,a=i[e](),l=fetch(s.p+""+{3:"0480227cc88ada69870d"}[e]+".module.wasm");if(a instanceof Promise&&"function"==typeof WebAssembly.compileStreaming)r=Promise.all([WebAssembly.compileStreaming(l),a]).then((function(e){return WebAssembly.instantiate(e[0],e[1])}));else if("function"==typeof WebAssembly.instantiateStreaming)r=WebAssembly.instantiateStreaming(l,a);else{r=l.then((function(e){return e.arrayBuffer()})).then((function(e){return WebAssembly.instantiate(e,a)}))}t.push(o[e]=r.then((function(t){return s.w[e]=(t.instance||t).exports})))}})),Promise.all(t)},s.m=e,s.c=n,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s.oe=function(e){throw console.error(e),e},s.w={};var a=window.webpackJsonpindex=window.webpackJsonpindex||[],l=a.push.bind(a);a.push=t,a=a.slice();for(var c=0;c<a.length;c++)t(a[c]);var u=l;return s(s.s=1)}([,function(e,t,n){"use strict";n.r(t),n.d(t,"onResize",(function(){return D})),n.d(t,"onScroll",(function(){return H})),n.d(t,"navigateToProject",(function(){return k})),n.d(t,"navigateToHome",(function(){return G}));let r=void 0,o=void 0;(function(e,t,n,r){new(n||(n=Promise))((function(o,i){function s(e){try{l(r.next(e))}catch(e){i(e)}}function a(e){try{l(r.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}l((r=r.apply(e,t||[])).next())}))})(void 0,void 0,void 0,(function*(){const{invertMat4x4:e,rotateMat4x4:t}=yield n.e(0).then(n.bind(null,5));r=e,o=t}));class i{constructor(){this.m=new Float64Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}clone(){const e=new i;return e.m=new Float64Array(this.m),e}data(){const e=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(const t in this.m)e[t]=this.m[t];return e}invert(){null!=r&&r(this.m)}multiplied(e){const t=new Float64Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),n=this.m,r=e.data();t[0]=r[0]*n[0]+r[4]*n[1]+r[8]*n[2]+r[12]*n[3],t[1]=r[1]*n[0]+r[5]*n[1]+r[9]*n[2]+r[13]*n[3],t[2]=r[2]*n[0]+r[6]*n[1]+r[10]*n[2]+r[14]*n[3],t[3]=r[3]*n[0]+r[7]*n[1]+r[11]*n[2]+r[15]*n[3],t[4]=r[0]*n[4]+r[4]*n[5]+r[8]*n[6]+r[12]*n[7],t[5]=r[1]*n[4]+r[5]*n[5]+r[9]*n[6]+r[13]*n[7],t[6]=r[2]*n[4]+r[6]*n[5]+r[10]*n[6]+r[14]*n[7],t[7]=r[3]*n[4]+r[7]*n[5]+r[11]*n[6]+r[15]*n[7],t[8]=r[0]*n[8]+r[4]*n[9]+r[8]*n[10]+r[12]*n[11],t[9]=r[1]*n[8]+r[5]*n[9]+r[9]*n[10]+r[13]*n[11],t[10]=r[2]*n[8]+r[6]*n[9]+r[10]*n[10]+r[14]*n[11],t[11]=r[3]*n[8]+r[7]*n[9]+r[11]*n[10]+r[15]*n[11],t[12]=r[0]*n[12]+r[4]*n[13]+r[8]*n[14]+r[12]*n[15],t[13]=r[1]*n[12]+r[5]*n[13]+r[9]*n[14]+r[13]*n[15],t[14]=r[2]*n[12]+r[6]*n[13]+r[10]*n[14]+r[14]*n[15],t[15]=r[3]*n[12]+r[7]*n[13]+r[11]*n[14]+r[15]*n[15];const o=new i;return o.m=t,o}perspective(e,t,n,r){let o,i;t>1?(o=2*n*Math.tan(e/2),i=o*t):(i=2*n*Math.tan(e/2),o=i/t),this.m=new Float64Array([n/i,0,0,0,0,n/o,0,0,0,0,-(r+n)/(r-n),-2*r*n/(r-n),0,0,-1,0])}rotate(e,t){void 0!==o&&o(this.m,e,new Float64Array(t))}translate(e,t,n){this.m[3]+=e,this.m[7]+=t,this.m[11]+=n}transposed(){const e=this.m;return[e[0],e[4],e[8],e[12],e[1],e[5],e[9],e[13],e[2],e[6],e[10],e[14],e[3],e[7],e[11],e[15]]}}class s{constructor(e,t){this.vertices=new Float32Array(e),this.normals=new Float32Array(e),this.vIndices=new Uint32Array(t),this.eIndices=new Uint32Array(t),this.count=e}}class a{constructor(e){this.vertices=new Float32Array(3*e),this.normals=new Float32Array(3*e),this.vIndices=new Uint32Array(3*e)}}class l{constructor(e){this.vertices=new Float32Array(3*e),this.eIndices=new Uint32Array(2*e)}}class c{constructor(e,t,n,r,o,i,s){this.numIndices=0,this.programInfo=t,this.vertices=r,this.normals=o,this.buffer=this.initBuffers(e,i,s),this.mode=n,this.numIndices=i.length}initBuffers(e,t,n){const r=e.createBuffer();if(null===r)return console.log("gl.createBuffer() returned null"),null;e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,this.vertices,e.STATIC_DRAW);const o=e.createBuffer();if(null===o)return console.log("gl.createBuffer() returned null"),null;e.bindBuffer(e.ARRAY_BUFFER,o),e.bufferData(e.ARRAY_BUFFER,this.normals,e.STATIC_DRAW);const i=new Float32Array(4*this.vertices.length/3);n(i);const s=e.createBuffer();if(null===s)return console.log("gl.createBuffer() returned null"),null;e.bindBuffer(e.ARRAY_BUFFER,s),e.bufferData(e.ARRAY_BUFFER,i,e.STATIC_DRAW);const a=e.createBuffer();return null===a?(console.log("gl.createBuffer() returned null"),null):(e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,a),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(t),e.STATIC_DRAW),{position:r,normal:o,colour:s,indices:a})}setup(e){const t=this.programInfo;if(null===this.buffer)return void console.log("!!! model buffer === null");const n=this.buffer;{const r=3,o=e.FLOAT,i=!1,s=0,a=0;e.bindBuffer(e.ARRAY_BUFFER,n.position),e.vertexAttribPointer(t.attribLocations.vertexPosition,r,o,i,s,a),e.enableVertexAttribArray(t.attribLocations.vertexPosition)}if(null!==t.attribLocations.vertexNormal){const r=3,o=e.FLOAT,i=!1,s=0,a=0;e.bindBuffer(e.ARRAY_BUFFER,n.normal),e.vertexAttribPointer(t.attribLocations.vertexNormal,r,o,i,s,a),e.enableVertexAttribArray(t.attribLocations.vertexNormal)}{const r=4,o=e.FLOAT,i=!1,s=0,a=0;e.bindBuffer(e.ARRAY_BUFFER,n.colour),e.vertexAttribPointer(t.attribLocations.vertexColour,r,o,i,s,a),e.enableVertexAttribArray(t.attribLocations.vertexColour)}e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,n.indices)}draw(e,t,n,r){e.useProgram(this.programInfo.program),this.setup(e),e.uniformMatrix4fv(this.programInfo.uniformLocations.projectionMatrix,!1,r.transposed()),null!==this.programInfo.uniformLocations.normalMatrix&&e.uniformMatrix4fv(this.programInfo.uniformLocations.normalMatrix,!1,t.data()),e.uniformMatrix4fv(this.programInfo.uniformLocations.modelViewMatrix,!1,n.transposed());e.drawElements(this.mode,this.numIndices,e.UNSIGNED_SHORT,0)}}class u{constructor(e){this.projectionMatrix=new i,this.models=new Array,this.viewMatrix=new i,this.gl=e,this.setup()}addModel(e){e.setup(this.gl),this.models.push(e)}clear(){this.models.length=0}setup(){const e=this.gl;e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.clearColor(.2,.2,.2,1),e.clearDepth(1),e.enable(e.DEPTH_TEST),e.enable(e.BLEND);const t=30*Math.PI/180,n=e.canvas,r=n.clientWidth/n.clientHeight;this.projectionMatrix=new i,this.projectionMatrix.perspective(t,r,.125,10)}reset(){this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.setup()}setView(e){this.viewMatrix=e}draw(){const e=this.gl;e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT);for(let e=0,t=this.models.length;e<t;e++)this.models[e].draw(this.gl,this.viewMatrix,this.projectionMatrix)}}function d(e,t,n){{const t=.5,n=16;for(let r=0;r<n;r++){const o=3*r,i=r*(2*Math.PI/n);e.vertices.set([Math.sin(i)*t,-.16,Math.cos(i)*t],o),e.eIndices[2*r+0]=r,e.eIndices[2*r+1]=r+1}e.eIndices[2*n-1]=0;const r=8,o=.025;for(let t=n;t<n+r;t++){const i=3*t,s=(t-n)*(2*Math.PI/r);e.vertices.set([Math.sin(s)*o,-.16,Math.cos(s)*o],i),e.eIndices[2*t+0]=t,e.eIndices[2*t+1]=t+1}e.eIndices[2*(n+r)-1]=n}{const e=.5,n=.6,r=9;for(let o=0;o<r;o++){const i=3*o,s=o*(Math.PI/(r-1))-Math.PI/2;t.vertices[i+0*r*3+0]=Math.sin(s)*e,t.vertices[i+0*r*3+1]=1,t.vertices[i+0*r*3+2]=Math.cos(s)*e,t.vertices[i+1*r*3+0]=Math.sin(s)*n,t.vertices[i+1*r*3+1]=1,t.vertices[i+1*r*3+2]=Math.cos(s)*n,t.vertices[i+2*r*3+0]=Math.sin(s)*e,t.vertices[i+2*r*3+1]=-1,t.vertices[i+2*r*3+2]=Math.cos(s)*e,t.vertices[i+3*r*3+0]=Math.sin(s)*n,t.vertices[i+3*r*3+1]=-1,t.vertices[i+3*r*3+2]=Math.cos(s)*n,t.eIndices[2*o+0]=o,t.eIndices[2*o+1]=o+1,t.eIndices[2*(o+r)+0]=o+r,t.eIndices[2*(o+r)+1]=o+r+1,t.eIndices[2*(o+2*r)+0]=o+2*r,t.eIndices[2*(o+2*r)+1]=o+2*r+1,t.eIndices[2*(o+3*r)+0]=o+3*r,t.eIndices[2*(o+3*r)+1]=o+3*r+1}t.eIndices[1*r*2-1]=2*r-1,t.eIndices[2*r*2-1]=4*r-1,t.eIndices[3*r*2-1]=1*r-1,t.eIndices[4*r*2-1]=3*r-1;let o=4*r*2;t.eIndices[o++]=0,t.eIndices[o++]=r,t.eIndices[o++]=r,t.eIndices[o++]=3*r,t.eIndices[o++]=3*r,t.eIndices[o++]=2*r,t.eIndices[o++]=2*r,t.eIndices[o++]=0*r}{const e=.125,t=.5,r=.05,o=.25;n.vertices.set([e,r,r,e,r,-r,e,-r,-r,e,-r,r,t,o,o,t,o,-o,t,-o,-o,t,-o,o,-e,r,r,-e,r,-r,-e,-r,-r,-e,-r,r,-t,o,o,-t,o,-o,-t,-o,-o,-t,-o,o],0);n.normals.set([-.5,0,-.5,-.5,0,-.5,-.5,.5,0,-.5,.5,0,-.5,0,.5,-.5,0,.5,-.5,-.5,0,-.5,-.5,0,-.5,0,-.5,-.5,0,-.5,-.5,.5,0,-.5,.5,0,-.5,0,.5,-.5,0,.5,-.5,-.5,0,-.5,-.5,0],0);const i=8,s=24;for(let e=0;e<2;e++){const t=e*s,r=e*i;n.vIndices[0+t]=3+r,n.vIndices[1+t]=0+r,n.vIndices[2+t]=7+r,n.vIndices[3+t]=0+r,n.vIndices[4+t]=4+r,n.vIndices[5+t]=7+r,n.vIndices[6+t]=0+r,n.vIndices[7+t]=1+r,n.vIndices[8+t]=4+r,n.vIndices[9+t]=1+r,n.vIndices[10+t]=5+r,n.vIndices[11+t]=4+r,n.vIndices[12+t]=2+r,n.vIndices[13+t]=3+r,n.vIndices[14+t]=6+r,n.vIndices[15+t]=3+r,n.vIndices[16+t]=7+r,n.vIndices[17+t]=6+r,n.vIndices[18+t]=1+r,n.vIndices[19+t]=2+r,n.vIndices[20+t]=5+r,n.vIndices[21+t]=2+r,n.vIndices[22+t]=6+r,n.vIndices[23+t]=5+r}}}var h=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function s(e){try{l(r.next(e))}catch(e){i(e)}}function a(e){try{l(r.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}l((r=r.apply(e,t||[])).next())}))};const f=new s(2796,5580),m=new s(522,348),v=new l(24),g=new l(40),w=new a(16),p=new a(117),M=new class{constructor(){this.renderModels=new Array,this.modelMatrix=new i}addRenderModel(e){this.renderModels.push(e)}setMatrix(e){this.modelMatrix=e}setup(e){for(let t=0,n=this.renderModels.length;t<n;t++)this.renderModels[t].setup(e)}draw(e,t,n){const r=t.multiplied(this.modelMatrix),o=r.clone();o.invert();for(let t=0,i=this.renderModels.length;t<i;t++)this.renderModels[t].draw(e,o,r,n)}},I=new class{constructor(){this.renderModels=new Array,this.sceneMatrix=new i,this.modelMatrix=new i,this.wall=null,this.sceneMatrix.translate(0,0,2.5)}recalculate(e,t){if(null===this.wall)return;const n=(1-Math.cos(t))/2,r=.2,o=6*r*Math.sqrt(2),i=n*Math.atan(o)/Math.atan(6*r);for(let e=0;e<9;e++){const t=(e-4)*r,n=t*t;for(let o=0;o<13;o++){const s=(o-6)*r,a=Math.sqrt(s*s+n),l=Math.cos(Math.atan(a)*i);this.wall.vertices[3*(13*e+o)+0]=s*l,this.wall.vertices[3*(13*e+o)+1]=t*l}}e.bindBuffer(e.ARRAY_BUFFER,this.wall.buffer.position),e.bufferData(e.ARRAY_BUFFER,this.wall.vertices,e.STATIC_DRAW)}setMatrix(e){this.modelMatrix=e}setup(e){for(let t=0,n=this.renderModels.length;t<n;t++)this.renderModels[t].setup(e)}draw(e,t,n){var r;const o=t.multiplied(this.sceneMatrix).multiplied(this.modelMatrix),i=o.clone();i.invert(),null===(r=this.wall)||void 0===r||r.draw(e,i,o,n)}},A=new class{constructor(){this.renderModels=new Array,this.sceneMatrix=new i,this.modelMatrix=new i,this.manhole=null,this.podFaces=null,this.podEdges=null,this.tripodFaces=null,this.tripodEdges=null,this.laser=null,this.lights=null,this.sceneMatrix.translate(0,0,2.5)}setMatrix(e){this.modelMatrix=e}setup(e){for(let t=0,n=this.renderModels.length;t<n;t++)this.renderModels[t].setup(e)}draw(e,t,n){var r,o,i,s,a,l,c;const u=t.multiplied(this.sceneMatrix),d=u.multiplied(this.modelMatrix),h=d.clone();h.invert(),null===(r=this.manhole)||void 0===r||r.draw(e,h,u,n),null===(o=this.tripodFaces)||void 0===o||o.draw(e,h,u,n),null===(i=this.tripodEdges)||void 0===i||i.draw(e,h,u,n),null===(s=this.podFaces)||void 0===s||s.draw(e,h,d,n),null===(a=this.podEdges)||void 0===a||a.draw(e,h,d,n),null===(l=this.laser)||void 0===l||l.draw(e,h,d,n),null===(c=this.lights)||void 0===c||c.draw(e,h,d,n)}};let x,b=0;const y=["title","work-history","project-selection","tech-tools","education","interests","brag"],F={title:[0,0],"work-history":[0,0],"project-selection":[0,0],"tech-tools":[0,0],education:[0,0],interests:[0,0],brag:[0,0]};let L="";function R(e){for(let t=0;t<4*e.length;t+=4)e[t+0]=.0625,e[t+1]=.0625,e[t+2]=.0625,e[t+3]=1}function E(e){for(let t=0;t<4*e.length;t+=4)e[t+0]=.25,e[t+1]=.25,e[t+2]=.25,e[t+3]=1}function P(e){for(let t=0;t<e.length;t+=4)e[t+0]=1,e[t+1]=.125,e[t+2]=.125,e[t+3]=1}function S(e){for(let t=0;t<e.length;t+=4)e[t+0]=.5,e[t+1]=.5,e[t+2]=.5,e[t+3]=1}function B(e){for(let t=0;t<4*e.length;t+=4)e[t+0]=.25,e[t+1]=.25,e[t+2]=.25,e[t+3]=.2}function _(e,t,n){const r=e.createShader(t);if(null===r)return console.log("gl.createShader("+t+") returned null"),null;const o=r;return e.shaderSource(o,n),e.compileShader(o),e.getShaderParameter(o,e.COMPILE_STATUS)?o:(console.log("An error occurred compiling the shaders: "+e.getShaderInfoLog(o)),e.deleteShader(o),null)}function T(e,t,n){let r=_(e,e.VERTEX_SHADER,t);if(null===r)return console.log("loadShader(vertex) returned null"),null;const o=r;if(r=_(e,e.FRAGMENT_SHADER,n),null===r)return console.log("loadShader(fragment) returned null"),null;const i=r;if(r=e.createProgram(),null===r)return console.log("gl.createProgram() returned null"),null;const s=r;return e.attachShader(s,o),e.attachShader(s,i),e.linkProgram(s),e.getProgramParameter(s,e.LINK_STATUS)?s:(console.log("Unable to initialize the shader program: "+e.getProgramInfoLog(s)),null)}function C(e){let t=(e-b)/1e3;t=Math.min(t,1),t=(1-Math.cos(t*Math.PI))/2;const n=new i;n.rotate(t*Math.PI,[0,1,0]),null==x||x.setView(n),null==x||x.draw(),e-b>1e3||requestAnimationFrame(C)}function V(e){let t=(e-b)/1e3;t=1-Math.min(t,1),t=(1-Math.cos(t*Math.PI))/2;const n=new i;if(n.rotate(t*Math.PI,[0,1,0]),x.setView(n),x.draw(),e-b>1e3)return x.clear(),void x.addModel(M);requestAnimationFrame(V)}function U(e){void 0!==x&&x.draw()}function N(){const e=.5*Math.PI*window.pageYOffset/window.innerHeight,t=new i;switch(t.rotate(-Math.PI/2,[1,0,0]),t.rotate(e,[0,1,0]),t.translate(0,e/25-1.6,-.45),M.setMatrix(t),L){case"sv100":const t=new i;t.rotate((e-4.93125)/12.5,[0,1,0]),t.translate(0,1-e/6.25,0),A.setMatrix(t);break;case"fisheye-calibration":I.recalculate(x.gl,e)}}function j(){!function(){const e=window.scrollY,t=window.scrollY+window.innerHeight;for(let n=0;n<y.length;n++){const r=y[n],o=F[r],i=o[0],s=o[0]+o[1];if(t>i&&e<s){const n=(t-i)/window.innerHeight,o=(s-e)/window.innerHeight,a=document.getElementById(r);if(null===a){console.log("!!! Element with id",r,"is null");continue}a.style.opacity=0<n&&n<.333?(n/.333).toString():0<o&&o<.333?(o/.333).toString():"1"}}}(),N()}function O(){void 0!==x&&(x.gl.canvas.width=window.innerWidth,x.gl.canvas.height=window.innerHeight,x.reset(),requestAnimationFrame(j),requestAnimationFrame(U))}function D(){!function(){const e=[];for(let t=0;t<y.length;t++){const n=y[t],r=document.getElementById(n);null!==r?(r.style.transform="",e.push(r)):console.log("el is null",n)}for(let t=0;t<e.length;t++){const n=y[t],r=e[t];F[n][0]=window.pageYOffset+r.getBoundingClientRect().top,F[n][1]=r.offsetHeight}}(),O()}const Y=(e,t,r)=>h(void 0,void 0,void 0,(function*(){const{parseSTL:o,parseSTLMesh:i}=yield n.e(0).then(n.bind(null,5));fetch("human.stl").then(n=>{n.arrayBuffer().then(n=>{const o=new Uint8Array(n),s=performance.now(),a=i(o,f.vertices,f.normals,f.vIndices,f.eIndices),l=performance.now();console.log(l-s,"milliseconds (Human)"),console.log("ParseSTLMesh:",a);const u=new c(e,t,e.TRIANGLES,f.vertices,f.normals,f.vIndices,R),d=new c(e,r,e.LINES,f.vertices,f.normals,f.eIndices,E);M.addRenderModel(u),M.addRenderModel(d),x.addModel(M),requestAnimationFrame(N),requestAnimationFrame(U);document.getElementById("gl_canvas").style.opacity="1"})}),fetch("sv100.stl").then(n=>{n.arrayBuffer().then(n=>{const i=new Uint8Array(n),s=performance.now(),a=o(i,m.vertices,m.normals,m.vIndices,m.eIndices),l=performance.now();console.log(l-s,"milliseconds (SV100)"),console.log("parseSTL:",a),d(v,g,w);const u=new c(e,t,e.TRIANGLES,m.vertices,m.normals,m.vIndices,R),h=new c(e,r,e.LINES,m.vertices,m.normals,m.eIndices,E),f=new c(e,r,e.LINES,v.vertices,new Float32Array,v.eIndices,P),p=new c(e,r,e.LINES,g.vertices,new Float32Array,g.eIndices,S),M=new c(e,t,e.TRIANGLES,w.vertices,w.normals,w.vIndices,B);A.podFaces=u,A.podEdges=h,A.laser=f,A.manhole=p,A.lights=M})}),d(v,g,w),function(e,t,n){for(let n=0;n<9;n++)for(let r=0;r<13;r++)e[3*(13*n+r)+2]=0,t[3*(13*n+r)+0]=-.5,t[3*(13*n+r)+1]=.5,t[3*(13*n+r)+2]=-1;const r=new Uint32Array(288);let o=0;for(let e=0;e<8;e++)for(let t=0;t<12;t++)e%2==0&&t%2==1||e%2==1&&t%2==0||(r[o++]=13*e+t+0,r[o++]=13*e+t+13,r[o++]=13*e+t+1,r[o++]=13*e+t+1,r[o++]=13*e+t+14,r[o++]=13*e+t+13);n.set(r,0)}(p.vertices,p.normals,p.vIndices);const s=new c(e,t,e.TRIANGLES,p.vertices,p.normals,p.vIndices,S);I.wall=s}));function H(){requestAnimationFrame(j),requestAnimationFrame(U)}function W(e){const t=document.getElementById("content");if(null===t)return void console.log("!!! el === null");t.classList.add("leftscreen");const n=document.getElementById(e);if(null!=n){switch(n.classList.add("focused"),e){case"sv100":null==x||x.addModel(A),L=e;break;case"fisheye-calibration":null==x||x.addModel(I),I.recalculate(x.gl,.5*Math.PI*window.pageYOffset/window.innerHeight),L=e}""!=L&&(requestAnimationFrame(N),b=performance.now(),requestAnimationFrame(C)),window.scrollTo({top:F["project-selection"][0],behavior:"smooth"})}else console.log("!!! projectDiv === null")}function q(){const e=document.getElementById("projects");if(null!==e){const t=e.children.length;for(let n=0;n<t;n++){const t=e.children[n];"project-selection"!==t.id&&t.classList.remove("focused")}}else console.log("!!! projectDiv === null");const t=document.getElementById("content");null!==t?t.classList.remove("leftscreen"):console.log("!!! el === null"),x.setView(new i),b=performance.now(),""!==L&&requestAnimationFrame(V),L=""}function k(e){window.history.pushState({},"","#"+e),W(e)}function G(){window.history.pushState({},"","/"),q()}window.onpopstate=function(e){e.preventDefault(),""!==document.location.hash?W(document.location.hash.substr(1)):q()},"scrollRestoration"in window.history&&(history.scrollRestoration="manual"),window.onload=()=>{D(),""!==document.location.hash&&W(document.location.hash.substr(1))},window.onresize=D,function(){const e=document.getElementById("gl_canvas");e.width=window.innerWidth,e.height=window.innerHeight;const t=e.getContext("webgl",{});if(null===t)return void console.log("Unable to initialise WebGL");const n=t,r=T(n,"\nattribute vec4 aVertexPosition;\nattribute vec3 aVertexNormal;\nattribute vec4 aVertexColour;\n\nuniform mat4 uNormalMatrix;\nuniform mat4 uModelViewMatrix;\nuniform mat4 uProjectionMatrix;\n\nvarying lowp vec4 vColour;\nvarying highp vec3 vLighting;\n\nvoid main() {\n\tgl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;\n\tvColour = aVertexColour;\n\n\t// Apply lighting effect\n\thighp vec3 ambientLight = vec3(0.1, 0.1, 0.1);\n\thighp vec3 directionalLightColor = vec3(1, 1, 1);\n\thighp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));\n\n\thighp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);\n\n\thighp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);\n\tvLighting = ambientLight + (directionalLightColor * directional);\n}\n","\nvarying lowp vec4 vColour;\nvarying highp vec3 vLighting;\n\nvoid main() {\n\tgl_FragColor = vec4(vColour.rgb * vLighting, vColour.a);\n}\n");if(null===r)return void console.log("iniShaderProgram() returned null");const o=r,i={program:o,attribLocations:{vertexPosition:n.getAttribLocation(o,"aVertexPosition"),vertexNormal:n.getAttribLocation(o,"aVertexNormal"),vertexColour:n.getAttribLocation(o,"aVertexColour")},uniformLocations:{projectionMatrix:n.getUniformLocation(o,"uProjectionMatrix"),modelViewMatrix:n.getUniformLocation(o,"uModelViewMatrix"),normalMatrix:n.getUniformLocation(o,"uNormalMatrix")}},s=T(n,"\nattribute vec4 aVertexPosition;\n// attribute vec3 aVertexNormal;\nattribute vec4 aVertexColour;\n\n// uniform mat4 uNormalMatrix;\nuniform mat4 uModelViewMatrix;\nuniform mat4 uProjectionMatrix;\n\nvarying lowp vec4 vColour;\n// varying highp vec3 vLighting;\n\nvoid main() {\n\tgl_Position = (uProjectionMatrix * uModelViewMatrix * aVertexPosition) - vec4(0.0, 0.0, 0.00048828125, 0.0);\n\tvColour = aVertexColour;\n}\n","\nvarying lowp vec4 vColour;\n// varying highp vec3 vLighting;\n\nvoid main() {\n\tgl_FragColor = vColour;\n}\n");if(null===s)return void console.log("iniShaderProgram() returned null");const a=s,l={program:a,attribLocations:{vertexPosition:n.getAttribLocation(a,"aVertexPosition"),vertexNormal:null,vertexColour:n.getAttribLocation(a,"aVertexColour")},uniformLocations:{projectionMatrix:n.getUniformLocation(a,"uProjectionMatrix"),modelViewMatrix:n.getUniformLocation(a,"uModelViewMatrix"),normalMatrix:null}};x=new u(n),Y(n,i,l),O()}()}]);