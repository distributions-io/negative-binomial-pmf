Probability Density Function
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> [Negative binomial](https://en.wikipedia.org/wiki/Negative_binomial_distribution) distribution probability density function (PDF).

The [probability mass function](https://en.wikipedia.org/wiki/Probability_mass_function) (PMF) for a [negative binomial](https://en.wikipedia.org/wiki/Negative_binomial_distribution) random variable is

<div class="equation" align="center" data-raw-text="f(x; r, p) = P(X = x; r,p) = \binom{k+r-1}{x} p^x(1-p)^r \quad\text{for }x = 0, 1, 2, \dotsc" data-equation="eq:pmf_function">
	<img src="https://cdn.rawgit.com/distributions-io/negative-binomial-pmf/16d1d85d5430e332e6e0ef13263f0a98e56e337a/docs/img/eqn.svg" alt="Probability mass function (PMF) for a negative binomial distribution.">
	<br>
</div>

where `r > 0` is the number of failures until experiment is stopped and `0 < p <= 1` is the success probability.

## Installation

``` bash
$ npm install distributions-negative-binomial-pmf
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var pmf = require( 'distributions-negative-binomial-pmf' );
```

#### pmf( x[, options] )

Evaluates the [probability mass function](https://en.wikipedia.org/wiki/Probability_mass_function) (PMF) for the [negative binomial](https://en.wikipedia.org/wiki/Negative_binomial_distribution) distribution. `x` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	mat,
	out,
	x,
	i;

out = pmf( 1 );
// returns 0.25

out = pmf( -1 );
// returns 0

out = pmf( 0.5 );
// returns 0

x = [ 0, 1, 2, 3, 4, 5 ];
out = pmf( x );
// returns [ 0.5, 0.25, ~0.125, ~0.062, ~0.031, ~0.016 ]

x = new Int8Array( x );
out = pmf( x );
// returns Float64Array( [0.5,0.25,~0.125,~0.062,~0.031,~0.016] )

x = new Float32Array( 6 );
for ( i = 0; i < 6; i++ ) {
	x[ i ] = i;
}
mat = matrix( x, [3,2], 'float32' );
/*
	[ 0 1
	  2 4
	  4 5 ]
*/

out = pmf( mat );
/*
	[  0.5    0.25
	  ~0.125 ~0.062
	  ~0.031 ~0.016 ]
*/

```

The function accepts the following `options`:

*	__r__: number of failures until experiment is stopped. Default: `1`.
*	__p__: success probability. Default: `0.5`.
* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

A [negative binomial](https://en.wikipedia.org/wiki/Negative_binomial_distribution) distribution is a function of two parameters: `r > 0`(number of failures until experiment is stopped) and `0 < p <= 1`(success probability). By default, `r` is equal to `1` and `p` is equal to `0.5`. To adjust either parameter, set the corresponding option.

``` javascript
var x = [ 0, 1, 2, 3, 4, 5 ];

var out = pmf( x, {
	'r': 3,
	'p': 0.9
});
// returns [ ~0.729, ~0.219, ~0.044, ~0.007, ~0.001, 0 ]

```

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	[0,0],
	[1,1],
	[2,2],
	[3,3],
	[4,4],
	[5,5]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = pmf( data, {
	'accessor': getValue
});
// returns [ 0.5, 0.25, ~0.125, ~0.062, ~0.031, ~0.016 ]

```


To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var data = [
	{'x':[0,0]},
	{'x':[1,1]},
	{'x':[2,2]},
	{'x':[3,3]},
	{'x':[4,4]},
	{'x':[5,5]}
];

var out = pmf( data, {
	'path': 'x/1',
	'sep': '/'
});
/*
	[
		{'x':[0,0.5]},
		{'x':[1,0.25]},
		{'x':[2,~0.125]},
		{'x':[3,~0.062]},
		{'x':[4,~0.031]},
		{'x':[5,~0.016]}
	]
*/

var bool = ( data === out );
// returns true
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var x, out;

x = new Int8Array( [0,1,2,3,4] );

out = pmf( x, {
	'dtype': 'float32'
});
// returns Float32Array( [0.5,0.25,~0.125,~0.063,~0.031] )

// Works for plain arrays, as well...
out = pmf( [0,1,2,3,4], {
	'dtype': 'float32'
});
// returns Float32Array( [0.5,0.25,~0.125,~0.063,~0.031] )

```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var bool,
	mat,
	out,
	x,
	i;

x = [ 0, 1, 2, 3, 4, 5 ];

out = pmf( x, {
	'copy': false
});
// returns [ 0.5, 0.25, ~0.125, ~0.062, ~0.031, ~0.016 ]

bool = ( x === out );
// returns true

x = new Float32Array( 6 );
for ( i = 0; i < 6; i++ ) {
	x[ i ] = i;
}
mat = matrix( x, [3,2], 'float32' );
/*
	[ 0 1
	  2 3
	  4 5 ]
*/

out = pmf( mat, {
	'copy': false
});
/*
	[ 0.5 0.25
	  ~0.125 ~0.063
	  ~0.031 ~0.016 ]
*/

bool = ( mat === out );
// returns true
```


## Notes

*	If an element is __not__ a numeric value, the evaluated [PMF](https://en.wikipedia.org/wiki/Negative_binomial_distribution) is `NaN`.

	``` javascript
	var data, out;

	out = pmf( null );
	// returns NaN

	out = pmf( true );
	// returns NaN

	out = pmf( {'a':'b'} );
	// returns NaN

	out = pmf( [ true, null, [] ] );
	// returns [ NaN, NaN, NaN ]

	function getValue( d, i ) {
		return d.x;
	}
	data = [
		{'x':true},
		{'x':[]},
		{'x':{}},
		{'x':null}
	];

	out = pmf( data, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]

	out = pmf( data, {
		'path': 'x'
	});
	/*
		[
			{'x':NaN},
			{'x':NaN},
			{'x':NaN,
			{'x':NaN}
		]
	*/
	```

*	Be careful when providing a data structure which contains non-numeric elements and specifying an `integer` output data type, as `NaN` values are cast to `0`.

	``` javascript
	var out = pmf( [ true, null, [] ], {
		'dtype': 'int8'
	});
	// returns Int8Array( [0,0,0] );
	```


## Examples

``` javascript
var pmf = require( 'distributions-negative-binomial-pmf' ),
	matrix = require( 'dstructs-matrix' );

var data,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}
out = pmf( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = pmf( data, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = pmf( data, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
data = new Float32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}
out = pmf( data );

// Matrices...
mat = matrix( data, [5,2], 'float32' );
out = pmf( mat );

// Matrices (custom output data type)...
out = pmf( mat, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/distributions-negative-binomial-pmf.svg
[npm-url]: https://npmjs.org/package/distributions-negative-binomial-pmf

[travis-image]: http://img.shields.io/travis/distributions-io/negative-binomial-pmf/master.svg
[travis-url]: https://travis-ci.org/distributions-io/negative-binomial-pmf

[codecov-image]: https://img.shields.io/codecov/c/github/distributions-io/negative-binomial-pmf/master.svg
[codecov-url]: https://codecov.io/github/distributions-io/negative-binomial-pmf?branch=master

[dependencies-image]: http://img.shields.io/david/distributions-io/negative-binomial-pmf.svg
[dependencies-url]: https://david-dm.org/distributions-io/negative-binomial-pmf

[dev-dependencies-image]: http://img.shields.io/david/dev/distributions-io/negative-binomial-pmf.svg
[dev-dependencies-url]: https://david-dm.org/dev/distributions-io/negative-binomial-pmf

[github-issues-image]: http://img.shields.io/github/issues/distributions-io/negative-binomial-pmf.svg
[github-issues-url]: https://github.com/distributions-io/negative-binomial-pmf/issues
