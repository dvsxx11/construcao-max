const API_URL = '';

window.addEventListener('DOMContentLoaded', () => {
  const usuario = localStorage.getItem('usuario');

  if (usuario) {
    window.location.href = 'produtos.html';
  }
});

document.getElementById('form-cadastro')
  .addEventListener('submit', async (e) => {

    e.preventDefault();

    esconderAlertas();

    const nome = document.getElementById('nome')
      .value.trim();

    const email = document.getElementById('email')
      .value.trim();

    const senha = document.getElementById('senha')
      .value;

    const confirmarSenha = document.getElementById(
      'confirmar-senha'
    ).value;

    if (!nome || !email || !senha || !confirmarSenha) {
      mostrarErro('Preencha todos os campos!');
      return;
    }

    if (nome.length < 3) {
      mostrarErro(
        'O nome deve ter pelo menos 3 caracteres!'
      );
      return;
    }

    if (senha.length < 6) {
      mostrarErro(
        'A senha deve ter pelo menos 6 caracteres!'
      );
      return;
    }

    if (senha !== confirmarSenha) {
      mostrarErro('As senhas não coincidem!');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      mostrarErro('Digite um e-mail válido!');
      return;
    }

    const btn = document.getElementById('btn-cadastrar');

    btn.disabled = true;

    btn.innerHTML = 'Cadastrando...';

    try {

      const resposta = await fetch(`${API_URL}/usuarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome,
          email,
          senha
        })
      });

      const dados = await resposta.json();

      if (dados.sucesso) {

        document.getElementById('alerta-sucesso')
          .classList.add('show');

        setTimeout(() => {
          window.location.href = 'login.html';
        }, 2000);

      } else {

        mostrarErro(
          dados.mensagem ||
          'Erro ao cadastrar. Tente novamente!'
        );

        btn.disabled = false;

        btn.innerHTML = 'Criar Conta';
      }

    } catch (erro) {

      console.error('Erro no cadastro:', erro);

      mostrarErro(
        'Erro ao conectar com o servidor. Verifique se o backend está rodando!'
      );

      btn.disabled = false;

      btn.innerHTML = 'Criar Conta';
    }
});

function mostrarErro(mensagem) {

  const alerta = document.getElementById('alerta-erro');

  document.getElementById('msg-erro')
    .textContent = mensagem;

  alerta.classList.add('show');

  setTimeout(() => {
    alerta.classList.remove('show');
  }, 5000);
}

function esconderAlertas() {

  document.getElementById('alerta-erro')
    .classList.remove('show');

  document.getElementById('alerta-sucesso')
    .classList.remove('show');
}