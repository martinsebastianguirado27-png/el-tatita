/* ========== CONFIGURACIÓN ========== */
const PRODUCTS = [
    {
        id: 100,
        name: 'Juego de Sillones El Tatita',
        description: 'Madera de pino seleccionada y calidad artesanal. El más pedido.',
        price: 170000,
        image: 'https://i.postimg.cc/Nj25f2QL/Whats-App-Image-2026-03-14-at-9-52-26-PM.jpg'
    },
    { id: 1, name: 'Sillón Individual', description: 'Cómodo sillón de pino para una persona.', price: 35000, image: 'https://i.postimg.cc/tRdhzWjh/Gemini-Generated-Image-3kru2q3kru2q3kru.png' },
    { id: 2, name: 'Mesa Ratonera', description: 'Mesa baja perfecta para acompañar tus sillones.', price: 35000, image: 'https://i.postimg.cc/rpt4RtjV/Gemini-Generated-Image-ejty56ejty56ejty-(1).png' },
    { id: 3, name: 'Sillón Doble', description: 'Sillón de pino para dos personas. Ideal para jardín.', price: 70000, image: 'https://i.postimg.cc/26HtKMpj/Whats-App-Image-2026-03-08-at-1-56-21-PM.jpg' },
    { id: 4, name: 'Sillón Cama', description: 'Versátil sillón cama perfecto para tu espacio favorito.', price: 70000, image: 'https://i.postimg.cc/V6NGngSt/Whats-App-Image-2026-03-08-at-1-58-28-PM.jpg' },
    { id: 5, name: 'Casa de Perro', description: 'Casita de pino para tu mascota.', price: 50000, image: 'https://i.postimg.cc/cHncWb2k/Whats-App-Image-2026-03-14-at-6-28-23-PM-(1).jpg' },
    { id: 6, name: 'Carretilla Jardinera', description: 'Decorativa carretilla para tus plantas.', price: 25000, image: 'https://i.postimg.cc/T2yPdXkh/Whats-App-Image-2026-03-14-at-6-28-23-PM.jpg' }, // Usando imagen de juego como placeholder
    { id: 7, name: 'Juego 2 Asientos + Mesa', description: 'Set completo: 4 asientos y mesa.', price: 170000, image: 'https://i.postimg.cc/jdQZCB2V/Whats-App-Image-2026-03-14-at-6-28-22-PM.jpg' },
];

const CONFIG = {
    whatsapp_number: '5492645748559',
    instagram_handle: '@sillones_eltatita'
};

let budget = [];

/* ========== FUNCIONES CATÁLOGO ========== */
function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = PRODUCTS.map(p => `
        <div class="bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500 group reveal">
            <div class="h-64 bg-stone-100 overflow-hidden relative">
                <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                <div class="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div class="p-6">
                <h3 class="font-display text-xl text-pine-950 mb-2">${p.name}</h3>
                <p class="text-sm text-stone-500 mb-6 leading-relaxed">${p.description}</p>
                <div class="flex items-center justify-between">
                    <span class="text-2xl font-bold text-pine-700">$${p.price.toLocaleString('es-AR')}</span>
                  <button onclick="addToBudget(${p.id})" class="w-full bg-pine-600 hover:bg-pine-700 text-black py-3 rounded-xl font-bold transition-all active:scale-95 block text-center">Agregar al Carro</button>
                </div>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

/* ========== GESTIÓN PRESUPUESTO ========== */
function addToBudget(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    const existing = budget.find(item => item.id === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        budget.push({ ...product, quantity: 1 });
    }
    updateBudgetUI();
    if (window.innerWidth > 1024) toggleBudget(true); // Abre el panel en PC
}

function updateBudgetUI() {
    const itemsContainer = document.getElementById('budget-items');
    const totalEl = document.getElementById('budget-total');
    const countEl = document.getElementById('cart-count');

    let total = 0;
    let count = 0;

    itemsContainer.innerHTML = budget.map(item => {
        total += item.price * item.quantity;
        count += item.quantity;
        return `
            <div class="flex items-center gap-4 bg-stone-50 rounded-2xl p-4 animate-in slide-in-from-right duration-300">
                <img src="${item.image}" class="w-16 h-16 rounded-xl object-cover shadow-sm" />
                <div class="flex-1 min-w-0">
                    <p class="font-bold text-pine-900 truncate">${item.name}</p>
                    <p class="text-sm text-stone-500">$${item.price.toLocaleString('es-AR')}</p>
                    <div class="flex items-center gap-3 mt-2">
                        <button onclick="changeQty(${item.id}, -1)" class="w-6 h-6 flex items-center justify-center bg-white border border-stone-200 rounded-lg">-</button>
                        <span class="text-sm font-bold">${item.quantity}</span>
                        <button onclick="changeQty(${item.id}, 1)" class="w-6 h-6 flex items-center justify-center bg-white border border-stone-200 rounded-lg">+</button>
                    </div>
                </div>
                <button onclick="removeFromBudget(${item.id})" class="text-red-400 hover:text-red-600 p-2">
                    <i data-lucide="trash-2" style="width:18px;height:18px;"></i>
                </button>
            </div>
        `;
    }).join('');

    totalEl.textContent = `$${total.toLocaleString('es-AR')}`;
    countEl.textContent = count;
    countEl.classList.toggle('hidden', count === 0);
    lucide.createIcons();
}

function changeQty(id, delta) {
    const item = budget.find(i => i.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) removeFromBudget(id);
        else updateBudgetUI();
    }
}

function removeFromBudget(id) {
    budget = budget.filter(i => i.id !== id);
    updateBudgetUI();
}

function toggleBudget(forceOpen = null) {
    const panel = document.getElementById('budget-panel');
    const overlay = document.getElementById('budget-overlay');
    const isOpen = forceOpen !== null ? !forceOpen : panel.classList.contains('translate-x-full');

    if (!isOpen) {
        panel.classList.add('translate-x-full');
        overlay.classList.add('opacity-0', 'pointer-events-none');
    } else {
        panel.classList.remove('translate-x-full');
        overlay.classList.remove('opacity-0', 'pointer-events-none');
    }
}

function sendToWhatsApp() {
    if (budget.length === 0) return alert("El presupuesto está vacío.");

    let message = "¡Hola El Tatita! Me gustaría consultar por los siguientes muebles:\n\n";
    budget.forEach(item => {
        message += `• ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toLocaleString('es-AR')}\n`;
    });
    
    const total = budget.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    message += `\n*Total Estimado: $${total.toLocaleString('es-AR')}*`;
    
    const url = `https://wa.me/${CONFIG.whatsapp_number}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

/* ========== INTERFACE ========== */
function handleScroll() {
    const navbar = document.getElementById('navbar');
    window.scrollY > 60 ? navbar.classList.add('nav-scrolled') : navbar.classList.remove('nav-scrolled');
}

function observeRevealElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Iniciar
window.addEventListener('scroll', handleScroll);
document.getElementById('btn-ig').href = `https://instagram.com/${CONFIG.instagram_handle.replace('@','')}`;
renderProducts();
observeRevealElements();
lucide.createIcons();
