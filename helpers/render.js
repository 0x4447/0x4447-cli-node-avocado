let fs = require('fs');
let path = require('path');
let hogan = require("hogan.js");

//
//	Render all the file using Hogan, and convert the template files in to
//	the final form.
//
module.exports = function(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	->	Show at which step are we
		//
		console.log("Render");

		//
		//	->	Start the chain
		//
		read_files_path(container)
			.then(function(container) {

				return read_file_content(container);

			}).then(function(container) {

				return render(container);

			}).then(function(container) {

				return save_to_disk(container);

			}).then(function(container) {

				//
				//	->	Move to the previous chain
				//
				return resolve(container)

			}).catch(function(error) {

				return reject(error);

			});

	});
};

//
//	Read out all the file in the views folder
//
function read_files_path(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	x.	Get all the files from the View folder
		//
		let files = fs.readdirSync('./views');

		//
		//	x.	Make clear variable where to store all the files
		//
		let tmp = [];

		//
		//	x.	Loop over what we got back from the folder and remove what
		//		we don't need
		//
		files.forEach(function(file) {

			//
			//	1.	Skip stuff that we don't care about
			//
			if(file !== '.DS_Store')
			{
				tmp.push(file);
			}

		});

		//
		//	x.	Save the files for the next promise
		//
		container.read_files_path = {
			paths: tmp
		}

		//
		//	->	Move to the next chain
		//
		return resolve(container)

	});
};

//
//	Go over all the file that we found and actually read their content, so
//	we can use it later to render the final page.
//
function read_file_content(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	1.	Create a variable where the content of the files will be
		//		stored
		//
		let tmp = {};

		//
		//	2.	Loop over each file path we got back from the previous
		//		promise
		//
		container.read_files_path.paths.forEach(function(file_name) {

			//
			//	1.	Build out the full path to the file
			//
			let path = container.settings.pwd + '/views/' + file_name

			//
			//	2.	Treat the _frame file as a special case. Since this file
			//		is the frame used to build the final file, when we are
			//		going to render the final file using Hogan.
			//
			if(file_name === '_frame.html')
			{
				//
				//	1.	Read the file
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
			if(file_name != '_frame.html')
			{
				tmp[file_name] = fs.readFileSync(path);
			}

		});

		//
		//	3.	Save the content of the file for the next promise
		//
		container.file_body = tmp;

		//
		//	->	Move to the next chain
		//
		return resolve(container)

	});
};

//
//	Take all the files that we loaded render the final form with the:
//
//		- Context (data)
//		- Partials
//
function render(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	1.	Create temporary variable to store all the rendered page.
		//
		let tmp = {};

		//
		//	x.	FOR TESTING _ TO BE REMOVED
		//
		let context = {
			title: "sdsd"
		}

		//
		//	2.	Loop over every file with its content
		//
		for(let key in container.file_body)
		{
			//
			//	1.	Create a variable that holds the partials HTML file
			//		used in conjunction with the _frame.html file to
			//		create the final file.
			//
			let partial = {
				body: container.file_body[key].toString()
			}

			//
			//	2.	Render the final page with the data that needs to be
			//		replaced, and the partials
			//
			let final_file = container.page.render(context, partial);

			//
			//	3.	Convert the page in to a buffer, so it is easy to save it
			//		later to disk.
			//
			tmp[key] = Buffer.from(final_file);
		}

		//
		//	3.	Save the final pages for the next promise
		//
		container.final_files = tmp;


		//
		//	->	Move to the next chain
		//
		return resolve(container)

	});
};

//
//	Save the final pages that we rendered to the _input folder this way
//	the folder looks like a regular page folder. And then based on this
//	folder state we can make the final output that we want.
//
function save_to_disk(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	1.	Loop over the array with the final rendered files
		//
		for(let file_name in container.final_files)
		{
			//
			//	1.	Save the individual file in a clear variable
			//
			let file = container.final_files[file_name];

			//
			//	2.	Create the file full path
			//
			let path = container.settings.pwd + '/' + file_name

			//
			//	3.	Create a File Descriptor based on the path that we made
			//		so the system knows where and how this file should behave
			//
			let fd = fs.openSync(path, 'w')

			//
			//	4.	Write the page on disk
			//
			fs.writeSync(fd, file)
		}

		//
		//	->	Move to the next chain
		//
		return resolve(container)

	});
};
