import * as TinieAnim from "../src/index.js"
const canvas = TinieAnim.createScreen(500,400)
const renderer = new TinieAnim.Render(canvas.element)
const rect = new TinieAnim.Rectangle({
    x: 100, y: 200, color: TinieAnim.COLORS.Red
})
const circ = new TinieAnim.Circle({x: 200, y: 100})
let speed = 90
let rectUpdater = (dt)=>{
    rect.x += speed*dt
    rect.y += speed*dt
}
renderer.setBackgroundColor(TinieAnim.COLORS.Void)
renderer.addEntities(rect, circ)
renderer.render()
renderer.play()
renderer.moveTo(circ, new TinieAnim.Coordinates2(30,170), 2, TinieAnim.animation.EASE_IN_OUT)
renderer.addUpdater(rectUpdater)
await renderer.wait(1000)
renderer.removeUpdater(rectUpdater)
rect.color = TinieAnim.COLORS.Yellow
renderer.moveTo(rect, new TinieAnim.Coordinates2(100,100), 1)
renderer.setScale(rect, 2, 1)
await renderer.wait(1000)
renderer.setScale(rect, 1, 1)