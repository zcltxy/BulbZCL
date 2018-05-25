var view = {
  displayMessage: function(msg) {
    var messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
  },
  displayHit: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },
  displayMiss: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
  }
}

// view.displayHit("A0");
// view.displayHit("D4");
// view.displayHit("E5");

// view.displayMiss("B2");
// view.displayMiss("C5");
// view.displayMiss("C6");

view.displayMessage("120FPS" + "<br>" + "处理器 : Inter(R) Core(TM)2 Duo CPU E7400 @ 2.80Ghz" + "<br>" + "内存 : 3016/8011MB" + "<br>" + "显存：38/2048MB");

var model = {
  boardSize: 7,
  numShips: 3,
  shipsSunk: 0,
  shipLength: 3,
  ships: [{locations: [0, 0, 0], hits: ["", "", ""]},
          {locations: [0, 0, 0], hits: ["", "", ""]},
          {locations: [0, 0, 0], hits: ["", "", ""]}],   //三艘战舰坐标
  
  
  fire: function(guess) {
    for (var i = 0; i < this.numShips; i++) {
      var ship = this.ships[i];    //依次查找到ships里的任意艘战舰的位置
      var index = ship.locations.indexOf(guess);
      if (ship.hits[index] === "hit") {
				view.displayMessage("Oops, you already hit that location!");
				return true;
			}
			 else if (index >= 0) {
				ship.hits[index] = "hit";
				view.displayHit(guess);
				view.displayMessage("击中敌舰了 兄弟!");

				if (this.isSunk(ship)) {
					view.displayMessage("你厉害了！击沉了一艘敌舰！");
					this.shipsSunk++;
				}
        return true;
      }
    }
    view.displayMiss(guess);
    view.displayMessage("你打偏了！")
    return false;
  },

  isSunk: function(ship) {
    for (var i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] !== "hit") {
        return false;
      }
    }
  return true;
  },

  generateShipLocations: function() {
		var locations;
		for (var i = 0; i < this.numShips; i++) {
			do {
				locations = this.generateShip();
			} while (this.collision(locations));
			this.ships[i].locations = locations;
    }
    console.log("外挂别看!");
    console.log(this.ships);
	},

  generateShip: function() {
    var direction = Math.floor(Math.random() * 2);
    var row, col;

    if (direction === 1) { 
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
		} else { 
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
			col = Math.floor(Math.random() * this.boardSize);
    }
    
    var newShipLocations = [];
    for (var i = 0; i < this.shipLength; i++) {
      if (direction === 1) {
        newShipLocations.push(row + "" + (col + i));
      } else {
        newShipLocations.push((row + i) + "" + col);
      }
    }
    return newShipLocations;
  },


  collision: function(locations) {
    for (var i = 0; i < this.numShips; i++) {
      var ship = model.ships[i];
      for (var j = 0; j < locations.length; j++) {
        if (ship.locations.indexOf(locations[j]) >= 0) {
          return true;
        }
      }
    }
    return false;
  }
};

var controller = {
  guesses: 0,                //回到控制器
  processGuess: function(guess) {
    var location = parseGuess(guess);
    if (location) {
      this.guesses++;
      var hit = model.fire(location);
      if (hit && model.shipsSunk === model.numShips) {
        view.displayMessage("牛逼！你击沉了所有敌舰！ 用了" + this.guesses + "颗炮弹。");
      }
    }
  }
};

function parseGuess(guess) {
  var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
  
  if (guess === null || guess.length !== 2) {
    alert("请射击有效海域！");
  } else {
    firstChar = guess.charAt(0);
    var row = alphabet.indexOf(firstChar);
    var column = guess.charAt(1);

    if (isNaN(row) || isNaN(column)) {
      alert("请输入一个有效值进行游戏");
    } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
      alert("请输入一个有效值进行游戏");
    } else {
      return row + column;
    }
  }
  return null;
}

function init() {
  var fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;
  var guessInput = document.getElementById("guessInput");
  guessInput.onkeypress = handleKeyPress;

  model.generateShipLocations();
}

function handleKeyPress(e) {
  var fireButton = document.getElementById("fireButton");
  if (e.keyCode === 13) {
    fireButton.click();
    return false;
  }
}

function handleFireButton() {
  var guessInput = document.getElementById("guessInput");
  var guess = guessInput.value.toUpperCase();
  
  controller.processGuess(guess);

  guessInput.value = "";
}

window.onload = init;