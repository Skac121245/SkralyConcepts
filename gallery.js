fetch('products.json')
  .then(res => res.json())
  .then(products => {
    const grid = document.getElementById('gallery-grid');
    products.forEach(p => {
      const col = document.createElement('div');
      col.className = 'col-sm-6 col-md-4 col-lg-3';

      const card = document.createElement('a');
      card.href = `product.html?id=${p.id}`;
      card.className = 'card h-100';
      card.innerHTML = `
        <img src="${p.thumbs[0]}" alt="${p.title}">
        <div class="info"><h5>${p.title}</h5></div>`;

      col.appendChild(card);
      grid.appendChild(col);
    });
  });