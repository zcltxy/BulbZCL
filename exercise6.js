var num = 1000;
while ( num <= 10000){
    var n = num;
    var sum = 0;
    while (n > 0){
        sum = sum = Math.pow(n % 10,4);
        n = (n - n % 10)/10;
    }

    if (sum == num){
        document.write(num + '是水仙花数<br>');
    }
    num++;
}