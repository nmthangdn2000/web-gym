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
    Array.from($('.product-sidebar ul li')).forEach(element => {
        $(element).click(() => {
            $(element).children().next('.sub-menu').slideToggle();
            $(element).children().children().toggleClass('rotate')
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
    //
    $(window).on('scroll', () => {
        if ($(window).scrollTop() > 115){
            $('header .fixed').addClass('fixed-nav')
            $('header .fixed').css('top', '0')
            $('.container').css('padding-top', '7.75rem')
        }
        else{
            $('header .fixed').removeClass('fixed-nav')
            $('header .fixed').css('top', '-80%')
            $('.container').css('padding-top', '')
        }
    })
})