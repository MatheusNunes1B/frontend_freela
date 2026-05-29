const API_BASE_URL = window.API_BASE_URL || 'http://localhost:3000';

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
