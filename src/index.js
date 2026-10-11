import * as render from "./render.js";
import * as shapes from "./shapes.js"
import * as constants from "./constants.js"
const canvas = render.createScreen(null, 400,400)
const renderer = new render.Render(canvas.element)
const rect = new shapes.Rectangle({
    x: 100, y: 200, color: constants.COLORS.Red
})
let rectUpdater = ()=>{
    rect.x += 2
    rect.y += 2
}
renderer.addEntities(rect)
renderer.render()
renderer.play()
renderer.addUpdater(rectUpdater)
await renderer.wait(500)
renderer.disableUpdater(rectUpdater)