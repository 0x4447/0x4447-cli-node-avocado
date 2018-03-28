let start = require('./helpers/start');
let stop = require('./helpers/stop');

//
//	Create a variable that will be passed inside the chain
//
let container = {
	settings: {
		pwd: process.env.PWD
	}
}

//
//	->	Start the chain
//
start(container)
	.then(function(container) {

		return stop(container);

	}).catch(function(error) {

		console.log(error);

	});