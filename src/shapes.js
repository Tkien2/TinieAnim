import * as constants from "./constants.js"
import { Coordinates2 } from "./math.js"
class Entity {
    constructor({
        x = 0,
        y = 0,
        name = "TinieEntity",
    } = {}){
        this.x = x
        this.y = y
        this.name = name
        this.id = -1
    }
    getCoordinates2(){
        return new Coordinates2(this.x, this.y)
    }
    setCoordinates2(coords2){
        this.x = coords2.x
        this.y = coords2.y
    }
    shift(vector2){
        this.x += vector2.x
        this.y += vector2.y
    }
    draw(){
        console.error("This Entity does not have draw function")
    }
    setId(id){
        if(typeof(id) == "number"){
            if(id >=-1){
                this.id = id
            } else{
                console.error("Id must be greater than or equal to -1")
            }
        } else{
            console.error("Id must be a number")
        }
    }
    copy(){
        try{
            return this
        }
        catch(e){
            console.error("Can not copy",this,"==========\n",e)
        }
    }
}
class Shape extends Entity{
    constructor({
        x = 0, y = 0, name = "TinieEntity",
        color = constants.COLORS.Blue,
        strokeColor = null,
    } = {}){
        super({x,y,name})
        this.color = color
        this.strokeColor = strokeColor
    }
}
export class Rectangle extends Shape{
    constructor({
        name = "TinieEntity",
        x = 0, y = 0, width = 50, height = 50,
        color = constants.COLORS.Blue,
        strokeColor = null,
    } = {}){
        super({x,y,color,strokeColor,name})
        this.width = width
        this.height = height
    }
    draw(ctx){
        ctx.fillStyle = this.color
        ctx.fillRect(
            this.x - this.width/2,
            this.y - this.height/2,
            this.width, this.height
        )
    }
}
export class Arc extends Shape{
    constructor({
        name = "TinieEntity",
        x = 0, y = 0, radius = 50,
        startAngle = 0, endAngle = Math.PI/2,
        color = null,
        strokeColor = constants.COLORS.Blue,
    } = {}){
        super({x,y,color,strokeColor,name})
        this.radius = radius
        this.startAngle = startAngle
        this.endAngle = endAngle
    }
    draw(ctx){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle)
        if(this.color !== null){
            ctx.fillStyle = this.color
            ctx.fill()
        }
        if(this.strokeColor !== null){
            ctx.strokeStyle = this.strokeColor
            ctx.stroke()
        }
    }
}
export class Circle extends Arc{
    constructor({
        name = "TinieEntity",
        x = 0, y = 0, radius = 25,
        color = constants.COLORS.Blue,
        strokeColor = null,
    } = {}){
        super({x,y,color,strokeColor,name, radius})
        this.startAngle = 0
        this.endAngle = Math.PI*2
    }
}