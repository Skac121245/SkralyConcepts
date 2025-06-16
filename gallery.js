fetch('products.json')
  .then(res => res.json())
  .then(products => {
    const grid = document.querySelector('.grid');
    products.forEach(p => {
      const card = document.createElement('a');
      card.href = `product.html?id=${p.id}`;
      card.className = 'card';
      card.innerHTML = `
        <img src="${p.thumbs[0]}" alt="${p.title}">
        <div class="info"><h3>${p.title}</h3></div>`;
      grid.appendChild(card);
    });
  });
