require('dotenv').config();
const bcrypt = require('bcryptjs');
const app = require('./app');
const { sequelize, Selecao, Usuario } = require('./models');
const { garantirBanco } = require('./config/conn');

const PORT = process.env.PORT || 3000;

const SELECOES_PADRAO = [
  { titulo: 'SENAI', categoria: 'Portal', detalhes: 'Informática e atividades técnicas' },
  { titulo: 'SESI', categoria: 'Portal', detalhes: 'Atividades e portfólio escolar' }
];

// Único usuário do sistema: usuário "usuario" / senha "senha"
async function garantirUsuarioPadrao() {
  await Usuario.findOrCreate({
    where: { email: 'usuario' },
    defaults: { nome: 'Usuário', senha: await bcrypt.hash('senha', 10) }
  });
}

async function iniciar() {
  try {
    await garantirBanco();
    await sequelize.sync({ alter: true });
    console.log('Banco de dados sincronizado com sucesso.');
    await garantirUsuarioPadrao();
    if ((await Selecao.count()) === 0) await Selecao.bulkCreate(SELECOES_PADRAO);
  } catch (error) {
    console.error('Erro ao conectar/sincronizar o banco de dados:', error.message);
    console.error('Confira o arquivo backend/.env (MySQL ligado? ou use DB_DIALECT=sqlite).');
    process.exit(1);
  }
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

iniciar();
