document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();
  document.getElementById('message').innerText = data.message;

  if (response.ok && data.role === 'admin') {
    window.location.href = '/admin'; // Перенаправление админа
  } else if (response.ok) {
    window.location.href = '/map'; // Перенаправление пользователя
  }
});