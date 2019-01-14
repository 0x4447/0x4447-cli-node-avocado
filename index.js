#!/usr/bin/env node

let fs = require('fs');
let npm = require('./package.json');
let program = require('commander');

//
//	Load all the modules in order of execution.
//
let start 	= require('./helpers/01_start');
let clean 	= require('./helpers/02_clean');
let data 	= require('./helpers/03_data');
let render 	= require('./helpers/04_render');
let diet = require('./helpers/05_diet');
let copy 	= require('./helpers/06_copy');
let remove 	= require('./helpers/07_remove');
let stop 	= require('./helpers/08_stop');

//   _____   ______   _______   _______   _____   _   _    _____    _____
//  / ____| |  ____| |__   __| |__   __| |_   _| | \ | |  / ____|  / ____|
// | (___   | |__       | |       | |      | |   |  \| | | |  __  | (___
//  \___ \  |  __|      | |       | |      | |   | . ` | | | |_ |  \___ \
//  ____) | | |____     | |       | |     _| |_  | |\  | | |__| |  ____) |
// |_____/  |______|    |_|       |_|    |_____| |_| \_|  \_____| |_____/
//

//
//	The CLI options for this app. At this moment we just support Version.
//
program
	.version(npm.version)
	.option('-s, --source', 'Path to the folder to process')
	.option('-m, --monitor', 'Monitor for file change');

//
//	React when the user needs help.
//
program.on('--help', function() {

	//
	//	Just add an empty line at the end of the help to make the text more
	//	clear to the user.
	//
	console.info("");

});

//
//	Pass the user input to the module.
//
program.parse(process.argv);

//
//	Check if the user provided the dir source where to copy the file from.
//
if(!program.source)
{
	console.info('Missing source');
	process.exit(-1);
}

//	 _        _____    _____   _______   _   _   ______   _____     _____
//	| |      |_   _|  / ____| |__   __| | \ | | |  ____| |  __ \   / ____|
//	| |        | |   | (___      | |    |  \| | | |__    | |__) | | (___
//	| |        | |    \___ \     | |    | . ` | |  __|   |  _  /   \___ \
//	| |____   _| |_   ____) |    | |    | |\  | | |____  | | \ \   ____) |
//	|______| |_____| |_____/     |_|    |_| \_| |______| |_|  \_\ |_____/
//

//
//	Create the paths to the folders that we want to monitor. We need to
//	make one path for each folder that we are interested inside _input
//	since fs.watch() can't watch recursively.
//
let data_folder  = process.cwd() + "/_input/data";
let views_folder = process.cwd() + "/_input/views";

//
//	Monitor all the folders that we care about.
//
fs.watch(data_folder, 	function(eventType, filename) { main(); });
fs.watch(views_folder,	function(eventType, filename) { main(); });

//	 __  __              _____   _   _
//	|  \/  |     /\     |_   _| | \ | |
//	| \  / |    /  \      | |   |  \| |
//	| |\/| |   / /\ \     | |   | . ` |
//	| |  | |  / ____ \   _| |_  | |\  |
//	|_|  |_| /_/    \_\ |_____| |_| \_|
//

//
//	Start the conversion process.
//
main();

//
//	This main function is responsible for creating the final output
//	and can be run once or every time there is a change in the _input folder.
//
function main()
{
	//
	//	Create a variable that will be passed inside the chain.
	//
	let container = {
		settings: {
			dir: process.cwd() + "/" + process.argv[3]
		}
	};

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

		}).then(function(container){

			return diet.removeHtmlComments(container)

		}).then(function(container){

			return diet.removeCssComments(container)

		}).then(function(container){

			return diet.removeJsComments(container)

		}).then(function(container) {

			return remove(container);

		}).then(function(container) {

			return stop(container);

		}).then(function(container) {

			//
			//	1.	Check if the app should monitor file changes or exit
			//		after the first run.
			//
			if(!program.monitor)
			{
				//
				//	1.	Exit the CLI with a positive message
				//
				process.exit();
			}

		}).catch(function(error) {

			//
			//	1.	Display to the human what went wrong.
			//
			console.error(error);

			//
			//	->	Stop the app, and notify the OS of an error.
			//
			process.exit(1);

		});
}
