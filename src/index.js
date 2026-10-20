import * as render from "./render.js";
import * as shapes from "./shapes.js"
import * as constants from "./constants.js"
import { animation } from "./animation.js";
import { Coordinates2 } from "./math.js";
const canvas = render.createScreen(500,400)
const renderer = new render.Render(canvas.element)
const rect = new shapes.Rectangle({
    x: 100, y: 200, color: constants.COLORS.Red
})
let speed = 90
let rectUpdater = (dt)=>{
    rect.x += speed*dt
    rect.y += speed*dt
}
renderer.setBackgroundColor(constants.COLORS.Void)
renderer.addEntities(rect)
renderer.render()
renderer.play()
renderer.addUpdater(rectUpdater)
await renderer.wait(1000)
renderer.removeUpdater(rectUpdater)
rect.color = constants.COLORS.Yellow
renderer.moveTo(rect, new Coordinates2(100,100), 1, animation.EASE_IN_OUT)
await renderer.wait(1000)
rect.color = constants.COLORS.Green
renderer.moveTo(rect, new Coordinates2(300,200), 1, animation.EASE_IN_OUT)