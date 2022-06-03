var shoppingcart = document.getElementById("main");
var storage = window.localStorage;
const cartitems = JSON.parse(storage.getItem("cart"));
const pages = JSON.parse(storage.getItem("pages")); 
let cart ={
    initialize: function(){
        document.addEventListener('deviceready', this.applicationready, false);
        document.addEventListener('deviceready', this.getcartcount , false);
    },
    applicationready: function(){
    cart.loadcart();
    console.log(navigator.notification);
   // navigator.notification.alert("hello world", onConfirm, "title", "button");
},
loadcart: function(){
    if(cartitems != null){
    for(var i = 0; i < cartitems.length; i++)
    {
        var food = cartitems[i];
        var div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `<div class="card">
        <img src="${food.img}" class="card-img-top style="height: 40%; width:50%">
        <div class="card-body">
        <h4>${food.ID}</h4>
        <p class="card-text">$ ${food.Price}</p>
        <p>${food.Description}</p>
        <button onclick="cart.removefromcart(\``+food.ID+ `\`)" class="btn btn-danger">Remove from cart</button></div></div>`;
        shoppingcart.appendChild(div);
    }
}else{
    alertify.error("Cart is empty");
}
},
Routes : function(location){
        pages.forEach((key, value) =>{
            if(location == key.Name){
               return window.location.href = key.Location;
            }
        });
    },
    removefromcart: function(id){
        cartitems.forEach((key, value) =>{
            if(id ==  key.ID){
                alertify.notify(`${id}  was removed from cart`, 'error', 5, function(){  console.log('Item removed'); });
                cartitems.splice(value, 1);
                shoppingcart.innerHTML = "";
                cart.loadcart();
                cart.getcartcount();
            }
        });
        //app.showcart();
    }, 
    getcartcount: function(){
        var cart = document.getElementById("cart");
        if(cartitems.length  != 0){
        cart.innerHTML =` Cart (items ${cartitems.length})`;
    } else{
        cart.innerHTML =` Cart (No items in the cart)`;
    }
}
};
cart.initialize();