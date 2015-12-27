'use strict';

// MODULES //

var partial = require( './partial.js' );


// PDF //

/**
* FUNCTION: pdf( out, arr, r, p, accessor )
*	Evaluates the probability density function (PDF) for a negative binomial distribution with number of failures until experiment is stopped `r` and success probability `p` using an accessor function.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} arr - input array
* @param {Number} r - number of failures until experiment is stopped
* @param {Number} p - success probability
* @param {Function} accessor - accessor function for accessing array values
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function pdf( y, x, r, p, clbk ) {
	var len = x.length,
		fcn,
		v, i;

	fcn = partial( r, p );
	for ( i = 0; i < len; i++ ) {
		v = clbk( x[ i ], i );
		if ( typeof v === 'number' ) {
			y[ i ] = fcn( v );
		} else {
			y[ i ] = NaN;
		}
	}
	return y;
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;
