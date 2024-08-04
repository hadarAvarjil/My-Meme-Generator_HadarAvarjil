'use strict'

let gElCanvas
let gCtx

let gFontSizeDelta = 0

function renderMeme() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    // resizeCanvas()

    const meme = getMeme()
    const elImg = new Image()
    elImg.src = `img/meme-imgs(square)/${meme.selectedImgId}.jpg`
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)
        drawText(`${meme.lines[0].txt}`, 250, 100, `${meme.lines[0].color}`,`${meme.lines[0].size}` )
    }

    window.addEventListener('resize', resizeCanvas)
}

// let gMeme = {
//     selectedImgId: 5,
//     selectedLineIdx: 0,
//     lines: [
//         {
//             txt: 'Add Text Here',
//             size: 20,
//             color: 'red'
//         }
//     ]
// }



function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth - 40
    renderMeme()
}

function drawText(text, x, y, strokeColor, size) {
    const fontSize = size
    gCtx.lineWidth = 2
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = 'black'
    gCtx.font = `${fontSize}px Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
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
    console.log(strokeColor);
}

function onFontdecreased(){
    setFontdecreased()
}

function onFontIncreased(){
    setFontIncreased()
}

