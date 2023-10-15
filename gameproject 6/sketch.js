/*
week 20
Final stage of the game project.It includes functions,extension like sound,platforms and enmies , flagpole , advancement in graphic like adding stars.  
*/
////start of variable////
//start of game character variable//
var gameChar_x;
var gameChar_y;
var gameChar_width;
var floorPos_y;
//end of game character variable//
//score variable//
var score = 0;
var game_score;
//end of score variable//
var x_pos;
//collectable variable//
var collectable;
//canyon variable//
var canyon;
//start of interaction variable//
var isLeft;
var isRight;
var isFalling;
var isPlummeting;
//end of interaction variable//
//start of tree variable//
var trees_x;
var treePos_y;
//end of tree variable//
//flagpole variable//
var flagpole;
//lives variable//
var lives;
//start of platform variable//
var platforms;
var onPlatform;
//end of platform variable//
//enmies variable//
var enmies;
////end of variable////

function setup() {
  //canvas code
  createCanvas(1024, 576);
  floorPos_y = (height * 3) / 4;
  //lives
  lives = 3;
  startGame();
}

function preload() {
  //pre load code for game character//
  character = loadImage("c.png");
  //start of music pre load//
  soundFormats("mp3");
  jumpSound = loadSound("assets/jumpgame.mp3");
  collectSound = loadSound("assets/collecting.mp3");
  fallsound = loadSound("assets/falling.mp3");
  winSound = loadSound("assets/wingame.mp3");
  //end of pre load for music//
}

function startGame() {
  //Starting variables for the character position//
  gameChar_x = width / 2;
  gameChar_y = floorPos_y;
  gameChar_width = 40;
  //game score
  game_score = 0;
  // Boolean variables to control the movement of the game character and their interaction with the canyon.//
  isLeft = false;
  isRight = false;
  isFalling = false;
  isPlummeting = false;
  isFound = false;
  onPlatform = false;
  // Variable to control the background scrolling.//
  cameraPosX = 0;
  //canyon array//
  canyons = [
    { x: 250, y: 432, width: 80, height: 144 },
    { x: 650, y: 432, width: 80, height: 144 },
    { x: 1000, y: 432, width: 80, height: 144 },
  ];
  //tree array//
  treePos_y = floorPos_y;
  trees_x = [150, 400, 550, 900, 1300, 1500];
  //collectable array//
  collectables = [
    { x: 600, y: 400, width: 20, isFound: false },
    { x: 250, y: 400, width: 20, isFound: false },
    { x: 100, y: 400, width: 20, isFound: false },
    { x: 450, y: 400, width: 20, isFound: false },
    { x: 800, y: 400, width: 20, isFound: false },
    { x: 950, y: 400, width: 20, isFound: false },
    { x: 1200, y: 400, width: 20, isFound: false },
    { x: 1250, y: 400, width: 20, isFound: false },
  ];
  //cloud array//
  clouds = {
    x: [100, 400, 800, 1000, 1500],
    y: [95, 90, 115, 100, 80],
    width: [100, 140, 80, 90, 120],
  };
  //mountain array//
  mountains = {
    x: [100, 550, 920, 1200, 1700],
    y: [220, 260, 190, 210, 240],
  };
  //flagpole array//
  flagpole = {
    x_pos: 990,
    pole_height: 400,
    flag_height: 50,
    flag_width: 100,
    isReached: false,
  };
  //patform factory pattern//
  platforms = [];
  platforms.push(createPlatforms(200, floorPos_y - 100, 100));
  platforms.push(createPlatforms(400, floorPos_y - 120, 100));
  platforms.push(createPlatforms(530, floorPos_y - 120, 100));
  platforms.push(createPlatforms(610, floorPos_y - 120, 100));
  //enmies constructor function//
  enmies = [];
  enmies.push(new enemy(200, floorPos_y - 10, 100));
  enmies.push(new enemy(300, floorPos_y - 10, 100));
  enmies.push(new enemy(400, floorPos_y - 10, 100));
  enmies.push(new enemy(500, floorPos_y - 10, 100));
  enmies.push(new enemy(550, floorPos_y - 10, 100));
  enmies.push(new enemy(600, floorPos_y - 10, 100));
  enmies.push(new enemy(650, floorPos_y - 10, 100));
  enmies.push(new enemy(700, floorPos_y - 10, 100));
  enmies.push(new enemy(750, floorPos_y - 10, 100));
  enmies.push(new enemy(800, floorPos_y - 10, 100));
}

