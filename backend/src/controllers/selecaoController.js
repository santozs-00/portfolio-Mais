const { Selecao } = require('../models');

module.exports = {
  async listar(req, res) {
    try {
      const selecoes = await Selecao.findAll();
      return res.status(200).json(selecoes);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },

  async criar(req, res) {
    try {
      const { titulo, categoria, detalhes } = req.body;
      const selecao = await Selecao.create({ titulo, categoria, detalhes });
      return res.status(201).json(selecao);
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { titulo, categoria, detalhes } = req.body;
      const selecao = await Selecao.findByPk(id);
      if (!selecao) {
        return res.status(404).json({ erro: 'Seleção não encontrada' });
      }
      await selecao.update({ titulo, categoria, detalhes });
      return res.status(200).json(selecao);
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;
      const selecao = await Selecao.findByPk(id);
      if (!selecao) {
        return res.status(404).json({ erro: 'Seleção não encontrada' });
      }
      await selecao.destroy();
      return res.status(200).json({ mensagem: 'Seleção deletada com sucesso' });
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }
};
