'use strict';

// MODULES //

var isnan = require( 'validate.io-nan' ),
	isNonNegativeInteger = require( 'validate.io-nonnegative-integer' );


// FUNCTIONS //

var ibeta_derivative = require( './ibeta_derivative.js' );


// PDF //

/**
* FUNCTION: pdf( x, r, p )
*	Evaluates the probability density function (PDF) for a negative binomial distribution with number of failures until experiment is stopped `r` and success probability `p` at a value `x`.
*
* @param {Number} x - input value
* @param {Number} r - number of failures until experiment is stopped
* @param {Number} p - success probability
* @returns {Number} evaluated PDF
*/
function pdf( x, r, p ) {
	if ( isnan( x ) ) {
		return NaN;
	}
	if ( !isNonNegativeInteger( x ) ) {
		return 0;
	}
	return ( p / ( r + x ) ) * ibeta_derivative( p, r, x + 1 );
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;
