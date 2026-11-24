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
    x: 200, y: 100,
    xRange: [-10,5], yRange: [-5,15],
    pxPerUnit: [20,10], xLabel: "x", yLabel: "y",
    color: TinieAnim.COLORS.White,
    plotColor: TinieAnim.COLORS.Yellow,
    strokeWidth: 3, labelSize: 30,
})
graph.setFunction((x)=>{
    return x**3 + 4*x**2 - 2
})
// rect.setCoordinates2(new TinieAnim.Coordinates2(2,3))
renderer.setBackgroundColor(TinieAnim.COLORS.Void)
renderer.addEntities(graph)
renderer.render()