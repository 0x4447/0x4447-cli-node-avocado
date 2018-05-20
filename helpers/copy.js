let ncp = require('ncp').ncp;

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
		console.log("Copy");

		//
		//	1.	The path of the Input folder
		//
		let source = container.settings.dir + '/_input';

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
				//
				//	1.	Show the error
				//
				console.log(error);

				//
				//	->	Exit the app
				//
				process.exit(1);
			}

			//
			//	->	Move to the next chain
			//
			return resolve(container)

		});

	});
};

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
function filter(file)
{
	let state = true;

	if(file == '.git') 			{ state = false; }
	if(file == 'output') 		{ state = false; }
	if(file == '.DS_Store') 	{ state = false; }
	if(file == 'README.md') 	{ state = false; }
	if(file == 'LICENSE') 		{ state = false; }

	return state;
}