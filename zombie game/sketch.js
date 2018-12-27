var brainImg
var zombieImg
var bombImg
var brains = []
var bombs = []
var zombie
var isDead = false
var score = 0
var lifeTime = 10 //countDown
var interval = 80 //control frequency of brains and bombs

function preload() {
  brainImg = loadImage("assets/brain.png")
  zombieImg = loadImage("assets/zombie.png")
  bombImg = loadImage("assets/bomb.png")
}

function setup() {

  createCanvas(500, 700)
  rectMode(CENTER)
  textAlign(CENTER)
  zombie = new zombie()

}

function draw() {

  background("#39414D")

  if (interval > 30) interval -= 0.5

  // create brains along with time
  createBrain(interval)
  createBrain(interval + 10)

  // var deleteId=null
  // for (var i = 0; i < brains.length; i++) {
  //   brains[i].update()
  //   brains[i].render()
  //   if (isCollide(brains[i], zombie)) {
  //     deleteId=i
  //     if (lifeTime < 15) lifeTime += 0.2
  //   }
  // }
  //
  // if (deleteId!==null){
  //   brains.splice(deleteId, 1) //catched brain will disappear
  // }

  brains.forEach(function(brain) {
    brain.update()
    brain.render()
    if (lifeTime < 15 && isCollide(brain, zombie)) lifeTime += 0.2
  })

  brains = brains.filter(function(brain) {
    return !(brain.y > height) && !isCollide(brain, zombie)
  })

  // create bombs
  createBomb(70)
  if (frameCount > 1000) createBomb(interval)
  if (frameCount > 1500) createBomb(interval + 10)

  bombs = bombs.filter(function(bomb) {
    return bomb.y < height
  })

  //Array.prototype.every is almost identical to some except it’s expecting false to break the loop.
  bombs.every(function(bomb) {
    bomb.update()
    bomb.render()
    isDead = isCollide(bomb, zombie)
    print(isDead)
    if (isDead == true) {
      gameOver(isDead)
    }
    return isDead === false

  })



  // for (var j = 0; j < bombs.length; j++) {
  //   bombs[j].render()
  //   bombs[j].update()
  //   isDead = isCollide(bombs[j], zombie)
  //   //  print(isDead)
  //   if (isDead == true) {
  //     gameOver(isDead)
  //     break
  //   }
  // }

  //render zombie
  zombie.render()
  zombie.move()
  countDown(lifeTime)
  if (frameCount % 20 == 0) score++ //

  if (lifeTime <= 0) {
    isDead = true
    gameOver(isDead)
  }

  lifeTime -= 0.01

}



function zombie() {
  this.x = (width - zombieImg.width) / 2
  this.y = height - 120
  this.width = zombieImg.width
  this.height = zombieImg.height
  this.render = function() {
    image(zombieImg, this.x, this.y, 65, 69)
  }
  this.move = function() {
    this.x = mouseX
    if (mouseX > width - 65) this.x = width - 65
    image(zombieImg, this.x, this.y, 65, 69)
  }
}


function brain(x, y) {
  this.size = random(0.7, 1)
  this.x = x
  this.y = y
  this.image = brainImg
  this.width = brainImg.width * this.size
  this.height = brainImg.height * this.size


  this.render = function() {
    push()
    translate(this.x, this.y)
    image(brainImg, 0, 0, this.width, this.height)
    pop()
  }

  this.update = function() {
    this.speed = 2 + 3 * (frameCount / 1200)
    this.y += this.speed
  }
}

function bomb(x, y) {
  this.size = random(0.7, 1)
  this.x = x
  this.y = y
  this.height = bombImg.height * this.size
  this.width = bombImg.width * this.size

  this.render = function() {
    push()
    translate(this.x, this.y)
    image(bombImg, 0, 0, this.width, this.height)
    pop()
  }

  this.update = function() {
    this.speed = 2 + 3 * (frameCount / 1200)
    this.y += this.speed
    // if (this.y > height) {
    //   bombs.shift()
    // }
  }
}


//create bomb, longer the game last, more bomb
function createBomb(interval) {
  while (frameCount % interval == 0) {
    var newBomb = new bomb(random(width - 50), 10)
    bombs.push(newBomb)
    break
  }
}

function createBrain(interval) {
  while (frameCount % interval == 0) {
    var newBrain = new brain(random(width - 50), 10)
    brains.push(newBrain)
    break
  }
}

//learn the code from stackoverflow
//https://stackoverflow.com/questions/2440377/javascript-collision-detection
function isCollide(element, zombie) { //true - collide, false - not collide
  return !((element.y + element.height - 15) < zombie.y ||
    (element.y + 15) > (zombie.y + zombie.height) ||
    (element.x + element.width - 10) < zombie.x ||
    (element.x + 10) > (zombie.x + zombie.width)
  )
}


function countDown(lifeTime) {
  var length = map(lifeTime, 0, 10, 0, width)
  noStroke()
  push()
  fill("#252B35")
  rect(width / 2, height - 10, 500, 24)
  pop()
  push()
  fill("#578A60")
  if (lifeTime < 5) fill("#922E3A") //alert
  rect(width / 2, height - 10, length, 24)
  pop()
  fill("#252B35")
  text(score, width / 2, height - 5)
  textSize(13)
}

//new game
function mouseClicked() {
  if (isDead == true) {
    document.location.reload()
    // reload the page.
    //because I use framecount to calculate inveral and speed,
    //so recall draw() doesn't work well
  }
}


function gameOver(isDead) {
  if (isDead) {
    push()
    stroke("#578A60")
    strokeWeight(6)
    fill("#252B35")
    rect(width / 2, height / 2, 250, 150, 10)
    pop()
    push()
    textSize(28)
    fill("#578A60")
    noStroke()
    text("GAME OVER", width / 2, height / 2 - 8)
    textSize(16)
    text("SCORE: " + score, width / 2, height / 2 + 22)
    pop()
    noLoop()
  }
}
