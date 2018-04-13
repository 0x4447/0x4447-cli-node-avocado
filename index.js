#!/usr/bin/env node

let npm = require('./package.json');
let copy = require('./helpers/copy');
let stop = require('./helpers/stop');
let start = require('./helpers/start');
let render = require('./helpers/render');
let rename = require('./helpers/rename');
let program = require('commander');

//   _____   ______   _______   _______   _____   _   _    _____    _____
//  / ____| |  ____| |__   __| |__   __| |_   _| | \ | |  / ____|  / ____|
// | (___   | |__       | |       | |      | |   |  \| | | |  __  | (___
//  \___ \  |  __|      | |       | |      | |   | . ` | | | |_ |  \___ \
//  ____) | | |____     | |       | |     _| |_  | |\  | | |__| |  ____) |
// |_____/  |______|    |_|       |_|    |_____| |_| \_|  \_____| |_____/
//

//
//	The CLI options for this app. At this moment we just support Version
//
program
	.version(npm.version)
	.option('-s, --source', 'path to the folder to upload')
	.parse(process.argv);

//
//	Just add an empty line at the end of the help to make the text more clear
//	to the user
//
program.on('--help', function() {
	console.log("");
});

//
//	Pass the user input to the module
//
program.parse(process.argv);

//
//	Check if the user provided the dir source where to copy the file from
//
if(!program.source)
{
	console.log('Missing source');
	process.exit(0);
}

//	 __  __              _____   _   _
//	|  \/  |     /\     |_   _| | \ | |
//	| \  / |    /  \      | |   |  \| |
//	| |\/| |   / /\ \     | |   | . ` |
//	| |  | |  / ____ \   _| |_  | |\  |
//	|_|  |_| /_/    \_\ |_____| |_| \_|
//

//
//	Create a variable that will be passed inside the chain
//
let container = {
	settings: {
		dir: process.cwd() + "/" + process.argv[3],
	}
}

//
//	->	Start the chain
//
start(container)
	.then(function(container) {

		return render(container);

	}).then(function(container) {

		return copy(container);

	}).then(function(container) {

		return rename(container);

	}).then(function(container) {

		return stop(container);

	}).catch(function(error) {

		console.log(error);

	});