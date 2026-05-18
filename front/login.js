const API_URL = '';

window.addEventListener('DOMContentLoaded', () => {
  const usuario = localStorage.getItem('usuario');

  if (usuario) {
    window.location.href = 'produtos.html';
  }
});

document.getElementById('form-login')
  .addEventListener('submit', async (e) => {

    e.preventDefault();

    const email = document.getElementById('email')
      .value.trim();

    const senha = document.getElementById('senha')
      .value;

    if (!email || !senha) {
      mostrarAlertaLogin('Preencha email e senha!');
      return;
    }

    const btn = document.getElementById('btn-login');

    btn.disabled = true;

    btn.innerHTML = 'Entrando...';

    try {

      const resposta = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
      });

      const dados = await resposta.json();

      if (dados.sucesso) {

        localStorage.setItem(
          'usuario',
          JSON.stringify(dados.usuario)
        );

        window.location.href = 'produtos.html';

      } else {

        mostrarAlertaLogin(
          dados.mensagem || 'Email ou senha incorretos!'
        );

        btn.disabled = false;

        btn.innerHTML = 'Entrar';
      }

    } catch (erro) {

      console.error('Erro ao fazer login:', erro);

      mostrarAlertaLogin(
        'Erro ao conectar com o servidor. Verifique se o backend está rodando!'
      );

      btn.disabled = false;

      btn.innerHTML = 'Entrar';
    }
});

function mostrarAlertaLogin(mensagem) {

  const alerta = document.getElementById('alerta');

  alerta.innerHTML = `
    <span>${mensagem}</span>
  `;

  alerta.classList.add('show');

  setTimeout(() => {
    alerta.classList.remove('show');
  }, 5000);
}