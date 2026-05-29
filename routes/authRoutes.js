const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../data/supabase');
const { validateRequiredFields } = require('../middlewares/validate');

const router = express.Router();

router.post('/login', async (req, res) => {
    const validationError = validateRequiredFields(['email', 'senha'], req.body);
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }

    const { email, senha } = req.body;

    const { data: user, error } = await supabase
        .from('usuarios')
        .select('id, nome, email, senha_hash')
        .eq('email', email)
        .single();

    if (error || !user) {
        return res.status(401).json({ error: 'E-mail ou senha inválidos.' });
    }

    const passwordMatches = await bcrypt.compare(senha, user.senha_hash);
    if (!passwordMatches) {
        return res.status(401).json({ error: 'E-mail ou senha inválidos.' });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email, nome: user.nome },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    return res.json({
        token,
        user: {
            id: user.id,
            nome: user.nome,
            email: user.email
        }
    });
});

router.post('/register', async (req, res) => {
    const validationError = validateRequiredFields(['nome', 'email', 'senha'], req.body);
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }

    const { nome, email, senha } = req.body;
    const senha_hash = await bcrypt.hash(senha, 10);

    const { data, error } = await supabase
        .from('usuarios')
        .insert([{ nome, email, senha_hash }])
        .select('id, nome, email, created_at')
        .single();

    if (error) {
        return res.status(400).json({ error: 'Não foi possível cadastrar usuário.', details: error.message });
    }

    return res.status(201).json(data);
});

module.exports = router;
