// module aliases
var Engine = Matter.Engine
var Render = Matter.Render
var World = Matter.World
var Bodies = Matter.Bodies
var Composites = Matter.Composites
var Runner = Matter.Runner
var Constraint = Matter.Constraint

var engine
var world
var drops = []

var ground
var rectangle
var circle
var tri
//var runner

function setup() {

  createCanvas(800, 600);
  engine = Engine.create()
  world = engine.world
  Engine.run(engine)
  rectMode(CENTER)

  ground = Bodies.rectangle(width/2, height, width, 10, {isStatic: true});
  World.add(world, ground)

  //create rectangle
  rectangle = Bodies.rectangle(400, 250, 80, 80)
  var constraint = Constraint.create({
    pointA: {
      x: 400,
      y: 250
    },
    bodyB: rectangle,
    length: 0,
    stiffness: 0.1
  })
  World.add(world, [rectangle, constraint])

  //create circle
  circle = Bodies.polygon(200, 250, 5,50)
  var constraint = Constraint.create({
    pointA: {
      x: 200,
      y: 250
    },
    bodyB: circle,
    length: 0,
    stiffness: 0.1
  })
  World.add(world, [circle, constraint])

  //create triangle
  tri = Bodies.polygon(600, 250, 3, 50)
  var constraint = Constraint.create({
    pointA: {
      x: 600,
      y: 250
    },
    bodyB: tri,
    length: 0,
    stiffness: 0.1
  })
  World.add(world, [tri, constraint])
  console.log(circle)

}

function draw() {
  Engine.update(engine)
  background("#48006B")
  noStroke()
  //fill(100)


  push()
  fill("#8B58FF")
	translate(rectangle.position.x, rectangle.position.y)
	rotate(rectangle.angle)
	rect(0, 0, 80, 80)
  pop()

  push()
	translate(circle.position.x, circle.position.y)
  fill("#FC51A3")
	rotate(circle.angle)
	polygon(0,0, 50, 5)
  pop()

  push()
	translate(tri.position.x, tri.position.y)
  fill("#47DFB4")
	rotate(tri.angle)
  polygon(0,0, 50, 3)
  pop()

	drops.push(new Drop(random(width), 0, random(3, 10), random(3, 10)))
  drops.push(new Drop(random(width), 0, random(3, 10), random(3, 10)))

  drops.forEach(function(drop) {
    drop.show()
  })

	drops.filter(function(drop){
		return drop.pos.y<height
	})

}

function polygon(x, y, radius, npoints) {
  var angle = TWO_PI / npoints;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
