document.addEventListener("DOMContentLoaded", () => {

    const foodCards = document.querySelectorAll(".food-card");

    foodCards.forEach(card => {

        const plusBtn = card.querySelector(".plus-btn");
        const minusBtn = card.querySelector(".minus-btn");

        const quantityDisplay = card.querySelector(".quantity");
        const orderQuantity = card.querySelector(".order-quantity");
        const subtotalDisplay = card.querySelector(".subtotal");

        const addCartBtn = card.querySelector(".add-cart-btn");

        const price = Number(card.dataset.priced);
        const name = card.dataset.name;
        const image = card.dataset.image;

        let quantity = 1;

        function updateCard(){

            quantityDisplay.textContent = quantity;

            orderQuantity.textContent = quantity;

            subtotalDisplay.textContent =
                "₱" + (price * quantity).toFixed(2);

        }

        plusBtn.addEventListener("click", () => {

            quantity++;

            updateCard();

        });

        minusBtn.addEventListener("click", () => {

            if(quantity > 1){

                quantity--;

                updateCard();

            }

        });

        addCartBtn.addEventListener("click", () => {

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            const existingItem = cart.find(item => item.name === name);

            if(existingItem){

                existingItem.quantity += quantity;

            }else{

                cart.push({

                    name:name,

                    price:price,

                    quantity:quantity,

                    image:image

                });

            }

            localStorage.setItem("cart", JSON.stringify(cart));

            alert(name + " added to cart!");

        });

    });

});