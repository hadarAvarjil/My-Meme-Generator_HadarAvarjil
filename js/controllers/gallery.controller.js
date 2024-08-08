'use strict'


function onInit() {
    renderGallery()
}

function renderGallery() {
    let images = getImgs()

    const elGallery = document.querySelector('.grid-container')
    const strHtmls = images.map(image => `<div class="cell cell${image.id}"><img src=${image.url} onclick="onImgSelect(${image.id})"></div>`)

    elGallery.innerHTML = strHtmls.join('')

}

function onImgSelect(imageID) {
    setImg(imageID)
    renderMeme()
}

function onSetFilterBy() {
    setFilterBy()
    renderGallery()

}

function onClearSearch() {
    setClearSearch()
}

function onChooseflexible() {
    setFlexible()
}

