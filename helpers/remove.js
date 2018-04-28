let fs = require('fs');
let path = require('path');
let recursive = require('recursive-readdir');

//
//	Remove the .html extension that appears in the page menu section
//
module.exports = function(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	->	Show at which step are we
		//
		console.log("Remove .html extension inside file");

		//
		//	1.	Set the full path to the folder
		//
		let path_to_folder = container.settings.dir + '/_output';

		//
		//	2.	Read all the files in a folder
		//
		let files = fs.readdirSync(path_to_folder);

		//
		//	1.	Go over each URI that we got and find out if we
		//		are dealing with a HTML page.
		//
		files.forEach(function(file_name) {

			//
			//	1.	Get the extension of the file
			//
			let ext = path.extname(file_name);

			//
			//	2.	Check if we are dealing with a HTML page
			//
			if(ext == '.html')
			{
				//
				//	1.	Make a variable that will hold the path to the
				//		file that we are working on
				//
				let path_to_file = path_to_folder + '/' + file_name;

				//
				//	2.	Read the content of the file
				//
				let file = fs.readFileSync(path_to_file);

				console.log("From disk: ", new_file.toString());

				//
				//	3.	Remove the extension in the a href in the menu of the
				//		page
				//
				new_file = file.toString().replace(/\.html/g, '');

				console.log("After cleanup: ",new_file);

				//
				//	4.	Create a File Descriptor based on the path that we made
				//		so the system knows where and how this file should
				//		behave
				//
				let fd = fs.openSync(path_to_file, 'w');

				//
				//	5.	Write the page on disk
				//
				fs.writeSync(fd, new_file);
			}

		})

		//
		//	->	Move to the next chain
		//
		return resolve(container)

	});

};





