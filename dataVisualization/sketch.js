//get inspired by Hands-on data visualization using p5
//http://vda-lab.github.io/2015/10/hands-on-data-visualization-using-p5

var flight
var button
var input
var rows


function setup() {
  createCanvas(windowWidth, windowHeight);
  flight = loadTable("flights.csv", "csv", "header", process) //call back function
}

function process(data){
  rows = flight.getRows()
  input = createInput('New York')
  input.position(100, 10)
  button = createButton('Go')
  button.position(260, 10)
  button.mouseClicked(getFlights)
  defaultFlights()
  getFlights() //default show flights from New York
}

function getFlights() {

  defaultFlights() //refresh screen

  for (var j = 0; j < rows.length; j++) {
    from_city = rows[j].getString("from_city")
    from_country = rows[j].getString("from_country")

    if (from_city == input.value() || from_country == input.value()) {
      var from_long = rows[j].getNum("from_long")
      var from_lat = rows[j].getNum("from_lat")
      var to_long = rows[j].getNum("to_long")
      var to_lat = rows[j].getNum("to_lat")

      var from_x = map(from_long, -180, 180, 0, width)
      var from_y = map(from_lat, -90, 90, height, 0)
      var to_x = map(to_long, -180, 180, 0, width)
      var to_y = map(to_lat, -90, 90, height, 0)

      push()
      fill(255, 198, 48, 50)
      ellipse(from_x, from_y, 5, 5)
      ellipse(to_x, to_y, 5, 5)
      pop()

      push()
      stroke(255, 198, 48, 30)
      line(from_x, from_y, to_x, to_y)
      pop()
    }
  }
}


function draw() {

}


//default flights
function defaultFlights() {
  noStroke()
  background(28, 41, 62)
	fill(255)
	text('Country or City:',10,23)
  fill(69, 152, 248, 70)
  for (var i = 0; i < rows.length; i++) {
    var from_long = rows[i].getNum("from_long")
    var from_lat = rows[i].getNum("from_lat")
    var from_x = map(from_long, -180, 180, 0, width)
    var from_y = map(from_lat, -90, 90, height, 0)

    ellipse(from_x, from_y, 5, 5)
  }
}

//	Country or City: <input id="from" value="New York">  </input>
//	<button id="go">Go</button>
