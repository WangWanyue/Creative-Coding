function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  colorMode(HSB)
}

function draw() {
  translate(mouseX, mouseY);

  var h = 215;
  var s = 90;
  var b = 100;

  if (mouseX < width / 2) {
    h = 271
    s = 90
    b = 100
  }

//do not draw in the very beginning
  if (mouseX != 0) {
    drawCircle(h, s, b);
  }
}

function drawCircle(h, s, b) {
  for (var i = 0; i < windowHeight; i += 5) {
    rotate(frameCount * 0.01);
    stroke(h, s, b);
    point(i, 0);
  }

}

function mousePressed() {
  background(0);
}
