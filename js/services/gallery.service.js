'use strict'

let gImgs = []

_createImgs()

// var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }]

function getImgs() {
    let imgs = gImgs
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

    // gImgs = loadFromStorage('imgs')
    // if (gImgs && (gImgs.length > 0) return

    gImgs = [
        _createImg(1, ['funny', 'famous']),
        _createImg(2, ['dogs', 'animal', 'happy']),
        _createImg(3, ['funny', 'dogs', 'animal', 'happy']),
        _createImg(4, ['funny', 'animal', 'cats']),
        _createImg(5, ['funny']),
        _createImg(6, ['funny', 'happy']),
        _createImg(7, ['funny', 'happy', 'awkward']),
        _createImg(8, ['funny', 'happy']),
        _createImg(9, ['funny', 'happy']),
        _createImg(10, ['funny', 'happy', 'famous']),
        _createImg(11, ['akward']),
        _createImg(12, ['funny', 'famous']),
        _createImg(13, ['funny', 'happy', 'drinks']),
        _createImg(14, ['comics']),
        _createImg(15, ['funny']),
        _createImg(16, ['funny', 'happy', 'famous', 'comics']),
        _createImg(17, ['funny', 'happy', 'famous']),
        _createImg(18, ['funny', 'happy', 'comics']),
    ]
    // _saveToStorage()
}