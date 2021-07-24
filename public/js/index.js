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
    //
    Array.from($('.sidebar ul li span')).forEach(element => {
        $(element).click(() => {
            $(element).next('.sub-menu').slideToggle();
            $(element).children().toggleClass('rotate')
        })
    })
    //
    const modes = Array.from($('.product .row .col-md-9 .toolbar .row .modes span'))
    modes.forEach((mode) => {
        $(mode).click(() => {
            modes.forEach((element) => {
                $(element).removeClass('active')
            })
            $(mode).addClass('active')
        })
    })
})