
const Foodlist =[{ID:"Pancake", Price: 250, Description: "Pancake with butter and syrup",img : 'img/food/pancakes.jfif'},
{ID: "Burger" , Price: 300, Description: "Burger with cheese and bacon", img : 'img/food/burger.jfif'},
{ID: "Pasta" , Price: 350, Description: "Pasta with tomato sauce and meat",    img : 'img/food/pasta.jfif'},
{ID: "Sandwich" , Price: 400, Description: "Sandwich with ham and cheese",   img : 'img/food/sandwich.jfif'}];
var container = document.getElementById("app");
var storage = window.localStorage;
var cartitems =[];
let app ={
    initialize: function(){
        document.addEventListener('deviceready', this.applicationready, false);
    },
    applicationready: function(){
    app.createitems();
    console.log(navigator.notification);
   // navigator.notification.alert("hello world", onConfirm, "title", "button");
},
    createitems: function(){
    for(var i = 0; i < Foodlist.length; i++)
    {
        var food = Foodlist[i];
        var div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `<div class="card">
        <img src="${food.img}" class="card-img-top">
        <div class="card-body">
        <h4>${food.ID}</h4>
        <p class="card-text">$ ${food.Price}</p>
        <p>${food.Description}</p>
        <button onclick="app.addtocart(\``+food.ID+ `\`)" class="btn btn-primary">Add to cart</button></div></div>`;
        container.appendChild(div);
    }
},  addtocart : function(id){
{
    alert(id + " added to cart");
    alertify.notify(`${id} added to cart`, 'success', 5, function(){  console.log('dismissed'); });
    Foodlist.forEach((key, value) =>{
        console.log(key.ID);
        if(id ==  key.ID){
           if(cartitems.hasOwnProperty(id)){
               return  alertify.notify(`${id} is already in the  cart`, 'success', 3, function(){  console.log('dismissed'); });
           }
           else{
               var newly = 
                  {
                          ID: key.ID,
                            Price:    key.Price,
                            Description: key.Description,
                            img : key.img
                   }
               ;
               var cart = document.getElementById("cart");
                cartitems.push(newly);
                cart.innerHTML = "Cart Items" + cartitems.length;
           }
        }
    });
}
}
};
app.initialize();