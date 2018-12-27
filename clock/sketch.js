function setup() {
  createCanvas(windowWidth, windowHeight);
  //  noStrike();
  angleMode(DEGREES);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  rectMode(CENTER);
  noFill();
  translate(windowWidth / 2, windowHeight / 2)

  let hr = hour();
  if (hr < 10) {
    hr = "0" + hr.toString();
  }

  let mn = minute();
  if (mn < 10) {
    mn = "0" + mn.toString();
  }

  let sc = second();
  if (sc < 10) {
    sc = "0" + sc.toString();
  }

  let hrAngle = map(hr % 12, 0, 12, 0, 360);
  let mnAngle = map(mn, 0, 60, 0, 360);
  let scAngle = map(sc, 0, 60, 0, 360);

  //hour cirle
  push();
  stroke(sc * 10, mn * 4, sc * 4);
  strokeWeight(30);
  rotate(-90);
  arc(0, 0, 330, 330, 0, hrAngle);
  pop();

  //minute cirle
  push();
  stroke(sc * 8, mn * 4, hr * 10);
  rotate(-90);
  strokeWeight(22);
  arc(0, 0, 260, 260, 0, mnAngle);
  pop();

  //second cirle
  push();
  stroke(sc * 6, mn * 2, sc * 4);
  rotate(-90);
  strokeWeight(18);
  arc(0, 0, 200, 200, 0, scAngle);
  pop();


  //text
  fill(sc * 6, mn * 2, sc * 4);
  text(hr + ':' + mn + ':' + sc, -50, 12);
  textSize(25);

}