function draw() {
  cameraPos_x = gameChar_x - width / 2;
  //sky colour//
  background(0, 0, 35, 25);
  //infinite ground//
  fill(70, 130, 180);
  rect(-1000, floorPos_y, width * 30, height / 4);
  push();
  translate(-cameraPosX, 0);
  //cloud render code//
  drawClouds();
  //mountain render code//
  drawMountains();
  //tree render code//
  drawTrees();
  //canyon array//
  for (var i = 0; i < canyons.length; i++) {
    // draw canyons//
    drawCanyon(canyons[i]);
    // check canyon//
    checkCanyon(canyons[i]);
  }
  //end of canyon//
  //collectable array//
  for (var i = 0; i < collectables.length; i++) {
    if (collectables[i].isFound == false) {
      drawCollectable(collectables[i]);
      checkCollectable(collectables[i]);
    }
  }
  //end of collectable array//
  //platforms array code//
  for (var i = 0; i < platforms.length; i++) {
    platforms[i].draw();
  }
  //end of platform array//

  ////start of game character code ////
  // jumping-left code//
  if (onPlatform && isLeft) {
    image(character, gameChar_x - 14, gameChar_y - 70);
    cameraPosX -= 1;
  } else if (onPlatform && isRight) {
    image(character, gameChar_x - 14, gameChar_y - 70);
    cameraPosX += 1;
  } else if (isLeft && isFalling) {
    image(character, gameChar_x - 14, gameChar_y - 70);
    cameraPosX -= 1;
  }
  //jumping-right code//
  else if (isRight && isFalling) {
    image(character, gameChar_x - 14, gameChar_y - 70);
    cameraPosX += 1;
  }
  //walking left code//
  else if (isLeft) {
    image(character, gameChar_x - 14, gameChar_y - 59);
    cameraPosX -= 1;
  }
  //walking right code//
  else if (isRight) {
    image(character, gameChar_x - 23, gameChar_y - 59);
    cameraPosX += 1;
  }
  //jumping facing forwards code//
  else if (isFalling || isPlummeting) {
    image(character, gameChar_x - 15, gameChar_y - 70);
  }
  //standing front facing code//
  else {
    image(character, gameChar_x - 17, gameChar_y - 59);
  }
  ////end of game character code////
  //game character interaction//
  if (isFalling) {
    print("");
    var isContact = false;
    for (var i = 0; i < platforms.length; i++) {
      isContact = platforms[i].checkContact(gameChar_x, gameChar_y);
      if (isContact) {
        print("in here");
        isContact = true;
        onPlatform = true;
        break;
      }
    }
    if (isContact == false) {
      gameChar_y += 1;
      isFalling = true;
      checkPlayerDie();
    }
  }
  if (gameChar_y < floorPos_y) {
    //gameChar_y+=1;
    isFalling = true;
    checkPlayerDie();
  } else {
    isFalling = false;
  }
  if (isLeft == true) {
    gameChar_x -= 5;
  } else if (isRight == true) {
    gameChar_x += 5;
  }
  //end of game character interaction//
  //flagpole rendering code
  drawFlagpole();
  checkFlagpole();
  //end of flagpole rendering code
  //start of  enmies construction factor//
  for (var i = 0; i < enmies.length; i++) {
    enmies[i].draw();

    var isContact = enmies[i].checkContact(gameChar_x, gameChar_y);
    if (isContact) {
      if (lives > 0) startGame();
      break;
    }
    //end of enmies construction factor//
    //star render code
    stars();
    pop();
    //game score render code
    drawGameScore();
    //start of life token render code
    drawLifeTokens();
    if (checkIsGameOver()) {
      drawGameOver();
      return;
    }
    //end of life token code
  }
}
//cloud functiom
function drawClouds() {
  //draw the cloud
  stroke(0);
  strokeWeight(5);
  for (var i = 0; i < clouds.x.length; i++) {
    fill(240, 255, 255);
    ellipse(clouds.x[i], clouds.y[i], clouds.width[i], clouds.width[i] / 2);
    ellipse(
      clouds.x[i] + 30,
      clouds.y[i] + 20,
      clouds.width[i],
      clouds.width[i] / 2
    );
    ellipse(
      clouds.x[i] - 30,
      clouds.y[i] + 20,
      clouds.width[i],
      clouds.width[i] / 2
    );
  }
}
//mountain function
function drawMountains() {
  //mountain
  for (var i = 0; i < mountains.x.length; i++) {
    strokeWeight(5);
    fill(211, 211, 211);
    triangle(
      mountains.x[i],
      mountains.y[i],
      mountains.x[i] - 100,
      mountains.y[i] + (floorPos_y - mountains.y[i]),
      mountains.x[i] + 100,
      mountains.y[i] + (floorPos_y - mountains.y[i])
    );
  }
}
//tree function
function drawTrees() {
  //tree
  for (var i = 0; i < trees_x.length; i++) {
    //tree trunk code
    strokeWeight(5);
    fill("brown");
    rect(trees_x[i], treePos_y - 100, 20, 100);
    //tree leaves
    strokeWeight(5);
    fill("green");
    ellipse(trees_x[i] + 10, treePos_y - 100, 70, 70);
    ellipse(trees_x[i] + 30, treePos_y - 140, 70, 70);
    ellipse(trees_x[i] - 40, treePos_y - 120, 70, 70);
  }
}
// start of collectable function
function drawCollectable(t_collectable) {
  if (t_collectable.isFound == false) {
    strokeWeight(5);
    fill(255);
    rect(t_collectable.x, t_collectable.y, 20, 25);
    fill(0);
  }
}
function checkCollectable(t_collectable) {
  if (
    gameChar_x < t_collectable.x + 20 &&
    gameChar_x > t_collectable.x - 1 &&
    gameChar_y == t_collectable.y + 32
  ) {
    t_collectable.isFound = true;
    game_score++;
    collectSound.play();
  }
}
//end of collectable function

