var randomLoc = Math.floor(Math.random() * 20);
var location1 = randomLoc;
var location2 = location1 + 1;
var location3 = location2 + 1;
var guess;
var hits = 0;
var guesses = 0;
var isSunk = false;

while (isSunk == false){
	guess = prompt("意大利炮准备开火!瞄准并攻击0～21号海域！");
	if (guess < 0 || guess > 21) {
		alert("请输入有效攻击位置!");
	} else {
		guesses = guesses + 1;
	
		if (guess == location1 || guess == location2 || guess == location3) {
			alert("HIT!");
			hits = hits + 1;
			if (hits == 3) {
				isSunk = true;
				alert("你他妈了个逼真的蛇皮棒棒厉害！你把一艘驱逐舰给击沉了！")
			}
		} else {
			alert("MISS ！ 卧槽你TMD瞎？！是不是？这都射不中！！！");
		}
	}
}
var starts = "你使用了" + guesses + "次击沉了" + "你的射击和集中概率是" + (3/guesses);
alert(starts);