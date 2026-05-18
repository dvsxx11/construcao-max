const API_URL = '';

let idProdutoParaExcluir = null;
let produtosOriginais = [];

window.addEventListener('DOMContentLoaded', () => {

  const usuario = getUsuarioLogado();

  if (!usuario) {
    window.location.href = 'login.html';
    return;
  }

  document.getElementById('nome-usuario').textContent = usuario.nome;

  carregarProdutos();
});

function getUsuarioLogado() {
  const dados = localStorage.getItem('usuario');
  return dados ? JSON.parse(dados) : null;
}

function logout() {
  localStorage.removeItem('usuario');
  window.location.href = 'login.html';
}

async function carregarProdutos() {
  mostrarLoading(true);

  try {
    const resposta = await fetch(`${API_URL}/produtos`);
    const dados = await resposta.json();

    if (dados.sucesso) {
      produtosOriginais = dados.produtos;
      aplicarFiltros();
      atualizarEstatisticas(produtosOriginais);
    } else {
      alert(dados.mensagem);
    }
  } catch (erro) {
    console.error(erro);
    alert('Erro ao carregar produtos');
  } finally {
    mostrarLoading(false);
  }
}

function buscarProdutos() {
  aplicarFiltros();
}

function aplicarFiltros() {
  const termoBusca = document.getElementById('campo-busca').value.toLowerCase().trim();
  const categoriaSelecionada = document.getElementById('filtro-categoria').value;
  
  let produtosFiltrados = [...produtosOriginais];
  
  if (termoBusca !== '') {
    produtosFiltrados = produtosFiltrados.filter(produto => 
      produto.nome.toLowerCase().includes(termoBusca) ||
      (produto.descricao && produto.descricao.toLowerCase().includes(termoBusca))
    );
  }
  
  if (categoriaSelecionada !== 'todas') {
    produtosFiltrados = produtosFiltrados.filter(produto => 
      produto.categoria === categoriaSelecionada
    );
  }
  
  renderizarTabela(produtosFiltrados);
}

function renderizarTabela(produtos) {
  const tbody = document.getElementById('tabela-produtos');
  const tabela = document.getElementById('tabela-container');
  const vazio = document.getElementById('estado-vazio');

  if (produtos.length === 0) {
    tabela.style.display = 'none';
    vazio.style.display = 'block';
    return;
  }

  tabela.style.display = 'block';
  vazio.style.display = 'none';

  tbody.innerHTML = produtos.map(produto => `
    <tr>
      <td>
        <div class="produto-nome">
          ${produto.nome}
        </div>
        <div class="produto-desc">
          ${produto.descricao || 'Sem descrição'}
        </div>
      </td>
      <td>
        <span class="badge">
          ${produto.categoria}
        </span>
      </td>
      <td>
        <span class="preco">
          ${formatarMoeda(produto.preco)}
        </span>
      </td>
      <td>
        ${produto.quantidade}
      </td>
      <td>
        <div class="acoes">
          <button class="btn btn-secondary btn-sm" onclick="abrirModalEditar(${produto.id})">
            Editar
          </button>
          <button class="btn btn-danger btn-sm" onclick="abrirModalExcluir(${produto.id})">
            Excluir
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function atualizarEstatisticas(produtos) {
  document.getElementById('stat-total').textContent = produtos.length;
  document.getElementById('stat-estoque').textContent = produtos.filter(p => p.quantidade > 0).length;
  document.getElementById('stat-zerado').textContent = produtos.filter(p => p.quantidade === 0).length;
  document.getElementById('stat-categorias').textContent = new Set(produtos.map(p => p.categoria)).size;
}

function abrirModalNovoProduto() {
  document.getElementById('form-produto').reset();
  document.getElementById('produto-id').value = '';
  document.getElementById('modal-produto').style.display = 'flex';
}

function fecharModal() {
  document.getElementById('modal-produto').style.display = 'none';
}

async function abrirModalEditar(id) {
  try {
    const resposta = await fetch(`${API_URL}/produtos/${id}`);
    const dados = await resposta.json();
    const produto = dados.produto;

    document.getElementById('produto-id').value = produto.id;
    document.getElementById('produto-nome').value = produto.nome;
    document.getElementById('produto-categoria').value = produto.categoria;
    document.getElementById('produto-preco').value = produto.preco;
    document.getElementById('produto-quantidade').value = produto.quantidade;
    document.getElementById('produto-descricao').value = produto.descricao || '';

    document.getElementById('modal-produto').style.display = 'flex';
  } catch (erro) {
    console.error(erro);
    alert('Erro ao carregar produto');
  }
}

document.getElementById('form-produto').addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('produto-id').value;
  const produto = {
    nome: document.getElementById('produto-nome').value,
    categoria: document.getElementById('produto-categoria').value,
    preco: document.getElementById('produto-preco').value,
    quantidade: document.getElementById('produto-quantidade').value,
    descricao: document.getElementById('produto-descricao').value
  };

  try {
    let resposta;

    if (id) {
      resposta = await fetch(`${API_URL}/produtos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto)
      });
    } else {
      resposta = await fetch(`${API_URL}/produtos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto)
      });
    }

    const dados = await resposta.json();

    if (dados.sucesso) {
      fecharModal();
      carregarProdutos();
    } else {
      alert(dados.mensagem);
    }
  } catch (erro) {
    console.error(erro);
    alert('Erro ao salvar produto');
  }
});

function abrirModalExcluir(id) {
  idProdutoParaExcluir = id;
  
  const produto = produtosOriginais.find(p => p.id === id);
  if (produto) {
    const nomeProdutoElem = document.getElementById('nome-produto-excluir');
    if (nomeProdutoElem) {
      nomeProdutoElem.textContent = produto.nome;
    }
  }
  
  document.getElementById('modal-excluir').style.display = 'flex';
}

function fecharModalExcluir() {
  document.getElementById('modal-excluir').style.display = 'none';
}

async function confirmarExclusao() {
  try {
    await fetch(`${API_URL}/produtos/${idProdutoParaExcluir}`, {
      method: 'DELETE'
    });
    
    fecharModalExcluir();
    carregarProdutos();
  } catch (erro) {
    console.error(erro);
    alert('Erro ao excluir produto');
  }
}

function mostrarLoading(show) {
  document.getElementById('loading').style.display = show ? 'flex' : 'none';
  
  if (show) {
    document.getElementById('tabela-container').style.display = 'none';
    document.getElementById('estado-vazio').style.display = 'none';
  }
}

function formatarMoeda(valor) {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}