// start of canyon function code//
function drawCanyon(t_canyon) {
  strokeWeight(5);
  fill(221, 160, 221);
  rect(t_canyon.x + 36, t_canyon.y, t_canyon.width, t_canyon.height);
}
function checkCanyon(t_canyon) {
  if (
    gameChar_x > t_canyon.x + 36 &&
    gameChar_x < t_canyon.x + 136 &&
    gameChar_y == t_canyon.y
  ) {
    isPlummeting = true;
  }
  if (isPlummeting) {
    gameChar_y = t_canyon.y + t_canyon.height;
    fallsound.play();
    console.log("before lives",lives);
    lives--;
    console.log("after lives",lives);
  }
}
// end of canyon function code//

//start of Flagpole code//
function drawFlagpole() {
  push();
  strokeWeight(5);
  stroke("purple");
  line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
  fill(255, 0, 255);
  if (flagpole.isReached) {
    noStroke();
    rect(flagpole.x_pos, floorPos_y - 250, 50, 50);
  } else {
    rect(flagpole.x_pos, floorPos_y - 50, 50, 50);
  }
  pop();
}

function checkFlagpole() {
  var d = abs(gameChar_x - flagpole.x_pos);
  {
    if (d < 15) {
      flagpole.isReached = true;
      winSound.play();
    }
  }
}
// end of flagpole code//

