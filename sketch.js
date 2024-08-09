let player;
let obstacles = [];
let score = 0;

function setup() {
  createCanvas(800, 600);
  player = new Player();
}

function draw() {
  background(220);
  
  player.update();
  player.show();
  
  if (frameCount % 60 === 0) {
    obstacles.push(new Obstacle());
  }
  
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update();
    obstacles[i].show();
    
    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
      score++;
    }
    
    if (obstacles[i].hits(player)) {
      noLoop();
      fill(0);
      textSize(32);
      textAlign(CENTER, CENTER);
      text(`Game Over\nScore: ${score}`, width / 2, height / 2);
    }
  }
  
  fill(0);
  textSize(16);
  text(`Score: ${score}`, 10, 20);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    player.setDirection(-1);
  } else if (keyCode === RIGHT_ARROW) {
    player.setDirection(1);
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    player.setDirection(0);
  }
}

class Player {
  constructor() {
    this.width = 50;
    this.height = 20;
    this.x = width / 2 - this.width / 2;
    this.y = height - this.height - 10;
    this.xdir = 0;
  }

  setDirection(dir) {
    this.xdir = dir;
  }

  update() {
    this.x += this.xdir * 5;
    this.x = constrain(this.x, 0, width - this.width);
  }

  show() {
    fill(0);
    rect(this.x, this.y, this.width, this.height);
  }
}

class Obstacle {
  constructor() {
    this.width = random(20, 70);
    this.height = 20;
    this.x = random(width - this.width);
    this.y = -this.height;
    this.speed = 5;
  }

  update() {
    this.y += this.speed;
  }

  show() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.width, this.height);
  }

  offscreen() {
    return this.y > height;
  }

  hits(player) {
    return !(this.x > player.x + player.width ||
             this.x + this.width < player.x ||
             this.y > player.y + player.height ||
             this.y + this.height < player.y);
  }
}
