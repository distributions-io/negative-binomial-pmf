options( digits = 16 )
library( jsonlite )


r = 20
p = 0.5
x = seq( -1, 1000, 0.5 )
y = dnbinom( x, r,p )

cat( y, sep = ",\n" )

data = list(
	r = r,
	p = p,
	data = x,
	expected = y
)

write( toJSON( data, digits = 16, auto_unbox = TRUE ), "./test/fixtures/deepset.json" )
