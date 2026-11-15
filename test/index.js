//Code by TKien2
import * as TinieAnim from "../src/index.js"
const canvas = TinieAnim.createScreen(500,400)
const renderer = new TinieAnim.Render(canvas.element)
const line = new TinieAnim.Arrow({
    start: new TinieAnim.Coordinates2(30,30),
    end: new TinieAnim.Coordinates2(80,60)
})
renderer.setBackgroundColor(TinieAnim.COLORS.Void)
renderer.addEntities(line)
renderer.render()