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
var $cart = $(".cart_items");

function addToCart(pizza, size) {
    var pizzaInCart = false;
    Cart.forEach(function (value){
        //Перевірка на наявність піцци в кошику - якщо є, то збільшуємо кількість
        if((value.pizza.id===pizza.id)&&(value.size===size)){
            pizzaInCart = true;
            value.quantity+=1;
        }
    });

    //Якщо піцци немає в кошику, то додати
    if(pizzaInCart===false){
    Cart.push({
        pizza: pizza,
        size: size,
        quantity: 1
    })}

    //Оновити вміст кошика на сторінці
    updateCart();
}

function removeFromCart(cart_item) {
    for (var i = 0; i < Cart.length; i++) {
        if(Cart[i].pizza.id===cart_item.pizza.id&&Cart[i].size===cart_item.size)Cart.splice(i,1);
    }
    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    var $counter = $(".counter");
    Cart = JSON.parse(localStorage.getItem("key"));
    if(Cart===null){
        Cart=[];
    }
    var val = 0;
    Cart.forEach(function (value) {
        val+=value.pizza[value.size].price*value.quantity });
    $counter.text(val);

    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика

    var sum=0;
    var order =0;



    //Очищаємо старі піци в кошику
    $cart.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);

        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;
            sum+= cart_item.pizza[cart_item.size].price;

            //Оновлюємо відображення
            updateCart();
        }
        );
        $node.find(".minus").click(function(){
                //Збільшуємо кількість замовлених піц
                cart_item.quantity -= 1;
                sum-= cart_item.pizza[cart_item.size].price;
                if(cart_item.quantity===0){
                    removeFromCart(cart_item);
                }

                //Оновлюємо відображення
                updateCart();
            }
        );
        //Видаляємо замовлення
        $node.find(".delete").click(function(){
                    removeFromCart(cart_item);
                //Оновлюємо відображення
                updateCart();
            }
        );

        sum+= cart_item.pizza[cart_item.size].price*cart_item.quantity;
        order+=1;
        $cart.append($node);

    }
    localStorage.clear();
    localStorage.setItem("key", JSON.stringify(Cart));

    Cart.forEach(showOnePizzaInCart);
    $(".counter").text(sum);
    $(".order_amount").text(order);



}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;