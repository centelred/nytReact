module.exports = {
	//entry point of react app
	entry: "./app/app.js",

	//plain javascript output into this file
	output: {
		filename: "public/bundle.js"
	},

	//transformations to be performed.
	module: {
		loaders: [
		{
			//working with files in a .js/.jsx ext
			test: /\.jsx?$/,
			excluse: /(node_modules|bower_components)/,
			//webpack will only process files in our app folder
			include: /app/,
			loader: "babel",
			query: {
				presets: ["react", "es2015"]
			}
		}
		]
	}
};
