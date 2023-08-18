let fruits = [];
var points = 0;
var speed = 4;
var sickoMode = false;
var won = false;
//var logVar = 0;

function setup() {
let cnv= createCanvas(600, 600);
  background(17);

  cnv.parent('fruit-catcher-container');
  frameRate(30);

  //let P = new Player();
  
  //for (let i = 0; i < 10; i++) {
//    let x = random(50,550);
//    let s = random(30, 50);
//    let f = new Fruit(x, s);
//    fruits.push(f);
//  }
  
}

function spawnFruit() {
  let x = random(50,550);
  let s = random(30, 50);
  let f = new Fruit(x, s);
  fruits.push(f);

}

//spawn
function intervalSpawnFruit() {
  if (sickoMode == false) {
    if (millis() % 10 == 0 || millis() % 10 == 1 || millis() % 10 == 2) {
      spawnFruit();
    }
  } else if (sickoMode == true) {
    if (millis() % 10 == 0 || millis() % 10 == 1 || millis() % 10 == 2 || millis() % 10 == 3 || millis() % 10 == 4) {
      spawnFruit();
    }
  }
  /*if (sickoMode == false) {
    spawnInterval = setInterval(spawnFruit, 1000);
  } else if (sickoMode == true) {
    clearInterval(spawnInterval);
    spawnInterval = setInterval(spawnFruit, 10);
  }*/
}

function printScore() {
  
  textSize(32);
  fill('rgba(255,255,255,0.5)');
  strokeWeight(0);
  text("points: " + points, 30, 30);
  //text("log: " + logVar, 30, 72);
}

function levelUp() {

  if (points > 50 && points < 100) {
    speed = 6;
  } else if (points >= 100 && points < 200) {
    speed = 8;
  } else if (points >= 200 && points < 300) {
    speed = 10;
  } else if (points >= 300 && points < 400) {
    speed = 14;
    sickoMode = true;
  } else if (points >= 400) {
    wonGame();
  }
  //for testing
  /*if (points > 5 && points < 10) {
    speed = 6;
  } else if (points >= 10 && points < 20) {
    speed = 8;
  } else if (points >= 20 && points < 30) {
    speed = 10;
  } else if (points >= 30 && points < 40) {
    speed = 14;
    sickoMode = true;
  } else if (points >= 40) {
    wonGame();
  }*/
}

function wonGame() {
  speed = 0;
  textSize(32);
  fill('rgba(255,255,255,0.8)');
  strokeWeight(0);
  text("You won!", 300, 300);
  won = true;
  playAgain();
}

function playAgain() {
  textSize(16);
  text("click anywhere to play again :)", 265, 350)
  if(mouseIsPressed == true) {
    points = 0;
    won = false;
    speed = 4;
    fruits = [];
  }
}


const onScreen = (f) => f.y <= 650;

function checkScreenEmpty() {
  if (!fruits.some(onScreen)) {
    spawnFruit();
    //logVar++;
  }
}


function draw() {
  background(17);
  let P = new Player;
  P.show();

  if (!won) {
    intervalSpawnFruit();
  }
  printScore();
  console.log(fruits.length)
  levelUp(); 
  checkScreenEmpty();


  for (let i = 0;i < fruits.length; i++) {
    fruits[i].show();
    fruits[i].checkTouched(fruits[i].x, fruits[i].y, fruits[i].s/2);
    fruits[i].y += speed;


    if (fruits[i].touched == true) {
      points++;
      fruits[i].y = 670;
      fruits[i].touched = false;
    }
    //else if (fruits[i].y >= 650) {
    //  fruits.pop();
    //}
  }

  
}




class Player {

  show() {
    stroke('rgba(255,255,255,0.5)');
    fill('rgba(198,0,198,0.8)');
    square(mouseX, 550, 30);
  }
  
}


class Fruit {
  constructor(x, s) {
    this.x = x;
    this.s = s;
    var y;
    this.y = 50;
    var colorVal;
    this.colorVal = 'rgba(198,0,198,0.8)'
    var strokeColor;
    this.strokeColor = 'rgba(255,255,255,0.5)';
    var touched;
    touched = false;
  }
  
  checkTouched(pixelX, pixelY, radius) {
    let distance1 = dist(pixelX, pixelY, mouseX, 550);
    let distance2 = dist(pixelX, pixelY, mouseX + 30, 550);
    let distance3 = dist(pixelX, pixelY, mouseX, 580);
    let distance4 = dist(pixelX, pixelY, mouseX + 30, 580);
    if (distance1 < radius || distance2 < radius || distance3 < radius || distance4 < radius) {
      this.touched = true;
    }
  }

  show() {
    stroke(this.strokeColor);
    strokeWeight(4);
    fill(this.colorVal);
    ellipse(this.x, this.y, this.s);
  }
  
  //die() {
  //  if (this.y > this.s + 600) {
  //    
  //  }
  //}
}