// function drawGameScore
function drawGameScore() {
  fill(139, 0, 0);
  textSize(30);
  text("Score:" + game_score, 10, 30);
}

// drawLifeTokens
function drawLifeTokens() {
  var heartSize = 20;
  var y = 20;
  for (var j = 0; j < lives; j++) {
    beginShape();
    strokeWeight(5);
    fill(255, 0, 0);
    var x = width - 20 - j * (heartSize + 10);
    vertex(x, y);
    bezierVertex(
      x - heartSize / 2,
      y - heartSize / 2,
      x - heartSize,
      y + heartSize / 3,
      x,
      y + heartSize
    );
    bezierVertex(
      x + heartSize,
      y + heartSize / 3,
      x + heartSize / 2,
      y - heartSize / 2,
      x,
      y
    );
    endShape(CLOSE);
  }
}

//function checkPlayerDie()
function checkPlayerDie() {
  //Player falls into canyon
  if (gameChar_y > height) {
    if (lives > 0) {
      startGame();
    }
  }
 
}

//function in checkIsGameOver()
function checkIsGameOver() {
  var gameOver = false;
  if (lives < 1 || flagpole.isReached) {
    gameOver = true;
  }
  return gameOver;
}
//function drawGameOver()
function drawGameOver() {
  fill(139, 0, 0);
  textSize(100);
  text("Game Over", 250, height / 2 - 100);
  if (lives > 0) {
    text("You Win!", 300, height / 2);
  } else {
    text("You Lose!", 300, height / 2);
  }
}
//platform code starts//
function createPlatforms(x, y, length) {
  var p = {
    x: x,
    y: y,
    length: length,
    draw: function () {
      fill(255, 192, 203);
      textSize(50);
      text("𓈜", this.x + 40, this.y - 30, this.length);
    },
    checkContact: function (gc_x, gc_y) {
      if (gc_x > this.x && gc_x < this.x + this.length) {
        var d = this.y - gc_y;
        if (d >= 0 && d <= 1) {
          print("detected");
          return true;
        }
      }
      return false;
    },
  };
  return p;
}
//end of platform code//

//enemy code starts//
function enemy(x, y, range) {
  this.x = x;
  this.y = y;
  this.range = range;
  this.currentX = 300;
  this.inc = 1;
  this.update = function () {
    this.currentX += this.inc;
    if (this.currentX >= this.x + this.range) {
      this.inc = -1;
    } else if (this.currentX < this.currentX) {
      this.inc -= 1;
    }
  };
  this.draw = function () {
    this.update();
    textSize(50);
    text("👻", this.currentX, this.y);
  };
  this.checkContact = function (gc_x, gc_y) {
    var d = dist(gc_x, gc_y, this.currentX, this.y);
    if (d < 40) {
      return true;
    }
    return false;
  };
}
//end of enemy code//
//star code starts//
function stars() {
  //blinking stars
  var galaxy = {
    locationX: random(width),
    locationY: random(400),
    size: random(1, 10),
  };
  strokeWeight(0);
  fill(255, 255, 255);
  ellipse(galaxy.locationX, galaxy.locationY, galaxy.size, galaxy.size);
}
//end of star code//
////key function code starts////
//function when key is pressed starts//
function keyPressed() {
  //walking left when key 37 is pressed
  if (keyCode == 37) {
    isLeft = true;
  }
  //walking right when key 39 is pressed
  if (keyCode == 39) {
  
    isRight = true;
  }
  //jumping when key 32 is pressed
  if (keyCode == 32 && gameChar_y >= floorPos_y) {
    gameChar_y -= 150;
    isFalling = true;
    jumpSound.play();
  }
}
//function when key is pressed ends//

//function when key is released starts//
function keyReleased() {
  //walking left when key 37 is released
  if (keyCode == 37) {
    isLeft = false;
  }

  //walking right when key 39 is released
  if (keyCode == 39) {
    isRight = false;
  }
}
//function when key is released ends//
////end of key function code////
