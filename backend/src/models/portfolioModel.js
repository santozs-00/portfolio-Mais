const { DataTypes } = require('sequelize');
const sequelize = require('../config/conn');

const Portfolio = sequelize.define('Portfolio', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  imagem: {
    type: DataTypes.STRING,
    allowNull: true
  },
  materia: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tipo: {
    type: DataTypes.ENUM('atividade', 'projeto', 'reflexao'),
    allowNull: false,
    defaultValue: 'atividade'
  },
  instituicao: {
    type: DataTypes.ENUM('SESI', 'SENAI'),
    allowNull: false,
    defaultValue: 'SESI'
  }
}, {
  tableName: 'portfolios',
  timestamps: true
});

module.exports = Portfolio;
