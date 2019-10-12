
import path from "path";
import webpack from 'webpack';

// import TerserJSPlugin from "terser-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import WasmPackPlugin from "@wasm-tool/wasm-pack-plugin";

type ConfMode = "development" | "production" | "none";

const mode: ConfMode = "production";

const config_css: webpack.Configuration = {
	optimization: {
		minimizer: [new OptimizeCSSAssetsPlugin({})],
	},
	mode: mode,
	entry: {
		style: './src/style.styl'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		// filename: '[name].css'
	},
	plugins: [
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// all options are optional
			filename: '[name].css',
			chunkFilename: '[id].css',
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
						// you can specify a publicPath here
						// by default it uses publicPath in webpackOptions.output
						publicPath: '../',
						hmr: process.env.NODE_ENV === 'development',
					},
				},
				// 'style-loader',
				'css-loader',
				'stylus-loader',
			],
		}]
	}
};

const config_js: webpack.Configuration = {
	optimization: {
		// minimize: false,
		// minimizer: [
		// 	new TerserJSPlugin({
		// 	terserOptions: {
		// 		// ecma: undefined,
		// 		// warnings: false,
		// 		// parse: {},
		// 		// compress: {},
		// 		mangle: true, // Note `mangle.properties` is `false` by default.
		// 		module: false,
		// 		// output: null,
		// 		// toplevel: false,
		// 		// nameCache: null,
		// 		// ie8: false,
		// 		// keep_classnames: undefined,
		// 		// keep_fnames: false,
		// 		// safari10: false,
		// 	 },
		// 	}),
		// ],
		usedExports: true,
	},
	mode: mode,
	entry: {
		index: './src/index.ts',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		// filename: 'bundle-[name].js'
		filename: 'bundle.js',
		library: 'index',
		libraryTarget: 'window',
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
				loader: 'ts-loader',
				options: {
					// configFile: 'tsconfig.asrc.json'
				}
			}],
			exclude: /node_modules/
		}]
	},
	// resolve: {
	// 	extensions: [".ts"]
	// },
};

const config_html: webpack.Configuration = {
	mode: mode,
	entry: {
		index: './src/html.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'html.js'
	},
	plugins: [
		new CopyPlugin([
			{ from: 'src/index.html', to: 'index.html' },
		]),
	],
};

export default [
	config_css,
	config_js,
	config_html
];
