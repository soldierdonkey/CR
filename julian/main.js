mouseX = 0
mouseY = 0
mouseDown = false
document.getElementById("main").addEventListener("mousemove", e => {
    mouseX = e.clientX
    mouseY = e.clientY
})
document.body.addEventListener("mousedown", () => {
    mouseDown = true
})
document.body.addEventListener("mouseup", () => {
    mouseDown = false
})
drag = sprite => {
    document.body.addEventListener("mousemove", () => {
        if(sprite.active) {
            sprite.x = Math.max(Math.min(mouseX-sprite.width/2, sprite.maxx-sprite.width), sprite.minx)
            sprite.y = Math.max(Math.min(mouseY-sprite.height/2, sprite.maxy-sprite.height), sprite.miny)
            for(let i of sprite._onmove) {
                if( Math.random() <= i[1]) i[0]()
            }
        }
    })
}
class Sprite {
    constructor (id) {
        this.style = this.style
        this.alive = true
        this._width = document.getElementById(id).offsetWidth
        this._height = document.getElementById(id).offsetHeight
        this.id = id
        this.active = false
        this.maxx = document.getElementById("main").offsetWidth
        this.maxy = document.getElementById("main").offsetHeight
        this.minx = 0
        this.miny = 0
        this._x = document.getElementById(id).style.left,
        this._y = document.getElementById(id).style.top,
        this.click = fn => {document.getElementById(id).addEventListener("click", fn);  return this}
        this.mouseover = fn => {document.getElementById(id).addEventListener("mouseover", fn);  return this}
        this.mousemove = fn => {document.getElementById(id).addEventListener("mousemove", fn);  return this}
        this.mousedown = fn => {document.getElementById(id).addEventListener("mousedown", fn);  return this}
        this.mouseup = fn => {document.getElementById(id).addEventListener("mouseup", fn); return this}
        this.onmove = (fn, p) => {this._onmove.push([fn, 1/p])}
        this._onmove = []
        setTimeout(() => {
            
            this.mousedown(() => {
                this.active = true
                console.log("up")
            })
            global.mouseup(() => {
                this.active = false
                console.log("down")
            })
        }, 0)
    }
    get x() {
        return parseInt(document.getElementById(this.id).style.left)
    }
    set x(n) {
        document.getElementById(this.id).style.left = n+"px"
    }
    get y() {
        return parseInt(document.getElementById(this.id).style.top)
    }
    set y(n) {
        document.getElementById(this.id).style.top = n+"px"
    }
    get width() {
        return document.getElementById(this.id).offsetWidth
    }
    set width(n) {
        document.getElementById(this.id).style.width = n+"px"
    }
    get height() {
        return document.getElementById(this.id).offsetHeight
    }
    set height(n) {
        document.getElementById(this.id).style.height = n+"px"
    }
    kill() {
        this.active = false
        document.getElementById(this.id).remove()
        this.alive = false
        return null
    }
    text(text) {
        document.getElementById(this.id).innerText = text
        return this
    }
    moveTo(x, y, t, handler) {
        if(!t){
            this.y=y
            this.x=x
            return this
        }
        let totalX = x-this.x
        let totalY = y-this.y
        let deltaX = totalX/t
        let deltaY = totalY/t
        console.log(deltaX, deltaY)
        let tMove = time => {setTimeout(() => {
            for(let i of this._onmove) {
                if( Math.random() <= i[1]) i[0]()
            }
            this.x = x-(totalX*(time)/t)
            this.y = y-(totalY*(time)/t)
            if(time != 0){
                tMove(time-1)
            }
            else {
                this.y=y
                this.x=x
                handler(this)
            }
        }), 1}
        tMove(t)
        return this
    }
    hide(toggle = true) {
        document.getElementById(this.id).hidden = toggle
        return this
    }
    unHide() {
        document.getElementById(this.id).hidden = false
        return this
    }
    toggleHide() {
        document.getElementById(this.id).hidden = !document.getElementById(this.id).hidden
    }
    collidesWith(sprites, handler) {
        for(let i of sprites) {
            if(i)
            if(collision(this, i)) {
                handler(i)
            }
        }
        return this
    }
    deSprite(value = false) {
        this.alive = value
    }
    reSprite() {
        this.alive = true
    }
}
createSprite = (parent, id, type, x, y) => {
    let tmp = document.createElement("div")
    tmp.classList.add("base")
    type.split(" ").forEach(classes => {
        tmp.classList.add(classes)
    })
    tmp.id = id
    tmp.style.top = y+"px"
    tmp.style.left = x+"px"
    document.getElementById(parent).appendChild(tmp)
    return new Sprite(id)
}
createEle = (parent, id, type, x, y) => {
    let tmp = document.createElement("div")
    tmp.classList.add("base")
    type.split(" ").forEach(classes => {
      tmp.classList.add(classes)
    })
    tmp.id = id
    tmp.style.top = y
    tmp.style.left = x
    document.getElementById(parent).appendChild(tmp)
    return id
}
collision = (a, b) => {
    if(a.alive && b.alive) {
        if(a.x + a.width >= b.x && a.x <= b.x + b.width) {
            if(a.y + a.height >= b.y && a.y <= b.y + b.height) {
                return true
            }
        }
    }
    return false
}
global = new Sprite("main")
randFn = fn => {
    fn[Math.floor(Math.random()*fn.length)]()
}
currentUUID = -1
UUID = () => {
    currentUUID+=1
    return "id_" + currentUUID
}

//CODE
C = []
current = 0
global.click(() => {
    C[current].moveTo(C[current].x+1400, C[current].y, 100, () => {})
    current+=1
})
C.push(createSprite("main", UUID(), "C1", 25-1400, 170))
C.push(createSprite("main", UUID(), "C2", 240-1400, 130))
C.push(createSprite("main", UUID(), "C3", 500-1400, 170))
C.push(createSprite("main", UUID(), "C4", 900-1400, 120))
C.push(createSprite("main", UUID(), "C5", 1110-1400, 170))
