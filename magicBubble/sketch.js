function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  //  noStrike();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(1, 20);
  noFill();
  strokeWeight(3);

  rX = mouseX % 100;
  gX = mouseX % 200;
  bX = mouseX % 255;

  rY = mouseY % 155;
  gY = mouseY % 180;
  bY = mouseY % 250;

  let angleX = map(mouseX, 0, windowWidth, 0, 360)
  let angleY = map(mouseY, 0, windowHeight, 0, 360)

  for (var x = -100; x < windowWidth; x = x + 85) {
    for (var y = -100; y < windowHeight; y = y + 85) {
      stroke(rX, gX, bX);
      arc(x, y, 75, 75, 0, angleX + x % 90 + y % 90);
      stroke(rY, gY, bY);
      arc(x, y, 55, 55, -90, angleY + x % 45 + y % 45);
    }
  }

  if (mouseIsPressed) {
    noStroke();
    fill(255);
    textSize(80);
    textStyle(BOLD);
    text("HELLO, WORLD", windowHeight, windowHeight / 2 - 25);
    textSize(25);
    textStyle(NORMAL);
    text("By Wanyue (Luna)", windowHeight, windowHeight / 2 + 80);
  }
}
