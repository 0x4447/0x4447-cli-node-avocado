let exec = require("child_process").exec;
let chai = require("chai");

describe('For TravisCI', function() {

	it('Build test site to make sure this version works.', function(done) {

		//
		//	Execute index.js on the sample site, if it builds it means
		//	this version works.
		//

		exec('cd ./test/dummy_site && node ../../index.js -s . && rm -rf _output && rm -rf _preview',
		function(error, stdout, stderr) {

			//
			//	If error is not null it means the version has failed
			//
			if(error !== null)
			{
				console.log('exec error: ' + error);
			}

			//
			//	Force the test to fail on Travis
			//
			chai.assert.equal(null, error);

			//
			//	If the tests dont fail then done() will execute and pass
			//
			done();

		});

	});

});
