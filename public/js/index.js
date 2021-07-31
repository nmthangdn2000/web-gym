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
    setTimeout(()=>{
        $('#loading-page').animate({opacity: 0}, 1000, () => {
            $('#loading-page').addClass('hide').delay(400)
        })
    }, 200)
    //
    $(window).on('scroll', () => {
        if ($(window).scrollTop() > 115) {
            $('header .fixed').addClass('fixed-nav')
            $('header .fixed').css('top', '0')
            $('.container').css('padding-top', '7.75rem')
        }
        else {
            $('header .fixed').removeClass('fixed-nav')
            $('header .fixed').css('top', '-80%')
            $('.container').css('padding-top', '')
        }
    })
    $('#btn-toggler').on('click', () => {
        $('.header-top .row nav').addClass('active')
        $('#cover').addClass('cover')
        $('.search-box.search-box-bg').removeClass('active')
    })
    $('#close-nav').on('click', () => {
        $('.header-top .row nav').removeClass('active')
        $('#cover').removeClass('cover')
    })
    $('#cover').on('click', () => {
        $('.header-top .row nav').removeClass('active')
        $('#cover').removeClass('cover')
    })
    $('#btn-open-search-box').on('click', () => {
        $('.search-box.search-box-bg').toggleClass('active')
    })
    //
    $('#modes-grid').on('click', () => {
        localStorage.setItem('modes', 'grids')
        modesGrid()
    })
    $('#modes-column').on('click', () => {
        localStorage.setItem('modes', 'columns')
        modesColumn()
    })
    // local storage
    const modesListProduct = localStorage.getItem('modes') || 'grids'
    if (modesListProduct == 'grids') {
        modesGrid()
    } else {
        modesColumn()
    }
})
function modesGrid() {
    $('#modes-grid').addClass('active')
    $('#modes-column').removeClass('active')
    $('#product-list').removeClass('list-column')
}
function modesColumn() {
    $('#modes-column').addClass('active')
    $('#modes-grid').removeClass('active')
    $('#product-list').addClass('list-column')
}