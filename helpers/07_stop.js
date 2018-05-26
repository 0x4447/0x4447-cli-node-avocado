module.exports = function(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	->	Show at which step are we
		//
		console.log("Stopping");

		//
		//	1.	Exit the CLI with a positive message
		//
		process.exit();

		//
		//	->	Move to the next chain
		//
		return resolve(container)

	});
};