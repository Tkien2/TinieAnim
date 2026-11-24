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
    x: 200, y: 200,
    xRange: [-7,7], yRange: [-10,10],
    pxPerUnit: 20, xLabel: "x", yLabel: "y",
    color: TinieAnim.COLORS.White
})
graph.setFunction((x)=>{
    return 1/(x + 1)
})
renderer.setBackgroundColor(TinieAnim.COLORS.Void)
renderer.addEntities(graph)
renderer.render()