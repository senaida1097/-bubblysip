/* =========================
   SHOPPING CART SYSTEM
========================= */


let cart = [];





// ADD ITEM TO CART

function addToCart(name, price) {


    const existingItem = cart.find(
        item => item.name === name
    );


    if(existingItem){

        existingItem.quantity++;

    } 
    
    else {


        cart.push({

            name:name,

            price:price,

            quantity:1

        });


    }


    updateCart();


}







// UPDATE CART DISPLAY

function updateCart(){


    const cartContainer =
    document.getElementById("cart-items");


    const totalDisplay =
    document.getElementById("cart-total");



    cartContainer.innerHTML = "";



    if(cart.length === 0){


        cartContainer.innerHTML =
        "<p>Your cart is empty.</p>";


        totalDisplay.innerHTML = "0";


        updateOrderText();

        return;


    }





    let total = 0;




    cart.forEach((item,index)=>{


        total += item.price * item.quantity;




        const cartItem =
        document.createElement("div");


        cartItem.classList.add("cart-item");



        cartItem.innerHTML = `

        <div>

            <strong>${item.name}</strong>

            <br>

            $${item.price.toFixed(2)}

            x ${item.quantity}

        </div>



        <div>


            <button onclick="changeQuantity(${index}, -1)">
                -
            </button>


            <button onclick="changeQuantity(${index}, 1)">
                +
            </button>



            <button onclick="removeItem(${index})">
                ✕
            </button>


        </div>


        `;



        cartContainer.appendChild(cartItem);



    });



    totalDisplay.innerHTML =
    total.toFixed(2);



    updateOrderText();


}









// CHANGE QUANTITY


function changeQuantity(index, amount){


    cart[index].quantity += amount;



    if(cart[index].quantity <= 0){

        cart.splice(index,1);

    }



    updateCart();


}









// REMOVE ITEM


function removeItem(index){


    cart.splice(index,1);


    updateCart();


}









// SEND CART DETAILS INTO FORM


function updateOrderText(){


    const orderBox =
    document.getElementById("order-details");



    if(!orderBox){

        return;

    }



    if(cart.length === 0){


        orderBox.value =
        "No items selected.";


        return;


    }





    let orderText = "";



    cart.forEach(item=>{


        orderText +=

        `${item.quantity}x ${item.name} - $${

        (item.price * item.quantity).toFixed(2)

        }\n`;



    });





    let total = cart.reduce(

        (sum,item)=>

        sum + item.price * item.quantity,

        0

    );





    orderText +=

    `\nTotal: $${total.toFixed(2)}`;




    orderBox.value = orderText;



}









// SHOW CHECKOUT SECTION


function showCheckout(){


    if(cart.length === 0){


        alert(
        "Please add at least one drink before checkout."
        );


        return;


    }



    document
    .getElementById("checkout")
    .scrollIntoView({

        behavior:"smooth"

    });


}









// RUN WHEN PAGE LOADS


document.addEventListener(

"DOMContentLoaded",

()=>{


    updateCart();


}

);


/* ==========================
CUSTOM DRINK
========================== */

function addCustomDrink() {

    const base = document.querySelector('input[name="base"]:checked');

    if (!base) {
        alert("Please choose a base.");
        return;
    }

    const flavors = document.querySelectorAll(".flavor:checked");

    if (flavors.length === 0) {
        alert("Choose at least one flavor.");
        return;
    }

    if (flavors.length > 4) {
        alert("You may only choose up to 4 flavors.");
        return;
    }

    const flavorList = [];

    flavors.forEach(flavor => {
        flavorList.push(flavor.value);
    });

    const extras = [];

    if (document.getElementById("creamer").checked) {
        extras.push("Creamer");
    }

    if (document.getElementById("whip").checked) {
        extras.push("Whipped Cream");
    }

    const description = `24 oz

Base: ${base.value}

Flavors:
${flavorList.join(", ")}

Extras:
${extras.length ? extras.join(", ") : "None"}`;

    cart.push({
        name: "Custom Drink",
        price: 8,
        quantity: 1,
        description: description
    });

    updateCart();

}

