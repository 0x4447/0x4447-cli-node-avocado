let fs = require('fs');
let path = require('path');
let recursive = require('recursive-readdir');

//
//	Rename all the file that end with .html, this way when CloudFront delivers
//	the site, we don't have to write the file extension to get the page.
//	For example:
//
//		This:
//
//			https://example.com/contact.html
//
//		Becomes this:
//
//			https://example.com/contact
//
module.exports = function(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	->	Show at which step are we
		//
		console.log("Rename");

		//
		//	1.	Set the full path to the folder
		//
		let path_to_folder = container.settings.dir + '/_output';

		//
		//	2.	Get recursively the URI of each file
		//
		recursive(path_to_folder, function (error, files) {

			//
			//	1.	Go over each URI that we got and find out if we
			//		are dealing with a HTML page.
			//
			files.forEach(function(uri) {

				//
				//	1.	Get the extension of the file
				//
				let ext = path.extname(uri);

				//
				//	2.	Check if we are dealing with a HTML page
				//
				if(ext == '.html')
				{
					//
					//	1.	Get the full path minus the file name part
					//
					let dir = path.dirname(uri);

					//
					//	2.	Get just the file name, minus the extension
					//
					let file = path.basename(uri, ext);

					//
					//	3.	Create a full path to the file minus the extension
					//
					let new_file = dir + '/' + file;

					//
					//	4.	Rename the file without the extension on disk
					//
					fs.renameSync(uri, new_file)
				}

			})

			//
			//	->	Move to the next chain
			//
			return resolve(container)

		});
	});
};





