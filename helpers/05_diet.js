let fs = require('fs');
let path = require('path');
let recursiveReadDir = require('recursive-readdir');

//
//	Remove the HTML, Js, and Css comments from the _output folder.
//
module.exports = function(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	->	Show at which step are we.
		//
		console.info("Dieting");

		//
		//	->	Start the chain.
		//
		remove_html_comments(container)
			.then(function(container) {

				return remove_js_css_comments(container);

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
//	Remove HTML type comments from the _output folder.
//
function remove_html_comments(container)
{
	return new Promise(function(resolve, reject) {

			//
			//	-> Show at which step we're in.
			//
			console.info("  - Removing HTML Comments...");

			//
			//	1. Set the full path to the _output folder.
			//
			let path_to_folder = container.settings.dir + '/_output';

			//
			//	2. Read all the file inside the _output directory.
			//
			let files = fs.readdirSync(path_to_folder);

			//
			//	3.	Go over each URI that we got and find out if we
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
					//	3.	Remove the HTML Comments from the files
					//
					let no_comment_file = file.toString().replace(
						/(<!--[\s\S]*?-->).*$/gm,
						''
					);

					//
					//	4.	Create a File Descriptor based on the path that we
					//		made so the system knows where and how this file
					//		should behave.
					//
					let fd = fs.openSync(path_to_file, 'w');

					//
					//	5.	Overwrite the original file with the new one
					//		that we just created without comments.
					//
					fs.writeSync(
						fd,
						no_comment_file,
						0,
						no_comment_file.length
					);
				}

			});

			//
			// -> Move to the next chain
			//
			return(resolve(container));

		});
}

//
//	Remove JS and CSS type comments from the _output folder.
//
function remove_js_css_comments(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	->	Show at which step are we.
		//
		console.info("  - Removing Css And Js Comments...");

		//
		//	1.	Set the full path to the folder.
		//
		let path_to_folder = container.settings.dir + '/_output';

		//
		//	2.	Read all the files in a folder.
		//
		let files = fs.readdirSync(path_to_folder);

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
				//	3.	Remove js and css comments from files.
				//
				let no_comment_file = file.toString().replace(
					/(\/\*[\s\S]*?\*\/)|[^\S:]\/\/.*$/gm,
					''
				);

				//
				//	4.	Create a File Descriptor based on the path that we
				//		made so the system knows where and how this file
				//		should behave.
				//
				let fd = fs.openSync(path_to_file, 'w');

				//
				//	5.	Overwrite the original file with the new one
				//		that we just created without comments.
				//
				fs.writeSync(
					fd,
					no_comment_file,
					0,
					no_comment_file.length
				);

			}

		});

		//
		// -> Move to the next chain
		//
		return(resolve(container));

	});
}
