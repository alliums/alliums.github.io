
let bubbles = [];

function setup() {
  let cnv= createCanvas(600, 600);
  background(17);

  cnv.parent('bubble-clicker-container');
  for (let i=0;i<100;i++) {
    let w = random(15, 30);
    let x = random(width-w, w + 4);
    let y = random(height-w, w + 4);
    let b = new Bubble(x, y, w);
    bubbles.push(b);
  }
}

function mousePressed() {
  for (let i=0;i<bubbles.length;i++) {
    bubbles[i].clicked(mouseX, mouseY);
    if (bubbles[i].popped == true) {
      bubbles[i] = new Bubble(0,0,0);
      bubbles[i].strokeColor = 'rgba(0,0,0,0)';
    }
  }
}

function draw() {
  background('#111111');
  for (let i=0;i<bubbles.length;i++) {
    bubbles[i].move();
    bubbles[i].show();
  }
}



class Bubble {
  constructor(x, y, w) {
  this.x = x;
  this.y = y;
  this.w = w;
  var popped = false;
  var colorVal;
  this.colorVal = 'rgb(0,0,0)';
  var strokeColor;
  this.strokeColor = 'rgb(255,255,255,0.5)';
  }
  
  clicked(pixelX, pixelY) {
    let distance = dist(pixelX, pixelY, this.x, this.y);
    if (distance < this.w) {
      //this.colorVal = 'rgba(198, 0, 198, 0.5)';
      this.popped=true;
    }

  }
  
  move() {
    this.x += random(-0.5, 0.5);
    this.y += random(-0.5, 0.5);
  }
  
  show() {
    stroke(this.strokeColor);
    strokeWeight(3.5);
    fill(this.colorVal);
    ellipse(this.x, this.y, this.w*2);
  }
  


}
