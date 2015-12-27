'use strict';

// FUNCTIONS //


// PARTIAL //

/**
* FUNCTION: partial( r, p )
*	Partially applies number of failures until experiment is stopped `r` and success probability `p` and returns a function for evaluating the probability density function (PDF) for a negative binomial distribution.
*
* @param {Number} r - number of failures until experiment is stopped
* @param {Number} p - success probability
* @returns {Function} PDF
*/
function partial( r, p ) {

	/**
	* FUNCTION: pdf( x )
	*	Evaluates the probability density function (PDF) for a negative binomial distribution.
	*
	* @private
	* @param {Number} x - input value
	* @returns {Number} evaluated PDF
	*/
	return function pdf( x ) {

	};
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
