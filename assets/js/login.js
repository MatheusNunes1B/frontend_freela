document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('[data-login-form]');
    const message = document.querySelector('[data-login-message]');

    form?.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const email = formData.get('email');
        const senha = formData.get('senha');

        try {
            const data = await apiRequest('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, senha })
            });

            localStorage.setItem('b7store_token', data.token);
            localStorage.setItem('b7store_user', JSON.stringify(data.user));
            message.textContent = 'Login realizado com sucesso.';
            message.className = 'login-message success';
        } catch (error) {
            message.textContent = error.message;
            message.className = 'login-message error';
        }
    });
});
