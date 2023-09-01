var symbolSize = 10;
var streams = [];

function setup() {
  let cnv= createCanvas(800, 600);
  background(17);

  cnv.parent('matrix-rain-container');
  frameRate(30);

  var x = 0;
  var y = round(random(0, -500));
  for (var i = 0; i <= width / symbolSize; i++){
    var stream = new Stream();
    stream.generateSymbols(x, random(-1000, 0));
    streams.push(stream);
    x += symbolSize;
  }
  textSize(symbolSize);

}

function draw() {
  background(0, 100);
  streams.forEach(function(stream) {
    stream.render();
  });
}

function draw() {
  background(0, 100);
  streams.forEach(function(stream) {
    stream.render();
  });
}

function Donut(x, y, speed) {
  this.x = x;
  this.y = y;
  var value;
  this.speed = speed;
  this.switchInterval = round(random(2, 20));
  
  this.setToRand = function() {
    
    if (frameCount % this.switchInterval == 0) {
      this.value = String.fromCharCode(
        0x30A0 + round(random(0, 96))
      );
    }
  }
  
  this.rain = function() {
    this.y = (this.y >= height) ? 0 : this.y += this.speed;
  }
  
}

function Stream() {
  this.symbols = [];
  this.totalSymbols = round(random(5, 50));
  this.speed = round(random(1, 4));
  
  this.generateSymbols = function(x, y) {
    
    for (var i = 0; i <= this.totalSymbols; i++) {
      var symbol = new Donut(x, y, this.speed);
      symbol.setToRand();
      this.symbols.push(symbol);
      y -= symbolSize;
      
    }
  }
  
  this.render = function() {
    this.symbols.forEach(function(symbol) {
      fill(0, 255, 70);
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRand();
      
    });
  }
}