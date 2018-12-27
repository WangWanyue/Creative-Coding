// Declare a variable to hold the SerialPort object
var serial;
var latestData = 200; // you'll use this to write incoming data to the canvas
var count = 30
var curveStart
var pulse1 = []
var pulse2 = []
var angle = 0
var color2 = "#E4A600"
var color1 = "#666666"
var myFont
var downloadHide = true

function preload() {
  myFont = loadFont('SF-Pro-Text-Bold.otf')
}

function setup() {
  createCanvas(1110, 680, WEBGL);

  textFont(myFont)

  for (var i = 0; i < count * count; i++) {
    pulse1[i] = 200
    pulse2[i] = 250
  }

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  // get this from the Arduino IDE or p5.serialControl application
  serial.open("/dev/cu.usbmodem1411");

  // Here are callbacks to use
  // *******************************************************

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we some data from the serial port
  serial.onData(gotData);

  // If we get an error
  serial.onError(gotError);

  // When our serial port is opened and ready for read/write
  serial.onOpen(gotOpen);

}

// We are connected and ready to go
function serverConnected() {
  console.log("Connected to Server");
}

// Connected to our serial device
function gotOpen() {
  console.log("Serial Port is Open");
}

// Uh oh, here is an error, let's log it
function gotError(theerror) {
  console.log(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine(); // read the incoming string
  trim(currentString); // remove any trailing whitespace
  if (!currentString) return; // if the string is empty, do no more
  //  console.log(currentString); // println the string
  latestData = Number(currentString); // save it for the draw method

  if (20000 > latestData && latestData > 10000) {
    latestData = map((latestData - 10000), 0, 1000, 50, 320)
    pulse1.shift()
    pulse1.push(latestData)
  }

  if (30000 > latestData && latestData > 20000) {
    latestData = map((latestData - 20000), 0, 1000, 50, 320)
    pulse2.shift()
    pulse2.push(latestData)
  }
}

// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() retunrs all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a string until a specific string is encountered
// serial.readLine() calls readStringUntil with "\r\n" typical linebreak carriage return combination
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer
// serial.write(somevar) writes out the value of somevar to the serial device


function draw() {
  noStroke()
  background("#E5E3E1")
  translate(-120, 0, 0)

  curveStart = count * count - 240

  //draw curve - pulse2
  for (var i = curveStart; i < count * count; i++) {
    push()
    var pos = map(pulse2[i], 0, 1000, 0, 420)
    var posPrev = map(pulse2[i - 1], 0, 1000, 0, 420)
    stroke(color2)
    strokeWeight(2)
    line(i - curveStart + 430, -pos - 130, 0, (i - 1) - curveStart + 430, -posPrev - 130, 0)
    pop()
  }

  //draw curve - pulse1
  for (var i = curveStart; i < count * count; i++) {
    push()
    var pos = map(pulse1[i], 0, 1000, 0, 400)
    var posPrev = map(pulse1[i - 1], 0, 1000, 0, 400)
    stroke(color1)
    strokeWeight(2)
    line(i - curveStart + 430, -pos + 100, 0, (i - 1) - curveStart + 430, -posPrev + 100, 0)
    pop()

  }

  // draw right frame
  push()
  fill("#EEECEB")
  noStroke()
  rect(400, -340, 290, 680)
  pop()

  //text
  push()
  textSize(65)
  fill(color2)
  text(year(), 430, 250)
  textSize(24)

  var mon = month()
  var da = day()
  var hr = hour()
  var min = minute()
  var sec = second()

  if (da < 10) da = "0" + da
  if (hr < 10) hr = "0" + hr
  if (min < 10) min = "0" + min
  if (sec < 10) sec = "0" + sec

  text(monthNumToName(mon) + " " + da + " " + " " + hr + ":" + min + ":" + sec, 430, 300)
  text("\u2665" + " Pulse A1", 430, -280)
  fill(color1)
  text("\u2665" + " Pulse A0", 430, -50)
  pop()

  //draw spheres
  push()
  rotateX(angle)
  rotateY(angle)
  rotateZ(angle)

  var r1 = pulse1.slice(-1)[0] / 3
  var r2 = pulse2.slice(-1)[0] / 2

  sphereDraw(pulse1, 1, count, color1)
  sphereDraw(pulse2, 1.5, count, color2)

  pop()

  // download button
  if (mouseIsPressed && downloadHide == true) {
    download()
    downloadHide = false
  }

  angle += 0.01

}


function sphereDraw(r, unit, total, color) {

  for (var i = 0; i < total * 2; i++) {
    var lon = map(i, 0, total * 2, -PI, PI)
    for (var j = 0; j < total; j++) {
      var lat = map(j, 0, total, -HALF_PI, HALF_PI)
      var x = r[j] * sin(lon) * cos(lat)
      var y = r[j] * sin(lon) * sin(lat)
      var z = r[j] * cos(lon)
      // var x1 = r[j - 1] * sin(lon) * cos(lat)
      // var y1 = r[j - 1] * sin(lon) * sin(lat)
      // var z1 = r[j - 1] * cos(lon)
      push()
      translate(x, y, z)
      fill(color)
      sphere(unit)
      pop()
    }
  }
  //  console.log(r)
}

function monthNumToName(num) {
  var months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May',
    'June', 'July', 'Aug', 'Sept',
    'Oct', 'Nov', 'Dec'
  ]

  return months[num - 1]
}

//download canvas as Image
//credit https://jsfiddle.net/codepo8/V6ufG/2/
function download() {
  text("hahha", 0, 0, 0)

  var link = document.createElement('a');
  link.innerHTML = 'Download image';
  link.addEventListener('click', function(ev) {
    link.href = canvas.toDataURL(); //generate canvas to url
    link.download = "your pulse.png";
  }, false);
  document.body.appendChild(link);
}
