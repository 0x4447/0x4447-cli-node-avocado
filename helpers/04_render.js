let fs = require('fs');
let read = require('fs-readdir-recursive');
let hogan = require("hogan.js");
let mkdirp = require('mkdirp');

//
//	Render all the files using Hogan, and convert the template files in to
//	their final form.
//
module.exports = function(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	->	Show at which step we are on.
		//
		console.info("Rendering");

		//
		//	->	Start the chain.
		//
		read_files_path(container)
			.then(function(container) {

				return read_file_content(container);

			}).then(function(container) {

				return render(container);

			}).then(function(container) {

				return save_to_disk(container);

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
//	Read out all the file in the views folder.
//
function read_files_path(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	1.	Set the full path to the folder.
		//
		let path = container.settings.dir + '/_input/views';

		//
		//	2.	Get all the files from the View folder.
		//
		let files = read(path);

		//
		//	3.	Make a clear variable where all the files will be stored
		//
		let tmp = [];

		//
		//	4.	Loop over what we got back from the folder and remove what
		//		we don't need.
		//
		files.forEach(function(file) {

			//
			//	1.	Skip stuff that we don't care about.
			//
			if(file !== '.DS_Store')
			{
				tmp.push(file);
			}

		});

		//
		//	x.	Save the files for the next promise.
		//
		container.read_files_path = {
			paths: tmp
		};

		//
		//	->	Move to the next chain.
		//
		return resolve(container);

	});
}

//
//	Go over all the files whos content was read, so
//	we can use it later to render the final page.
//
function read_file_content(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	1.	Create a variable where the content of the files will be
		//		stored.
		//
		let tmp = {};

		//
		//	2.	Loop over each file path we got back from the previous
		//		promise.
		//
		container.read_files_path.paths.forEach(function(file_name) {

			//
			//	1.	Build out the full path to the file.
			//
			let path = container.settings.dir + '/_input/views/' + file_name;

			//
			//	2.	Treat the _frame file as a special case. Since this file
			//		is the frame used to build the final file when using Hogan.
			//
			if(file_name === '_frame.html')
			{
				//
				//	1.	Read the file.
				//
				let file_frame = fs.readFileSync(path).toString();

				//
				//	2.	Compile it with Hogan, so it is ready to be used
				//		in a future promise.
				//
				container.page = hogan.compile(file_frame);
			}

			//
			//	3.	Everything else that is not the _frame should be read
			//		as is.
			//
			if(file_name !== '_frame.html')
			{
				//
				//	1.	Remove the extension from the file name.
				//
				let no_extension = file_name.split('.')[0];

				//
				//	2.	Read the content of the file.
				//
				tmp[no_extension] = fs.readFileSync(path);
			}

		});

		//
		//	3.	Save the content of the file for the next promise.
		//
		container.file_body = tmp;

		//
		//	->	Move to the next chain.
		//
		return resolve(container);

	});
}

//
//	Take all the files that we loaded and render the final form with the:
//
//		- Context (data)
//		- Partials
//
function render(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	1.	Create temporary variable to store all the rendered pages.
		//
		let tmp = {};

		//
		//	2.	Loop over every file and its contents.
		//
		for(let key in container.file_body)
		{
			//
			//	1.	Make sure we have a key available.
			//
			if(container.json_data[key])
			{
				//
				//	1.	Create a variable that holds the partials HTML file
				//		used in conjunction with the _frame.html file to
				//		create the final file.
				//
				let partial = {
					body: container.file_body[key].toString()
				};

				//
				//	2.	Always merge the data of the page that we are dealing
				//		with, with the env variable since you never know
				//		where they are on the page.
				//
				let data = Object.assign(
					container.json_data[key],
					container.json_data.env
				);

				//
				//	3.	Render the final page with the data that needs to be
				//		replaced, and the partials.
				//
				let final_file = container.page.render(data, partial);

				//
				//	4.	Convert the page into a buffer, so it is easy to save it
				//		later to disk.
				//
				tmp[key] = Buffer.from(final_file);
			}
		}

		//
		//	3.	Save the final pages for the next promise.
		//
		container.final_files = tmp;

		//
		//	->	Move to the next chain.
		//
		return resolve(container);

	});
}

//
//	Save the final pages that we rendered to the _input folder this way
//	the folder looks like a regular page folder. And then based on this
//	folder state we can make the final output that we want.
//
function save_to_disk(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	1.	Loop over the array of the final rendered files.
		//
		for(let file_name in container.final_files)
		{
			//
			//	1.	Save the individual file in a clear variable.
			//
			let file = container.final_files[file_name];

			//
			//	2.	Create the file full path.
			//
			let path = container.settings.dir + '/_preview/'
											  + file_name
											  + '.html';

			//
			//	3.	Since we support nested folders, we heave to remove the
			//		file name from the path, before we can create, all
			//		the nested folders.
			//
			mkdirp.sync(path.split('/').slice(0, -1).join('/'));

			//
			//	4.	Create a File Descriptor based on the path that we made
			//		so the system knows where and how this file should behave.
			//
			let fd = fs.openSync(path, 'w');

			//
			//	5.	Write the page on disk.
			//
			fs.writeSync(fd, file, 0, file.length);
		}

		//
		//	->	Move to the next chain.
		//
		return resolve(container);

	});
}
