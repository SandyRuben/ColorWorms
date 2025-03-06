//  Source: https://editor.p5js.org/marynotari/sketches/gmdK1KwgJ


let nodes= [];
let colorFlipped = false;
let numNodes = 100;
let mouseMode = 0;

function setup() {
  colorMode(HSB);
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < numNodes; i++) {
    nodes[i] = new Node();
  }
  background(0);
}

function draw() {
  
  for (let i = 0; i < numNodes; i++) {
    nodes[i].move();
    nodes[i].show();
  }
  
}

function keyPressed() {
  mouseMode += 1; //0:direct, 1:repel
  mouseMode %= 2; 
}

function mousePressed() {
  
  for (let i = 0; i < numNodes; i++) {
    nodes[i] = new Node();
  }
  
  if (colorFlipped) {
    colorFlipped = false;
    background(0);
    fill(255);
    return;
  }
  
  if (!colorFlipped) {
    colorFlipped = true;
    background(255);
    
    
    for (let i = 0; i < numNodes; i++) {
      nodes[i].randomColor();
  }
  }
}

class Node {
  constructor() {
    this.location = createVector(random(0, width), random(0, height));
    this.velocity = createVector(random(-2,2), random(-2,2));
    this.windMin = random(-2,-5);
    this.windMax = random(2,5);
    
    this.acc = createVector(random(-0.1, 0.1), random(-0.1, 0.1)); //set the acceleration of each particle
    this.fillColor = color(255);
  }
  
  collisionCheck() {
    if (this.location.x < 0) {
      this.location.x = width;
    }
    
    if (this.location.x > width) {
      this.location.x = 0;
    }
    
    if (this.location.y < 0) {
      this.location.y = height;
    }
    
    if (this.location.y > height) {
      this.location.y = 0;
    }
  }
  
  attracted(mousePos) {
    let force = p5.Vector.sub(mousePos, this.location); //the force on each particle moves in is the target position minus its current position (also its distance)
    let distSquared = force.magSq(); //the distance between current and target position squared (will be used to calculate gravity force enacted on particle)
    let grav = -1000; //set the gravity enacted on the particle (based on universal gravitational constant)
    let magnitude = grav / distSquared; //the magnitude of the force enacted on each particle
    force.setMag(magnitude);
    this.acc = force;
  }
  
  move() {
    if (mouseMode == 0) {
      let wind = new createVector(map(mouseX, 0, width, this.windMin, this.windMax), map(mouseY, 0, height, this.windMin, this.windMax));
    this.location.add(wind);
    }
    
    if (mouseMode == 1) {
      let mouseLoc = createVector(mouseX, mouseY);
      this.attracted(mouseLoc);
      this.velocity.add(this.acc);
    }
    
    this.location.add(this.velocity);
    this.collisionCheck();
    
    
    
    let randomMove = new createVector(random(0,2), random(0,2));
    this.location.add(randomMove);
  }
  
  
  show() {
    fill(this.fillColor);
    rect(this.location.x, this.location.y, 5);
  } 
  
  randomColor() {
    this.fillColor = color(random(255), random(255), random(255));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}