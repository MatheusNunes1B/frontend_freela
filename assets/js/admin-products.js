document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('[data-product-form]');
    const message = document.querySelector('[data-product-message]');

    form?.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const payload = {
            nome: formData.get('nome'),
            descricao: formData.get('descricao'),
            preco: Number(formData.get('preco')),
            imagem: formData.get('imagem')
        };

        try {
            await apiRequest('/api/products', {
                method: 'POST',
                body: JSON.stringify(payload)
            });

            form.reset();
            message.textContent = 'Produto cadastrado com sucesso.';
            message.className = 'login-message success';
        } catch (error) {
            message.textContent = error.message;
            message.className = 'login-message error';
        }
    });
});
