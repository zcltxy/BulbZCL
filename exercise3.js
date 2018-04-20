var x = 153;
var w
var y
var z
w = (x - (x % 100)) / 100
y = ((x % 100) - (x % 150)) / 10
z = x % 10
document.write('<p>百位数' + w +'<br>')
document.write('十位数' + y +'<br>')
document.write('个位数' + z +'</p>')