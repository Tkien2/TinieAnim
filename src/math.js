export class Vector2{
    constructor(x,y){
        this.x = x
        this.y = y
    }
    getLength(){
        return Math.sqrt(this.x*this.x + this.y*this.y)
    }
    add(vector2){
        return new Vector2(vector2.x + this.x, vector2.y + this.y)
    }
    subtract(vector2){
        return new Vector2(this.x - vector2.x, this.y - vector2.y)
    }
    multiply(scalar){
        return new Vector2(this.x*scalar, this.y*scalar)
    }
    copy(){
        return this
    }
}
export class Coordinates2{
    constructor(x,y){
        this.x = x,
        this.y = y
    }
    subtract(coords2){
        return new Vector2(this.x - coords2.x, this.y - coords2.y)
    }
    shift(vector2){
        return new Coordinates2(this.x + vector2.x, this.y + vector2.y)
    }
    copy(){
        return this
    }
}