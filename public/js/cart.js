$(document).ready(() => {
    changeTitleProductInfor();
    $(window).resize(() => {
        changeTitleProductInfor();
    })
 

    const listItemCart = $('.my-cart .my-cart-list .my-cart-list-item input[type=number]');
    Array.from(listItemCart).forEach((element) => {
        $(element).niceNumber({
            onDecrement: function ($currentInput, amount, settings) {
                // totalPrice()
            },
            onIncrement: function ($currentInput, amount, settings) {
                // totalPrice()
            },
        });
    });
});

function changeTitleProductInfor() {
    if($(window).width() < 861)
    {
        $('.my-cart .header-cart .product-infor span').text('Tất cả thông tin');
    } else {
        $('.my-cart .header-cart .product-infor span').text('Tên sản phẩm');
    }
}