let fs = require('fs');
let rimraf = require('rimraf');

//
//	Before we do anything we clean the _output folder to make sure we don't
//	have unwanted files.
//
module.exports = function(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	->	Show at which step are we.
		//
		console.info("Cleaning");

		//
		//	->	Start the chain.
		//
		remove_preview(container)
			.then(function(container) {

				return remove_output(container);

			}).then(function(container) {

				return create_preview(container);

			}).then(function(container) {

				return create_output(container);

			}).then(function(container) {

				return resolve(container);

			}).catch(function(error) {

				return reject(error);

			});

	});
};

//
//	Make sure the Preview folder is nice and clean.
//
function remove_preview(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	->	Show at which step are we.
		//
		console.info("\tClean _preview");

		//
		//	1.	Set the full path to the folder to be cleaned.
		//
		let path_to_folder = container.settings.dir + '/_preview';

		//
		//	2.	Remove all the files inside the folder.
		//
		rimraf(path_to_folder, function(error, result) {

			//
			//	->	Move to the next chain.
			//
			return resolve(container);

		});

	});
}

//
//	Make sure the Output folder is nice and clean.
//
function remove_output(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	->	Show at which step are we.
		//
		console.info("\tClean _output");

		//
		//	1.	Set the full path to the folder to be cleaned.
		//
		let path_to_folder = container.settings.dir + '/_output';

		//
		//	2.	Remove all the files inside the folder.
		//
		rimraf(path_to_folder, function(error, result) {

			//
			//	->	Move to the next chain.
			//
			return resolve(container);

		});

	});
}

//
//	Create the Preview folder.
//
function create_preview(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	->	Show at which step are we.
		//
		console.info("\tMkdri _preview");

		//
		//	1.	Set the full path to the folder to be cleaned.
		//
		let path_to_folder = container.settings.dir + '/_preview';

		//
		//	2.	Create the folder.
		//
		fs.mkdirSync(path_to_folder);

		//
		//	->	Move to the next chain.
		//
		return resolve(container);

	});
}

//
//	Create the Output folder.
//
function create_output(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	->	Show at which step are we.
		//
		console.info("\tMkdri _output");

		//
		//	1.	Set the full path to the folder to be cleaned.
		//
		let path_to_folder = container.settings.dir + '/_output';

		//
		//	2.	Create the folder.
		//
		fs.mkdirSync(path_to_folder);

		//
		//	->	Move to the next chain.
		//
		return resolve(container);

	});
}
