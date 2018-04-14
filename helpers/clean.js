let rimraf = require('rimraf');

//
//	Before we do anything we clean the _output folder to make sure we don't
//	have unwanted files.
//
module.exports = function(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	->	Show at which step are we
		//
		console.log("Clean _output");

		//
		//	1.	Set the full path to the folder to be cleaned
		//
		let path_to_folder = container.settings.dir + '/_output';

		//
		//	2.	Remove all the files inside the folder
		//
		rimraf(path_to_folder, function(error, result) {

			//
			//	->	Move to the next chain
			//
			return resolve(container);

		});

	});
};





