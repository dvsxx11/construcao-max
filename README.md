# 🏗️ ConstruçãoMAX — Sistema de Gerenciamento de Produtos

Sistema web full stack para gerenciar produtos de uma loja de materiais de construção.
Projeto universitário usando **Node.js + Express + Supabase + HTML/CSS/JS puro**.

---

## 📁 Estrutura do Projeto

```
projeto/
│
├── index.js          ← Servidor Express com todas as rotas
├── package.json      ← Dependências
├── .env              ← Credenciais do Supabase 
│
└── front/
    ├── index.html        ← Redireciona para login/produtos
    ├── login.html        ← Tela de login
    ├── cadastro.html     ← Tela de cadastro
    ├── produtos.html     ← Tela principal (CRUD)
    ├── style.css         ← Estilos
    ├── script.js         ← Funções utilitárias
    ├── login.js          ← Lógica do login
    ├── cadastro.js       ← Lógica do cadastro
    └── produtos.js       ← Lógica do CRUD de produtos
```

---

## 🛠️ Tecnologias

- **Backend:** Node.js, Express, @supabase/supabase-js, cors, dotenv
- **Banco:** Supabase (PostgreSQL)
- **Frontend:** HTML, CSS e JavaScript puro com `fetch()` e `async/await`
- **Auth:** localStorage para manter o usuário logado

---

## 🚀 Como rodar

### 1️⃣ Rodar o servidor no terminal do vscode
```bash
npm start
```

### 2️⃣ Abrir no navegador
👉 http://localhost:3000/login.html

---


## 👨‍🎓 Como usar
1. Acesse `login.html` → **Criar conta grátis**
2. Faça o cadastro e o login
3. Use **➕ Novo Produto** para cadastrar
4. Use **busca** e **filtro de categoria** para pesquisar
5. Use **✏️ Editar** e **🗑️ Excluir** em cada produto

---

## 📸 Prints do Sistema

### 🔐 Tela de Login
<img src="./prints/login.png" width="800">

### 📦 Tela de Produtos
<img src="./prints/produtos.png" width="800">

### ➕ Cadastro de Produto
<img src="./prints/modal-produto.png" width="800">

---