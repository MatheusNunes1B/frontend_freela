document.addEventListener('DOMContentLoaded', async () => {
    const grids = document.querySelectorAll('.products-area, .products .grid, .related-grid');
    if (!grids.length || typeof apiRequest !== 'function') return;

    try {
        const products = await apiRequest('/api/products');
        if (!Array.isArray(products) || products.length === 0) return;

        const cards = products.map(createProductCard).join('');
        grids.forEach((grid) => {
            grid.innerHTML = cards;
        });

        const counter = document.querySelector('.product-qt span');
        if (counter) counter.textContent = products.length;
    } catch (error) {
        console.warn('Não foi possível carregar produtos do backend:', error.message);
    }
});

function createProductCard(product) {
    const id = encodeURIComponent(product.id);
    const name = escapeHtml(product.nome);
    const image = escapeAttribute(getProductImage(product));

    return `
        <div class="product-item relative flex-1 rounded-[9px] border border-[#D9D9D9] bg-white p-8 lg:p-5">
            <a class="block no-underline" href="product.html?id=${id}">
                <div class="product-photo">
                    <img class="w-full" src="${image}" alt="${name}" />
                </div>
                <div class="product-name pt-10 text-lg font-bold text-black">${name}</div>
                <div class="product-price my-2 text-2xl font-bold text-brand">${formatCurrency(product.preco)}</div>
                <div class="product-info text-lg text-[#7F7F7F]">Pagamento via PIX</div>
            </a>
            <div class="product-fav absolute right-8 top-8 flex h-[51px] w-[51px] cursor-pointer items-center justify-center rounded border border-[#B7B7B7] bg-white lg:right-5 lg:top-5">
                <img class="h-[25px] w-[25px]" src="assets/images/ui/heart-3-line.png" alt="Favoritar" />
            </div>
        </div>
    `;
}

function escapeHtml(value) {
    return String(value || '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

function escapeAttribute(value) {
    return escapeHtml(value).replaceAll('`', '&#096;');
}
