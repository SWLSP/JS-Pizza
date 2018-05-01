
$(function(){
    var API=require('./API');
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');

    PizzaCart.initialiseCart();
    API.getPizzaList(function (error,pizzaList) {
        if(error){
            alert("Failed to load pizzas");
        }
        else{
            PizzaMenu.initialiseMenu(pizzaList);

        }

    });


    var pre = $(".all");
    $(".all").click(function () {
        pre.removeClass("active");
        PizzaMenu.filterPizza("all");
        pre = $(".all");
        $(this).addClass("active");
        $(".pizzas_all").text("Усі піци");

    });

    $(".meat").click(function () {
        pre.removeClass("active");
        PizzaMenu.filterPizza("meat");
        pre = $(".meat");
        $(this).addClass("active");
        $(".pizzas_all").text("М'ясні піци");

    });
    $(".pineapple").click(function () {
        pre.removeClass("active");
        PizzaMenu.filterPizza("pineapple");
        pre = $(".pineapple");
        $(this).addClass("active");
        $(".pizzas_all").text("З ананасами піци");
    });

    $(".mushroom").click(function () {
        pre.removeClass("active");
        PizzaMenu.filterPizza("mushroom");
        pre = $(".mushroom");
        $(this).addClass("active");
        $(".pizzas_all").text("Грибні піци");
    });

    $(".ocean").click(function () {
        pre.removeClass("active");
        PizzaMenu.filterPizza("ocean");
        pre = $(".ocean");
        $(this).addClass("active");
        $(".pizzas_all").text("З морепродуктами піци");
    });

    $(".vegan").click(function () {
        pre.removeClass("active");
        PizzaMenu.filterPizza("vegan");
        pre = $(".vegan");
        $(this).addClass("active");
        $(".pizzas_all").text("Вегетаріанські піци");
    });

    $(".createOrder").click(function () {
        var pizzasInCart = PizzaCart.getPizzaInCart();
        var name = $("#inputName").val();
        var telephone = $("#inputPhone").val();
        var adress = $("#inputAdress").val();
        
        API.createOrder({name:name, telephone:telephone, adress:adress, pizzasInCart:pizzasInCart}, function (err, data) {

        })
    })
});