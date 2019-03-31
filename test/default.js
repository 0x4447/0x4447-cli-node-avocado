let exec = require("child_process").exec;
let chai = require("chai");

describe('Build', function() {

	it('Use empty page.', function(done) {

		//
		//	Execute index.js on the sample site, if it builds it means
		//	this version works.
		//
		exec('cd ./test/dummy_site && node ../../index.js -s . && rm -rf _output && rm -rf _preview',
		function(error, stdout, stderr) {

			//
			//	1.	Check if we got an error from the CLI.
			//
			chai.assert.equal(null, error);

			//
			//	-> Tell chai that we are done with our test.
			//
			done();

		});

	});

});
