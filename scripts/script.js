// ── Lazy Loading with Skeleton ──
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      const imageUrl = img.dataset.src;

      // Crear una imagen temporal para precargar
      const tempImg = new Image();
      tempImg.onload = () => {
        img.style.backgroundImage = `url('${imageUrl}')`;
        img.classList.remove('skeleton-image');
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      };
      tempImg.onerror = () => {
        // Si falla la carga, mantener el skeleton pero marcar como loaded
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      };
      tempImg.src = imageUrl;
    }
  });
}, { rootMargin: '50px', threshold: 0.1 });

// ── Products ──
const PRODUCTS = [
  { id: 1, name: "Hamburguesa sencilla — cerdo", desc: "Hamburguesa de cerdo clásica.", price: 750, category: "hamburguesas", img: "assets/classic-pork-burger-hamburguesa-sencilla.webp" },
  { id: 2, name: "Hamburguesa sencilla — pollo", desc: "Hamburguesa de pollo clásica.", price: 900, category: "hamburguesas", img: "assets/classic-chicken-burger-hamburguesa-sencilla.webp" },
  { id: 3, name: "Hamburguesa jamón viking — cerdo", desc: "Con jamón viking.", price: 1100, category: "hamburguesas", img: "assets/pork-burger-with-viking-ham-hamburguesa-jam.webp" },
  { id: 4, name: "Hamburguesa jamón viking — pollo", desc: "Con jamón viking.", price: 1250, category: "hamburguesas", img: "assets/chicken-burger-with-viking-ham-hamburguesa.webp" },
  { id: 5, name: "Hamburguesa jamón pierna — cerdo", desc: "Con jamón pierna.", price: 1250, category: "hamburguesas", img: "assets/pork-burger-with-leg-ham-hamburguesa-jam-n.webp" },
  { id: 6, name: "Hamburguesa jamón pierna — pollo", desc: "Con jamón pierna.", price: 1450, category: "hamburguesas", img: "assets/chicken-burger-with-leg-ham-hamburguesa-jam.webp" },
  { id: 7, name: "Hamburguesa queso gouda — cerdo", desc: "Con queso gouda.", price: 1350, category: "hamburguesas", img: "assets/pork-burger-with-melted-gouda-cheese.webp" },
  { id: 8, name: "Hamburguesa queso gouda — pollo", desc: "Con queso gouda.", price: 1550, category: "hamburguesas", img: "assets/chicken-burger-with-melted-gouda-cheese.webp" },
  { id: 9, name: "Big Americana — cerdo", desc: "Hamburguesa, huevo, queso gouda y vegetales.", price: 1800, category: "hamburguesas", img: "assets/big-americana-pork-burger-with-egg-and.webp" },
  { id: 10, name: "Big Americana — pollo", desc: "Hamburguesa, huevo, queso gouda y vegetales.", price: 2000, category: "hamburguesas", img: "assets/big-americana-chicken-burger-with-egg-and.webp" },
  { id: 11, name: "Big Plus — cerdo", desc: "2 hamburguesas, jamón viking, queso gouda y vegetales.", price: 2200, category: "hamburguesas", img: "assets/big-plus-pork-burger-with-two-patties-ham.webp" },
  { id: 12, name: "Big Plus — pollo", desc: "2 hamburguesas, jamón viking, queso gouda y vegetales.", price: 2500, category: "hamburguesas", img: "assets/big-plus-chicken-burger-with-two-patties-ham.webp" },
  { id: 13, name: "Sandwich tradicional", desc: "Jamón viking, queso gouda y vegetales.", price: 1200, category: "sandwiches", img: "assets/traditional-sandwich-with-ham-and-cheese.webp" },
  { id: 14, name: "Sandwich a lo cubano", desc: "Jamón viking, jamón pierna, bistec cerdo y vegetales.", price: 1450, category: "sandwiches", img: "assets/sandwich-a-lo-cubano-with-ham-pork-steak-and.webp" },
  { id: 15, name: "Sandwich de Jamón Pierna", desc: "120 g de jamón pierna y vegetales.", price: 0, category: "sandwiches", img: "assets/ham-sandwich-sandwich-de-jam-n-pierna-on-a.webp" },
  { id: 16, name: "Sandwich de Bistec de cerdo", desc: "200 g de bistec de cerdo, cebolla y vegetales.", price: 0, category: "sandwiches", img: "assets/pork-steak-sandwich-with-onions-and.webp" },
  { id: 17, name: "Pizza napolitana — queso blanco", desc: "Pizza napolitana clásica con queso blanco.", price: 1350, category: "pizzas", img: "assets/classic-neapolitan-pizza-with-white-cheese.webp" },
  { id: 18, name: "Pizza napolitana — queso gouda", desc: "Pizza napolitana clásica con queso gouda.", price: 1500, category: "pizzas", img: "assets/classic-neapolitan-pizza-with-gouda-cheese.webp" },
  { id: 19, name: "Pizza con jamón viking — queso blanco", desc: "Pizza con jamón viking y queso blanco.", price: 1750, category: "pizzas", img: "assets/pizza-with-viking-ham-and-white-cheese-pizza.webp" },
  { id: 20, name: "Pizza con jamón viking — queso gouda", desc: "Pizza con jamón viking y queso gouda.", price: 2000, category: "pizzas", img: "assets/pizza-with-viking-ham-and-gouda-cheese-pizza.webp" },
  { id: 21, name: "Pizza con jamón pierna — queso blanco", desc: "Pizza con jamón pierna y queso blanco.", price: 1900, category: "pizzas", img: "assets/pizza-with-leg-ham-and-white-cheese-pizza.webp" },
  { id: 22, name: "Pizza con jamón pierna — queso gouda", desc: "Pizza con jamón pierna y queso gouda.", price: 2150, category: "pizzas", img: "assets/pizza-with-leg-ham-and-gouda-cheese-pizza.webp" },
  { id: 23, name: "Pizza con aceitunas — queso blanco", desc: "Pizza con aceitunas y queso blanco.", price: 1750, category: "pizzas", img: "assets/pizza-with-olives-and-white-cheese-pizza-con.webp" },
  { id: 24, name: "Pizza con aceitunas — queso gouda", desc: "Pizza con aceitunas y queso gouda.", price: 1950, category: "pizzas", img: "assets/pizza-with-olives-and-gouda-cheese-pizza-con.webp" },
  { id: 25, name: "Pizza Roldos — queso blanco", desc: "Bolognesa estilo Roldos, aceitunas y cebolla. Queso blanco.", price: 2100, category: "pizzas", img: "assets/pizza-rold-s-with-bolognese-sauce-olives-1.webp" },
  { id: 26, name: "Pizza Roldos — queso gouda", desc: "Bolognesa estilo Roldos, aceitunas y cebolla. Queso gouda.", price: 2300, category: "pizzas", img: "assets/pizza-rold-s-with-bolognese-sauce-olives-2.webp" },
  { id: 27, name: "Espagueti napolitano — queso blanco", desc: "Espagueti napolitano con queso blanco.", price: 1250, category: "pastas", img: "assets/professional-food-photography-of-spaghetti-with-neapolitan-sauce-and-white.webp" },
  { id: 28, name: "Espagueti napolitano — queso gouda", desc: "Espagueti napolitano con queso gouda.", price: 1450, category: "pastas", img: "assets/professional-food-photography-of-spaghetti-with-neapolitan-sauce-and-gouda.webp" },
  { id: 29, name: "Espagueti con jamón viking — queso blanco", desc: "Espagueti con jamón viking y queso blanco.", price: 1750, category: "pastas", img: "assets/professional-food-photography-of-spaghetti-with-viking-ham-and-white-cheese.webp" },
  { id: 30, name: "Espagueti con jamón viking — queso gouda", desc: "Espagueti con jamón viking y queso gouda.", price: 1900, category: "pastas", img: "assets/professional-food-photography-of-spaghetti-with-viking-ham-and-gouda-cheese.webp" },
  { id: 31, name: "Espagueti con jamón pierna — queso blanco", desc: "Espagueti con jamón pierna y queso blanco.", price: 1900, category: "pastas", img: "assets/professional-food-photography-of-spaghetti-with-leg-ham-and-white-cheese.webp" },
  { id: 32, name: "Espagueti con jamón pierna — queso gouda", desc: "Espagueti con jamón pierna y queso gouda.", price: 2150, category: "pastas", img: "assets/professional-food-photography-of-spaghetti-with-leg-ham-and-gouda-cheese.webp" },
  { id: 33, name: "Espagueti con aceitunas — queso blanco", desc: "Espagueti con aceitunas y queso blanco.", price: 1700, category: "pastas", img: "assets/professional-food-photography-of-spaghetti-with-olives-and-white-cheese.webp" },
  { id: 34, name: "Espagueti con aceitunas — queso gouda", desc: "Espagueti con aceitunas y queso gouda.", price: 1900, category: "pastas", img: "assets/professional-food-photography-of-spaghetti-with-olives-and-gouda-cheese.webp" },
  { id: 35, name: "Espagueti Roldos — queso blanco", desc: "Bolognesa estilo Roldos, aceituna y cebolla. Queso blanco.", price: 2050, category: "pastas", img: "assets/professional-food-photography-of-espagueti-rold-s-with-bolognese-sauce-olives-1.webp" },
  { id: 36, name: "Espagueti Roldos — queso gouda", desc: "Bolognesa estilo Roldos, aceituna y cebolla. Queso gouda.", price: 2250, category: "pastas", img: "assets/professional-food-photography-of-espagueti-rold-s-with-bolognese-sauce-olives-2.webp" },
  { id: 37, name: "Agregado — Queso blanco", desc: "Porción de queso blanco para agregar a tu pedido.", price: 300, category: "agregados", img: "assets/portion-of-white-cheese-and-gouda-cheese.webp" },
  { id: 38, name: "Agregado — Queso gouda", desc: "Porción de queso gouda para agregar a tu pedido.", price: 650, category: "agregados", img: "assets/portion-of-white-cheese-and-gouda-cheese.webp" },
  { id: 39, name: "Agregado — Jamón viking", desc: "Porción de jamón viking para agregar a tu pedido.", price: 450, category: "agregados", img: "assets/pizza-with-viking-ham-and-white-cheese-pizza.webp" },
  { id: 40, name: "Agregado — Jamón pierna", desc: "Porción de jamón pierna para agregar a tu pedido.", price: 600, category: "agregados", img: "assets/pizza-with-leg-ham-and-white-cheese-pizza.webp" },
  { id: 41, name: "Agregado — Huevo", desc: "Huevo para agregar a tu pedido.", price: 400, category: "agregados", img: "assets/big-americana-chicken-burger-with-egg-and.webp" },
  { id: 42, name: "Ensalada fría 160g", desc: "Ensalada fría, porción de 160 gramos.", price: 400, category: "otras", img: "assets/cold-pasta-salad-ensalada-fr-a-on-a-clean.webp" },
  { id: 43, name: "Ensalada fría 1 lb", desc: "Ensalada fría, porción de 1 libra.", price: 1250, category: "otras", img: "assets/cold-pasta-salad-ensalada-fr-a-on-a-clean.webp" },
  { id: 44, name: "Flan", desc: "Flan casero.", price: 550, category: "otras", img: "assets/big-americana-chicken-burger-with-egg-and.webp" }
];

