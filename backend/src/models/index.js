const sequelize = require('../config/conn');
const Usuario = require('./usuarioModel');
const Portfolio = require('./portfolioModel');
const Selecao = require('./selecaoModel');

// Relacionamentos
Usuario.hasMany(Portfolio, { foreignKey: 'usuario_id', onDelete: 'CASCADE' });
Portfolio.belongsTo(Usuario, { foreignKey: 'usuario_id' });

module.exports = {
  sequelize,
  Usuario,
  Portfolio,
  Selecao
};
