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
        gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)


        meme.lines.forEach((line, index) => {
            drawText(line.txt, line.x, line.y, line.color, line.size, line.fillColor, index, line.textAlign, line.font)
        })
        meme.emojis.forEach(emoji => {
            drawEmoji(emoji.emoji, emoji.posX, emoji.posY)
        })
        drawFrame()
        drawEmoji()
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
    const axisX = gElCanvas.width / 2

    const line = selectedLine

    gCtx.lineWidth = 1
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = fillColor
    gCtx.font = `${fontSize}px ${fontType}`
    gCtx.textAlign = `${align}`
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, axisX, y, 400)
    gCtx.strokeText(text, axisX, y, 400)

    const textMetrics = gCtx.measureText(text)
    const textWidth = textMetrics.width

    updateLineData(line, axisX, textWidth)
}

function updateLineData(line, axisX, textWidth) {
    setLineData(line, axisX, textWidth)
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
    console.log(offsetX, gMeme.lines[0].x, gMeme.lines[0].textWidth);




    const clickedLine = gMeme.lines.findIndex(line => {
        return (
            offsetX >= line.textWidth - line.x && offsetX <= line.x + line.textWidth &&
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

function onSaveMeme() {
    const elGallery = document.querySelector('.gallery')
    const eleditor = document.querySelector('.editor')

    elGallery.classList.remove('hidden')
    eleditor.classList.add('hidden')

    saveMeme()
}

function onDrawEmoji(span) {
    const emoji = span.getAttribute('data-emoji')
    setEmoji(emoji)
}

function setEmoji(emoji) {

    const axisX = gElCanvas.width / 2 + getRandomInt(-100, 100)
    const axisY = gElCanvas.height / 2
    const emojiSelected = emoji

    gMeme.emojis.push({ emoji: emojiSelected, posX: axisX, posY: axisY })
    renderMeme()
}

function drawEmoji(emoji, axisX, axisY) {

    gCtx.font = '2rem Arial'
    gCtx.textBaseline = 'top'
    gCtx.fillText(emoji, axisX, axisY)

}


////////////////////////////////////////

function onDown(ev) {
    //* Get the ev pos from mouse or touch
    const pos = getEvPos(ev)

    if (!isCircleClicked(pos)) return

    setCircleDrag(true)

    //* Save the pos we start from
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const { isDrag } = getCircle()
    if (!isDrag) return

    const pos = getEvPos(ev)
    //* Calc the delta, the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveCircle(dx, dy)
    //* Save the last pos so we will remember where we`ve been and move accordingly
    gStartPos = pos
    //* The canvas (along with the circle) is rendered again after every move
    renderCanvas()
}

function onUp() {
    setCircleDrag(false)
    document.body.style.cursor = 'grab'
}

//* Handle the listeners
function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //* Listen for resize ev
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}



function getEvPos(ev) {

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        //* Prevent triggering the mouse screen dragging event
        ev.preventDefault()
        //* Gets the first touch point
        ev = ev.changedTouches[0]
        //* Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}
