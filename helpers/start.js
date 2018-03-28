module.exports = function(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	->	Show at which step are we
		//
		console.log("Start");

		console.log(container);

		//
		//	->	Move to the next chain
		//
		return resolve(container)

	});
};