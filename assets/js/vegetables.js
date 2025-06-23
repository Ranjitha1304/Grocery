// Filter logic
document.getElementById("priceRange").addEventListener("input", function () {
  const value = parseInt(this.value);
  document.getElementById("priceValue").textContent = value;

  // Set filled portion as green
const max = this.max;
const percent = (value / max) * 100;
this.style.background = `linear-gradient(to right, #4EB528 0%, #4EB528 ${percent}%, #ddd ${percent}%, #ddd 100%)`;


  document.querySelectorAll(".products-card").forEach(card => {
    const price = parseInt(card.getAttribute("data-price"));
    if (price <= value) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
