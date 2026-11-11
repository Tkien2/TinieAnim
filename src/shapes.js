import * as constants from "./constants.js"
import { Coordinates2 } from "./math.js"
class Entity {
    constructor(properties = {}){
        this.x = properties.x ?? 0
        this.y = properties.y ?? 0
        this.name = properties.name ?? "TinieEntity"
        this.id = -1
        this.scale = 1
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
    constructor(properties = {}){
        super(properties)
        this.color = properties.color ?? constants.COLORS.Blue
        this.strokeColor = properties.strokeColor ?? null
    }
}
export class Rectangle extends Shape{
    constructor(properties = {}){
        super(properties)
        this.width = properties.width ?? 50
        this.height = properties.height ?? 50
    }
    resize(width, height){
        this.width = width
        this.height = height
    }
    draw(ctx){
        try{
            ctx.fillStyle = this.color
            const wh = [this.width*this.scale, this.height*this.scale]
            ctx.fillRect(
                this.x - wh[0]/2,
                this.y - wh[1]/2,
                wh[0], wh[1]
            )
        }catch(e){
            console.error("Can not draw this Entity")
        }
    }
}
export class Arc extends Shape{
    constructor(properties = {}){
        super(properties)
        this.radius = properties.radius ?? 25
        this.startAngle = properties.startAngle ?? 0
        this.endAngle = properties.endAngle ?? Math.PI/2
        this.strokeColor = properties.strokeColor ?? constants.COLORS.Blue
        this.color = properties.color ?? null
    }
    resize(radius){
        this.radius = radius
    }
    draw(ctx){
        try{
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.radius*this.scale, this.startAngle, this.endAngle)
            if(this.color !== null){
                ctx.fillStyle = this.color
                ctx.fill()
            }
            if(this.strokeColor !== null){
                ctx.strokeStyle = this.strokeColor
                ctx.stroke()
            }
        }catch(e){
            console.error("Can not draw this Entity");
        }
    }
}
export class Circle extends Arc{
    constructor(properties = {}){
        super(properties)
        this.startAngle = 0
        this.endAngle = Math.PI*2
        this.color = properties.color ?? constants.COLORS.Blue
        this.strokeColor = properties.strokeColor ?? null
    }
}