//TODO: refactor play and loop func
export function createScreen(parent, width, height, scale = 1){
    const canvas = document.createElement("canvas")
    canvas.height = height
    canvas.width = width
    canvas.style.scale = scale

    const parentElement = parent ?? document.querySelector("body")
    parentElement.insertAdjacentElement("beforeend", canvas)
    return {
        element: canvas,
        ctx: canvas.getContext("2d")
    }
}
export class Render {
    #lastTimestamp = 0
    #isPlaying = false
    #entities = []
    #isRendered = false
    #backgroundColor = "white"
    #updateFunctions = []
    constructor(canvas){
        this.ctx = canvas.getContext("2d")
        this.canvas = canvas
        this.currentId = 0
    }
    getEntities(){
        return this.#entities
    }
    addEntities(...entities){
        for(let e of entities){
            this.#entities.push(e)
            e.setId(this.currentId)
            this.currentId += 1
        }
    }
    removeEntities(...entities){
        for(let e of entities){
            const index = this.#entities.indexOf(e)
            if(index !== -1){
                this.#entities.splice(index,1)
            }
        }
    }
    copy(){
        return this
    }
    render(){
        this.clear()
        this.paintBackgroundColor()
        for(let e of this.#entities){
            try{
                e.draw(this.ctx)
            } catch(error){
                console.error("Can not render this entity",e,"==========\n",error)
                this.#isRendered = false
                return
            }
        }
        this.#isRendered = true
    }
    play(timestamp){
        timestamp = timestamp ?? 0
        const dt = (timestamp - this.#lastTimestamp)/1000
        this.#lastTimestamp = timestamp
        if(this.#isRendered){
            this.#isPlaying = true
            this.#loop(dt)
            this.render()
        } else{
            console.error("You must render first")
        }
    }
    pause(){
        if(this.#isRendered){
            this.#isPlaying = false
        } else{
            console.error("You must render first")
        }
    }
    #loop(dt){
        if(this.#isPlaying){
            for(let func of this.#updateFunctions){
                if(func.isEnabled){
                    try{
                        func(dt)
                    } catch(e){
                        console.error("There is something wrong with updateFunction.\n", e)
                    }
                }
            }
            requestAnimationFrame(this.play.bind(this))
        }
    }
    clear(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
    }
    setBackgroundColor(color){
        this.#backgroundColor = color
    }
    paintBackgroundColor(){
        this.ctx.fillStyle = this.#backgroundColor
        this.ctx.fillRect(
            0,0,
            this.canvas.width, this.canvas.height
        )
    }
    addUpdater(updateFunction){
        if(typeof updateFunction == "function"){
            this.#updateFunctions.push(updateFunction)
            updateFunction.isEnabled = true
        } else{
            console.error("updateFunction must be a function")
        }
    }
    removeUpdater(updateFunction){
        const index = this.#updateFunctions.indexOf(updateFunction)
        if(index !== -1){
            this.#updateFunctions.splice(index,1)
        }else{
            console.warn("updateFunction not found:", updateFunction)
        }
    }
    disableUpdater(updateFunction){
        if(typeof updateFunction == "function"){
            updateFunction.isEnabled = false
        } else{
            console.error("updateFunction must be a function")
        }
    }
    enableUpdater(updateFunction){
        if(typeof updateFunction == "function"){
            updateFunction.isEnabled = true
        } else{
            console.error("updateFunction must be a function")
        }
    }
    async wait(ms){
        return new Promise((resolve)=>{
            setTimeout(resolve, ms)
        })
    }
}