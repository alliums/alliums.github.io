let fruits = [];
var points = 0;


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
  if (millis() % 10 == 0 || millis() % 10 == 1 || millis() % 10 == 2) {
    let x = random(50,550);
    let s = random(30, 50);
    let f = new Fruit(x, s);
    fruits.push(f);
  }
}

function printScore() {
  
  textSize(32);
  fill('rgba(255,255,255,0.5)');
  strokeWeight(0);
  text(points, 30, 30);
}

function draw() {
  background(17);
  let P = new Player;
  P.show();
  spawnFruit();
  printScore();
  console.log(fruits.length)

  for (let i = 0;i < fruits.length; i++) {
    fruits[i].show();
    fruits[i].checkTouched(fruits[i].x, fruits[i].y, fruits[i].s/2);
    fruits[i].y += 4;

    if (fruits[i].touched == true) {
      points++;
      fruits[i].y = 650;
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
  
  die() {
    if (this.y > this.s + 600) {
      
    }
  }
}