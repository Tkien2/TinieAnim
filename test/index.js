import * as TinieAnim from "../src/index.js"
const canvas = TinieAnim.createScreen(500,400)
const renderer = new TinieAnim.Render(canvas.element)
const rect = new TinieAnim.Rectangle({
    x: 100, y: 200, color: TinieAnim.COLORS.Red
})
const line = new TinieAnim.Line({
    start: new TinieAnim.Coordinates2(20, 40),
    end: new TinieAnim.Coordinates2(80, 90)
})
renderer.setBackgroundColor(TinieAnim.COLORS.Void)
renderer.addEntities(rect, line)
renderer.render()
// renderer.play()
// renderer.moveTo(rect, new TinieAnim.Coordinates2(90, 90))
// await renderer.wait(1500)
// renderer.moveTo(rect, new TinieAnim.Coordinates2(130, 200))