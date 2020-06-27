# Vita

This repo uses Git submodules:
```bash
git submodule update --init --recursive
```

## Build
```bash
yarn install
yarn build
```

## Development
```bash
yarn install
yarn dev
```

## FAQ
### Why not use [three.js](https://threejs.org/)?
That would be too easy :) I'm scratching my own itch of learning WebGL and
implementing my own matrix math. I also think it's cool that this project has
zero run-time dependencies and I'd like to keep it that way.

### Why not use React / Vue / other framework?
I feel this project is simple enough to not need a framework. It transpiles into
~23KB of javascript and adding a framework would increase that size. At some
point I'd like to add [SvelteJS](https://svelte.dev/) which compiles into
javascript without a runtime and no virtual DOM.

### Is using WebAssembly really more performant for this use case?
I don't know; I wanted to use Rust and WebAssembly. As of October 2018,
[JS-to-WebAssembly function calls are faster than javascript function calls in Firefox](https://hacks.mozilla.org/2018/10/calls-between-javascript-and-webassembly-are-finally-fast-%F0%9F%8E%89/),
so maybe 🤷
