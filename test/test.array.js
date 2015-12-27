/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Check whether an element is a finite number
	isFiniteNumber = require( 'validate.io-finite' ),

	// Module to be tested:
	pdf = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array pdf', function tests() {

	var validationData = require( './fixtures/array.json' ),
		r = validationData.r,
		p = validationData.p;

	it( 'should export a function', function test() {
		expect( pdf ).to.be.a( 'function' );
	});

	it( 'should evaluate the negative binomial pdf', function test() {
		var data, actual, expected, i;

		data = validationData.data;

		actual = new Array( data.length );

		actual = pdf( actual, data, r, p );

		expected = validationData.expected.map( function( d ) {
			return d === 'Inf' ? Infinity : d;
		});

		for ( i = 0; i < actual.length; i++ ) {
			if ( isFiniteNumber( actual[ i ] ) && isFiniteNumber( expected[ i ] ) ) {
				assert.closeTo( actual[ i ], expected[ i ], 1e-15 );
			}
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( pdf( [], [], r, p ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [ true, null, [], {} ];
		actual = new Array( data.length );
		actual = pdf( actual, data, r, p );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );
	});

});
