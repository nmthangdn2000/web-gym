$(document).ready(() => {
    
    //
    setTimeout(() => {
        $('#loading-page').animate({ opacity: 0 }, 1000, () => {
            $('#loading-page').addClass('hide').delay(400)
        })
    }, 200)
    //
    const fixmeTop = $('.product .row .col-md-3 div').offset().top;
    const header = $('.fixed').height();
    $(window).on('scroll', () => {
        const currentScroll = $(window).scrollTop();
        if (currentScroll > header) {
            $('header .fixed').addClass('fixed-nav')
            $('header .fixed').css('top', '0')
            $('.container').css('padding-top', '7.75rem')
        }
        else {
            $('header .fixed').removeClass('fixed-nav')
            $('header .fixed').css('top', '-80%')
            $('.container').css('padding-top', '')
        }
        // if (currentScroll >= fixmeTop) {
        //     $('.product .row .col-md-3 div').css({
        //         position: 'fixed',
        //         top: '0',
        //         left: '0'
        //     });
        // } else {
        //     $('.product .row .col-md-3 div').css({
        //         position: ''
        //     });
        // }
    })
    // open nav
    $('#btn-toggler').on('click', () => {
        $('.header-top .row nav').addClass('active')
        $('#cover').addClass('cover')
        $('.search-box.search-box-bg').removeClass('active')
    })
    // close sidebar
    $('.close-sidebar').on('click', () => {
        $('.header-top .row nav').removeClass('active')
        $('.product-sidebar ul li .sub-menu').removeClass('active')
        $('.product-sidebar').removeClass('active')
        $('#cover').removeClass('cover')
    })
    // cover
    $('#cover').on('click', function () {
        $('.header-top .row nav').removeClass('active')
        $(this).removeClass('cover')
        $('.product-sidebar').removeClass('active')
    })
    $('#btn-open-search-box').on('click', () => {
        $('.search-box.search-box-bg').toggleClass('active')
    })
    // open list product
    $('#list-product').on('click', () => {
        $('.product-sidebar').addClass('active')
        $('#cover').addClass('cover')
        $('.product-sidebar .action-sidebar h6').text('Danh mục sản phẩm')
    })
     // open item list product
     Array.from($('.product-sidebar ul li')).forEach(element => {
        $(element).click(function () {
            $(this).children('ul').addClass('active')
            $('.product-sidebar .action-sidebar h6').text($(this).children('span').text())
            $(this).children('ul').css('animation', '0.5s ease 0s 1 normal forwards running slideLeft')
            $('.product-sidebar .action-sidebar .back-sidebar').children().css('display', 'block')
        })
    })
    $('.back-sidebar').on('click', () => {
        $('.product-sidebar .action-sidebar h6').text('Danh mục sản phẩm')
        $(this).children('ul').css('animation', '0.5s ease 0s 1 normal forwards running slideLeft')
        $('.product-sidebar ul li ul.active').css('animation', '0.5s ease 0s 1 normal forwards running slideRight')
        $('.product-sidebar .action-sidebar .back-sidebar').children().css('display', 'none')
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
    //
    $('.product-action .action-like').hover(function () {
        $(this).children().attr('name', 'heart')
    }, function () {
        $(this).children().attr('name', 'heart-outline')
    })
    $('.product-action .action-like').on('click', function () {

    })
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