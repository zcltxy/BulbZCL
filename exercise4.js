var x = 15335;
var n ;
while ( x/10 >=1 ){
        n = x % 10;
        document.write ( n + ",");
        x = ( x - n )/10;
}
        document.write(x);
