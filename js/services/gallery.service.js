'use strict'

let gImgs = []
let gFilterBy = ''

_createImgs()

function getImgs() {
    const filterBy = gFilterBy

    let imgs = gImgs
    imgs = _filterImgs(filterBy)
    return imgs
}

function _filterImgs(filterBy) {
    let imgs = gImgs

    if (filterBy) imgs = imgs.filter(img => img.keywords.some(keyword => keyword.toLowerCase().includes(filterBy.toLowerCase())))

    return imgs
}

function _createImg(id, keywords = []) {

    return {
        id,
        url: `img/meme-imgs(square)/${id}.jpg`,
        keywords,
    }
}

function _createImgs() {

    gImgs = [
        _createImg(1, ['funny', 'famous', 'politicians']),
        _createImg(2, ['dogs', 'animal']),
        _createImg(3, ['funny', 'dogs', 'animal']),
        _createImg(4, ['funny', 'animal', 'cats']),
        _createImg(5, ['funny']),
        _createImg(6, ['funny', 'happy']),
        _createImg(7, ['funny', 'happy', 'awkward']),
        _createImg(8, ['funny', 'happy']),
        _createImg(9, ['funny', 'happy']),
        _createImg(10, ['funny', 'happy', 'famous','politicians']),
        _createImg(11, ['akward']),
        _createImg(12, ['funny', 'famous']),
        _createImg(13, ['funny', 'happy', 'drinks']),
        _createImg(14, ['comics']),
        _createImg(15, ['funny']),
        _createImg(16, ['funny', 'happy', 'famous', 'comics']),
        _createImg(17, ['funny', 'famous','politicians']),
        _createImg(18, ['comics']),
    ]
}

function setFilterBy() {
    gFilterBy = document.querySelector('.filter-bar').value
}

function setClearSearch() {
    const elSearchbar = document.querySelector('.filter-bar')
    elSearchbar.value = ""
    gFilterBy = ''
    renderGallery()
}

function setFlexible() {
    const randomImageIdx = getRandomInt(1, 17)
    setImg(randomImageIdx)
    renderMeme()
}
