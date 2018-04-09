let start = require('./helpers/start');
let rename = require('./helpers/rename');
let copy = require('./helpers/copy');
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

		return rename(container);

	}).then(function(container) {

		return copy(container);

	}).then(function(container) {

		return stop(container);

	}).catch(function(error) {

		console.log(error);

	});