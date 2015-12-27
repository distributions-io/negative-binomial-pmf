options( digits = 16 )
library( jsonlite )


r = 18
p = 0.3
x = seq( -1, 1000, 0.5 )
y = dnbinom( x, r,p )

cat( y, sep = ",\n" )

data = list(
	r = r,
	p = p,
	data = x,
	expected = y
)

write( toJSON( data, digits = 16, auto_unbox = TRUE ), "./test/fixtures/typedarray.json" )
