let fs = require('fs');
let path = require('path')
let recursive = require('recursive-readdir')

//
// Remove JS and HTML Comments from _input
//

module.exports = function(container){
  return new Promise(function(resolve, reject){
    //
    // -> Show at which step we are
    //

    console.info("Removing all comment...");

    //
    // 1. Set full path to the folder
    //

    let path_to_folder = container.settings.dir + '/_output';

    //
    // 2. Read all of the files in the folders
    //

    let files = fs.readdirSync(path_to_folder);

    //
    // 1. Check ever file and see if its an HTML file
    //

    files.forEach(function(file_name){

      //
      // 2. Get file extension file_name
      //

      let ext = path.extname(file_name);

      //
      // Check that the file is html
      //

      if(ext === '.html'){

        //
				//	1.	Make a variable that will hold the path to the
				//		file that we are working on.
				//

				let path_to_file = path_to_folder + '/' + file_name;

        //
        // 2. Read file content
        //

        let file = fs.readFileSync(path_to_file)

        //
        // 3. Remove all the html and js comments
        //

        let new_file = file.toString().replace(
          /(\<!--[\s\S]*?-->)|(\/\*[\s\S]*?\*\/)|[^\S:]\/\/.*$/gm,
          ''
        );

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
    // -> Move onto next promise
    //

    return resolve(container)
  });
}
