options( digits = 16 )
library( jsonlite )


r = 3
p = 0.8
x = c( -5, -2.5, 0, 2.5, 5 )
y = dnbinom( x, r,p )

cat( y, sep = ",\n" )

data = list(
	r = r,
	p = p,
	data = x,
	expected = y
)

write( toJSON( data, digits = 16, auto_unbox = TRUE ), "./test/fixtures/number.json" )
