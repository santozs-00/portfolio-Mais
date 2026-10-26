require('dotenv').config();
const { Sequelize } = require('sequelize');

const dialect = process.env.DB_DIALECT || 'mysql';

const options = { dialect, logging: false };

if (dialect === 'sqlite') {
  options.storage = process.env.DB_STORAGE || './database.sqlite';
} else {
  options.host = process.env.DB_HOST || 'localhost';
  options.port = Number(process.env.DB_PORT) || 3306;
}

const sequelize = new Sequelize(
  process.env.DB_NAME || 'santozs_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  options
);

// Cria o banco MySQL automaticamente se ainda não existir.
async function garantirBanco() {
  if (dialect !== 'mysql') return;
  const mysql = require('mysql2/promise');
  const conexao = await mysql.createConnection({
    host: options.host,
    port: options.port,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || ''
  });
  const nome = (process.env.DB_NAME || 'santozs_db').replace(/`/g, '');
  await conexao.query(`CREATE DATABASE IF NOT EXISTS \`${nome}\` CHARACTER SET utf8mb4`);
  await conexao.end();
}

module.exports = sequelize;
module.exports.garantirBanco = garantirBanco;
