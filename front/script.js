const API_URL = '';

function salvarUsuario(usuario) {
  localStorage.setItem('usuario', JSON.stringify(usuario));
}

function getUsuario() {
  const dados = localStorage.getItem('usuario');

  return dados ? JSON.parse(dados) : null;
}

function logout() {
  if (confirm('Deseja sair do sistema?')) {
    localStorage.removeItem('usuario');

    window.location.href = 'login.html';
  }
}

function verificarLogin() {
  const usuario = getUsuario();

  if (!usuario) {
    window.location.href = 'login.html';

    return null;
  }

  return usuario;
}

function formatarMoeda(valor) {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

function formatarData(data) {
  return new Date(data).toLocaleDateString('pt-BR');
}

function mostrarAlerta(elementId, mensagem, tipo = 'error') {
  const alerta = document.getElementById(elementId);

  if (!alerta) return;

  alerta.classList.remove(
    'alert-error',
    'alert-success',
    'show'
  );

  alerta.classList.add(`alert-${tipo}`, 'show');

  alerta.innerHTML = `
    <span>${tipo === 'error' ? 'Erro' : 'Sucesso'}</span>
    <span>${mensagem}</span>
  `;

  setTimeout(() => {
    alerta.classList.remove('show');
  }, 4000);
}

function setLoading(btnId, loading, textoOriginal) {
  const btn = document.getElementById(btnId);

  if (!btn) return;

  if (loading) {
    btn.disabled = true;

    btn.innerHTML = 'Aguarde...';

  } else {

    btn.disabled = false;

    btn.innerHTML = textoOriginal;
  }
}