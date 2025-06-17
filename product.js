const id = new URLSearchParams(location.search).get('id');
if (!id) {
  document.body.innerHTML = '<p class="error">No product selected.</p>';
} else {
  fetch('products.json')
    .then(r => r.json())
    .then(data => {
      const p = data.find(x => x.id === id);
      if (!p) {
        document.body.innerHTML = '<p class="error">Product not found.</p>';
        return;
      }

      // Populate title and description
      document.getElementById('title').textContent = p.title;
      document.getElementById('desc').textContent = p.desc;

      // Set up media carousel
      const mediaCount = p.media.length;
      const prevBtn = document.getElementById('prev');
      const nextBtn = document.getElementById('next');
      const disp = document.querySelector('.media-display');

      // Hide arrows if only one media item
      if (mediaCount <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
      }

      let idx = 0;
      function show(i) {
        idx = (i + mediaCount) % mediaCount;
        disp.innerHTML = '';
        const m = p.media[idx];
        const el = document.createElement(m.type === 'video' ? 'video' : 'img');
        el.src = m.src;
        if (m.type === 'video') el.controls = true;
        el.classList.add('w-100', 'rounded');
        disp.appendChild(el);
      }

      prevBtn.onclick = () => show(idx - 1);
      nextBtn.onclick = () => show(idx + 1);
      show(0);

      // Hook up comment section
      const submitBtn = document.getElementById('submitComment');
      const commentBox = document.getElementById('commentText');
      const status = document.getElementById('commentStatus');

      submitBtn.addEventListener('click', () => {
        const text = commentBox.value.trim();
        if (!text) {
          status.textContent = 'Please write a comment.';
          return;
        }
        status.textContent = 'Submitting…';

        fetch('https://script.google.com/macros/s/AKfycbyzLT0tgtsDDX0fKr8gjrschcwlVZ1Jnk5WOtm2POBqlvfNqJ9JP3HU7SvtzzRZWWXm/exec', {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({ productId: id, comment: text })
        })
        .then(() => {
          status.textContent = '☑️ Comment submitted!';
          commentBox.value = '';
        })
        .catch(() => {
          status.textContent = '⚠️ Submission failed';
        });
      });
    })
    .catch(err => {
      console.error(err);
      document.body.innerHTML = '<p class="error">Failed to load product.</p>';
    });
}
