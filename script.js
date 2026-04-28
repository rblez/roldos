// ── Products ──
let PRODUCTS = [];
const cart = {};
let activeFilter = 'todos';

async function loadProducts() {
  try {
    const res = await fetch('./products.json');
    if (!res.ok) throw new Error();
    PRODUCTS = await res.json();
    renderProducts(PRODUCTS);
  } catch {
    document.getElementById('no-results').style.display = 'block';
    document.getElementById('no-results').querySelector('p').textContent = 'Error al cargar los productos';
  }
}

function renderProducts(list) {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = '';

  const categories = ['hamburguesas', 'sandwiches', 'pizzas', 'pastas', 'agregados', 'otras'];
  const categoryNames = {
    hamburguesas: 'Hamburguesas',
    sandwiches: 'Sandwiches',
    pizzas: 'Pizzas',
    pastas: 'Pastas',
    agregados: 'Agregados',
    otras: 'Otras'
  };

  categories.forEach((cat) => {
    const products = list.filter(p => p.category === cat);
    if (products.length === 0) return;

    const section = document.createElement('div');
    section.className = 'category-section';
    section.innerHTML = `
      <div class="category-header">
        <h3 class="category-title">${categoryNames[cat]}</h3>
        <div class="category-nav">
          <button class="nav-btn" onclick="scrollSlider('${cat}', -1)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button class="nav-btn" onclick="scrollSlider('${cat}', 1)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>
      <div class="product-slider" id="slider-${cat}">
        ${products.map((p) => {
      const cleanName = p.name.replace(/ — /g, ' · ').replace(/-/g, ' ');
      return `
            <div class="product-card" style="background-image: url('${p.img}')" onclick="openProductModal(PRODUCTS.find(x => x.id === ${p.id}))">
              <button class="card-info-btn" onclick="event.stopPropagation(); openProductModal(PRODUCTS.find(x => x.id === ${p.id}))" title="Ver detalles">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
              </button>
              <button class="card-btn-visible" onclick="event.stopPropagation(); addToCart(${p.id},'${cleanName.replace(/'/g, "\\'")}',${p.price})" title="Agregar al pedido">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
              </button>
            </div>
          `;
    }).join('')}
      </div>
    `;
    grid.appendChild(section);
  });

  document.getElementById('no-results').style.display = list.length === 0 ? 'block' : 'none';
}

function scrollSlider(cat, dir) {
  const slider = document.getElementById(`slider-${cat}`);
  slider.scrollBy({ left: dir * 300, behavior: 'smooth' });
}

function filterProducts(btn, cat) {
  activeFilter = cat;
  document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('search-input').value = '';
  applyFilter('', cat);
}

function searchProducts(q) { applyFilter(q.toLowerCase(), activeFilter); }

function applyFilter(q, cat) {
  const filtered = PRODUCTS.filter(p => {
    const mc = cat === 'todos' || p.category === cat;
    const mq = !q || p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
    return mc && mq;
  });
  renderProducts(filtered);
}

// ── Cart ──
function addToCart(id, name, price) {
  cart[id] ? cart[id].qty++ : (cart[id] = { name, price, qty: 1 });
  updateCartUI();
  openCartPanel();
}
function removeFromCart(id) {
  if (!cart[id]) return;
  cart[id].qty--;
  if (cart[id].qty <= 0) delete cart[id];
  updateCartUI();
}
function clearCart() { Object.keys(cart).forEach(k => delete cart[k]); updateCartUI(); }

