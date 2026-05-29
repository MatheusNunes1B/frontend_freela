require('dotenv').config();

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const port = process.env.PORT || 3000;
const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:5500',
    'http://127.0.0.1:5500',
    'http://localhost:3000'
].filter(Boolean);

if (!process.env.JWT_SECRET) {
    throw new Error('Configure JWT_SECRET no ambiente.');
}

app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error('Origem não permitida pelo CORS.'));
    }
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        name: 'B7Store API',
        status: 'online',
        routes: ['/api/auth/login', '/api/auth/register', '/api/products']
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada.' });
});

app.use((error, req, res, next) => {
    res.status(500).json({ error: error.message || 'Erro interno do servidor.' });
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`API rodando na porta ${port}`);
    });
}

module.exports = app;
