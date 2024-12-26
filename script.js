
// initialize variables
i=''
j=''
drag={
    mouseChangeX:0,
    mouseChangeY:0,
    mouseOldX:0,
    mouseOldY:0
}
panels={
    // min / max size of panels
    sz:{
        elementsList:[100,300],
        keyframe:[280,600],
        timeline:[100,300]
    }
}
addSVG={}
const body = document.querySelector('body')
const svg = document.getElementById('svg')




addSVG.startRect=function () {
    addSVG.vars={
        x:svg.getBoundingClientRect().x*-1,
        y:svg.getBoundingClientRect().y*-1,
        w:0,
        h:0
    }
    i='drag.start();'
    i+='addSVG.vars.x+=window.event.clientX;'
    i+='addSVG.vars.y+=window.event.clientY;'
    i+='console.log(addSVG.vars);'
    i+='this.setAttribute("onmousemove", "drag.move()")'
    body.setAttribute('onmousedown', i)

    i='this.removeAttribute("onmousedown");'
    i+='addSVG.vars.w=window.event.clientX-addSVG.vars.x;'
    i+='addSVG.vars.h=window.event.clientY-addSVG.vars.y;'
    i+='addSVG.createRect();'
    i+='this.removeAttribute("onmousemove");'
    i+='this.removeAttribute("onmouseup");'
    body.setAttribute('onmouseup', i)
}
addSVG.createRect=function () {
    if (addSVG.vars.w<1) {
        addSVG.vars.x+=addSVG.vars.w
        addSVG.vars.w*=-1
    }
    if (addSVG.vars.h<1) {
        addSVG.vars.y+=addSVG.vars.h
        addSVG.vars.h*=-1
    }
    addSVG.vars.x=addSVG.vars.x*window.innerWidth/svg.getBoundingClientRect().width
    addSVG.vars.y=addSVG.vars.y*svg.getBoundingClientRect().height/window.innerHeight
    svg.innerHTML+='<rect x="'+addSVG.vars.x+'" y="'+addSVG.vars.y+'" width="'+addSVG.vars.w+'" height="'+addSVG.vars.h+'" fill="none" stroke="#ff00ff" stroke-width="1" />'
}




// resize panels / 
function resize(i,j) {
    drag.move()
    switch (i) {
        case 0:
            j=parseInt(getCssProperty('sz-elements-list-width'))-drag.mouseChangeX
            if (j<panels.sz.elementsList[0]) {
                j=panels.sz.elementsList[0]
            }
            if (j>panels.sz.elementsList[1]) {
                j=panels.sz.elementsList[1]
            }
            setCssProperty('sz-elements-list-width', j+'px')
            break;
        case 1:
            j=parseInt(getCssProperty('sz-keyframe-width'))+drag.mouseChangeX
            if (j<panels.sz.keyframe[0]) {
                j=panels.sz.keyframe[0]
            }
            if (j>panels.sz.keyframe[1]) {
                j=panels.sz.keyframe[1]
            }
            setCssProperty('sz-keyframe-width', j+'px')
            break;
        case 2:
            j=parseInt(getCssProperty('sz-timeline-height'))+drag.mouseChangeY
            if (j<panels.sz.timeline[0]) {
                j=panels.sz.timeline[0]
            }
            if (j>panels.sz.timeline[1]) {
                j=panels.sz.timeline[1]
            }
            setCssProperty('sz-timeline-height', j+'px')
            break;
        case 3:
            break;
        default:
            break;
    }
}



function zoom(i) {
    
}


drag.start=function () {
    drag.mouseOldX=window.event.clientX
    drag.mouseOldY=window.event.clientY
}
drag.move=function () {
    drag.mouseChangeX=drag.mouseOldX-window.event.clientX
    drag.mouseChangeY=drag.mouseOldY-window.event.clientY
    drag.mouseOldX=window.event.clientX
    drag.mouseOldY=window.event.clientY
}


function getCssProperty(i) {
    return getComputedStyle(document.documentElement).getPropertyValue('--'+i)
}
function setCssProperty(i, j) {
    document.documentElement.style.setProperty('--'+i, j)
}


