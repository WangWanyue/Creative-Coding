function Drop(x,y,w,h){
  var options = {
    friction: 0.5,
    frictionStatic: 0.8,
    render: {
      visible: true
    }
  }

  this.body=Bodies.rectangle(x,y,w,h,options)
  this.w=w
  this.h=h
  World.add(world,this.body)

  this.show = function(){
    this.pos=this.body.position
    this.angle=this.body.angle
    push()
    translate(this.pos.x,this.pos.y)
    fill(255,183,78)
    rectMode(CENTER)
    rotate(this.angle)
    rect(0,0,this.w,this.h)

    pop()
  }
}
