$(document).ready(() => {
    changeTitleProductInfor();
    $(window).resize(() => {
        changeTitleProductInfor();
    })
 

    const listItemCart = Array.from($('.my-cart .my-cart-list .my-cart-list-item .product-amount input[type=number]'));
    const listUnitPrice = Array.from($('.my-cart .my-cart-list .my-cart-list-item .product-unit-price span'));
    const listTotalPrice = Array.from($('.my-cart .my-cart-list .my-cart-list-item .product-total span'));
    
    listItemCart.forEach((element, index) => {
        const unitPrice = priceToNumber($(listUnitPrice[index]).text());
        const totalPrice = listTotalPrice[index];
        let amountNow = $(element).val();
        sumByUnitPrice(amountNow, unitPrice, totalPrice);
        $(element).niceNumber({
            onDecrement: function ($currentInput, amount, settings) {
                sumByUnitPrice(amount, unitPrice, totalPrice);
                caculator(listTotalPrice);
            },
            onIncrement: function ($currentInput, amount, settings) {
                sumByUnitPrice(amount, unitPrice, totalPrice);
                caculator(listTotalPrice);
            },
        });
        
        $(element).bind('keyup', function () {
            amountNow = $(element).val();
            sumByUnitPrice(amountNow, unitPrice, totalPrice);
            caculator(listTotalPrice);
        });
    });
    caculator(listTotalPrice);
});

function changeTitleProductInfor() {
    if($(window).width() < 861)
    {
        $('.my-cart .header-cart .product-infor span').text('Tất cả thông tin');
    } else {
        $('.my-cart .header-cart .product-infor span').text('Tên sản phẩm');
    }
}

function sumByUnitPrice(amount, unitPrice, totalPrice) {
    const total = amount * unitPrice;
    $(totalPrice).text(formatPrice(total));
}

function caculator(listTotalPrice){
    const priceProvisional = sumPriceProvisional(listTotalPrice);
    priceTotal(priceProvisional);
}

function sumPriceProvisional(listTotalPrice) {
    let sum = 0;
    listTotalPrice.forEach((element) => {
        const s = $(element).text().toString();
        sum += priceToNumber(s);
    });
    $('#price-provisional').children().eq(1).html(formatPrice(sum));
    
    return sum;
}

function priceTotal(priceProvisional) {
    const priceDiscount = priceToNumber($('#price-discount').text());
    if(priceDiscount > 0){
        priceProvisional = priceProvisional - (priceDiscount * priceProvisional) / 100;
    }
    $('#price-total').children().eq(1).text(formatPrice(priceProvisional));
}

function formatPrice(price) {
    const formatPrice = new Intl.NumberFormat('it-IT', {style : 'currency', currency : 'VND'});
    const result = formatPrice.format(price).split(/\s{1}/).join(' ');
    return result;
}

function priceToNumber(price) {
    const result = price.split(' ')[0].split('.').join('');
    return Number(result);
}