const cart = {};
let activeFilter = 'todos';

// ── Skeleton Loading ──
function createSkeletonCard() {
  return `
    <div class="skeleton-card">
      <div class="skeleton-image"></div>
      <div class="skeleton-content">
        <div class="skeleton-title"></div>
        <div class="skeleton-desc"></div>
        <div class="skeleton-footer">
          <div class="skeleton-price"></div>
          <div class="skeleton-btn"></div>
        </div>
      </div>
    </div>
  `;
}

function loadProducts() {
  renderProducts(PRODUCTS);
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
        <h3 class="category-title display brand">${categoryNames[cat]}</h3>
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
            <div class="product-card" onclick="openProductModal(PRODUCTS.find(x => x.id === ${p.id}))">
              <div class="card-image skeleton-image" data-src="${p.img}"></div>
              <div class="card-content">
                <div class="card-name">${cleanName}</div>
                <div class="card-desc">${p.desc}</div>
                <div class="card-footer">
                  <div class="card-price">$${p.price.toLocaleString('es-CU')} CUP</div>
                  <button class="add-btn" onclick="event.stopPropagation(); addToCart(${p.id},'${cleanName.replace(/'/g, "\\'")}',${p.price})" title="Agregar al pedido">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
                  </button>
                </div>
              </div>
            </div>
          `;
    }).join('')}
      </div>
    `;
    grid.appendChild(section);
  });

  document.getElementById('no-results').style.display = list.length === 0 ? 'block' : 'none';

  // Start observing lazy loaded images
  setTimeout(() => {
    document.querySelectorAll('.card-image[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }, 100);
}

function scrollSlider(cat, dir) {
  const slider = document.getElementById(`slider-${cat}`);
  if (slider) {
    slider.scrollBy({ left: dir * 300, behavior: 'smooth' });
  }
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
  showToast(name, price);
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
  document.getElementById('cart-subtotal').textContent = `$${totalP.toLocaleString('es-CU')} CUP`;
  document.getElementById('cart-count').textContent = `${totalQ} item${totalQ !== 1 ? 's' : ''}`;
  const list = document.getElementById('cart-items-list');
  const empty = document.getElementById('cart-empty');
  const footer = document.getElementById('cart-footer');
  if (items.length === 0) {
    list.innerHTML = ''; empty.style.display = 'flex'; footer.style.display = 'none';
  } else {
    empty.style.display = 'none'; footer.style.display = 'block';
    list.innerHTML = items.map(([id, item]) => `
    <div class="cart-item">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${item.price.toLocaleString('es-CU')} CUP c/u</div>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" onclick="removeFromCart(${id})" aria-label="Disminuir">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/></svg>
        </button>
        <span class="qty-value">${item.qty}</span>
        <button class="qty-btn" onclick="addToCart(${id},'${item.name.replace(/'/g, "\\'")}',${item.price})" aria-label="Aumentar">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
        </button>
      </div>
      <div class="cart-item-total">$${(item.price * item.qty).toLocaleString('es-CU')} CUP</div>
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

function confirmOrder() {
  const items = Object.entries(cart);
  if (items.length === 0) return;

  const total = items.reduce((s, [, v]) => s + v.qty * v.price, 0);
  const itemList = items.map(([, v]) => `${v.qty}x ${v.name}`).join('\n');
  const message = `¡Hola! Quiero hacer un pedido de Roldos:\n\n${itemList}\n\nTotal: $${total.toLocaleString('es-CU')} CUP`;

  window.open(`https://wa.me/53532627757?text=${encodeURIComponent(message)}`, '_blank');
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

// ── Toast Notification ──
function showToast(name, price) {
  const existing = document.querySelector('.cart-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'cart-toast';
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
    </svg>
    <div class="toast-content">
      <div class="toast-title">Agregado al pedido</div>
      <div class="toast-item">${name}</div>
    </div>
  `;

  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

function addToCartFromModal() {
  if (currentModalProduct) {
    addToCart(currentModalProduct.id);
  }
}
