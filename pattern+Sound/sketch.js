var x = 0
var unit
var rot = 180
var sound
var amp

function setup() {
  createCanvas(600, 600);
  red = "#B12027"
  gold = "#C3A06B"
  brown = "#41302C"
  black = "#151112"
  rectMode(CENTER)
  angleMode(DEGREES)
  sound = loadSound("sound.mp3", loaded) //Felipe_Sarro_-_06_-_Bach_French_Suite_4_BWV_815_6_Air
  amp = new p5.Amplitude() // amplitude object
}

function loaded() {
  sound.play()
}


function draw() {
  noStroke()
  sound.rate(1.5)
	sound.loop=true
  unit = amp.getLevel() * 150

  //bottom right
  push()
  translate(450, 450)
  fill(black)
  rect(0, 0, 300, 300)
  fill(red)
  arc(-150, 0, 300 + unit, 300 + unit, 270, 90, PIE)
  fill(gold)
  ellipse(70 + unit, -90, 25, 25)
  ellipse(70 + unit, -30, 25, 25)
  ellipse(70 + unit, 30, 25, 25)
  ellipse(70 + unit, 90, 25, 25)
  pop()

  //top left
  push()
  translate(150, 150)
  fill(red)
  rect(0, 0, 300, 300, )
  fill(black)
  rect(0, 100, 150 + 2 * unit, 100)
  arc(0, 50, 150 + 2 * unit, 150 + 2 * unit, 180, 0, PIE)
  rect(-100, -150, 100, 150 + unit)
  fill(gold)
  rect(0, 100, 10, 100)
  rect()
  pop()

  //top right
  push()
  translate(450, 150)
  fill(gold)
  rect(0, 0, 300, 300)
  fill(red)
  ellipse(150, -150, 150 + unit, 150 + unit)
  fill(brown)
  rotate(2 * unit)
  rect(0, 0, 150, 150)
  pop()

  push()
  fill(brown)
  translate(350, 250)
  rotate(unit * 2)
  rect(0, 0, 30, 30)
  pop()


  //bottom left
  push()
  translate(150, 450)
  fill(brown)
  rect(0, 0, 300, 300)
  fill(gold)
  rect(-70 - unit, 0, 10, 300)
  rect(0, 0, 10, 300)
  rect(70 + unit, 0, 10, 300)
  ellipse(0, 0, 80 + unit)
  pop()


}
