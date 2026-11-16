//Code by TKien2
import * as TinieAnim from "../index.js"
const canvas = TinieAnim.createScreen(500,400)
const renderer = new TinieAnim.Render(canvas.element)
const center = new TinieAnim.Coordinates2(200,200)
const rect = new TinieAnim.Rectangle({
    x: center.x, y: center.y,
    width: 100, height: 50,
    color: TinieAnim.COLORS.Red
})
const a1 = new TinieAnim.Arrow({
    start: center,
    end: center.shift(new TinieAnim.Vector2(50,25))
})
const a2 = new TinieAnim.Arrow({
    start: center,
    end: center.shift(new TinieAnim.Vector2(-50,25))
})
const a3 = new TinieAnim.Arrow({
    start: center,
    end: center.shift(new TinieAnim.Vector2(50,-25))
})
const a4 = new TinieAnim.Arrow({
    start: center,
    end: center.shift(new TinieAnim.Vector2(-50,-25))
})
const gr = new TinieAnim.Group(rect, a1, a2, a3, a4)
const m = new TinieAnim.Matrix([
    [1,1.3],
    [0.7,2]
])
const m1 = new TinieAnim.Matrix([
    [1.4,0.3],
    [2.2,1.5]
])
renderer.setBackgroundColor(TinieAnim.COLORS.Void)
renderer.addEntities(gr)
renderer.render()
renderer.play()
gr.applyFunction((entity)=>{
    renderer.transform(entity,m)
})
await renderer.wait(1000)
gr.applyFunction((entity)=>{
    renderer.transform(entity, m1)
})