'use strict';

// MODULES //

var partial = require( './partial.js' );


// PDF //

/**
* FUNCTION: pdf( out, arr, r, p )
*	Evaluates the probability density function (PDF) for a negative binomial distribution with number of failures until experiment is stopped `r` and success probability `p` for each array element.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @param {Number} r - number of failures until experiment is stopped
* @param {Number} p - success probability
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function pdf( y, x, r, p ) {
	var len = x.length,
		fcn,
		i;

	fcn = partial ( r, p );
	for ( i = 0; i < len; i++ ) {
		y[ i ] = fcn( x[ i ] );
	}
	return y;
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;
