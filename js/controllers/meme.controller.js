'use strict'

let gElCanvas
let gCtx
let gLineX = 250


let gFontSizeDelta = 0

function renderMeme() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    const meme = getMeme()
    const elImg = new Image()

    elImg.src = `img/meme-imgs(square)/${meme.selectedImgId}.jpg`
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)

        meme.lines.forEach((line, index) => {
            drawText(line.txt, line.x, line.y, line.color, line.size, line.fillColor, index)
        })
        drawFrame()
    }
    window.addEventListener('resize', resizeCanvas)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth - 40
    renderMeme()
}

function drawText(text, x, y, strokeColor, size, fillColor, selectedLine) {
    const fontSize = size
    gCtx.lineWidth = 2
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = fillColor
    gCtx.font = `${fontSize}px Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y, 400)
    gCtx.strokeText(text, x, y, 400)

    const textMetrics = gCtx.measureText(text)
    const textWidth = textMetrics.width
    gMeme.lines[selectedLine].textWidth = textWidth

}

function onSetLineTxt(txt) {
    setLineTxt(txt)
}

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onColorPicker() {
    console.log('value');

}

function handleSubmit(event) {
    event.preventDefault()
}

function onChangeStrokeColor(strokeColor) {
    setStrokeColor(strokeColor)
}

function onChangeFillColor(fillColor) {
    setFillColor(fillColor)
}

function onFontdecreased() {
    setFontdecreased()
}

function onFontIncreased() {
    setFontIncreased()
}

function onAddLine() {
    if (gMeme.LinesAddedCount === 3) return
    addLine()
    renderMeme()
    setSelectedLine()
}

function onSwitchLine() {
    if (gMeme.LinesAddedCount===0) return
    switchLine()
    drawFrame()
}

function drawFrame() {
    const textHeight = 30;
    const padding = 10


    let selectedLineIdx = gMeme.selectedLineIdx
    let x = gMeme.lines[selectedLineIdx].x
    let y = gMeme.lines[selectedLineIdx].y
    let textWidth = gMeme.lines[selectedLineIdx].textWidth

    gCtx.strokeStyle = 'green'
    gCtx.lineWidth = 2
    gCtx.strokeRect(x - textWidth / 2 - padding, y - textHeight / 2 - padding, textWidth + padding * 2, textHeight + padding * 2)
    renderMeme()
}

// gMeme = {
//     selectedImgId: 5,
//     selectedLineIdx: 0,
//     LinesAddedCount: 0,
//     lines: [
//         {
//             txt: 'Add Text Here',
//             size: 40,
//             color: 'black',
//             fillColor: 'black',
//             textWidth: 0,
//             textHeight: 0,
//             x: 250,
//             y: 100,

//         },
//     ]