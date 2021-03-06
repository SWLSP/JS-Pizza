/**
 * Created by chaika on 02.02.16.
 */
var API = require('../API');
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = null;

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");


API.getPizzaList(function (error,pizzaList) {
    if(error){
        alert("Failed to load pizzas");
    }
    else{
        Pizza_List=pizzaList;
    }
});

function refreshBasketList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function refreshOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-big").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }
    countOfPizza = 0;

    list.forEach(function (value) {
       refreshOnePizza(value);
       countOfPizza++;
    });
    $(".amount").text(countOfPizza);
}

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];

    Pizza_List.forEach(function(pizza){
        //Якщо піка відповідає фільтру
        if(filter==="all"){
            pizza_shown=Pizza_List;
        }
        if(filter==="meat"){
            if(("meat" in pizza.content)||("chicken" in pizza.content))pizza_shown.push(pizza);
        }
        if(filter==="mushroom"){
            if("mushroom" in pizza.content)pizza_shown.push(pizza);
        }
        if(filter==="pineapple"){
            if("pineapple" in pizza.content)pizza_shown.push(pizza);

        }
        if(filter==="ocean"){
            if("ocean" in pizza.content)pizza_shown.push(pizza);
        }
        if(filter==="vegan"){
            if(!(("meat" in pizza.content)||("chicken" in pizza.content)||("ocean" in pizza.content)))pizza_shown.push(pizza);

        }

    });

    //Показати відфільтровані піци
    refreshBasketList(pizza_shown);
}

function initialiseMenu(Pizza_List) {
    //Показуємо усі піци
    refreshBasketList(Pizza_List)
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;