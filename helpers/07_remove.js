let fs = require('fs');
let path = require('path');
let read = require('fs-readdir-recursive');

//
//	Remove the .html extension that appears in the page menu section.
//
module.exports = function(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	->	Show at which step we are on.
		//
		console.info("Removing .html from menu");

		//
		//	1.	Set the full path to the folder.
		//
		let path_to_folder = container.settings.dir + '/_output';

		//
		//	2.	Read all the files in a folder.
		//
		let files = read(path_to_folder);

		//
		//	1.	Go over each URI that we got and find out if we
		//		are dealing with a HTML page.
		//
		files.forEach(function(file_name) {

			//
			//	1.	Get the extension of the file.
			//
			let ext = path.extname(file_name);

			//
			//	2.	Check if we are dealing with a HTML page.
			//
			if(ext === '.html')
			{
				//
				//	1.	Make a variable that will hold the path to the
				//		file that we are working on.
				//
				let path_to_file = path_to_folder + '/' + file_name;

				//
				//	2.	Read the content of the file.
				//
				let file = fs.readFileSync(path_to_file);

				//
				//	3.	Remove the extension in the a href inside the files.
				//
				let new_file = file.toString().replace(/\s*([^\s]+?)\.html/gm, ' $1');

				//
				//	4.	Create a File Descriptor based on the path that we made
				//		so the system knows where and how this file should
				//		behave.
				//
				let fd = fs.openSync(path_to_file, 'w');

				//
				//	5.	Write the page on disk.
				//
				fs.writeSync(fd, new_file, 0, new_file.length);
			}

		});

		//
		//	->	Move to the next chain.
		//
		return resolve(container);

	});
};
