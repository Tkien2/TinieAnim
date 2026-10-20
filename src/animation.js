import { BinarySearch, CubicBezierCurve } from "./math.js"
export const animation = {
    LINEAR: "LINEAR",
    EASE_IN_OUT: "EASE_IN_OUT",
}
function EaseInOutMotion(t){
    if(t>=0 && t<=1){
        let i = BinarySearch(t, CubicBezierCurve)
        return CubicBezierCurve(i, false)
    }
}
export function timingFunction(t, timingFunction){
    if(t>=0 && t<=1){
        if(timingFunction == animation.LINEAR){
            return t
        } else if(timingFunction == animation.EASE_IN_OUT){
            return EaseInOutMotion(t)
        }
    }
}