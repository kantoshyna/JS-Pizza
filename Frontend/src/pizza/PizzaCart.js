/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок

    //Приклад реалізації, можна робити будь-яким іншим способом
    Cart.push({
        pizza: pizza,
        size: size,
        quantity: 1
    });


    //Оновити вміст кошика на сторінці
    updateCart();

}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    //TODO: треба зробити

    //Після видалення оновити відображення
    updateCart();
}

function getPizzaFromCart(pizza_id, size) {
    var result = null;

    Cart.forEach(function (item) {
        if (item.pizza.id == pizza_id && item.size == size) {
            result = item;
        }
    });

    return result;
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...

    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);
        var counter = parseInt($(".bl-orange-label").text()) || 0;

        $node.find(".plus").click(function () {
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;
            $(".bl-orange-label").text(++counter);

            //Оновлюємо відображення
            updateCart();
        });
        $node.find(".minus").click(function () {
            //Зменшуємо кількість замовлених піц
            cart_item.quantity -= 1;
            $(".bl-orange-label").text(--counter);

            //Оновлюємо відображення
            updateCart();
        });

        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);
    $(".sum").text(countPrice() + ' грн.');

}

function countPrice() {
    var counter = 0;
    Cart.forEach(function (item) {
        var oursize = item.size;
        counter += item.pizza.(oursize).price * item.quantity;
    });
    return counter;
}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;

exports.getPizzaFromCart = getPizzaFromCart;
exports.updateCart = updateCart;