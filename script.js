document.addEventListener("DOMContentLoaded", function () {

  const cartIcon = document.querySelector(".cart-box");
  const cartBox = document.querySelector(".cart-box2");
  const closeBtn = document.getElementById("close-butn");
  const cartCount = document.querySelector(".count");
  const totalElement = document.getElementById("total");
  const buttons = document.querySelectorAll(".button2");

  let cart = [];
  let total = 0;

  cartIcon.addEventListener("click", () => {
    cartBox.classList.add("active");
  });
  closeBtn.addEventListener("click", () => {
    cartBox.classList.remove("active");
  });

  buttons.forEach((btn) => {
    btn.addEventListener("click", function () {

      const card = this.closest(".card");
      const name = card.querySelector(".paragraphs").innerText;
      const priceText = card.querySelector(".price").innerText;
      const price = parseInt(priceText);
      const imgSrc = card.querySelector("img").src;

      addToCart(name, price, imgSrc);
    });
  });

  function addToCart(name, price, imgSrc) {

    let existing = cart.find(item => item.name === name);

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({
        name,
        price,
        imgSrc,
        quantity: 1
      });
    }

    updateCart();
  }

  function updateCart() {

    const cartContainer = document.querySelector(".cart-box2");
    const oldItems = cartContainer.querySelectorAll(".cartItems");
    oldItems.forEach(item => item.remove());

    total = 0;
    let count = 0;

    cart.forEach((item, index) => {

      total += item.price * item.quantity;
      count += item.quantity;

      const div = document.createElement("div");
      div.classList.add("cartItems");

      div.innerHTML = `
        <div class="cart-img">
          <img src="${item.imgSrc}">
        </div>

        <div class="cart-para">
          <p>${item.name}</p>
          <p class="cart-price">$${item.price}</p>
        </div>

        <div class="cart-quantity">
          <button class="decrement">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="increment">+</button>
        </div>

        <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
      `;

      cartContainer.insertBefore(div, totalElement.parentElement);

      // Quantity buttons
      div.querySelector(".increment").addEventListener("click", () => {
        item.quantity++;
        updateCart();
      });

      div.querySelector(".decrement").addEventListener("click", () => {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          cart.splice(index, 1);
        }
        updateCart();
      });

      div.querySelector(".delete-btn").addEventListener("click", () => {
        cart.splice(index, 1);
        updateCart();
      });

    });

    cartCount.innerText = count;
    totalElement.innerText = total;
  }

});
