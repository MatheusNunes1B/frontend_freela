document.addEventListener('DOMContentLoaded', () => {
    const productsArea = document.querySelector('.checkout .products-area');
    const itemCounter = document.querySelector('.checkout-header span');
    const subtotalValue = document.querySelector('.subtotal .area .right');
    const totalValue = document.querySelector('.subtotal .bigtotal');

    renderCheckout();

    function renderCheckout() {
        const items = getCartItems();
        const totalItems = items.reduce((total, item) => total + item.quantidade, 0);
        const subtotal = items.reduce((total, item) => total + Number(item.preco || 0) * item.quantidade, 0);

        if (itemCounter) itemCounter.textContent = `( ${totalItems} ${totalItems === 1 ? 'item' : 'itens'} )`;
        if (subtotalValue) subtotalValue.textContent = formatCurrency(subtotal);
        if (totalValue) totalValue.textContent = formatCurrency(subtotal);

        if (!productsArea) return;

        if (!items.length) {
            productsArea.innerHTML = `
                <div class="rounded border border-[#D9D9D9] bg-white p-8 text-center text-lg text-[#7F7F7F]">
                    Sua sacola está vazia.
                    <a class="mt-4 block text-brand no-underline" href="produtos.html">Ver camisetas</a>
                </div>
            `;
            return;
        }

        productsArea.innerHTML = `
            <div class="product-header hidden justify-between border-b border-[#D9D9D9] px-8 py-6 lg:flex">
                <div>Produto</div>
                <div>Preço</div>
            </div>
            ${items.map(createCheckoutItem).join('')}
        `;

        productsArea.querySelectorAll('[data-cart-action]').forEach((button) => {
            button.addEventListener('click', () => {
                updateCartItem(button.dataset.productId, button.dataset.cartAction);
                renderCheckout();
            });
        });
    }

    function createCheckoutItem(item) {
        const subtotal = Number(item.preco || 0) * item.quantidade;

        return `
            <div class="product mx-6 my-8 flex flex-col rounded border border-[#D9D9D9] bg-white p-4 lg:flex-row lg:items-center lg:gap-6">
                <div class="product-photo">
                    <img class="w-full" src="${escapeAttribute(item.imagem)}" alt="${escapeAttribute(item.nome)}" />
                </div>
                <div class="product-info text-lg text-[#7F7F7F]">
                    <div class="product-name pt-10 text-lg font-bold text-black">${escapeHtml(item.nome)}</div>
                    <div class="product-qt mt-3 flex">
                        <button type="button" data-cart-action="decrease" data-product-id="${escapeAttribute(item.id)}" class="btn-icon flex h-12 w-12 cursor-pointer items-center justify-center rounded border border-[#D9D9D9] transition hover:bg-black/5">-</button>
                        <div class="product-qt-text flex w-12 items-center justify-center border-y border-[#D9D9D9] text-lg text-[#7F7F7F]">${String(item.quantidade).padStart(2, '0')}</div>
                        <button type="button" data-cart-action="increase" data-product-id="${escapeAttribute(item.id)}" class="btn-icon flex h-12 w-12 cursor-pointer items-center justify-center rounded border border-[#D9D9D9] transition hover:bg-black/5">+</button>
                    </div>
                </div>
                <div class="product-info2 flex flex-col items-end gap-4">
                    <div class="product-price my-2 text-2xl font-bold text-brand">${formatCurrency(subtotal)}</div>
                    <button type="button" data-cart-action="remove" data-product-id="${escapeAttribute(item.id)}" class="btn-icon flex h-12 w-12 cursor-pointer items-center justify-center rounded border border-[#D9D9D9] transition hover:bg-black/5">
                        <img src="assets/images/ui/trash.png" alt="Remover" />
                    </button>
                </div>
            </div>
        `;
    }

    function updateCartItem(productId, action) {
        const items = getCartItems();
        const item = items.find((cartItem) => cartItem.id === productId);
        if (!item) return;

        if (action === 'increase') {
            item.quantidade += 1;
        }

        if (action === 'decrease') {
            item.quantidade -= 1;
        }

        const updatedItems = action === 'remove' || item.quantidade <= 0
            ? items.filter((cartItem) => cartItem.id !== productId)
            : items;

        saveCartItems(updatedItems);
    }
});

function escapeHtml(value) {
    return String(value || '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

function escapeAttribute(value) {
    return escapeHtml(value);
}
