module.exports = {
	presets: [
		["@babel/preset-env", {modules: false}],
		["@babel/preset-react", {development: true}]
	],
	plugins: [
		["@babel/plugin-proposal-object-rest-spread"],
		["@babel/plugin-proposal-class-properties"]
	]
};