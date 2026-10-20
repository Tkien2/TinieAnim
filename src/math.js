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
        this.x = x
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
export function CubicBezierCurve(t, isX = true, controlPoints = [[0.5,0],[0.5,1]]){
    if ((controlPoints[0][0] >= 0 && controlPoints[0][0] <=1) && (controlPoints[1][0] >= 0 && controlPoints[1][0] <=1)){
        if(isX){
            return 3*Math.pow(1-t,2)*t*controlPoints[0][0] + 3*(1-t)*t*t*controlPoints[1][0] + t*t*t
        } else{
            return 3*Math.pow(1-t,2)*t*controlPoints[0][1] + 3*(1-t)*t*t*controlPoints[1][1] + t*t*t
        }
    } else{
        // skill issue actually
        console.error("The x-coordinate of the control point must be within the interval (0, 1)")
    }
}
export function BinarySearch(target, func, min=0, max=1, decimalPoint = 3){
    let l = min
    let r = max
    let i = (r + l)/2
    let value = null
    const factor = 10**decimalPoint
    target = Math.round(target*factor)/factor
    for(let k = 0; k<=20; k++){
        value = func(i)
        if(value > target){
            r = i
        } else {
            l = i
        }
        if(Math.round(value*factor)/factor == target){
          return i
        }
        i = (r + l)/2
    }
    console.warn("Can not find the value you are looking for")
    return undefined
}