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
    ├── package.json      ← Identidade do Projeto
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
3. Use ** Novo Produto** para cadastrar
4. Use **busca** e **filtro de categoria** para pesquisar
5. Use **Editar** e **Excluir** em cada produto

---

## 📸 Prints do Sistema

### Tela de Login
<img width="1600" height="797" alt="WhatsApp Image 2026-05-17 at 23 16 15" src="https://github.com/user-attachments/assets/32464ee0-d55b-49d1-bf88-dc0213537522" />

### Tela de Produtos
<img width="1600" height="797" alt="WhatsApp Image 2026-05-17 at 23 17 25" src="https://github.com/user-attachments/assets/b3b20259-d416-43bf-ac6a-5587b467fbbe" />

### Cadastro de Produto
<img width="1600" height="794" alt="WhatsApp Image 2026-05-17 at 23 16 44" src="https://github.com/user-attachments/assets/a9ee3a74-4315-42f8-b086-6e9a689866a1" />


### Busca e Filtro
<img width="1600" height="797" alt="WhatsApp Image 2026-05-17 at 23 17 08" src="https://github.com/user-attachments/assets/e3051a07-e26c-43cf-87d8-5c7721ac469c" />


---
