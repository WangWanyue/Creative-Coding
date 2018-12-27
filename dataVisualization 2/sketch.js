//get inspired by Hands-on data visualization using p5
//http://vda-lab.github.io/2015/10/hands-on-data-visualization-using-p5

var flight
var button
var input
var rows


function setup() {
  createCanvas(windowWidth, windowHeight);
  flight = loadTable("flights.csv", "csv", "header", process) //call back function
  input = createInput('New York')
  input.position(width / 2 - 100, height - 50)
  button = createButton('Go')
  button.position(width / 2 + 50, height - 50)
  rectMode(CENTER)
  textAlign(CENTER)
}

function process(data) {
  rows = flight.getRows()
  getInfo()
  defaultFlights()
  text('Input a city or a country to get flights information', width / 2, height - 100)
}

function draw() {
  textSize(25)
  button.mouseClicked(getFlights)
  noLoop()
}

//default flights
function defaultFlights() {
  noStroke()
  background(28, 41, 62)
  fill(69, 152, 248, 70)
  for (var j = 0; j < rows.length; j++) {
    ellipse(rows[j].from_long, rows[j].from_lat, 5, 5)
  }
}


function getFlights() {

  defaultFlights() //refresh screen

  var flightCount = 0

  for (var j = 0; j < rows.length; j++) {

    if (rows[j].from_city.toUpperCase() == input.value().toUpperCase() || rows[j].from_country.toUpperCase() == input.value().toUpperCase()) {

      push()
      fill(255, 198, 48, 50)
      ellipse(rows[j].from_long, rows[j].from_lat, 5, 5)
      ellipse(rows[j].to_long, rows[j].to_lat, 5, 5)
      pop()

      push()
      stroke(255, 198, 48, 30)
      line(rows[j].from_long, rows[j].from_lat, rows[j].to_long, rows[j].to_lat)
      pop()

      flightCount++
    }
  }

  if (flightCount != 0) {
    fill(255, 198, 48)
    text("There are " + flightCount + " flights from " + input.value(), width / 2, height - 100)
  } else {
    fill(69, 152, 248, 70)
    text("Invalid name of a city or country, please try again", width / 2, height - 100)
  }
}


function getInfo() {
  for (var j = 0; j < rows.length; j++) {
    var from_long = rows[j].getNum("from_long")
    var from_lat = rows[j].getNum("from_lat")
    var to_long = rows[j].getNum("to_long")
    var to_lat = rows[j].getNum("to_lat")

    rows[j].from_city = rows[j].getString("from_city")
    rows[j].from_country = rows[j].getString("from_country")
    rows[j].to_city = rows[j].getString("to_city")
    rows[j].to_country = rows[j].getString("to_country")

    rows[j].from_long = map(from_long, -180, 180, 0, width)
    rows[j].from_lat = map(from_lat, -90, 90, height, 0)
    rows[j].to_long = map(to_long, -180, 180, 0, width)
    rows[j].to_lat = map(to_lat, -90, 90, height, 0)
  }
}


//	Country or City: <input id="from" value="New York">  </input>
//	<button id="go">Go</button>
