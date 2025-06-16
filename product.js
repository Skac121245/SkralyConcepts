const id = new URLSearchParams(location.search).get('id');
if (!id) document.body.innerHTML = '<p class="error">No product selected.</p>';
else {
  fetch('products.json')
    .then(r => r.json())
    .then(data => {
      const p = data.find(x => x.id === id);
      if (!p) return document.body.innerHTML = '<p class="error">Product not found.</p>';

      document.getElementById('title').textContent = p.title;
      document.getElementById('desc').textContent = p.desc;

      let idx = 0;
      const disp = document.querySelector('.media-display');

      function show(i) {
        idx = (i + p.media.length) % p.media.length;
        disp.innerHTML = '';
        const m = p.media[idx];
        const el = document.createElement(m.type === 'video' ? 'video' : 'img');
        el.src = m.src;
        if (m.type === 'video') el.controls = true;
        disp.appendChild(el);
      }

      document.getElementById('prev').onclick = () => show(idx - 1);
      document.getElementById('next').onclick = () => show(idx + 1);

      show(0);
    });
}
