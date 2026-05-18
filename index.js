const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Configure SUPABASE_URL e SUPABASE_KEY no arquivo .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use(express.static('front'));

app.post('/usuarios', async (req, res) => {
  try {

    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Preencha nome, email e senha!'
      });
    }

    const { data: existente } = await supabase
      .from('usuarios')
      .select('id')
      .eq('email', email)
      .single();

    if (existente) {
      return res.status(409).json({
        sucesso: false,
        mensagem: 'Este email já está cadastrado!'
      });
    }

    const { data, error } = await supabase
      .from('usuarios')
      .insert([{ nome, email, senha }])
      .select()
      .single();

    if (error) throw error;

    const { senha: _, ...usuario } = data;

    res.status(201).json({
      sucesso: true,
      mensagem: 'Usuário cadastrado!',
      usuario
    });

  } catch (err) {

    res.status(500).json({
      sucesso: false,
      mensagem: err.message
    });
  }
});

app.post('/login', async (req, res) => {
  try {

    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Email e senha são obrigatórios!'
      });
    }

    const { data: usuario, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', email)
      .eq('senha', senha)
      .single();

    if (error || !usuario) {
      return res.status(401).json({
        sucesso: false,
        mensagem: 'Email ou senha incorretos!'
      });
    }

    const { senha: _, ...semSenha } = usuario;

    res.json({
      sucesso: true,
      mensagem: 'Login realizado!',
      usuario: semSenha
    });

  } catch (err) {

    res.status(500).json({
      sucesso: false,
      mensagem: err.message
    });
  }
});

app.get('/produtos', async (req, res) => {
  try {

    const { busca, categoria } = req.query;

    let query = supabase
      .from('produtos')
      .select('*')
      .order('created_at', {
        ascending: false
      });

    if (busca) {
      query = query.ilike('nome', `%${busca}%`);
    }

    if (categoria && categoria !== 'todas') {
      query = query.eq('categoria', categoria);
    }

    const { data, error } = await query;

    if (error) throw error;

    res.json({
      sucesso: true,
      produtos: data,
      total: data.length
    });

  } catch (err) {

    res.status(500).json({
      sucesso: false,
      mensagem: err.message
    });
  }
});

app.get('/produtos/:id', async (req, res) => {
  try {

    const { id } = req.params;

    const { data, error } = await supabase
      .from('produtos')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    res.json({
      sucesso: true,
      produto: data
    });

  } catch (err) {

    res.status(500).json({
      sucesso: false,
      mensagem: err.message
    });
  }
});

app.post('/produtos', async (req, res) => {
  try {

    const {
      nome,
      categoria,
      preco,
      quantidade,
      descricao,
      usuario_id
    } = req.body;

    if (!nome || !categoria || preco == null || quantidade == null) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Nome, categoria, preço e quantidade são obrigatórios!'
      });
    }

    const { data, error } = await supabase
      .from('produtos')
      .insert([{
        nome,
        categoria,
        preco: parseFloat(preco),
        quantidade: parseInt(quantidade),
        descricao: descricao || '',
        usuario_id: usuario_id || null
      }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      sucesso: true,
      mensagem: 'Produto cadastrado!',
      produto: data
    });

  } catch (err) {

    res.status(500).json({
      sucesso: false,
      mensagem: err.message
    });
  }
});

app.put('/produtos/:id', async (req, res) => {
  try {

    const { id } = req.params;

    const {
      nome,
      categoria,
      preco,
      quantidade,
      descricao
    } = req.body;

    const { data, error } = await supabase
      .from('produtos')
      .update({
        nome,
        categoria,
        preco: parseFloat(preco),
        quantidade: parseInt(quantidade),
        descricao: descricao || ''
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({
      sucesso: true,
      mensagem: 'Produto atualizado!',
      produto: data
    });

  } catch (err) {

    res.status(500).json({
      sucesso: false,
      mensagem: err.message
    });
  }
});

app.delete('/produtos/:id', async (req, res) => {
  try {

    const { id } = req.params;

    const { error } = await supabase
      .from('produtos')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({
      sucesso: true,
      mensagem: 'Produto excluído!'
    });

  } catch (err) {

    res.status(500).json({
      sucesso: false,
      mensagem: err.message
    });
  }
});

app.listen(PORT, () => {

  console.log('====================================');

  console.log('SISTEMA DE MATERIAIS DE CONSTRUÇÃO');

  console.log('====================================');

  console.log(`Servidor: http://localhost:${PORT}`);

  console.log(`Acesse: http://localhost:${PORT}/login.html`);

  console.log('====================================');
});