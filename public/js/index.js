$(document).ready(() => {
    const swiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        speed: 800,
    })
    Array.from($('.sidebar ul li span')).forEach(element => {
        $(element).click(() => {
            $(element).next('.sub-menu').slideToggle();
            $(element).children().toggleClass('rotate')
        })
    })
})