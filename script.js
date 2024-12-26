
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




addSVG.start=function (i) {
    addSVG.vars={
        x:svg.getBoundingClientRect().x*-1,
        y:svg.getBoundingClientRect().y*-1
    }
    a='drag.start();'
    a+='addSVG.vars.x+=window.event.clientX;'
    a+='addSVG.vars.y+=window.event.clientY;'
    b=''
    c='this.removeAttribute("onmousedown");'
    switch (i) {
        case 0: //rect
            addSVG.vars.w=svg.getBoundingClientRect().x*-1
            addSVG.vars.h=svg.getBoundingClientRect().y*-1

            b+='drag.move(3);'
            
            c+='addSVG.vars.w+=window.event.clientX-addSVG.vars.x;'
            c+='addSVG.vars.h+=window.event.clientY-addSVG.vars.y;'
            c+='addSVG.createRect();'
            c+='this.removeAttribute("onmousemove");'
            c+='this.removeAttribute("onmouseup");'
            break;
            case 1: //circle
            addSVG.vars.rx=svg.getBoundingClientRect().x*-1
            addSVG.vars.ry=svg.getBoundingClientRect().y*-1
            
            b+='drag.move(4);'

            c+='addSVG.vars.rx+=window.event.clientX;'
            c+='addSVG.vars.ry+=window.event.clientY;'
            c+='addSVG.createCircle();'
            c+='this.removeAttribute("onmousemove");'
            c+='this.removeAttribute("onmouseup");'
            break;
        default:
            break;
    }
    a+='this.setAttribute("onmousemove", "'+b+'");'
    body.setAttribute('onmousedown', a)
    body.setAttribute('onmouseup', c)
}

addSVG.overlay=function (i) {
    switch (i) {
        case 0: //rect
            
            break;
        case 1: //circle
            break;
        default:
            break;
    }
}

addSVG.createRect=function () {
    // convert screen pixels to svg pixels
    addSVG.vars.x=convertPixelToSVG(addSVG.vars.x, false)
    addSVG.vars.y=convertPixelToSVG(addSVG.vars.y, true)
    addSVG.vars.w=convertPixelToSVG(addSVG.vars.w, false)
    addSVG.vars.h=convertPixelToSVG(addSVG.vars.h, true)
    // convert negative height / width values to positive
    if (addSVG.vars.w<0) {
        addSVG.vars.x+=addSVG.vars.w
        addSVG.vars.w*=-1
        console.log(addSVG.vars);
        
    }
    if (addSVG.vars.h<0) {
        addSVG.vars.y+=addSVG.vars.h
        addSVG.vars.h*=-1
    }
    // create rect element
    svg.innerHTML+='<rect x="'+addSVG.vars.x+'" y="'+addSVG.vars.y+'" width="'+addSVG.vars.w+'" height="'+addSVG.vars.h+'" fill="#00ffffa0" />'
}

addSVG.createCircle=function () {
    // convert screen pixels to svg units
    addSVG.vars.x=convertPixelToSVG(addSVG.vars.x, false)
    addSVG.vars.y=convertPixelToSVG(addSVG.vars.y, true)
    addSVG.vars.rx=convertPixelToSVG(addSVG.vars.rx, false)
    addSVG.vars.ry=convertPixelToSVG(addSVG.vars.ry, true)
    //calculate radius
    addSVG.vars.r=Math.sqrt((addSVG.vars.rx-addSVG.vars.x)**2+(addSVG.vars.ry-addSVG.vars.y)**2)
    // create circle element
    svg.innerHTML+='<circle cx="'+addSVG.vars.x+'" cy="'+addSVG.vars.y+'" r="'+addSVG.vars.r+'" fill="#00ffffa0" />'
}




// resize panels / 
function resize(i) {
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



function convertPixelToSVG(i,j) {
    //get svg viewBox width and height
    a=svg.getAttribute('viewBox').split(' ')
    a=[a[2],a[3]]
    if (j) {
        //if vertical
        return i/svg.getBoundingClientRect().width*parseInt(a[0])
    } else {
        //if horizontal
        return i/svg.getBoundingClientRect().height*parseInt(a[1])
    }
}




function zoom(i) {
    svg.style.width=i+'px'
}


drag.start=function () {
    drag.mouseOldX=window.event.clientX
    drag.mouseOldY=window.event.clientY
}
drag.move=function (i,j) {
    drag.mouseChangeX=drag.mouseOldX-window.event.clientX
    drag.mouseChangeY=drag.mouseOldY-window.event.clientY
    drag.mouseOldX=window.event.clientX
    drag.mouseOldY=window.event.clientY

    switch (i) {
        // resize panels
        case 0:
            resize(0)
            break;
        case 1:
            resize(1)
            break;
        case 2:
            resize(2)
            break;
        // creating elements
        case 3:
            //rect
            addSVG.overlay(0)
            break;
        case 4:
            //circle
            addSVG.overlay(1)
            break;
        default:
            break;
    }
}


function getCssProperty(i) {
    return getComputedStyle(document.documentElement).getPropertyValue('--'+i)
}
function setCssProperty(i, j) {
    document.documentElement.style.setProperty('--'+i, j)
}


