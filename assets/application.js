//drawer menu
$(document).ready(function() {
    $("#drawer-menu-container").hide();
    $("#close-menu-button").click(function() {
        $("#drawer-menu-container").fadeOut();
    });
    $("#open-menu-button").click(function() {
        $("#drawer-menu-container").fadeIn();
    });

    //drawer cart

    $("#drawer-cart-container").hide();
    $("#close-cart-button").click(function() {
        $("#drawer-cart-container").fadeOut();
    });
    $("#open-cart-button").click(function() {
        $("#drawer-cart-container").fadeIn();
    });

    //cart functionality  

    $(".item-qty").change(function() {
        var key = $(this).attr('id');
        var qty = parseInt($(this).val());
        updateCartQty(qty, key);
    });

    $(".item-app").click(function() {
        var key = $(this).attr('name');
        var qty = parseInt(document.getElementById(key).value);
        qty += 1;
        updateCartQty(qty, key);
    });

    $(".item-sub").click(function() {
        var key = $(this).attr('name');
        var qty = parseInt(document.getElementById(key).value);
        qty -= 1;
        updateCartQty(qty, key);
    });
});

function updateCartQty(qty, key) {
    return updateItem({
        id: key,
        quantity: qty
    })
}

async function updateItem(data) {
    const result = await fetch("/cart/change.json", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)

    })
    console.log(data);

    getCart();
}

function getCart() {
    jQuery.getJSON('/cart.js', function(cart) {
        let items = cart.items;

        for (var i = 0; i < items.length; i++) {
            $(".item-qty").eq(i).val(parseInt($(items)[i].quantity));
        }

        $(".subtotal-price").html(Shopify.formatMoney(cart.items_subtotal_price));
    });
}