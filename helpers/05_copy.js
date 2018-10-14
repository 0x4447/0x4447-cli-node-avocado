let ncp = require('ncp').ncp;
let path = require('path');

//
//	Copy the content of the _input to the _output and to all the changes in
//	the _output folder. This way we don't work on the original project, and
//	CodeBuild have one clear location to use when coping the files to S3
//
module.exports = function(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	->	Show at which step are we
		//
		console.log("Copying");

		//
		//	->	Start the chain
		//
		preview(container)
			.then(function(container) {

				return output(container);

			}).then(function(container) {

				return resolve(container);

			}).catch(function(error) {

				return reject(error);

			});

	});
};

//	 _____    _____     ____    __  __   _____    _____   ______    _____
//	|  __ \  |  __ \   / __ \  |  \/  | |_   _|  / ____| |  ____|  / ____|
//	| |__) | | |__) | | |  | | | \  / |   | |   | (___   | |__    | (___
//	|  ___/  |  _  /  | |  | | | |\/| |   | |    \___ \  |  __|    \___ \
//	| |      | | \ \  | |__| | | |  | |  _| |_   ____) | | |____   ____) |
//	|_|      |_|  \_\  \____/  |_|  |_| |_____| |_____/  |______| |_____/
//

//
//	Copy all the data to the folder for to make a preview
//
function preview(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	->	Show at which step are we
		//
		console.log("Make Preview");

		//
		//	1.	The path of the Input folder
		//
		let source = container.settings.dir + '/_input';

		//
		//	2.	The path of the Output folder
		//
		let target = container.settings.dir + '/_preview';

		//
		//	3.	The options for he NCP command
		//
		let options = {
			filter: filter
		}

		//
		//	4. Copy the files from the Source to the Target location
		//
		ncp(source, target, options, function(error) {

			//
			//	1.	Check if an error occurred
			//
			if(error)
			{
				return reject(error);
			}

			//
			//	->	Move to the next chain
			//
			return resolve(container)

		});

	});
}

//
//	Copy all the data to the folder for release
//
function output(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	->	Show at which step are we
		//
		console.log("Make Output");

		//
		//	1.	The path of the Input folder
		//
		let source = container.settings.dir + '/_preview';

		//
		//	2.	The path of the Output folder
		//
		let target = container.settings.dir + '/_output';

		//
		//	3.	The options for he NCP command
		//
		let options = {
			filter: filter
		}

		//
		//	4. Copy the files from the Source to the Target location
		//
		ncp(source, target, options, function(error) {

			//
			//	1.	Check if an error occurred
			//
			if(error)
			{
				return reject(error);
			}

			//
			//	->	Move to the next chain
			//
			return resolve(container)

		});

	});
}

//	 ______  _    _  _   _   _____  _______  _____  ____   _   _   _____
//	|  ____|| |  | || \ | | / ____||__   __||_   _|/ __ \ | \ | | / ____|
//	| |__   | |  | ||  \| || |        | |     | | | |  | ||  \| || (___
//	|  __|  | |  | || . ` || |        | |     | | | |  | || . ` | \___ \
//	| |     | |__| || |\  || |____    | |    _| |_| |__| || |\  | ____) |
//	|_|      \____/ |_| \_| \_____|   |_|   |_____|\____/ |_| \_||_____/
//

//
//	This function is used to filter files that don't need to be copied
//	in to the _output folder
//
function filter(full_path)
{
	//
	//	1.	By default we assume that we want the file to be copied
	//
	let state = true;

	//
	//	2.	Get the base name of the path, so we don't have the fill path
	//		and get the folder or file name.
	//
	let file = path.basename(full_path);

	//
	//	3.	Check to see if there is something that we don't want to copy
	//		to the new location.
	//
	if(file == '.git') 			{ state = false; }
	if(file == 'output') 		{ state = false; }
	if(file == '.DS_Store') 	{ state = false; }
	if(file == 'README.md') 	{ state = false; }
	if(file == 'LICENSE') 		{ state = false; }
	if(file == 'data') 			{ state = false; }
	if(file == 'views') 		{ state = false; }

	//
	//	->	Return our decision
	//
	return state;
}