const { Portfolio } = require('../models');

// Cada usuário enxerga e altera somente os próprios itens.
module.exports = {
  async listar(req, res) {
    try {
      const where = { usuario_id: req.usuarioId };
      if (req.query.instituicao) where.instituicao = req.query.instituicao.toUpperCase();
      const portfolios = await Portfolio.findAll({ where, order: [['createdAt', 'DESC']] });
      return res.status(200).json(portfolios);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },

  async criar(req, res) {
    try {
      const { titulo, descricao, imagem, materia, tipo, instituicao } = req.body;
      const portfolio = await Portfolio.create({
        titulo, descricao, imagem, materia, tipo, instituicao,
        usuario_id: req.usuarioId
      });
      return res.status(201).json(portfolio);
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  },

  async atualizar(req, res) {
    try {
      const portfolio = await Portfolio.findOne({
        where: { id: req.params.id, usuario_id: req.usuarioId }
      });
      if (!portfolio) {
        return res.status(404).json({ erro: 'Portfólio não encontrado' });
      }
      const { titulo, descricao, imagem, materia, tipo } = req.body;
      await portfolio.update({ titulo, descricao, imagem, materia, tipo });
      return res.status(200).json(portfolio);
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  },

  async deletar(req, res) {
    try {
      const portfolio = await Portfolio.findOne({
        where: { id: req.params.id, usuario_id: req.usuarioId }
      });
      if (!portfolio) {
        return res.status(404).json({ erro: 'Portfólio não encontrado' });
      }
      await portfolio.destroy();
      return res.status(200).json({ mensagem: 'Portfólio deletado com sucesso' });
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }
};
