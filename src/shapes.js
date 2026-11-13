import * as constants from "./constants.js"
import { Coordinates2, Matrix, Vector2 } from "./math.js"
function rotateVector(vector, angle){
    const rotationMatrix = new Matrix([
        [Math.cos(angle), - Math.sin(angle)],
        [Math.sin(angle), Math.cos(angle)]
    ])
    const vectorInMatrix = rotationMatrix.multiply(vector.toMatrix())
    return new Vector2(vectorInMatrix[0][0], vectorInMatrix[1][0])
}
class Entity {
    constructor(properties = {}){
        this.x = properties.x ?? 0
        this.y = properties.y ?? 0
        this.name = properties.name ?? "TinieEntity"
        this.id = -1
        this.scale = 1
        this.rotate = 0
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
    // copy(){
    //     try{
    //         return this
    //     }
    //     catch(e){
    //         console.error("Can not copy",this,"==========\n",e)
    //     }
    // }
}
class Shape extends Entity{
    constructor(properties = {}){
        super(properties)
        this.color = properties.color ?? constants.COLORS.Blue
        this.strokeColor = properties.strokeColor ?? null
        this.strokeWidth = properties.strokeWidth ?? 2
    }
}
export class Line extends Shape{
    constructor(properties = {}){
        super(properties)
        this.start = properties.start ?? new Coordinates2(0,0)
        this.end = properties.end ?? new Coordinates2(10,10)
        this.color = null
        this.strokeColor = properties.color ?? constants.COLORS.Yellow
    }
    draw(ctx){
        const vector = (this.end.subtract(this.start)).multiply(this.scale)
        const endCoords = this.start.shift(vector)
        ctx.beginPath();
        if(this.strokeColor !== null){
            ctx.strokeStyle = this.strokeColor;
        }
        ctx.lineWidth = this.strokeWidth;
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(endCoords.x, endCoords.y);
        ctx.stroke();
    }
}
export class Rectangle extends Shape{
    #vectors
    constructor(properties = {}){
        super(properties)
        this.width = properties.width ?? 50
        this.height = properties.height ?? 50
        // No uses
        this.#vectors = [
            new Vector2(-this.width/2, -this.height/2),
            new Vector2(this.width/2, -this.height/2),
            new Vector2(this.width/2, this.height/2),
            new Vector2(-this.width/2, this.height/2)
        ]
    }
    #updateVectors(){
        this.#vectors = [
            new Vector2(-this.width/2, -this.height/2),
            new Vector2(this.width/2, -this.height/2),
            new Vector2(this.width/2, this.height/2),
            new Vector2(-this.width/2, this.height/2)
        ]
    }
    resize(width, height){
        this.width = width
        this.height = height
        this.#updateVectors()
    }
    draw(ctx){
        try{
            if(this.color !== null){
                ctx.fillStyle = this.color
            }
            ctx.lineWidth = this.strokeWidth;
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
            ctx.lineWidth = this.strokeWidth;
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