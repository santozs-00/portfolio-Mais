const { DataTypes } = require('sequelize');
const sequelize = require('../config/conn');

const Selecao = sequelize.define('Selecao', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false
  },
  detalhes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'selecoes',
  timestamps: true
});

module.exports = Selecao;
