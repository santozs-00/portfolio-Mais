const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/authRouter');
const portfolioRouter = require('./routes/portfolioRouter');
const selecaoRouter = require('./routes/selecaoRouter');

const app = express();

const origens = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',').map((o) => o.trim()).filter(Boolean);

app.use(cors({ origin: origens }));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api', authRouter);
app.use('/api', portfolioRouter);
app.use('/api', selecaoRouter);

app.use('/api', (req, res) => res.status(404).json({ erro: 'Rota não encontrada' }));

// Produção: serve o frontend compilado (frontend/dist) na mesma porta da API.
const dist = path.join(__dirname, '..', '..', 'frontend', 'dist');
if (fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.get('*', (req, res) => res.sendFile(path.join(dist, 'index.html')));
}

module.exports = app;