function updateCartUI() {
  const items = Object.entries(cart);
  const totalQ = items.reduce((s, [, v]) => s + v.qty, 0);
  const totalP = items.reduce((s, [, v]) => s + v.qty * v.price, 0);
  const badge = document.getElementById('cart-badge');
  badge.textContent = totalQ;
  badge.style.display = totalQ > 0 ? 'flex' : 'none';
  document.getElementById('cart-total').textContent = `$${totalP.toLocaleString('es-CU')} CUP`;
  const list = document.getElementById('cart-items-list');
  const empty = document.getElementById('cart-empty');
  const footer = document.getElementById('cart-footer');
  if (items.length === 0) {
    list.innerHTML = ''; empty.style.display = 'flex'; footer.style.display = 'none';
  } else {
    empty.style.display = 'none'; footer.style.display = 'block';
    list.innerHTML = items.map(([id, item]) => `
    <div class="cart-item">
      <div style="flex:1">
        <div style="font-size:14px;font-weight:600;margin-bottom:3px">${item.name}</div>
        <div style="font-size:13px;color:var(--yellow)">${(item.price * item.qty).toLocaleString('es-CU')} CUP</div>
      </div>
      <div style="display:flex;align-items:center;gap:8px">
        <button class="qty-btn" onclick="removeFromCart(${id})">−</button>
        <span style="font-size:15px;font-weight:700;min-width:20px;text-align:center">${item.qty}</span>
        <button class="qty-btn" onclick="addToCart(${id},'${item.name.replace(/'/g, "\\'")}',${item.price})">+</button>
      </div>
    </div>`).join('');
  }
}

function openCartPanel() {
  document.getElementById('cart-overlay').classList.add('open');
  document.getElementById('cart-sidebar').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function openCart() { openCartPanel(); }
function closeCart() {
  document.getElementById('cart-overlay').classList.remove('open');
  document.getElementById('cart-sidebar').classList.remove('open');
  document.body.style.overflow = '';
}

// ── QR ──
function initQR() {
  const url = window.location.href;
  document.getElementById('qr-url-display').textContent = url;
  new QRCode(document.getElementById('qrcode'), {
    text: url, width: 180, height: 180,
    colorDark: '#000', colorLight: '#fff',
    correctLevel: QRCode.CorrectLevel.M
  });
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    const btn = document.getElementById('copy-btn-text');
    btn.textContent = '¡Copiado!';
    setTimeout(() => btn.textContent = 'Copiar enlace', 2000);
  } catch { prompt('Copia este enlace:', window.location.href); }
}

function openQRModal() {
  document.getElementById('qr-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
  initQR();
}

function closeQRModal(e) {
  if (e.target.id === 'qr-modal') {
    document.getElementById('qr-modal').classList.remove('open');
    document.body.style.overflow = '';
  }
}

function closeQRModalBtn() {
  document.getElementById('qr-modal').classList.remove('open');
  document.body.style.overflow = '';
}

// ── Mobile menu ──
function openMobileMenu() { document.getElementById('mobile-menu').classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeMobileMenu() { document.getElementById('mobile-menu').classList.remove('open'); document.body.style.overflow = ''; }

// ── Scroll reveal ──
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.06 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ── Re-observe new cards ──
function observeNewCards() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.04 });
  const mutObs = new MutationObserver(() => {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => obs.observe(el));
  });
  mutObs.observe(document.getElementById('products-grid'), { childList: true });
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  initQR();
  initReveal();
  observeNewCards();
  updateCartUI();
});

// ── Product Modal ──
let currentModalProduct = null;

function openProductModal(product) {
  currentModalProduct = product;
  document.getElementById('modal-product-img').src = product.img;
  document.getElementById('modal-product-cat').textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
  document.getElementById('modal-product-name').textContent = product.name;
  document.getElementById('modal-product-desc').textContent = product.desc;
  document.getElementById('modal-product-price').textContent = `$ ${product.price.toLocaleString('es-CU')} CUP`;
  document.getElementById('product-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProductModal(event) {
  if (event && event.target !== event.currentTarget) return;
  document.getElementById('product-modal').classList.remove('active');
  document.body.style.overflow = '';
}

function closeProductModalBtn() {
  document.getElementById('product-modal').classList.remove('active');
  document.body.style.overflow = '';
}

function addToCartFromModal() {
  if (currentModalProduct) {
    addToCart(currentModalProduct.id);
  }
}
