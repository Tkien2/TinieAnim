import * as constants from "./constants.js"
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
        this.color = color,
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