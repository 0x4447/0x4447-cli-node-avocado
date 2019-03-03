const exec = require("child_process").exec;
const npm = require("npm");
const process = require("process");
const chai = require("chai");

describe('For TravisCI', function() {

	it('Build test site to make Avocado works.', function(done) {

		exec('cd ./test/sample_site && node ../../index.js -s .', function(error, stdout, stderr) {
			if (error !== null) {
		        console.log('exec error: ' + error);
				process.exit(-1);
		    }
			chai.assert(null, error);

		    console.log('stdout: ' + stdout);
		    console.log('stderr: ' + stderr);
			done()
		});

	});

});
