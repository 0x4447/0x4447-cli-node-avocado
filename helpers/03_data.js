let fs = require('fs');
let path = require('path');
let recursive = require('recursive-readdir');

//
//	Load all the JSON data for each page, so it can then be used to render
//	the final pages
//
module.exports = function(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	->	Show at which step are we
		//
		console.log("Reading JSON data");

		//
		//	1.	Set the full path to the folder
		//
		let path_to_folder = container.settings.dir + '/_input/data';

		//
		//	2.	Read all the files in a folder
		//
		let files = fs.readdirSync(path_to_folder);

		//
		//	3.	Make a variable where to store the content of the files.
		//
		let tmp = {};

		//
		//	4.	Go over each URI that we got and find out if we
		//		are dealing with a HTML page.
		//
		files.forEach(function(file_name) {

			//
			//	1.	Remove the extension from the file name
			//
			let no_extension = file_name.split('.')[0];

			//
			//	2.	Load data as a JS Object
			//
			let json = require(path_to_folder + '/' + file_name);

			//
			//	3.	Save the data in to another object
			//
			tmp[no_extension] = json;

		});

		//
		//	5.	Save the data fro the next promise
		//
		container.json_data = tmp;

		//
		//	->	Move to the next chain
		//
		return resolve(container)

	});

};





