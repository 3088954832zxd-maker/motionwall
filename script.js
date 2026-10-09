const gallery = document.getElementById('gallery');
const searchInput = document.getElementById('searchInput');
const categoryList = document.getElementById('categoryList');
const modal = document.getElementById('previewModal');
const modalTitle = document.getElementById('modalTitle');
const modalMeta = document.getElementById('modalMeta');
const modalTags = document.getElementById('modalTags');
const modalDescription = document.getElementById('modalDescription');
const modalImage = document.getElementById('modalImage');
const downloadLink = document.getElementById('downloadLink');
const closeModal = document.getElementById('closeModal');
const closeButton = document.getElementById('closeButton');

let wallpapers = [];
let activeCategory = '全部';

function renderCategories(items) {
  const categories = ['全部', ...new Set(items.map(item => item.category))];
  categoryList.innerHTML = categories.map(category => `
    <button class="category-item ${activeCategory === category ? 'active' : ''}" type="button" data-category="${category}">${category}</button>
  `).join('');

  categoryList.querySelectorAll('.category-item').forEach(button => {
    button.addEventListener('click', () => {
      activeCategory = button.dataset.category;
      renderGallery();
      renderCategories(wallpapers);
    });
  });
}

function showModal(item) {
  modalTitle.textContent = item.title;
  modalMeta.innerHTML = `
    <span>分类：${item.category}</span>
    <span>分辨率：${item.resolution}</span>
    <span>风格：${item.style}</span>
  `;
  modalTags.innerHTML = item.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
  modalDescription.textContent = item.description;
  modalImage.src = item.preview;
  modalImage.alt = item.title;
  downloadLink.href = item.download;
  downloadLink.setAttribute('download', `${item.title}.jpg`);
  modal.classList.add('open');
}

function closePreview() {
  modal.classList.remove('open');
}

function renderGallery() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = wallpapers.filter(item => {
    const matchesCategory = activeCategory === '全部' || item.category === activeCategory;
    const haystack = [item.title, item.category, item.style, item.tags.join(' ')].join(' ').toLowerCase();
    const matchesSearch = !query || haystack.includes(query);
    return matchesCategory && matchesSearch;
  });

  if (!filtered.length) {
    gallery.innerHTML = `
      <div class="empty-state">
        <h3>没有找到相关壁纸</h3>
        <p>尝试更换搜索词或切换分类。</p>
      </div>
    `;
    return;
  }

  gallery.innerHTML = filtered.map(item => `
    <article class="wallpaper-card" aria-label="${item.title}">
      <div class="thumb">
        <span class="badge">${item.category}</span>
        <img src="${item.preview}" alt="${item.title}" loading="lazy" />
      </div>
      <div class="card-body">
        <div class="card-row">
          <h3 class="card-title">${item.title}</h3>
        </div>
        <div class="card-meta">
          <span>${item.style}</span>
          <span>${item.resolution}</span>
        </div>
        <div class="card-actions">
          <button class="mini-button primary" type="button" data-preview="${item.id}">预览</button>
          <a class="mini-button" href="${item.download}" target="_blank" rel="noreferrer">下载</a>
        </div>
      </div>
    </article>
  `).join('');

  gallery.querySelectorAll('[data-preview]').forEach(button => {
    const item = wallpapers.find(w => String(w.id) === button.dataset.preview);
    button.addEventListener('click', () => showModal(item));
  });
}

document.getElementById('exploreBtn').addEventListener('click', () => {
  document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('downloadBtn').addEventListener('click', () => {
  const first = wallpapers[0];
  if (first) {
    window.open(first.download, '_blank', 'noopener');
  }
});

searchInput.addEventListener('input', renderGallery);
closeModal.addEventListener('click', closePreview);
closeButton.addEventListener('click', closePreview);
modal.addEventListener('click', event => {
  if (event.target === modal) closePreview();
});

fetch('wallpapers.json')
  .then(response => response.json())
  .then(data => {
    wallpapers = data;
    renderCategories(wallpapers);
    renderGallery();
  })
  .catch(error => {
    console.error('读取壁纸数据失败:', error);
    gallery.innerHTML = `
      <div class="empty-state">
        <h3>壁纸数据加载失败</h3>
        <p>请检查 wallpapers.json 是否存在且格式正确。</p>
      </div>
    `;
  });
