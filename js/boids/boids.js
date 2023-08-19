var n = 100;

var sCoef;
var aCoef;
var cCoef;
var radius;

var maxSpeed;
var maxForce;

let boids = [];

var boidShape;

//TODO: make boids array

function setup() {
  let cnv= createCanvas(1280, 720);
  background(17);

  cnv.parent('boid-container');
  frameRate(60);

  n = 200;
  sCoef = 0.25;
  aCoef = 0.3;
  cCoef = 0.2;
  radius = 100;

  maxSpeed = 4;
  maxForce = 0.1;

  for (let i = 0; i < n; i++) {
    var newBoid = new Boid(createVector(random(0, width), random(0, height)), p5.Vector.random2D());
    boids.push(newBoid);
  }

  /*var shapeSize = 3;
  beginShape();
  strokeWeight(1.5);
  noFill();
  stroke(198, 103, 198);
  vertex(shapeSize * 4, 0);
  vertex(-shapeSize, shapeSize * 2);
  vertex(0,0);
  vertex(-shapeSize, -shapeSize * 2);
  endShape();)*/

}

function draw() {
  background('#111111');
  
  boids.forEach ((b) =>{
    b.update();
    b.display();
  });
}

class Boid {


    constructor(pos, vel) {
        this.pos = pos;
        this.vel = vel;
        this.acc = createVector();

    }

    drawBoid(x, y, heading) {
        push();
        translate(x, y);
        rotate(heading);
        var shapeSize = 3;
        beginShape();
        strokeWeight(1.5);
        noFill();
        stroke(198, 103, 198);
        vertex(shapeSize * 4, 0);
        vertex(-shapeSize, shapeSize * 2);
        vertex(0,0);
        vertex(-shapeSize, -shapeSize * 2);
        vertex(shapeSize * 4, 0);
        endShape(close);

        pop();
    }

    display() {
        this.drawBoid(this.pos.x, this.pos.y, this.vel.heading());
        if (this.pos.x < 50) {
            this.drawBoid(this.pos.x + width, this.pos.y, this.vel.heading());
          }
          if (this.pos.x > 50) {
            this.drawBoid(this.pos.x - width, this.pos.y, this.vel.heading());
          }
          if (this.pos.y < 50) {
            this.drawBoid(this.pos.x, this.pos.y + height, this.vel.heading());
          }
          if (this.pos.y > height - 50) {
            this.drawBoid(this.pos.x, this.pos.y - height, this.vel.heading());
          }
    }

    separate() {
        var target = createVector();
        var total = 0;
        for (let i = 0; i< boids.length; i++) {
            var d = dist(this.pos.x, this.pos.y, boids[i].pos.x, boids[i].pos.y);
            if (boids[i] != this && d < radius) {
                var diff = p5.Vector.sub(this.pos, boids[i].pos);
                diff.div(d*d);
                target.add(diff);
                total++;
            }
        }
        if (total == 0) return;

        target.div(total);
        target.setMag(maxSpeed);
        var force = p5.Vector.sub(target, this.vel);
        force.limit(maxForce);
        force.mult(sCoef);
        this.acc.add(force);
    }

    cohere() {
        var center = createVector();
        var total = 0;
        for (let i=0; i < boids.length; i++) {
            var d = dist(this.pos.x, this.pos.y, boids[i].pos.x, boids[i].pos.y);
            if (boids[i] != this && d < radius) {
                center.add(boids[i].pos);
                total++;
            }
        }
        if (total == 0) return;

        center.div(total);
        var target = p5.Vector.sub(center, this.pos);
        target.setMag(maxSpeed);
        var force = p5.Vector.sub(target, this.vel);
        force.limit(maxForce);
        force.mult(cCoef);
        this.acc.add(force);
    }

    align() {
        var target = createVector();
        var total = 0;
        for (let i = 0; i < boids.length; i++) {
            var d = dist(this.pos.x, this.pos.y, boids[i].pos.x, boids[i].pos.y);
            if (boids[i] != this && d < radius) {
                target.add(boids[i].vel);
                total++
            }
        }
        if (total == 0) return;

        target.div(total);
        target.setMag(maxSpeed);
        var force = p5.Vector.sub(target, this.vel);
        force.limit(maxForce);
        force.mult(aCoef);
        this.acc.add(force);
    }

    wrap() {
        if (this.pos.x < 0) {this.pos.x = width;}
        else if (this.pos.x >= width) {this.pos.x = 0;}
        if (this.pos.y < 0) {this.pos.y = height;}
        else if (this.pos.y >= height) {this.pos.y = 0;}
    }

    update() {
        var acc = createVector();
        this.wrap();
        this.separate();
        this.cohere();
        this.align();
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(maxSpeed);
    }


}   
