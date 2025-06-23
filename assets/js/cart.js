function addToCart(name, price, img, category) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, img, qty: 1, category  });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert("Item added to cart!");
}
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

// CART PAGE LOGIC
if (location.pathname.includes("cart.html")) {
  const cartContainer = document.getElementById("cart-items");
  const subtotalSpan = document.getElementById("subtotal");
  const totalSpan = document.getElementById("total");

function renderCart() {
  cartContainer.innerHTML = "";
  let subtotal = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-cart-message">
        <h2>Your cart is empty</h2>
        <a href="index.html" class="back-shopping">Go back to shopping</a>
      </div>
    `;
    subtotalSpan.textContent = "₹ 0";
    totalSpan.textContent = "₹ 0";
    return;
  }

  cart.forEach((item, index) => {
    subtotal += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.img}">
      <div class="cart-details">
        <h2 class="cat">${item.category || ''}</h2>
        <h1>${item.name}</h1>
        <h1>₹ ${item.price}</h1>
      </div>
      <div class="qty-control">
        <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
        <span class="qty">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
        <button class="delete-btn" onclick="deleteItem(${index})">🗑️</button>
      </div>
    `;
    cartContainer.appendChild(div);
  });

  subtotalSpan.textContent = "₹ " + subtotal;
  totalSpan.textContent = "₹ " + subtotal;
}


  window.changeQty = function(index, delta) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1); //  Remove the item
    }    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  };

  renderCart();
}

window.deleteItem = function(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
};

function goToSuccess() {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];

  if (cartData.length === 0) {
    alert("Your cart is empty. Please add items before checkout.");
    return; // prevent navigation
  }
  localStorage.removeItem("cart");
  window.location.href = "/sucess.html";
}
