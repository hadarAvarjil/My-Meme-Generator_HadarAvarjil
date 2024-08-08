'use strict'

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}

const scrollContainer = document.querySelector('.emoji-scroll')

document.getElementById('scroll-left').addEventListener('click', () => {
    scrollContainer.scrollBy({
        left: -100, 
        behavior: 'smooth'
    })
})

document.getElementById('scroll-right').addEventListener('click', () => {
    scrollContainer.scrollBy({
        left: 100, 
        behavior: 'smooth'
    })
})
