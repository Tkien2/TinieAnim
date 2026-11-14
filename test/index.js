//Code by TKien2
import * as TinieAnim from "../src/index.js"
const canvas = TinieAnim.createScreen(500,400)
const renderer = new TinieAnim.Render(canvas.element)
const rect = new TinieAnim.Rectangle({
    x: 100, y: 200, color: TinieAnim.COLORS.Red,
    strokeColor: TinieAnim.COLORS.Yellow
})
const m = new TinieAnim.Matrix([
    [1.3,0.3],
    [1.3,0.8]
])
const line = new TinieAnim.Line({
    start: new TinieAnim.Coordinates2(200, 200),
    end: new TinieAnim.Coordinates2(300, 130),
})
const circle = new TinieAnim.Circle({
    radius: 5,
    x: 400, y: 200
})
renderer.setBackgroundColor(TinieAnim.COLORS.Void)
renderer.addEntities(rect, line, circle)
renderer.render()
renderer.play()
renderer.maxtrixTransform(rect, m)
renderer.rotate(line, 2)
await renderer.setScale(circle, 1.3)
renderer.setScale(circle, 0.5)
// renderer.pause()