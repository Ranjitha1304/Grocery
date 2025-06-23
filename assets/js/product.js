// 1. Function to call when user clicks on a product (from vegetables.html, etc.)
function viewProduct(name, price, images, shortDesc, longDesc, category) {
  const productDetails = {
    name,
    price,
    images,
    shortDesc,
    longDesc
  };
  localStorage.setItem("productDetails", JSON.stringify(productDetails));
  window.location.href = `product.html?cat=${encodeURIComponent(category)}`;
}

// 2. The logic that runs only inside product.html
if (location.pathname.includes("product.html")) {
  const params = new URLSearchParams(location.search);
  const category = params.get("cat") || "Unknown";
  const data = JSON.parse(localStorage.getItem('productDetails'));

  // Render content
  document.getElementById("prod-name").textContent = data.name;
  document.getElementById("prod-desc").textContent = data.shortDesc;
  document.getElementById("main-img").src = data.images[0];
  document.getElementById("long-desc").textContent = data.longDesc;
  document.getElementById("prod-price").textContent = `₹ ${data.price}`;
  document.getElementById("prod-price").setAttribute("data-base", data.price);

  const thumbs = document.getElementById("thumbs");
  data.images.forEach((img, index) => {
    const imgEl = document.createElement("img");
    imgEl.src = img;
    imgEl.onclick = () => {
      document.getElementById("main-img").src = img;
      document.querySelectorAll("#thumbs img").forEach(i => i.classList.remove("active"));
      imgEl.classList.add("active");
    };
    if (index === 0) imgEl.classList.add("active");
    thumbs.appendChild(imgEl);
  });

  let qty = 1;
  window.changeQty = function (delta) {
    qty += delta;
    if (qty < 1) qty = 1;
    document.getElementById("qty").textContent = qty;
  };

  let selectedSize = "250g";
  document.querySelectorAll('input[name="size"]').forEach(radio => {
    radio.addEventListener("change", (e) => {
      selectedSize = e.target.value;

          // Update Quantity Label
    document.getElementById("size-label").textContent = `Quantity: ${selectedSize}`;

      const base = parseFloat(document.getElementById("prod-price").dataset.base);
      let multiplier = 1;
      if (selectedSize === "500g") multiplier = 2;
      else if (selectedSize === "1kg") multiplier = 4;
      const updatedPrice = base * multiplier;
      document.getElementById("prod-price").textContent = `₹ ${updatedPrice}`;
    });
  });

  window.addToCart = function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const currentPrice = parseFloat(document.getElementById("prod-price").textContent.replace("₹", "").trim());

    const existing = cart.find(item => item.name === data.name && item.size === selectedSize);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        name: data.name,
        price: currentPrice,
        img: data.images[0],
        qty: qty,
        size: selectedSize,
        category: category
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart!");
  };
}


