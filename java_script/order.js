document.addEventListener("DOMContentLoaded", () => {

    const orderItems = document.getElementById("order-items");
    const totalItems = document.getElementById("total-items");
    const grandTotal = document.getElementById("grand-total");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function saveCart(){

        localStorage.setItem("cart", JSON.stringify(cart));

    }

    function displayCart(){

        orderItems.innerHTML = "";

        if(cart.length === 0){

            orderItems.innerHTML = `

                <div class="empty-cart">

                    <h2>Your cart is empty.</h2>

                    <p>Add some delicious Bánh Mì first!</p>

                </div>

            `;

            totalItems.textContent = "0";
            grandTotal.textContent = "₱0.00";

            return;

        }

        let totalQuantity = 0;
        let totalPrice = 0;

        cart.forEach((item,index)=>{

            totalQuantity += item.quantity;

            totalPrice += item.price * item.quantity;

            orderItems.innerHTML += `

                <div class="order-card">

                    <img src="${item.image}" alt="${item.name}">

                    <div class="order-info">

                        <h2>${item.name}</h2>

                        <p class="order-price">

                            ₱${item.price.toFixed(2)}

                        </p>

                        <div class="order-quantity">

                            <button class="decrease" data-index="${index}">−</button>

                            <span>${item.quantity}</span>

                            <button class="increase" data-index="${index}">+</button>

                        </div>

                        <p class="order-subtotal">

                            Subtotal:
                            ₱${(item.price * item.quantity).toFixed(2)}

                        </p>

                        <button
                            class="remove-btn"
                            data-index="${index}">

                            Remove

                        </button>

                    </div>

                </div>

            `;

        });

        totalItems.textContent = totalQuantity;

        grandTotal.textContent =
            "₱" + totalPrice.toFixed(2);

        buttonEvents();

    }

    function buttonEvents(){

        document.querySelectorAll(".increase").forEach(btn=>{

            btn.onclick=()=>{

                cart[btn.dataset.index].quantity++;

                saveCart();

                displayCart();

            };

        });

        document.querySelectorAll(".decrease").forEach(btn=>{

            btn.onclick=()=>{

                if(cart[btn.dataset.index].quantity>1){

                    cart[btn.dataset.index].quantity--;

                }

                saveCart();

                displayCart();

            };

        });

        document.querySelectorAll(".remove-btn").forEach(btn=>{

            btn.onclick=()=>{

                cart.splice(btn.dataset.index,1);

                saveCart();

                displayCart();

            };

        });

    }

    displayCart();

});