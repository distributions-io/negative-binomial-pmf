/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	beta = require( 'compute-beta' ),
	ibeta_derivative = require( './../lib/ibeta_derivative.js' ),
	isnan = require( 'validate.io-nan' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'ibeta_derivative', function tests() {

	it( 'should export a function', function test() {
		expect( ibeta_derivative ).to.be.a( 'function' );
	});

	it( 'should return NaN for x outside [0,1]', function test() {
		var values, i;
		values = [
			-1,
			-0.5,
			-100,
			11/10,
			1.2,
			5,
			100
		];
		for ( i = 0; i < values.length; i++ ) {
			assert.isTrue( isnan( ibeta_derivative( values[ i ], 2, 2 ) ) );
		}
	});

	it( 'should return NaN for a < 0 ', function test() {
		var x, b,
			i, j;
		x = [
			0.2,
			0.4,
			1/10,
			0.8,
			0.9
		];
		b = [
			0.2,
			0.4,
			1/10,
			0.8,
			0.9,
			2,
			5,
			9,
			12
		];
		for ( i = 0; i < x.length; i++ ) {
			for ( j = 0; j < b.length; j++ ) {
				assert.isTrue( isnan( ibeta_derivative( x[ i ], -0.2, b[ j ] ) ) );
			}
		}
	});

	it( 'should return NaN for b < 0 ', function test() {
		var x, a,
			i, j;
		x = [
			0.2,
			0.4,
			1/10,
			0.8,
			0.9
		];
		a = [
			0.2,
			0.4,
			1/10,
			0.8,
			0.9,
			2,
			5,
			9,
			12
		];
		for ( i = 0; i < x.length; i++ ) {
			for ( j = 0; j < a.length; j++ ) {
				assert.isTrue( isnan( ibeta_derivative( x[ i ], a[ j ], -0.2 ) ) );
			}
		}
	});

	it( 'should correctly compute the partial derivative when x = 0', function test() {
		assert.isTrue( isnan( ibeta_derivative( 0, 0.5, 2 ) ) );
		assert.strictEqual( ibeta_derivative( 0, 2, 0.5 ), 0 );
		assert.strictEqual( ibeta_derivative( 0, 1, 0.5 ), 1 / beta( 1, 0.5 ) );
	});

	it( 'should correctly compute the partial derivative when x = 1', function test() {
		assert.strictEqual( ibeta_derivative( 1, 1, 2 ), 0 );
		assert.strictEqual( ibeta_derivative( 1, 1, 1 ), 1 / beta( 1, 1 ) );
		assert.isTrue( isnan( ibeta_derivative( 1, 1, 0.5 ) ) );
	});

});
