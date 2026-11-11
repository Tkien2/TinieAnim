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
const circ = new shapes.Circle({x: 200, y: 100})
let speed = 90
let rectUpdater = (dt)=>{
    rect.x += speed*dt
    rect.y += speed*dt
}
renderer.setBackgroundColor(constants.COLORS.Void)
renderer.addEntities(rect, circ)
renderer.render()
renderer.play()
renderer.moveTo(circ, new Coordinates2(30,170), 2, animation.EASE_IN_OUT)
renderer.addUpdater(rectUpdater)
await renderer.wait(1000)
renderer.removeUpdater(rectUpdater)
rect.color = constants.COLORS.Yellow
renderer.moveTo(rect, new Coordinates2(100,100), 1, animation.EASE_IN_OUT)
renderer.setScale(rect, 2, 1)
await renderer.wait(1000)
renderer.setScale(rect, 0.5, 1)
// renderer.pause()