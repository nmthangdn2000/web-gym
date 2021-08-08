$(document).ready(() => {
    const swiper = new Swiper(".mySwiper", {
        slidesPerView: 5,
        spaceBetween: 10,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        allowTouchMove: false
    });
    const swiper2 = new Swiper(".mySwiper2", {
        spaceBetween: 20,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: swiper,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        allowTouchMove: false
    });
    $('input[type="number"]').niceNumber({
        onDecrement: function ($currentInput, amount, settings) {
            totalPrice()
        },
        onIncrement: function ($currentInput, amount, settings) {
            totalPrice()
        },
    });
    $("#product-amount-modal").bind('keyup', function () {
        totalPrice()
    });
    
    $('.mySwiper2 .swiper-slide-active img').elevateZoom({
        tint: true,
        tintColour: '#FFF',
        tintOpacity: 0.5,
        zoomWindowFadeIn: 300,
        zoomWindowFadeOut: 300,
        lensFadeIn: 300,
        lensFadeOut: 300
    });
    swiper2.on('transitionEnd', function () {
        $('.mySwiper2 .swiper-slide-active img').elevateZoom({
            tint: true,
            tintColour: '#FFF',
            tintOpacity: 0.5,
            zoomWindowFadeIn: 300,
            zoomWindowFadeOut: 300,
            lensFadeIn: 300,
            lensFadeOut: 300
        });
    });
    const swiperProductMore = new Swiper(".mySwiperProductMore", {
        slidesPerView: 4,
        spaceBetween: 20,
        slidesPerGroup: 3,
        navigation: {
            nextEl: ".product-more-button-next",
            prevEl: ".product-more-button-prev",
        },
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 1,
                spaceBetween: 10,
                slidesPerGroup: 1,
            },
            // when window width is >= 480px
            480: {
                slidesPerView: 2,
                spaceBetween: 20,
                slidesPerGroup: 1,
            },
            580: {
                slidesPerView: 3,
                spaceBetween: 10,
                slidesPerGroup: 2,
            },
            // when window width is >= 640px
            768: {
                slidesPerView: 3,
                spaceBetween: 30,
                slidesPerGroup: 2,
            },
            900: {
                slidesPerView: 4,
                spaceBetween: 20
            }
        }
       
    });
     // modal product
     $('#add-to-cart').on('click', () => {
        addToCart()
        totalPrice()
        $('#modal').css('display', 'flex')
    })
    $('#modal-overlay, .modal-footer .row div:nth-child(2)').on('click', () => {
        hideModalProduct()
    })
})

function hideModalProduct() {
    $('#product-amount').val($('#product-amount-modal').val())
    $('#product-flavor').val($('#product-flavor-modal').val())
    $('#modal').css('display', 'none')
}
function addToCart() {
    $('#product-amount-modal').val($('#product-amount').val())
    $('#product-flavor-modal').val($('#product-flavor').val())
}
function totalPrice(){
    const amount = $('#product-amount-modal').val()
    const price = $('#product-price').attr('data-price')
    const total = amount * price
    const formatPrice = new Intl.NumberFormat('it-IT', {style : 'currency', currency : 'VND'})
    $('.product-modal .row .column h4').html(formatPrice.format(total))
}