document.addEventListener('DOMContentLoaded', async () => {
    const descButton = document.querySelector('.desc-header .btn-icon');
    const descBody = document.querySelector('.desc-body');

    descButton?.addEventListener('click', () => {
        descBody.style.display = descBody.style.display === 'none' ? 'block' : 'none';
    });

    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    if (!productId || typeof apiRequest !== 'function') return;

    try {
        const product = await apiRequest(`/api/products/${encodeURIComponent(productId)}`);
        renderProduct(product);
        setupAddToCart(product);
    } catch (error) {
        const productSection = document.querySelector('.product');
        if (productSection) {
            productSection.innerHTML = `<div class="p-6 text-lg text-[#7F7F7F]">Não foi possível carregar o produto: ${escapeHtml(error.message)}</div>`;
        }
    }
});

function renderProduct(product) {
    const image = document.querySelector('.product .photo img');
    const code = document.querySelector('.product .id');
    const name = document.querySelector('.product .name');
    const priceFrom = document.querySelector('.product .price-from');
    const priceTo = document.querySelector('.product .price-to');
    const descBody = document.querySelector('.desc-body');

    if (image) {
        image.src = getProductImage(product);
        image.alt = product.nome || 'Produto';
    }

    if (code) code.textContent = `CÓD: ${String(product.id).slice(0, 8)}`;
    if (name) name.textContent = product.nome || 'Produto';
    if (priceFrom) priceFrom.style.display = 'none';
    if (priceTo) priceTo.textContent = formatCurrency(product.preco);
    if (descBody) descBody.textContent = product.descricao || 'Produto sem descrição.';
}

function setupAddToCart(product) {
    const addButton = document.querySelector('.product .buttons .button');
    if (!addButton || typeof addProductToCart !== 'function') return;

    addButton.addEventListener('click', () => {
        addProductToCart(product);
        addButton.textContent = 'Adicionado à sacola';
        setTimeout(() => {
            addButton.textContent = 'Adicionar à sacola';
        }, 1500);
    });
}

function escapeHtml(value) {
    return String(value || '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}
