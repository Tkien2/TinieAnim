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
const graph = new TinieAnim.Graph({
    x: 100, y: 100,
    xRange: [-10,100], yRange: [-10,100],
    pxPerUnit: 2,
})
const txt = new TinieAnim.Text({
    x: 80, y: 200,
    text: "Hello",
})
renderer.setBackgroundColor(TinieAnim.COLORS.Void)
renderer.addEntities(graph, txt)
renderer.render()