$(document).ready(() => {
    // check theme
    const theme = localStorage.getItem('theme');
    if (theme == 'dark') {
        $('body').addClass('dark-theme')
        localStorage.setItem('theme', 'dark');
        $('#btn-theme span ion-icon').attr('name', 'sunny')
    } else {
        $('body').removeClass('dark-theme')
        localStorage.setItem('theme', 'light');
        $('#btn-theme span ion-icon').attr('name', 'moon-sharp')
    }
    //
    // setLocationIconTheme();
    // $( window ).resize(function() {
    //     setLocationIconTheme();
    // });
    //
    setTimeout(() => {
        $('#loading-page').animate({ opacity: 0 }, 1000, () => {
            $('#loading-page').addClass('hide').delay(400)
        })
    }, 200)
    //
    // const fixmeTop = $('.product .row .col-md-3 div').offset().top;
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
    // theme
    $('#btn-theme').on('click', () => {
        changeTheme();
    })
    // open nav
    $('#btn-toggler').on('click', () => {
        $('nav.nav-header').addClass('active')
        $('#cover').addClass('cover')
        $('.search-box').removeClass('active')
    })
    // close sidebar
    $('.close-sidebar').on('click', () => {
        $('nav.nav-header').removeClass('active')
        $('.product-sidebar ul li .sub-menu').removeClass('active')
        $('.product-sidebar').removeClass('active')
        $('#cover').removeClass('cover')
    })
    // cover
    $('#cover').on('click', function () {
        $('nav.nav-header').removeClass('active')
        $(this).removeClass('cover')
        $('.product-sidebar').removeClass('active')
    })
    $('#btn-open-search-box').on('click', () => {
        $('.search-box').toggleClass('active')
    })
    // open list product
    $('#list-product').on('click', () => {
        $('.product-sidebar').addClass('active')
        $('#cover').addClass('cover')
        $('.product-sidebar .action-sidebar h6').text('Danh mục sản phẩm')
    })
    $('#menu-dashboard').on('click', () => {
        $('.product-sidebar').addClass('active')
        $('#cover').addClass('cover')
        $('.product-sidebar .action-sidebar h6').text('Danh mục')
    })
    // open item list product
    Array.from($('.product-sidebar ul li')).forEach(element => {
        $(element).click(function () {
            $(this).children('ul').addClass('active')
            $('.product-sidebar .action-sidebar h6').text($(this).children('span').text())
            $(this).children('ul').css('animation', '0.5s ease 0s 1 normal forwards running slideLeft')
            $('.product-sidebar .action-sidebar .back-sidebar').css('visibility', 'visible')
        })
    })
    $('.back-sidebar').on('click', () => {
        $('.product-sidebar .action-sidebar h6').text('Danh mục sản phẩm')
        $(this).children('ul').css('animation', '0.5s ease 0s 1 normal forwards running slideLeft')
        $('.product-sidebar ul li ul.active').css('animation', '0.5s ease 0s 1 normal forwards running slideRight')
        $('.product-sidebar .action-sidebar .back-sidebar').css('visibility', 'hidden')
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
    // tag-cart
    tagCart();

    // modal-success
    const btnAddToCart = Array.from($('#product-list a button'));
    const btnAddToCartInslider = Array.from($('#mySwiperProductMore a button'));

    setArrOnClickAddToCart(btnAddToCart);
    setArrOnClickAddToCart(btnAddToCartInslider);

    setOnClickAddToCart($('#add-to-cart'))

    //modal-delete
    const btnDeleteAddress = Array.from($('.content-dashboard .dashboard-address-item .delete-address'));
    setArrOnClickDelete(btnDeleteAddress);
    // cancel-modal
    $('#cancel-modal').on('click', () => {
        $('#modal-delete').css('display', 'none');
    });
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

function tagCart() {
    let sum = 0;
    const listAmount = Array.from($('.tag-view .list-item-cart .item-cart .infor-item-cart div span'));
    const listUnitPrice = Array.from($('.tag-view .list-item-cart .item-cart .price-item-cart'));
    listAmount.forEach((element, index) => {
        const a = Number($(element).text());
        const u = priceToNumber($(listUnitPrice[index]).text());
        sum += (a * u);
    });
    $('.tag-view .tag-cart-bottom .cart-total h4').html(formatPrice(sum));

}

function setArrOnClickAddToCart(btnAddToCart) {
    btnAddToCart.forEach((element) => {
        setOnClickAddToCart(element);
    });
    $('#modal-success .modal-container').hover(
        function () {
            $('#modal-success').stop().show();
        },
        function () {
            $('#modal-success').delay(2000).hide(0);
        }
    );
    $('#modal-success .modal-success-overlay').on('click', (e) => {
        e.preventDefault();
        $('#modal-success').css('display', 'none');
    })
}

function setOnClickAddToCart(element) {
    $(element).on('click', (e) => {
        e.stopPropagation();
        $('#modal-success').css('display', 'flex').delay(2000).hide(0);
        addToCart();
        return false;
    })
}

function setArrOnClickDelete(element) {
    $(element).on('click', (e) => {
        e.stopPropagation();
        $('#modal-delete').css('display', 'flex');
        return false;
    })
}

function addToCart() {
    const html = '<div class="item-cart">'
        + ' <img src="https://o.rada.vn/data/image/2020/11/11/Kho-cuoi-bai-anh-trang-1.jpg"'
        + '        alt="">'
        + '     <div class="infor-item-cart">'
        + '        <span>Thuốc trừ sâu</span>'
        + '        <div><span>1</span></div>'
        + '     </div>'
        + '     <div class="price-item-cart">599.000 VND</div>'
        + '</div>';
    $('#list-item-cart').prepend(html)

}

function changeTheme() {
    const theme = localStorage.getItem('theme');
    if (theme == 'dark') {
        $('body').removeClass('dark-theme')
        localStorage.setItem('theme', 'light');
        $('#btn-theme span ion-icon').attr('name', 'moon-sharp')
    } else {
        $('body').addClass('dark-theme')
        localStorage.setItem('theme', 'dark');
        $('#btn-theme span ion-icon').attr('name', 'sunny')
    }

}

function setLocationIconTheme() {
    const widthScreen = $(window).width();
    const widthRight = (widthScreen - 1200);
    const right = Math.round(0.3 * widthRight);
    if (widthScreen > 1360)
        $('#btn-theme').css('right', `${right}px`)
    else $('#btn-theme').css('right', '20px')
}

function formatPrice(price) {
    const formatPrice = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' });
    const result = formatPrice.format(price).split(/\s{1}/).join(' ');
    return result;
}

function priceToNumber(price) {
    const result = price.split(' ')[0].split('.').join('');
    return Number(result);
}