
const Foodlist =[{ID:"Pancake", Price: 250, Description: "Pancake with butter and syrup",img : 'img/food/pancakes.jfif'},
{ID: "Burger" , Price: 300, Description: "Burger with cheese and bacon", img : 'img/food/burger.jfif'},
{ID: "Pasta" , Price: 350, Description: "Pasta with tomato sauce and meat",    img : 'img/food/pasta.jfif'},
{ID: "Sandwich" , Price: 400, Description: "Sandwich with ham and cheese",   img : 'img/food/sandwich.jfif'}];
var container = document.getElementById("app");
var cartbutton = document.getElementById("cart");
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
   // alert(id + " added to cart");

    Foodlist.forEach((key, value) =>{
        //console.log(key.ID);
        if(id ==  key.ID){
           if(cartitems.find(x => x.ID === id)){
               return  alertify.warning(id +' is already in cart'); 
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
               alertify.notify(`${id} added to cart`, 'success', 3, function(){  console.log(`${id} was added`); });
               var cart = document.getElementById("cart");
                cartitems.push(newly);
                cart.innerHTML = "Cart Items " + `(${cartitems.length})`;
           }
        }
    });
}
},
    showcart: function(){
        var cart = document.getElementById("cart");
        var items = document.getElementById("chartshow");
        cart.innerHTML = "Cart Items " + `(${cartitems.length})`;
        var cartlist ="";
        cartlist += ` 
        <table class="table">
        <thead>
        <tr>
        <th scope="col">Item Image</th>
        <th scope="col">Item Name</th>
        <th scope="col">Item Price</th>
        <th scope="col">Item Description </th>
        <th scope="col">Item Action</th> 
        </thead>
        <tbody>`;
        cartitems.forEach((key, value) =>{
            cartlist += `<tr><th scope="row"><img src="${key.img}" class="card-img" style="height = 20%; width = 20%;" </th>
            <td>${key.ID}</td>
            <td>${key.Price}</td>
            <td>${key.Description}</td>
            <td><button onclick="app.removefromcart(\``+key.ID+ `\`)" class="btn btn-danger">Remove</button></td></tr>`;
        });
        cartlist += `</tbody></table><button onclick="app.hidecart()" class="btn btn-primary">Close</button>`;
        cartbutton.style.display = "none";
            items.innerHTML = cartlist;
    },
    hidecart: function(){
        var items = document.getElementById("chartshow");
        cartbutton.style.display = "block";
        items.innerHTML = "";
    },
    removefromcart: function(id){
        cartitems.forEach((key, value) =>{
            if(id ==  key.ID){
                alertify.notify(`${id} removed from cart`, 'error', 5, function(){  console.log('Item removed'); });
                cartitems.splice(value, 1);
            }
        });
        app.showcart();
    }
};
app.initialize();