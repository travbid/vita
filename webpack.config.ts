
import path from "path";
import webpack from "webpack";

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import WasmPackPlugin from "@wasm-tool/wasm-pack-plugin";
import TerserPlugin from "terser-webpack-plugin";

const nodeEnv = process.env.NODE_ENV;
console.log("NODE_ENV:", nodeEnv);

type ConfMode = "development" | "production" | "none";

let nodeMode: ConfMode;
if (nodeEnv === undefined) {
	nodeMode = "development";
} else if (nodeEnv === "development" || nodeEnv === "production" || nodeEnv === "none") {
	nodeMode = nodeEnv;
} else {
	console.log("Invalid NODE_ENV:", nodeEnv);
	console.log("NODE_ENV must be \"developemnt\", \"production\" or \"none\"");
	throw 1;
}

const mode: ConfMode = nodeMode;

// @types/webpack doesn't include definition for optimization.mangleWasmImports.
// However, mangleWasmImports made the bundle slightly larger anyway.
const config: webpack.Configuration = {
	optimization: {
		// runtimeChunk: true,
		// mangleWasmImports: true,
		// minimize: false,
		// usedExports: true,
		minimizer: [
			new CssMinimizerPlugin(),
			new TerserPlugin({}),
		],
	},
	mode: mode,
	entry: {
		index: "./src/index.ts",
		style: "./src/style.styl",
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle-[name].js",
		library: "index",
		libraryTarget: "window",
	},
	performance: {
		hints: process.env.NODE_ENV === "production" ? "warning" : false,
	},
	resolve: {
		extensions: [".ts", ".js", ".json"],
	},
	experiments: {
		asyncWebAssembly: true,
	},
	plugins: [
		new WasmPackPlugin({
			crateDirectory: path.resolve(__dirname, "./vita-wasm"),
		}),
		new CopyPlugin({
			patterns: [
				{ from: "src/index.html", to: "index.html" },
				{ context: "src/icons", from: "*.ico" },
				{ context: "src/icons", from: "*.png" },
				{ context: "src/icons", from: "*.svg" },
				{ context: "src/assets", from: "*.*" },
			],
		}),
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
			test: /\.ts$/,
			use: [{
				loader: "ts-loader",
				options: {
					// configFile: "tsconfig.json"
				},
			}],
			exclude: /node_modules/,
		}, {
			test: /\.(css|styl)$/,
			use: [
				{
					loader: MiniCssExtractPlugin.loader,
					options: {
						// You can specify a publicPath here
						// by default it uses publicPath in webpackOptions.output
						publicPath: "../",
					},
				},
				// "style-loader",
				"css-loader",
				"stylus-loader",
			],
		}],
	},
};

export default config;
