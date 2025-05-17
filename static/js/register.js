document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageEl = document.getElementById('message');

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            messageEl.innerText = data.message || 'Регистрация успешна!';
            messageEl.style.color = 'green';

            setTimeout(() => {
                window.location.href = '/login'; 
            }, 1500);
        } else {
            messageEl.innerText = data.message || 'Пользователь с данной почтой уже зарегистрирован';
            messageEl.style.color = 'red';
        }
    } catch (error) {
        console.error('Ошибка сети:', error);
        messageEl.innerText = 'Не удалось подключиться к серверу';
        messageEl.style.color = 'red';
    }
});