'use strict'

const FONT_MAX_SIZE = 55
const FONT_MIN_SIZE = 15

let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Add Text Here',
            size: 40,
            color: 'black'
        }
    ]
}

function getMeme() {
    let meme = gMeme
    return meme
}

function setLineTxt(txt) {
    gMeme.lines[0].txt = txt
    renderMeme()
}

function setStrokeColor(strokeColor) {
    gMeme.lines[0].color = strokeColor
    renderMeme()
}

function setImg(imageID) {
    gMeme.selectedImgId = imageID
}

function setFontdecreased() {
    if (gMeme.lines[0].size === FONT_MIN_SIZE) return
    gMeme.lines[0].size--
    renderMeme()
}


function setFontIncreased(){
    if (gMeme.lines[0].size === FONT_MAX_SIZE) return
    gMeme.lines[0].size++
    renderMeme()
}
