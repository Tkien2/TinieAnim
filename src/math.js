export class Matrix{
    #matrix
    #isValid = true
    constructor(matrix){
        this.#matrix = matrix
        this.#checkMatrix()
    }
    getMatrix(){
        return this.#matrix
    }
    #checkMatrix(){
        if(!Array.isArray(this.#matrix) || this.#matrix.length <= 0){
            console.error("Matrix must be an Array and can not be empty");
            this.#isValid = false;
            return
        }
        let col = this.#matrix[0].length
        for(const row of this.#matrix){
            if(Array.isArray(row)){
                if(row.length !== col){
                    console.error("All rows must have the same length (columns)")
                    this.#isValid = false;
                    return
                }
                for(const value of row){
                    if(typeof value !== 'number' || !Number.isFinite(value)){
                        console.error("Value is not valid")
                        this.#isValid = false
                        return
                    }
                }
            } else{
                console.error(`Matrix must be an Array. ${row} is not an Array`);
                this.#isValid = false;
                return
            }
        }
    }
    isValid(){
        return this.#isValid
    }
    multiply(matrix){
        let A = {
            rows: this.#matrix.length,
            cols: this.#matrix[0].length
        }
        let B = {
            rows: matrix.getMatrix().length,
            cols: matrix.getMatrix()[0].length
        }
        if(this.isValid() && matrix.isValid()){
            if(A.cols === B.rows){
                let newMatrix = []
                for(let rA = 0; rA < A.rows; rA++){
                    let rC = []
                    for(let cB = 0; cB < B.cols; cB++){
                        let sum = 0
                        for(let cA = 0; cA < A.cols; cA++){
                            sum += this.#matrix[rA][cA]*matrix.getMatrix()[cA][cB]
                        }
                        rC.push(sum)
                    }
                    newMatrix.push(rC)
                }
                return new Matrix(newMatrix)
            }
        }
        console.error("Can not multiply these matrixes")
    }
}
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
    toMatrix(){
        return new Matrix([[this.x],[this.y]])
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
        // giới hạn chỉ cho phép hàm Bezier không có cực trị
        console.error("The x-coordinate of the control point must be within the interval (0, 1)")
    }
}
//đơn điệu + đồng biến
export function BinarySearch(target, func, min=0, max=1, decimalPoint = 6){
    let l = min
    let r = max
    let i = (r + l)/2
    let value = null
    const factor = 10**decimalPoint
    target = Math.round(target*factor)/factor
    for(let k = 0; k<=30; k++){
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