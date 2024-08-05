'use strict'

const FONT_MAX_SIZE = 55
const FONT_MIN_SIZE = 10

let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    LinesAddedCount: 0,
    lines: [
        {
            txt: 'Add Text Here',
            size: 40,
            color: 'black',
            fillColor: 'black',
            textWidth: 0,
            textHeight: 0,
            x: 250,
            y: 100,

        },
    ]
}

let gLineY = 250

function addLine() {

    const newLine = {
        txt: 'Add Text Here',
        size: 40,
        color: 'black',
        fillColor: 'black',
        textWidth: 0,
        textHeight: 0,
        x: 250,
        y: gLineY,
    }
    gMeme.lines.push(newLine)
    gLineY += 150
}

function getMeme() {
    let meme = gMeme
    return meme
}

function setImg(imageID) {
    gMeme.selectedImgId = imageID
}

function setLineTxt(txt) {
    if (gMeme.selectedLineIdx === 0) gMeme.lines[0].txt = txt
    else if (gMeme.selectedLineIdx === 1) gMeme.lines[1].txt = txt
    else gMeme.lines[2].txt = txt
    renderMeme()
}

function setStrokeColor(strokeColor) {
    if (gMeme.selectedLineIdx === 0) gMeme.lines[0].color = strokeColor
    else if (gMeme.selectedLineIdx === 1) gMeme.lines[1].color = strokeColor
    else gMeme.lines[2].color = strokeColor

    renderMeme()
}


function setFillColor(fillColor) {

    if (gMeme.selectedLineIdx === 0) gMeme.lines[0].fillColor = fillColor
    else if (gMeme.selectedLineIdx === 1) gMeme.lines[1].fillColor = fillColor
    else gMeme.lines[2].fillColor = fillColor

    renderMeme()
}


function setFontdecreased() {
    if (gMeme.selectedLineIdx === 0 && gMeme.lines[0].size !== FONT_MIN_SIZE) gMeme.lines[0].size--
    if (gMeme.selectedLineIdx === 1 && gMeme.lines[1].size !== FONT_MIN_SIZE) gMeme.lines[1].size--
    if (gMeme.selectedLineIdx === 2 && gMeme.lines[2].size !== FONT_MIN_SIZE) gMeme.lines[2].size--

    renderMeme()
}


function setFontIncreased() {
    if (gMeme.selectedLineIdx === 0 && gMeme.lines[0].size !== FONT_MAX_SIZE) gMeme.lines[0].size++
    if (gMeme.selectedLineIdx === 1 && gMeme.lines[1].size !== FONT_MAX_SIZE) gMeme.lines[1].size++
    if (gMeme.selectedLineIdx === 2 && gMeme.lines[2].size !== FONT_MAX_SIZE) gMeme.lines[2].size++

    renderMeme()
}

function setSelectedLine() {
    if (gMeme.LinesAddedCount === 2) return
    gMeme.LinesAddedCount++
    gMeme.selectedLineIdx++
}

function switchLine() {
    console.log(gMeme.LinesAddedCount);

    if (gMeme.LinesAddedCount === 1) {
        if (gMeme.selectedLineIdx === 1) gMeme.selectedLineIdx--
        else gMeme.selectedLineIdx = 1
    }

    if (gMeme.LinesAddedCount === 2) {
        if (gMeme.selectedLineIdx <= 2) gMeme.selectedLineIdx--
        if (gMeme.selectedLineIdx === -1) gMeme.selectedLineIdx = 2
    }

    renderMeme()
}
