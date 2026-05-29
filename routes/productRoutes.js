const express = require('express');
const supabase = require('../data/supabase');
const authenticateToken = require('../middlewares/auth');
const { validateRequiredFields } = require('../middlewares/validate');

const router = express.Router();

router.get('/', async (req, res) => {
    const { data, error } = await supabase
        .from('produtos')
        .select('id, nome, descricao, preco, imagem, created_at')
        .order('created_at', { ascending: false });

    if (error) {
        return res.status(500).json({ error: 'Erro ao listar produtos.', details: error.message });
    }

    return res.json(data);
});

router.get('/:id', async (req, res) => {
    const { data, error } = await supabase
        .from('produtos')
        .select('id, nome, descricao, preco, imagem, created_at')
        .eq('id', req.params.id)
        .single();

    if (error || !data) {
        return res.status(404).json({ error: 'Produto não encontrado.' });
    }

    return res.json(data);
});

router.post('/', authenticateToken, async (req, res) => {
    const validationError = validateRequiredFields(['nome', 'preco'], req.body);
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }

    const { nome, descricao, preco, imagem } = req.body;

    const { data, error } = await supabase
        .from('produtos')
        .insert([{ nome, descricao, preco, imagem }])
        .select('id, nome, descricao, preco, imagem, created_at')
        .single();

    if (error) {
        return res.status(400).json({ error: 'Erro ao cadastrar produto.', details: error.message });
    }

    return res.status(201).json(data);
});

router.put('/:id', authenticateToken, async (req, res) => {
    const allowedFields = ['nome', 'descricao', 'preco', 'imagem'];
    const updates = Object.fromEntries(
        Object.entries(req.body).filter(([key, value]) => allowedFields.includes(key) && value !== undefined)
    );

    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: 'Nenhum campo válido enviado para atualização.' });
    }

    const { data, error } = await supabase
        .from('produtos')
        .update(updates)
        .eq('id', req.params.id)
        .select('id, nome, descricao, preco, imagem, created_at')
        .single();

    if (error) {
        return res.status(400).json({ error: 'Erro ao editar produto.', details: error.message });
    }

    return res.json(data);
});

router.delete('/:id', authenticateToken, async (req, res) => {
    const { error } = await supabase
        .from('produtos')
        .delete()
        .eq('id', req.params.id);

    if (error) {
        return res.status(400).json({ error: 'Erro ao deletar produto.', details: error.message });
    }

    return res.status(204).send();
});

module.exports = router;
