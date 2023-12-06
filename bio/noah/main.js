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

//code
var stages = {
    _ready : false,
    get ready() {
        return this._ready
    },
    set ready(val) {
        if(val == true) {
            document.getElementById(cont.id).classList.add("ECONTINUE")
            document.getElementById(cont.id).classList.remove("CONTINUE")
        }
        else {
            document.getElementById(cont.id).classList.add("CONTINUE")
            document.getElementById(cont.id).classList.remove("ECONTINUE")
        }
        this._ready = val
    },
    text : null,
    glucose : {
        GLUCOSE : null,
        ATP : [],
        ADP : [],
        ADPstored : false,
        ADPstoragecounter : 0,
        P : [],
        PYRUVATE0 : null,
        PYRUVATE1 : null,
        H : [],
        NAD0 : null,
        NAD1 : null,
        NADH0 : null,
        NADH1 : null,
    },
    link : {
        NAD0 : null,
        NAD1 : null,
        NADH0 : null,
        NADH1 : null,
        ACETYL0 : null,
        ACETYL1 : null,
        CO20 : null,
        CO21 : null,
        COA0 : null,
        COA1 : null,
        ACETYLCOA0 : null,
        ACETYLCOA1 : null,
    },
}
// stages.ready = true
// glucose(0.1)
glucose(-1)
current = 0
cont = createSprite("main", UUID(), "sprite CONTINUE", 650, 370).click(() => {
    if(stages.ready) {
        switch (current) {
            case 0:
                glucose(0)
            break
            case 1:
                glucose(1)
            break
            case 2:
                glucose(2)
            break
            case 3:
                glucose(3)
            break
            case 4:
                glucose(4)
            break
            case 5:
                glucose(5)
            break
            case 6:
                glucose(6)
            break
            case 7:
                glucose(7)
            break
            case 8:
                glucose(8)
            break
            case 9:
                glucose(9)
            break
            case 10:
                glucose(10)
            break
            case 11:
                link(0)
            break
            case 12:
                link(1)
            break
            case 13:
                link(2)
            break
            case 14:
                link(3)
            break
            case 15:
                link(4)
            break
            case 16:
                link(5)
            break
            case 17:
                link(6)
            break
            case 18:
                link(7)
            break
            case 19:
                link(8)
            break
            case 20:
                link(9)
            break
            case 21:
                link(10)
                cont.kill()
            break
            default:
                throw new Error("Invalid Stage: " + stage)
        }
        current+=1
        stages.ready = false
    }
})
function glucose(stage) {
    switch (stage) {
        case -1:
            text = createSprite("main", UUID(), "text", 400, -200).text("Hello! I will walk you through Glycolysis and the Link reaction (Pyruvate decarboxylation). Press continue to continue to the next step!").moveTo(400, 100, 100, () => {stages.ready = true})
        break
        case 0:
            text.moveTo(400, -200, 100, _ => {
                _.kill()
                text = createSprite("main", UUID(), "text", -600, 380).text("Here we have a Glucose molecule inside the cytoplasm. This is a carbohydrate that contains 6 carbon atoms. During Glycolysis, this gets broken down into 2 Pyruvates, with 3 carbons each.").moveTo(100, 380, 100, () => {stages.ready = true})
            })
            stages.glucose.GLUCOSE = createSprite("main", UUID(), "sprite GLUCOSE", 100, 100)
        break
        case 1:
            text.moveTo(-600, 380, 100, _ => {
                _.kill()
                text = createSprite("main", UUID(), "text", -600, 370).text("Now 2 ATPs arrive. ATPs store chemical energy, and release it by breaking bonds betwean one of their Phosphate groups, denoted by a P. When this happens, the ATP turns into ADP. Drag these into the glucose molecule to attach their phosphate groups onto the glucose. While this loses energy in the short term, it is an investment.").moveTo(100, 370, 100)
            })
            stages.glucose.ATP.push(createSprite("main", UUID(), "sprite ATP", 434, 100))
            stages.glucose.ATP.push(createSprite("main", UUID(), "sprite ATP", 434, 164))
            for(let k = 0; k < stages.glucose.ATP.length; k++) {
                let i = stages.glucose.ATP[k]
                drag(i)
                i.mousemove(() => {
                    i.collidesWith([stages.glucose.GLUCOSE], j => {
                        stages.glucose.ADP.push(createSprite("main", UUID(), "sprite ADP", i.x, i.y).moveTo(434, 164, 200, _ => {
                            if(stages.glucose.ADPstored == false){
                                _.moveTo(434, 228, 200, () => {})
                            }
                            else {
                                stages.ready = true
                            }
                            stages.glucose.ADPstored = true
                        }))
                        if(stages.glucose.P.length == 0) {
                            stages.glucose.P.push(createSprite("main", UUID(), "sprite P", 100, 100))
                        }
                        else {
                            stages.glucose.P.push(createSprite("main", UUID(), "sprite P", 324, 100))
                        }
                        i.kill()
                    })
                })
            }
        break
        case 2:
            text.moveTo(-600, 370, 100, _ => {
                _.kill()
                text = createSprite("main", UUID(), "text", -600, 370).text("The glucose is ready to split into two. Click it to break it into 2 trioses!").moveTo(100, 370, 100)
            })
            stages.glucose.GLUCOSE.click(() => {
                stages.glucose.GLUCOSE.kill()
                stages.glucose.PYRUVATE0 = createSprite("main", UUID(), "sprite PYRUVATE", 132, 100)
                stages.glucose.PYRUVATE1 = createSprite("main", UUID(), "sprite PYRUVATE", 260, 100)
                stages.ready = true
            })
        break
        case 3:
            text.moveTo(-600, 370, 100, _ => {
                _.kill()
                text = createSprite("main", UUID(), "text", -600, 370).text("Now, 2 phosphate groups appear. Remove the electrons and the H+ from the trioses using NAD+, an electron carrier. While you remove the spare electrons and reduce the NAD+ into NADH, phosphate groups attach to the trioses.").moveTo(100, 370, 100)
            })
            stages.glucose.P.push(
                createSprite("main", UUID(), "sprite P", 68, 260),
                createSprite("main", UUID(), "sprite P", 356, 260),
            )
            stages.glucose.H = [
                createSprite("main", UUID(), "sprite H", 100, 260),
                createSprite("main", UUID(), "sprite H", 324, 260),
            ]
            stages.glucose.NAD0 = createSprite("main", UUID(), "sprite NAD", 434, 100)
            stages.glucose.NAD1 = createSprite("main", UUID(), "sprite NAD", 434, 132)
            drag(stages.glucose.NAD0)
            drag(stages.glucose.NAD1)
            stages.glucose.NAD0.mousemove(() => {
                stages.glucose.NAD0.collidesWith([...stages.glucose.P], p => {
                    stages.glucose.NAD0.collidesWith([...stages.glucose.H], h => {
                        stages.glucose.NAD0.collidesWith([stages.glucose.PYRUVATE0, stages.glucose.PYRUVATE1], _ => {
                            stages.glucose.NADH0 = createSprite("main", UUID(), "sprite NADH", stages.glucose.NAD0.x, stages.glucose.NAD0.y)
                            stages.glucose.NAD0.kill()
                            h.kill()
                            if(p.x < 100) p.moveTo(100, 260, 100, () => {})
                            else p.moveTo(324, 260, 100, () => {})
                            stages.glucose.NADH0.moveTo(434, 100, 100, () => {})
                            if(!stages.glucose.NAD0.alive && !stages.glucose.NAD1.alive) {
                                stages.ready = true
                            }
                        })
                    })
                })
            })
            stages.glucose.NAD1.mousemove(() => {
                stages.glucose.NAD1.collidesWith([...stages.glucose.P], p => {
                    stages.glucose.NAD1.collidesWith([...stages.glucose.H], h => {
                        stages.glucose.NAD1.collidesWith([stages.glucose.PYRUVATE0, stages.glucose.PYRUVATE1], _ => {
                            stages.glucose.NADH1 = createSprite("main", UUID(), "sprite NADH", stages.glucose.NAD1.x, stages.glucose.NAD1.y)
                            stages.glucose.NAD1.kill()
                            h.kill()
                            if(p.x < 100) p.moveTo(100, 260, 100, () => {})
                            else p.moveTo(324, 260, 100, () => {})
                            stages.glucose.NADH1.moveTo(434, 132, 100, () => {})
                            if(!stages.glucose.NAD0.alive && !stages.glucose.NAD1.alive) {
                                stages.ready = true
                            }
                        })
                    })
                })
            })
        break
        case 4:
            text.moveTo(-600, 370, 100, _ => {
                _.kill()
                text = createSprite("main", UUID(), "text", -600, 370).text("Now, 2 ADPs appear ready to pick up the phosphate groups on the trioses, transfering chemical energy to turn low energy ADPs into high energy ATPs. Once you remove the phosphate groups from the triose, you've made pyruvate, completing Glycolysis. If you've managed to get to this point, your energy investment has paid off and you have gained net 2 ATPs woth of energy.").moveTo(100, 370, 100)
            })
            stages.glucose.ATP = []
            stages.glucose.ADP.push(createSprite("main", UUID(), "sprite ADP", 562, 164))
            stages.glucose.ADP.push(createSprite("main", UUID(), "sprite ADP", 562, 228))
            let positions = [
                {x : 0, y : 0},
                {x : 0, y : 0},
                {x : 0, y : 0},
                {x : 0, y : 0},
            ]
            for(let k = 0; k < stages.glucose.ADP.length; k++) {
                let i = stages.glucose.ADP[k]
                positions[k].x = i.x
                positions[k].y = i.y
                drag(i)
                i.mousemove(() => {
                    i.collidesWith([...stages.glucose.P], p => {
                        p.kill()
                        stages.glucose.ATP.push(createSprite("main", UUID(), "sprite ATP", i.x, i.y).moveTo(434, 164, 100, (ATP) => {
                            ATP.moveTo(positions[k].x, positions[k].y, 100, () => {})
                            stages.glucose.ADPstoragecounter+=1
                            if(stages.glucose.ADPstoragecounter == 4) {
                                stages.ready = true
                            }
                        }))
                        i.kill()
                    })
                })
            }
        break
        case 5:
            text.moveTo(-600, 370, 100, _ => {
                _.kill()
                text = createSprite("main", UUID(), "text", -600, 370).text("But there's more! We have to put the products into the final place! The electrons, which are stored in the NADH, will travel into the ETC, where even more ATP is created!").moveTo(100, 370, 100, () => {stages.ready = true})
            })
        break
        case 6:
            for(let i of [stages.glucose.NADH0, stages.glucose.NADH1]) {
                i.moveTo(i.x, -200, 100, _ => {
                    _.kill()
                    stages.ready = true
                })
            }
        break
        case 7:
            text.moveTo(-600, 370, 100, _ => {
                _.kill()
                text = createSprite("main", UUID(), "text", -600, 370).text("The ATP then goes to repeat this reaction or wherever else it is needed.").moveTo(100, 370, 100, () => {stages.ready = true})
            })
        break
        case 8:
            for(let i of [...stages.glucose.ATP]) {
                i.moveTo(i.x, -200, 100, _ => {
                    _.kill()
                    stages.ready = true
                })
            }
        break
        case 9:
            text.moveTo(-600, 370, 100, _ => {
                _.kill()
                text = createSprite("main", UUID(), "text", -600, 370).text("The pyruvate moves to the mitochondria, which is arobic and therefore has free oxygen floating around. Here, the pyruvate encounters more NAD+.").moveTo(100, 370, 100, () => {stages.ready = true})
            })
        break
        case 10:
            stages.link.NAD0 = createSprite("main", UUID(), "sprite NAD", 434, -200).moveTo(434, 100, 100, () => {stages.ready = true})
            stages.link.NAD1 = createSprite("main", UUID(), "sprite NAD", 434, -168).moveTo(434, 132, 100, () => {stages.ready = true})
        break
        default:
            throw new Error("Invalid Stage: " + stage)
    }
}
function link(stage) {
    switch (stage) {
        case 0:
            text.moveTo(-600, 370, 100, _ => {
                _.kill()
                text = createSprite("main", UUID(), "text", -600, 370).text("Use the NAD+ to take electrons from the pyruvates.").moveTo(100, 370, 100)
            })
            drag(stages.link.NAD0)
            drag(stages.link.NAD1)
            stages.link.NAD0.mousemove(() => {
                stages.link.NAD0.collidesWith([stages.glucose.PYRUVATE0, stages.glucose.PYRUVATE1], _ => {
                    stages.link.NADH0 = createSprite("main", UUID(), "sprite NADH", stages.link.NAD0.x, stages.link.NAD0.y).moveTo(434, 100, 100, () => {
                        if(!stages.link.NAD0.alive && !stages.link.NAD1.alive) {
                            stages.ready = true
                        }
                    })
                    stages.link.NAD0.kill()
                    _.deSprite()
                })
            })
            stages.link.NAD1.mousemove(() => {
                stages.link.NAD1.collidesWith([stages.glucose.PYRUVATE0, stages.glucose.PYRUVATE1], _ => {
                    stages.link.NADH1 = createSprite("main", UUID(), "sprite NADH", stages.link.NAD1.x, stages.link.NAD1.y).moveTo(434, 132, 100, () => {
                        if(!stages.link.NAD0.alive && !stages.link.NAD1.alive) {
                            stages.ready = true
                        }
                    })
                    stages.link.NAD1.kill()
                    _.deSprite()
                })
            })
        break
        case 1:
            text.moveTo(-600, 370, 100, _ => {
                _.kill()
                text = createSprite("main", UUID(), "text", -600, 370).text("Because of the oxygen floating around in the mitochondria, 1 carbon per pyruvate gets oxidized into CO2, oxidizing the 3-carbon pyruvate into a 2-carbon acetyl. Click on the pyruvates to oxidize them.").moveTo(100, 370, 100)
            })
            stages.glucose.PYRUVATE0.reSprite()
            stages.glucose.PYRUVATE1.reSprite()
            stages.glucose.PYRUVATE0.click(() => {
                stages.link.ACETYL0 = createSprite("main", UUID(), "sprite ACETYL", stages.glucose.PYRUVATE0.x, stages.glucose.PYRUVATE0.y+64)
                stages.link.CO20 = createSprite("main", UUID(), "sprite CO2", stages.glucose.PYRUVATE0.x-16, stages.glucose.PYRUVATE0.y).moveTo(562, 100, 100, () => {})
                stages.glucose.PYRUVATE0.kill()
                if(!stages.glucose.PYRUVATE0.alive && !stages.glucose.PYRUVATE1.alive) {
                    stages.ready = true
                }
            })
            stages.glucose.PYRUVATE1.click(() => {
                stages.link.ACETYL1 = createSprite("main", UUID(), "sprite ACETYL", stages.glucose.PYRUVATE1.x, stages.glucose.PYRUVATE1.y+64)
                stages.link.CO21 = createSprite("main", UUID(), "sprite CO2", stages.glucose.PYRUVATE1.x-16, stages.glucose.PYRUVATE1.y).moveTo(562, 132, 100, () => {})
                stages.glucose.PYRUVATE1.kill()
                if(!stages.glucose.PYRUVATE0.alive && !stages.glucose.PYRUVATE1.alive) {
                    stages.ready = true
                }
            })
        break
        case 2:
            text.moveTo(-600, 370, 100, _ => {
                _.kill()
                text = createSprite("main", UUID(), "text", -600, 370).text("Now an enzyme called COA comes into the equation.").moveTo(100, 370, 100, () => {stages.ready = true})
            })
            stages.link.COA0 = createSprite("main", UUID(), "sprite COA", 434, 164)
            stages.link.COA1 = createSprite("main", UUID(), "sprite COA", 498, 164)
        break
        case 3:
            text.moveTo(-600, 370, 100, _ => {
                _.kill()
                text = createSprite("main", UUID(), "text", -600, 370).text("Drag the COA into the acetyl to turn it into acetly-COA!").moveTo(100, 370, 100)
            })
            drag(stages.link.COA0)
            drag(stages.link.COA1)
            stages.link.COA0.mousemove(() => {
                stages.link.COA0.collidesWith([stages.link.ACETYL0, stages.link.ACETYL1], _ => {
                    stages.link.ACETYLCOA0 = createSprite("main", UUID(), "sprite ACETYL-COA", _.x, _.y-128)
                    stages.link.COA0.kill()
                    _.kill()
                    if(!stages.link.COA0.alive && !stages.link.COA1.alive) {
                        stages.ready = true
                    }
                })
            })
            stages.link.COA1.mousemove(() => {
                stages.link.COA1.collidesWith([stages.link.ACETYL0, stages.link.ACETYL1], _ => {
                    stages.link.ACETYLCOA1 = createSprite("main", UUID(), "sprite ACETYL-COA", _.x, _.y-128)
                    stages.link.COA1.kill()
                    _.kill()
                    if(!stages.link.COA0.alive && !stages.link.COA1.alive) {
                        stages.ready = true
                    }
                })
            })
        break
        case 4:
            text.moveTo(-600, 370, 100, _ => {
                _.kill()
                text = createSprite("main", UUID(), "text", -600, 370).text("Now the link reaction is done, but we have to deal with the products. We breathe out the CO2").moveTo(100, 370, 100, () => {stages.ready = true})
            })
        break
        case 5:
            for(let i of [stages.link.CO20, stages.link.CO21]) {
                i.moveTo(i.x, -200, 100, _ => {
                    _.kill()
                    stages.ready = true
                })
            }
        break
        case 6:
            text.moveTo(-600, 370, 100, _ => {
                _.kill()
                text = createSprite("main", UUID(), "text", -600, 370).text("As previously, the NADH goes into the ETC.").moveTo(100, 370, 100, () => {stages.ready = true})
            })
        break
        case 7:
            for(let i of [stages.link.NADH0, stages.link.NADH1]) {
                i.moveTo(i.x, -200, 100, _ => {
                    _.kill()
                    stages.ready = true
                })
            }
        break
        case 8:
            text.moveTo(-600, 370, 100, _ => {
                _.kill()
                text = createSprite("main", UUID(), "text", -600, 370).text("Last but not least, the acetyl-COA travels into the Krebs Cycle.").moveTo(100, 370, 100, () => {stages.ready = true})
            })
        break
        case 9:
            for(let i of [stages.link.ACETYLCOA0, stages.link.ACETYLCOA1]) {
                i.moveTo(i.x, -300, 100, _ => {
                    _.kill()
                    stages.ready = true
                })
            }
        break
        case 10:
            text.moveTo(-600, 370, 100, _ => {
                _.kill()
                text = createSprite("main", UUID(), "text", -600, 370).text("Thank you for viewing this infographic!").moveTo(100, 370, 100)
            })
        break
        default:
            throw new Error("Invalid Stage: " + stage)
    }
}