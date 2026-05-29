const API_BASE_URL = window.API_BASE_URL || 'https://backend-freela.vercel.app';
const CART_STORAGE_KEY = 'b7store_cart';

async function apiRequest(path, options = {}) {
    const token = localStorage.getItem('b7store_token');
    const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {})
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.error || 'Erro na comunicação com o servidor.');
    }

    return data;
}

function formatCurrency(value) {
    return Number(value || 0).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

function getProductImage(product) {
    return product.imagem || 'assets/images/products/camiseta-css.png';
}

function getCartItems() {
    try {
        return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
    } catch {
        return [];
    }
}

function saveCartItems(items) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

function addProductToCart(product, quantidade = 1) {
    const items = getCartItems();
    const existingItem = items.find((item) => item.id === product.id);

    if (existingItem) {
        existingItem.quantidade += quantidade;
    } else {
        items.push({
            id: product.id,
            nome: product.nome,
            preco: Number(product.preco || 0),
            imagem: getProductImage(product),
            quantidade
        });
    }

    saveCartItems(items);
}
