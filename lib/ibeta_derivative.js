'use strict';

// MODULES //

var ibeta_power_terms = require( 'compute-betainc/lib/ibeta_power_terms.js' ),
	beta = require( 'compute-beta' );


// INCOMPLETE BETA DERIVATIVE //


/**
* FUNCTION: ibeta_derivative( x, a, b )
*	Computes the partial derivative with respect to x of the incomplete beta function.
*
* @param {Number} x - input value
* @param {Number} a - first parameter
* @param {Number} b - second parameter
* @returns {Number} value of the partial derivative
*/
function ibeta_derivative( x, a, b ) {
	var f1,
		y;
	if ( a <= 0 ) {
		return NaN;
	}
	if ( b <= 0 ) {
		return NaN;
	}
	if ( x < 0 || x > 1 ) {
		return NaN;
	}
	if ( x === 0 ) {
		return ( a > 1 ) ? 0 : ( a === 1 ) ? 1 / beta( a, b ) : NaN;
	} else if ( x === 1 ) {
		return ( b > 1 ) ? 0 : ( b === 1 ) ? 1 / beta( a, b ) : NaN;
	}
	// Regular cases:
	f1 = ibeta_power_terms( a, b, x, 1 - x, null, true );
	y = ( 1 - x ) * x;
	f1 /= y;
	return f1;
} // end FUNCTION ibeta_derivative()


// EXPORTS //

module.exports = ibeta_derivative;
