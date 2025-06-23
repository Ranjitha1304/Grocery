  const searchInput = document.getElementById('searchInput');

  searchInput.addEventListener('input', function () {
    const filter = this.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.products-card');

    cards.forEach(card => {
      const name = card.querySelector('h2').innerText.toLowerCase();
      if (name.includes(filter)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
