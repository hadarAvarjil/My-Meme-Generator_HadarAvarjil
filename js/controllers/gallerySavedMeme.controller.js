
function onInitSavedGallery() {
    renderSavedMemesGallery()
}

function renderSavedMemesGallery() {
    const memes = loadFromStorage('memes') 
    const elGallery = document.querySelector('.gallery-saved-meme')
    const strHtmls = memes.map(meme => `<div class="cell"><img src=${meme.savedImage} onclick="onImgSelect(${meme.id})"></div>`)

    elGallery.innerHTML = strHtmls.join('')
}

function onImgSelect(imageID) {
    setImg(imageID)
    renderMeme()
}

