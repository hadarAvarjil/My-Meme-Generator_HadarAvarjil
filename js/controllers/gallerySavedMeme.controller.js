'use strict'

let gGalleryMemes = []

function onInitSavedGallery() {
    renderSavedMemesGallery()
    addListenersDom()
}

function renderSavedMemesGallery() {
    gGalleryMemes = loadFromStorage('memes')

    const elGallery = document.querySelector('.gallery-saved-meme')

    const strHtmls = gGalleryMemes.map((meme, idx) => `<div class="cell"><img src=${meme.savedImage} onclick="onReedited(${idx})"></div>`)

    elGallery.innerHTML = strHtmls.join('')
}

function onReedited(idx) {
    const reeditedMeme = gGalleryMemes[idx]
    gMeme = { ...gMeme, ...reeditedMeme }
    window.location.href = "index.html"
}

function setReEditedMeme() {
    const elGallery = document.querySelector('.gallery')
    const eleditor = document.querySelector('.editor')
    elGallery.classList.add('hidden')
    eleditor.classList.remove('hidden')
    renderMeme()
}

function addListenersDom() {
    window.addEventListener('DOMContentLoaded',  setReEditedMeme)
}

