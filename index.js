#!/usr/bin/env node

let npm = require('./package.json');
let program = require('commander');

let start = require('./helpers/01_start');
let clean = require('./helpers/02_clean');
let data = require('./helpers/03_data');
let render = require('./helpers/04_render');
let copy = require('./helpers/05_copy');
let remove = require('./helpers/06_remove');
let stop = require('./helpers/07_stop');

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

		return clean(container);

	}).then(function(container) {

		return data(container);

	}).then(function(container) {

		return render(container);

	}).then(function(container) {

		return copy(container);

	}).then(function(container) {

		return remove(container);

	}).then(function(container) {

		return stop(container);

	}).catch(function(error) {

		console.log(error);
		process.exit(-1);

	});