const bcrypt = require('bcryptjs');
const { Usuario } = require('../models');
const { gerarToken } = require('../middlewares/auth');

const publico = (u) => ({ id: u.id, nome: u.nome, usuario: u.email });

module.exports = {
  async login(req, res) {
    try {
      const { usuario, senha } = req.body;
      if (!usuario?.trim() || !senha) {
        return res.status(400).json({ erro: 'Informe usuário e senha.' });
      }
      const user = await Usuario.findOne({ where: { email: usuario.trim().toLowerCase() } });
      if (!user || !(await bcrypt.compare(senha, user.senha))) {
        return res.status(401).json({ erro: 'Usuário ou senha incorretos.' });
      }
      return res.status(200).json({ usuario: publico(user), token: gerarToken(user) });
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }
};
