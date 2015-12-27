'use strict';

// MODULES //

var isnan = require( 'validate.io-nan' ),
	isNonNegativeInteger = require( 'validate.io-nonnegative-integer' );


// FUNCTIONS //

var ibeta_derivative = require( './ibeta_derivative.js' );


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
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( !isNonNegativeInteger( x ) ) {
			return 0;
		}
		return ( p / ( r + x ) ) * ibeta_derivative( p, r, x + 1 );
	};
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
