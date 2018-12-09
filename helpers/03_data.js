let fs = require('fs');
let read = require('fs-readdir-recursive');
let recursive = require('recursive-readdir');

//
//	Load all the JSON data for each page, so it can then be used to render
//	the final pages.
//
module.exports = function(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	->	Show at which step are we.
		//
		console.info("Reading");

		//
		//	->	Start the chain.
		//
		load_page_data(container)
			.then(function(container) {

				return load_env_data(container);

			}).then(function(container) {

				return merge_the_data(container);

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
//	Load all the JSON file that contain data for each page to be replaced, like
//	the tile of the page, description and anything else that is needed.
//
function load_page_data(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	->	Show at which step are we.
		//
		console.info("  - Reading page data");

		//
		//	1.	Set the full path to the folder.
		//
		let path = container.settings.dir + '/_input/data';

		//
		//	2.	Read all the files in a folder.
		//
		let files = read(path);

		//
		//	3.	Make a variable where to store the content of the files.
		//
		let tmp = {};

		//
		//	4.	Go over each URI that we got load it's content.
		//
		files.forEach(function(file_name) {

			//
			//	1.	Remove the extension from the file name so we can
			//		use the file name as the key in the object bellow.
			//
			let no_extension = file_name.split('.')[0];

			//
			//	2.	Load data as a JS Object.
			//
			let json = require(path + '/' + file_name);	// eslint-disable-line global-require

			//
			//	3.	Save the file data in to a new object.
			//
			tmp[no_extension] = json;

		});

		//
		//	5.	Save the data for the next promise.
		//
		container.page_data = tmp;

		//
		//	->	Move to the next chain.
		//
		return resolve(container);

	});
}

//
//	Load the Environment data file that contains information that should be
//	used only for the deployment at hand and be never committed to a repo.
//	Since it is unique to the individual installation.
//
function load_env_data(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	->	Show at which step are we.
		//
		console.info("  - Reading env data");

		//
		//	1.	For clarity and re-use, save the Env file path in a clear
		//		variable.
		//
		let env_path = container.settings.dir + '/env.json';

		//
		//	1.	Since this file doesn't have to exists, we must check if
		//		we have it or not.
		//
		let env_exists = fs.existsSync(env_path);

		//
		//	2.	If this project doesn't have the env file, skip this step.
		//
		if(env_exists)
		{
			//
			//	1.	Load the env.json file from the drive while blocking
			//		the whole process, because we need this file now, and
			//		not later.
			//
			let raw_env = fs.readFileSync(env_path);

			//
			//	2.	Convert JSON in to a JS object and save it for other
			//		promises to use.
			//
			container.env_data = {
				env: JSON.parse(raw_env)
			};
		}

		//
		//	->	Move to the next chain.
		//
		return resolve(container);

	});
}

//
//	Once we have all the data for the pages and the Env variables, we merge
//	them together so the Hogan templating engine, can do it's magic and save
//	us some time and effort.
//
function merge_the_data(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	->	Show at which step are we.
		//
		console.info("  - Data merge");

		//
		//	1.	Once we have all the information we combine it together.
		//
		container.json_data = Object.assign(
			container.page_data,
			container.env_data
		);

		//
		//	->	Move to the next chain.
		//
		return resolve(container);

	});
}
