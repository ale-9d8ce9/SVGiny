
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
    sz:{
        elementsList:[100,300],
        keyframe:[280,600],
        timeline:[100,300]
    }
}
const body = document.querySelector('body')




// resize panels
function resize(i) {
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
        default:
            break;
    }
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


