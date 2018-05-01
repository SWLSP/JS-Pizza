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
var Basket = [];

//HTML едемент куди будуть додаватися піци
var $basket = $(".cart_items");

function replenishBasket(pizza, size) {
    var filledBasket = false;
    Basket.forEach(function (value){
        //Перевірка на наявність піцци в кошику - якщо є, то збільшуємо кількість
        if((value.pizza.id===pizza.id)&&(value.size===size)){
            filledBasket = true;
            value.quantity+=1;
        }
    });

    //Якщо піцци немає в кошику, то додати
    if(filledBasket===false){
    Basket.push({
        pizza: pizza,
        size: size,
        quantity: 1
    })}

    //Оновити вміст кошика на сторінці
    refreshBasket();
}

function expelFromBasket(cart_item) {
    for (var i = 0; i < Basket.length; i++) {
        if(Basket[i].pizza.id===cart_item.pizza.id&&Basket[i].size===cart_item.size)Basket.splice(i,1);
    }
    //Після видалення оновити відображення
    refreshBasket();
}

function initialiseBasket() {
    var $counter = $(".counter");
    Basket = JSON.parse(localStorage.getItem("key"));
    if(Basket===null){
        Basket=[];
    }
    var value = 0;
    Basket.forEach(function (value) {
        value+=value.pizza[value.size].price*value.quantity });
    $counter.text(value);

    refreshBasket();
}

function getPizzasInBasket() {
    //Повертає піци які зберігаються в кошику
    return Basket;
}

function refreshBasket() {
    //Функція викликається при зміні вмісту кошика

    var sum = 0;
    var order = 0;



    //Очищаємо старі піци в кошику
    $basket.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);

        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;
            sum+= cart_item.pizza[cart_item.size].price;

            //Оновлюємо відображення
            refreshBasket();
        }
        );
        $node.find(".minus").click(function(){
                //Збільшуємо кількість замовлених піц
                cart_item.quantity -= 1;
                sum-= cart_item.pizza[cart_item.size].price;
                if(cart_item.quantity===0){
                    expelFromBasket(cart_item);
                }

                //Оновлюємо відображення
                refreshBasket();
            }
        );
        //Видаляємо замовлення
        $node.find(".delete").click(function(){
                    expelFromBasket(cart_item);
                //Оновлюємо відображення
                refreshBasket();
            }
        );

        sum+= cart_item.pizza[cart_item.size].price*cart_item.quantity;
        order+=1;
        $basket.append($node);

    }
    localStorage.clear();
    localStorage.setItem("key", JSON.stringify(Basket));

    Basket.forEach(showOnePizzaInCart);
    $(".counter").text(sum);
    $(".order_amount").text(order);



}

exports.removeFromCart = expelFromBasket;
exports.addToCart = replenishBasket;

exports.getPizzaInCart = getPizzasInBasket;
exports.initialiseCart = initialiseBasket;

exports.PizzaSize = PizzaSize;