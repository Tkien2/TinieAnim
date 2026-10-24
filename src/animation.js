import { BinarySearch, CubicBezierCurve } from "./math.js"
export const animation = {
    LINEAR: "LINEAR",
    EASE_IN_OUT: "EASE_IN_OUT",
    EASE_IN: "EASE_IN",
    EASE_OUT: "EASE_OUT",
}
function easeInOut(t, isX = true){
    return CubicBezierCurve(t, isX, [[0.5,0],[0.5,1]])
}
function easeIn(t, isX = true){
    return CubicBezierCurve(t, isX, [[0.5,0],[1,1]])
}
function easeOut(t, isX = true){
    return CubicBezierCurve(t, isX, [[0,0],[0.5,1]])
}
function motion(t, motionFunction){
    if(t>=0 && t<=1){
        let i = BinarySearch(t, motionFunction)
        return motionFunction(i, false)
    }
}
function easeInOutMotion(t){
    return motion(t, easeInOut)
}
function easeInMotion(t){
    return motion(t, easeIn)
}
function easeOutMotion(t){
    return motion(t, easeOut)
}
export function timingFunction(t, timingFunction){
    if(t>=0 && t<=1){
        if(timingFunction == animation.LINEAR){
            return t
        } else if(timingFunction == animation.EASE_IN_OUT){
            return easeInOutMotion(t)
        } else if(timingFunction == animation.EASE_IN){
            return easeInMotion(t)
        } else if(timingFunction == animation.EASE_OUT){
            return easeOutMotion(t)
        }
    }
}