'use strict'

const FONT_MAX_SIZE = 50
const FONT_MIN_SIZE = 10

let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    LinesAddedCount: 0,
    savedImage: '',
    selectedEmojisIdx: 0,
    emojisAddedCount: 0,
    emojis: [],
    lines: [
        {
            txt: 'Add Text Here',
            size: 20,
            color: '#000000',
            fillColor: '#000000',
            textWidth: 325,
            textHeight: 0,
            textAlign: 'center',
            x: 150,
            y: 40,
            font: 'Arial',
            isDrag: false
        },
    ]
}

let gSavedMemes = []

function setLineData(line, textWidth) {
    gMeme.lines[line].textWidth = textWidth
    gMeme.lines[line].textHeight = gMeme.lines[line].size + 6
}

function addLine() {
    if (gMeme.lines.length === 3) return

    const newLine = {
        txt: 'Add Text Here',
        size: 20,
        color: '#000000',
        fillColor: '#000000',
        textWidth: 0,
        textHeight: 0,
        textAlign: 'center',
        x: 150,
        y: 100,
        font: 'Arial',
        isDrag: false
    }
    gMeme.lines.push(newLine)

    if (gMeme.LinesAddedCount === 2) return
    gMeme.LinesAddedCount++
    gMeme.selectedLineIdx++
}

function getMeme() {
    let meme = gMeme
    return meme
}

function setImg(imageID) {
    gMeme.selectedImgId = imageID
    const elGallery = document.querySelector('.gallery')
    const eleditor = document.querySelector('.editor')

    elGallery.classList.add('hidden')
    eleditor.classList.remove('hidden')

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


function switchLine() {
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

function deleteLine() {
    if (gMeme.LinesAddedCount < 1) return
    const idx = gMeme.selectedLineIdx
    gMeme.lines.splice(idx, 1)

    gMeme.LinesAddedCount--
    gMeme.selectedLineIdx = 0
    renderMeme()
}

function alignLine(direction) {
    const line = gMeme.selectedLineIdx

    switch (direction) {
        case 'left':
            gMeme.lines[line].x = 300
            break
        case 'center':
            gMeme.lines[line].x = 200
            break
        case 'right':
            gMeme.lines[line].x = 100
            break
    }
     renderMeme()
}

function selectedLineByLineClick(clickedLine) {
    gMeme.selectedLineIdx = clickedLine
}

function setFontType(font) {
    const line = gMeme.selectedLineIdx
    gMeme.lines[line].font = font
    renderMeme()
}

function saveMeme() {
    gSavedMemes = loadFromStorage('memes')
    const savedMeme = JSON.parse(JSON.stringify(gMeme))
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')
    savedMeme.savedImage = imgDataUrl
    gSavedMemes.unshift(savedMeme)

    gMeme = {
        selectedImgId: 5,
        selectedLineIdx: 0,
        LinesAddedCount: 0,
        savedImage: '',
        selectedEmojisIdx: 0,
        emojisAddedCount: 0,
        emojis: [],
        lines: [
            {
                txt: 'Add Text Here',
                size: 20,
                color: '#000000',
                fillColor: '#000000',
                textWidth: 325,
                textHeight: 0,
                textAlign: 'center',
                x: 0,
                y: 100,
                font: 'Arial',
                isDrag: false
            },
        ]
    }
    _saveToStorage()
}

function _saveToStorage() {
    saveToStorage('memes', gSavedMemes)

}

function setEmoji(emoji) {

    const axisX = gElCanvas.width / 2 + getRandomInt(-200, 200)
    const axisY = gElCanvas.height / 2 + getRandomInt(-200, 200)
    const emojiSelected = emoji

    gMeme.emojis.push({ emoji: emojiSelected, posX: axisX, posY: axisY })
    renderMeme()
}


