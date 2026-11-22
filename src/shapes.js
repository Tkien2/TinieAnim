import * as constants from "./constants.js"
import { Coordinates2, Matrix, Vector2 } from "./math.js"
/*
Trong trường hợp bản thân đọc lại code và đếch hiểu gì:
- Các class thuộc đoạn thẳng, đa giác đều có các điểm được xác định bởi các vector.
- Xoay, thu phóng đều được thực hiện thông qua việc nhân ma trận với vector
- Render chỉ render các vector được biến đổi, giá trị vector gốc được giữ lại
*/
// TODO: THỐNG NHẤT getCoordinates2
const rotationMatrix = new Matrix([[],[]])
function getRotationMatrix(angle){
    rotationMatrix.setMatrix([
        [Math.cos(angle), - Math.sin(angle)],
        [Math.sin(angle), Math.cos(angle)]
    ])
    return rotationMatrix
}
class Entity {
    #rotationAngle
    #scale = 1
    constructor(properties = {}){
        this.x = properties.x ?? 0
        this.y = properties.y ?? 0
        this.entityName = properties.entityName ?? "TinieEntity"
        this.id = -1
        this.#rotationAngle = 0
    }
    getCoordinates(){
        return new Coordinates2(this.x, this.y)
    }
    scale(k){
        if (Number.isFinite(k)){
            this.#scale = k
            this.updateVectors()
        } else{
            console.log("Scale must be a finite number", k);
        }
    }
    getScale(){
        return this.#scale
    }
    getRotationAngle(){
        return this.#rotationAngle
    }
    rotate(rad){
        if(typeof rad === 'number' && Number.isFinite(rad)){
            this.#rotationAngle = rad
            this.updateVectors()
        }else{
            console.error("Angle of rotation must be a number")
        }
    }
    updateVectors(rad){
        
    }
    getCoordinates2(){
        return new Coordinates2(this.x, this.y)
    }
    setCoordinates2(coords2){
        this.x = coords2.x
        this.y = coords2.y
    }
    shift(vector){
        this.x += vector.x
        this.y += vector.y
    }
    moveTo(coords){
        this.x = coords.x
        this.y = coords.y
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
}
class Shape extends Entity{
    #vectors = []
    #scaleMatrix
    #customMatrix = new Matrix([[1,0],[0,1]])
    #originalVectors
    constructor(properties = {}){
        super(properties)
        this.color = properties.color ?? constants.COLORS.Blue
        this.strokeColor = properties.strokeColor ?? null
        this.strokeWidth = properties.strokeWidth ?? 2
        this.#scaleMatrix = new Matrix([[this.getScale(),0],[0,this.getScale()]])
    }
    getCustomMatrix(){
        return this.#customMatrix
    }
    setOriginalVectors(vectorsArray){
        this.#originalVectors = vectorsArray
    }
    getOriginalVectors(){
        return this.#originalVectors
    }
    getVectors(){
        return this.#vectors
    }
    setVectors(vectorsArray){
        this.#vectors = vectorsArray
    }
    resetVectors(){
        this.#vectors = this.#originalVectors
    }
    updateVectors(){
        this.#scaleMatrix.setMatrix([[this.getScale(),0],[0,this.getScale()]])
        const ogVectorLength = this.#originalVectors.length
        if(this.#vectors.length < ogVectorLength){
            this.#vectors = []
            for(let i = 0; i < ogVectorLength; i++){
                this.#vectors.push(new Vector2(0,0))
            }
        }
        const matrix = getRotationMatrix(this.getRotationAngle()).multiply(this.#customMatrix.multiply(this.#scaleMatrix))
        for(let i = 0; i < this.#vectors.length; i++){
            let vector = this.#originalVectors[i].toMatrix()
            vector = matrix.multiply(vector)
            vector = new Vector2(vector.getMatrix()[0][0], vector.getMatrix()[1][0])
            this.#vectors[i] = vector
        }
    }
    transform(matrix){
        if(matrix.isValid() && matrix.getMatrix().length == 2){
            this.#customMatrix = matrix
            this.updateVectors()
        } else{
            console.error("Matrix is invalid", matrix)
        }
    }
}
// Tôi đéo biết tại sao Group lại kế thừa từ Shape
// Nên dùng hàm cập nhật vector của Shape, buồn ngủ quá, rảnh thì sửa
export class Group{
    #coords = new Coordinates2(0,0)
    #vectors = []
    #entities
    constructor(...entities){
        this.#entities = entities
        this.coordsArray = []
        this.updateCoordsArray(this.#entities)
        this.updateCoordinates()
        this.updateVectors()
    }
    updateAll(){
        this.updateCoordsArray(this.#entities)
        this.updateVectors()
    }
    updateVectors(){
        this.#vectors = []
        for(const coords of this.coordsArray){
            this.#vectors.push(coords.subtract(this.#coords))
        }
    }
    updateCoordinates(){
        if(this.coordsArray.length == 0){
            this.#coords.setCoordinates2(0,0)
            return
        }
        let x = 0
        let y = 0
        for(const coords of this.coordsArray){
            x += coords.x
            y += coords.y
        }
        this.x = x/this.coordsArray.length
        this.y = y/this.coordsArray.length
        this.#coords.setCoordinates2(this.x, this.y)
    }
    setCoordinates2(coords){
        this.#coords = coords
        this.moveTo(coords)
    }
    getCoordinates2(){
        return this.#coords
    }
    getEntities(){
        return this.#entities
    }
    addEntities(...entities){
        for(const entity of entities){
            this.#entities.push(entity)
        }
        this.updateCoordsArray(this.#entities)
    }
    updateCoordsArray(...entities){
        this.coordsArray = []
        for(const entity of entities[0]){
            if(entity.x !== null && entity.y !== null){
                this.coordsArray.push(entity.getCoordinates2())
            }
        }
    }
    async applyFunction(func){
        for(const entity of this.#entities){
            func(entity)
        }
    }
    shift(vector){
        if(vector.constructor.name == "Vector2"){
            this.#coords =this.#coords.shift(vector)
            for(const entity of this.#entities){
                entity.shift(vector)
                console.log(entity.x);
            }
            this.updateAll()
        } else{
            throw TypeError("'vector' must be a vector", vector)
        }
    }
    moveTo(coordinates){
        if(coordinates.constructor.name == "Coordinates2"){
            this.#coords = coordinates
            for(let i = 0; i < this.#entities.length; i++){
                this.#entities[i].moveTo(coordinates.shift(this.#vectors[i]))
            }
            this.updateAll()
        } else{
            throw TypeError("'coordinates' must be a coordinates", coordinates)
        }
    }
    draw(ctx){
        for(const entity of this.#entities){
            entity.draw(ctx)
        }
    }
}
export class Text extends Entity{
    constructor(properties = {}){
        super(properties)
        this.text = properties.text ?? "New Text"
        this.textAlign = properties.textAlign ?? "center"
        this.fontFamily = properties.fontFamily ?? "Arial"
        this.fontSize = properties.fontSize ?? 25
        this.textBaseline = properties.textBaseline ?? "middle"
        this.color= properties.color ?? constants.COLORS.Blue
        this.strokeColor = properties.strokeColor
    }
    draw(ctx){
        ctx.font = `${this.fontSize}px ${this.fontFamily}`
        ctx.textAlign = this.textAlign
        ctx.textBaseline = this.textBaseline
        ctx.fillStyle = this.color
        ctx.strokeStyle = this.strokeColor ?? "transparent"
        ctx.strokeText(this.text, this.x, this.y)
        ctx.fillText(this.text, this.x, this.y)
    }
}
// Why?
export class Graph extends Shape{
    #group
    #xAxis
    #yAxis
    #plot
    constructor(properties = {}){
        super(properties)
        this.isYFlip = properties.isYFlip ?? true
        this.pxPerUnit = properties.pxPerUnit ?? 10
        this.xRange = properties.xRange ?? [-10,10]
        this.yRange = properties.yRange ?? [-10,10]
        this.setAxis()
        this.#group = new Group(this.#xAxis, this.#yAxis)
        this.#plot = new Group()
    }
    setAxis(){
        let factor = 1
        if(!this.isYFlip){factor = -1}
        this.#xAxis = new Arrow({
            start: new Coordinates2(this.x + this.xRange[0]*this.pxPerUnit, this.y),
            end: new Coordinates2(this.x + this.xRange[1]*this.pxPerUnit, this.y),
            strokeColor: this.strokeColor
        })
        this.#yAxis = new Arrow({
            start: new Coordinates2(this.x, this.y + factor*this.yRange[0]*this.pxPerUnit),
            end: new Coordinates2(this.x, this.y + factor*this.yRange[1]*this.pxPerUnit),
            strokeColor: this.strokeColor
        })
    }
    draw(ctx){
        this.#group.draw(ctx)
    }
}
export class Line extends Shape{
    #start
    #end
    constructor(properties = {}){
        super(properties)
        this.#start = properties.start ?? new Coordinates2(0,0)
        this.#end = properties.end ?? new Coordinates2(10,10)
        this.color = null
        this.strokeColor = properties.color ?? constants.COLORS.Yellow
        this.setOriginalVectors([
            this.#end.subtract(this.#start)
        ])
        this.updateVectors()
    }
    getAngle(){
        return Math.atan2(this.getVectors()[0].y, this.getVectors()[0].x)
    }
    getStartPoint(){
        return this.#start
    }
    getEndPoint(){
        return this.#end
    }
    setStartAndEndPoint(start, end){
        this.#start = start
        this.#end = end
        this.setOriginalVectors([
            this.#end.subtract(this.#start)
        ])
        this.updateVectors()
    }
    moveTo(coords){
        this.#start = coords
        this.#end = coords.shift(this.getOriginalVectors()[0])
    }
    shift(vector){
        if(vector.constructor.name == "Vector2"){
            this.setStartAndEndPoint(
                this.#start.shift(vector),
                this.#end.shift(vector)
            )
        } else{
            throw TypeError("'vector' must be a vector", vector)
        }
    }
    draw(ctx){
        ctx.beginPath();
        if(this.strokeColor !== null){
            ctx.strokeStyle = this.strokeColor;
        }
        ctx.lineWidth = this.strokeWidth;
        ctx.moveTo(this.#start.x, this.#start.y);
        ctx.lineTo(this.getVectors()[0].x + this.#start.x, this.getVectors()[0].y + this.#start.y);
        ctx.stroke()
    }
    getCoordinates2(){
        return this.#start
    }
}
export class Arrow extends Line{
    #arrowTipVector
    #renderedArrowTipVector
    constructor(properties = {}){
        super(properties)
        this.arrowTipScale = properties.arrowTipScale ?? 1
        this.setOriginalVectors([
            this.getEndPoint().subtract(this.getStartPoint()),
        ])
        this.updateVectors()
        this.#arrowTipVector = [
            new Vector2(-5*this.arrowTipScale, -5*this.arrowTipScale),
            new Vector2(-5*this.arrowTipScale, 5*this.arrowTipScale)
        ]
        this.#renderedArrowTipVector = [
            new Vector2(-5*this.arrowTipScale, -5*this.arrowTipScale),
            new Vector2(-5*this.arrowTipScale, 5*this.arrowTipScale)
        ]
    }
    draw(ctx){
        ctx.beginPath();
        if(this.strokeColor !== null){
            ctx.strokeStyle = this.strokeColor;
        }
        ctx.lineWidth = this.strokeWidth;
        const end = {
            x: this.getVectors()[0].x + this.getStartPoint().x, 
            y: this.getVectors()[0].y + this.getStartPoint().y
        }
        ctx.moveTo(this.getStartPoint().x, this.getStartPoint().y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke()
        if(this.getVectors()[0].getLength() !== 0){
            this.drawTip(ctx, end)
        }
    }
    drawTip(ctx, end){
        // Arrow tip
        this.rotateArrowTip(this.getAngle())
        ctx.moveTo(end.x, end.y)
        ctx.lineTo(end.x + this.#renderedArrowTipVector[0].x, end.y + this.#renderedArrowTipVector[0].y)
        ctx.moveTo(end.x, end.y)
        ctx.lineTo(end.x + this.#renderedArrowTipVector[1].x, end.y + this.#renderedArrowTipVector[1].y)
        ctx.stroke()
    }
    rotateArrowTip(rad){
        for(let i = 0; i < this.#renderedArrowTipVector.length; i ++){
            let vector = getRotationMatrix(rad).multiply(this.#arrowTipVector[i].toMatrix())
            this.#renderedArrowTipVector[i].setVector(vector.getMatrix()[0][0], vector.getMatrix()[1][0])
        }
    }
}
export class Rectangle extends Shape{
    constructor(properties = {}){
        super(properties)
        this.width = properties.width ?? 50
        this.height = properties.height ?? 50
        const vectors = [
            new Vector2(-this.width/2, -this.height/2),
            new Vector2(this.width/2, -this.height/2),
            new Vector2(this.width/2, this.height/2),
            new Vector2(-this.width/2, this.height/2)
        ]
        this.setOriginalVectors(vectors.map(v => new Vector2(v.x, v.y)))
        this.updateVectors()
    }
    resize(width, height){
        this.width = width
        this.height = height
        this.updateVectors()
    }
    draw(ctx){
        try{
            ctx.beginPath()
            ctx.lineWidth = this.strokeWidth;
            const vectors = this.getVectors()
            ctx.moveTo(vectors[0].x + this.x, vectors[0].y + this.y)
            ctx.lineTo(vectors[1].x + this.x, vectors[1].y + this.y)
            ctx.lineTo(vectors[2].x + this.x, vectors[2].y + this.y)
            ctx.lineTo(vectors[3].x + this.x, vectors[3].y + this.y)
            ctx.lineTo(vectors[0].x + this.x, vectors[0].y + this.y - this.strokeWidth/2)
            if(this.color !== null){
                ctx.fillStyle = this.color
                ctx.fill()
            }
            ctx.closePath()
            if(this.strokeColor !== null){
                ctx.strokeStyle = this.strokeColor;
                ctx.stroke()
            }
        }catch(e){
            console.error("Can not draw this Entity\n", e)
        }
    }
}
export class Arc extends Shape{
    #renderRadius
    constructor(properties = {}){
        super(properties)
        this.radius = properties.radius ?? 25
        this.startAngle = properties.startAngle ?? 0
        this.endAngle = properties.endAngle ?? Math.PI/2
        this.strokeColor = properties.strokeColor ?? constants.COLORS.Blue
        this.color = properties.color ?? null
        this.scale(1)
    }
    resize(radius){
        this.radius = radius
    }
    updateVectors(){
        this.#renderRadius = this.getScale()*this.radius
    }
    draw(ctx){
        try{
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.#renderRadius, this.startAngle, this.endAngle)
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