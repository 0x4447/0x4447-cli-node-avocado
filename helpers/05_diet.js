let fs = require('fs');
let path = require('path')
let recursiveReadDir = require('recursive-readdir')


module.exports = {

//
//   _____  _____ _____
//  / ____|/ ____/ ____|
// | |    | (___| (___
// | |     \___ \\___ \
// | |____ ____) |___) |
//  \_____|_____/_____/
//

  removeCssComments: function(container){
    return new Promise(function(resolve, reject){

      //
      // -> Show at which step we are
      //

      console.info("Removing all comments from .css files...");

      //
      // 1. Set full path to the folder
      //


      let path_to_folder = container.settings.dir + '/_output'

      //
      // 2. Read all of the files in the folders
      //

      recursiveReadDir(path_to_folder, function(err, files){

        //
        // 1. Go through every file in directory
        //

        files.forEach(function(file_name){
          //
          // 1. Search for .css extension name
          //

          let ext = path.extname(file_name);

          //
          // 2. Check that the ext is css
          //

          if(ext === '.css'){

            //
            // 1. Get File path and name
            //

            let file = fs.readFileSync(file_name);

            //
            // 2. Rewrite file and remove comments
            //

            let new_file = file.toString().replace(
              /(\/\*[\s\S]*?\*\/)|\/\/.*$/gm,
              ''
            );

            //
    				//	3.	Create a File Descriptor based on the path that we made
    				//		so the system knows where and how this file should
    				//		behave.
    				//

            let fd = fs.openSync(file_name, 'w');

            //
            // Write the file to disk
            //

            fs.writeSync(fd, new_file, 0, new_file.length);
          }
        });

        //
        // -> Move onto next promise
        //

        return resolve(container);

      });

    });
  },

  //
  //   _    _ _______ __  __ _
  // | |  | |__   __|  \/  | |
  // | |__| |  | |  | \  / | |
  // |  __  |  | |  | |\/| | |
  // | |  | |  | |  | |  | | |____
  // |_|  |_|  |_|  |_|  |_|______|
  //
  removeHtmlComments: function(container){
    return new Promise(function(resolve, reject){

      //
      // -> Show at which step we are
      //

      console.info("Removing all comments from .html files...");

      //
      // 1. Set full path to the folder
      //


      let path_to_folder = container.settings.dir + '/_output'

      //
      // 2. Read all of the files in the folders
      //

      recursiveReadDir(path_to_folder, function(err, files){

        //
        // 1. Go through every file in directory
        //

        files.forEach(function(file_name){
          //
          // 1. Search for .css extension name
          //

          let ext = path.extname(file_name);

          //
          // 2. Check that the ext is HTML
          //

          if(ext === '.html'){

            //
            // 1. Get File path and name
            //

            let file = fs.readFileSync(file_name);

            //
            // 2. Rewrite file and remove comments
            //

            let new_file = file.toString().replace(
              /(\<!--[\s\S]*?-->)|(\/\*[\s\S]*?\*\/)|[^\S:]\/\/.*$/gm,
              ''
            );

            //
    				//	3.	Create a File Descriptor based on the path that we made
    				//		so the system knows where and how this file should
    				//		behave.
    				//

            let fd = fs.openSync(file_name, 'w');

            //
            // Write the file to disk
            //

            fs.writeSync(fd, new_file, 0, new_file.length);
          }
        });

        //
        // -> Move onto next promise
        //

        return resolve(container);

      });

    });
  },

  //
  //            _  _____
  //          | |/ ____|
  //         | | (___
  //    _   | |\___ \
  //  | |__| |____) |
  //  \____/|_____/
  //

  removeJsComments: function(container){
    return new Promise(function(resolve, reject){

      //
      // -> Show at which step we are
      //

      console.info("Removing all comments from .js files...");

      //
      // 1. Set full path to the folder
      //


      let path_to_folder = container.settings.dir + '/_output'

      //
      // 2. Read all of the files in the folders
      //

      recursiveReadDir(path_to_folder, function(err, files){

        //
        // 1. Go through every file in directory
        //

        files.forEach(function(file_name){
          //
          // 1. Search for .css extension name
          //

          let ext = path.extname(file_name);

          //
          // 2. Check that the ext is JS
          //

          if(ext === '.js'){

            //
            // 1. Get File path and name
            //

            let file = fs.readFileSync(file_name);

            //
            // 2. Rewrite file and remove comments
            //

            let new_file = file.toString().replace(
              /(\/\*[\s\S]*?\*\/)|\/\/.*$/gm,
              ''
            );

            //
    				//	3.	Create a File Descriptor based on the path that we made
    				//		so the system knows where and how this file should
    				//		behave.
    				//

            let fd = fs.openSync(file_name, 'w');

            //
            // Write the file to disk
            //

            fs.writeSync(fd, new_file, 0, new_file.length);
          }
        });

        //
        // -> Move onto next promise
        //

        return resolve(container);

      });

    });
  }
}
