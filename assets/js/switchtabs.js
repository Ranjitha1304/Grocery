const productData = {
  new: [
    { name: "European Zesty Lemon", price: 80, image: "./assets/images/new arrivals 1.png" },
    { name: "Apple from Kashmir", price: 240, image: "./assets/images/new arrivals 2.png" },
    { name: "Coconuts", price: 320, image: "/assets/images/new arrivals 3.png" }
  ],
  trending: [
    { name: "Organic Garlic", price: 150, image: "..images/trending 1.png" },
    { name: "Strawberries", price: 240, image: "/images/trending 2.png" },
    { name: "Spinach", price: 25, image: "../images/trending 3.png" }
  ],
  best: [
    { name: "Raddish", price: 80, image: "assets/images/best selling home 1.png" },
    { name: "Sardiness in Fish", price: 100, image: "assets/images/best selling home 2.png" },
    { name: "Coriander Leaves", price: 15, image: "assets/images/best selling home 3.png" }
  ]
};

//  Tab Switching Logic
function switchTab(tabName, element = null) {
  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active-tab"));
  if (element) {
    element.classList.add("active-tab");
  }

  const list = document.getElementById("product-list");
  list.innerHTML = "";

  productData[tabName].forEach(product => {
    list.innerHTML += `
      <div class="product">
        <img src="${product.image}" />
        <div class="info">
          <h3>${product.name}</h3>
          <p>₹ ${product.price}</p>
          <button onclick="addToCart('${product.name}', ${product.price}, '${product.image}')">Add to cart</button>
        </div>
      </div>
    `;
  });
}

// Default Tab on Load
window.onload = () => {
  const firstTabBtn = document.querySelector('.tab-btn');
  switchTab("new", firstTabBtn);
};
