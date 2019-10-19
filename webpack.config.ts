
import path from "path";
import webpack from "webpack";

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import WasmPackPlugin from "@wasm-tool/wasm-pack-plugin";

type ConfMode = "development" | "production" | "none";

const mode: ConfMode = "production";

// Mismatch between versions of @types/webpack in root and mini-css-extract-plugin
// dependency cause compile error on build. Still useful for debugging with intellisense.
const configCSS = { // : webpack.Configuration = {
	optimization: {
		minimizer: [new OptimizeCSSAssetsPlugin({})],
	},
	mode: mode,
	entry: {
		style: "./src/style.styl"
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		// filename: "[name].css"
	},
	plugins: [
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// all options are optional
			filename: "[name].css",
			chunkFilename: "[id].css",
			ignoreOrder: false, // Enable to remove warnings about conflicting order
		}),
	],
	module: {
		rules: [{
			test: /\.(css|styl)$/,
			use: [
				{
					loader: MiniCssExtractPlugin.loader,
					options: {
						// You can specify a publicPath here
						// by default it uses publicPath in webpackOptions.output
						publicPath: "../",
						hmr: process.env.NODE_ENV === "development",
					},
				},
				// "style-loader",
				"css-loader",
				"stylus-loader",
			],
		}]
	}
};

// @types/webpack doesn't include definition for optimization.mangleWasmImports.
// However, mangleWasmImports made the bundle slightly larger anyway.
const configJS: webpack.Configuration = {
	optimization: {
		// runtimeChunk: true,
		// mangleWasmImports: true,
		// minimize: false,
		// usedExports: true,
	},
	mode: mode,
	entry: {
		index: "./src/index.ts",
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		// filename: "bundle-[name].js"
		filename: "bundle.js",
		library: "index",
		libraryTarget: "window",
	},
	plugins: [
		new WasmPackPlugin({
			crateDirectory: path.resolve(__dirname, "./vita-wasm"),
		}),
	],
	module: {
		rules: [{
			test: /\.ts$/,
			use: [{
				loader: "ts-loader",
				options: {
					// configFile: "tsconfig.json"
				}
			}],
			exclude: /node_modules/
		}]
	},
};

// Mismatch between versions of @types/webpack in root and copy-webpack-plugin
// dependency cause compile error on build. Still useful for debugging with intellisense.
const configHTML = { // : webpack.Configuration = {
	mode: mode,
	optimization: {
		// minimizer: [new OptimizeHTMLPlugin({})],
	},
	entry: {
		index: "./src/html.js",
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "html.js"
	},
	plugins: [
		new CopyPlugin([
			{ from: "src/index.html", to: "index.html" },
		]),
	],
};

export default [
	configCSS,
	configJS,
	configHTML
];
