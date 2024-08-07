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
            drawText(line.txt, line.x, line.y, line.color, line.size, line.fillColor, index, line.textAlign, line.font)
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

function drawText(text, x, y, strokeColor, size, fillColor, selectedLine, textAlign, font) {
    const fontSize = size
    const align = textAlign
    const fontType = font

    gCtx.lineWidth = 1
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = fillColor
    gCtx.font = `${fontSize}px ${fontType}`
    gCtx.textAlign = `${align}`
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
    inputFieldsDataFormUpdated()
}

function onSwitchLine() {
    if (gMeme.LinesAddedCount === 0) return
    switchLine()
    drawFrame()
    inputFieldsDataFormUpdated()
}

function drawFrame() {
    const textHeight = 30;
    const padding = 10

    let selectedLineIdx = gMeme.selectedLineIdx
    let x = gMeme.lines[selectedLineIdx].x
    let y = gMeme.lines[selectedLineIdx].y
    let textWidth = gMeme.lines[selectedLineIdx].textWidth

    gCtx.strokeStyle = 'orange'
    gCtx.lineWidth = 2
    gCtx.strokeRect(x - textWidth / 2 - padding, y - textHeight / 2 - padding, textWidth + padding * 2, textHeight + padding * 2)
}

function OnDeleteLine() {
    deleteLine()
}

function onAlignLine(direction) {
    alignLine(direction)
}

function onMouseClick(ev) {
    const { offsetX, offsetY, clientX, clientY } = ev
    // console.log(offsetX, gMeme.lines[0].y, gMeme.lines[0].textWidth);

    const clickedLine = gMeme.lines.findIndex(line => {
        return (
            offsetX >= line.x - 150 && offsetX <= line.x + line.textWidth &&
            offsetY >= line.y - 40 && offsetY < line.y + 30
        )
    })
    if (clickedLine >= 0) {
        selectedLineByLineClick(clickedLine)
        drawFrame()
        renderMeme()
        inputFieldsDataFormUpdated()

    }

}

function inputFieldsDataFormUpdated() {
    const selectedLineIdx = gMeme.selectedLineIdx
    const selectedLine = gMeme.lines[selectedLineIdx]

    const { txt, color, fillColor, font } = selectedLine
    document.querySelector('.txt-input').value = txt
    document.querySelector('.color-picker-fill-input').value = fillColor
    document.querySelector('.color-picker-input').value = color
    document.querySelector('.font-type').value = font
}

function onSelectFontType(font) {
    setFontType(font)
}