const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'dev-secret-troque-em-producao';

function gerarToken(usuario) {
  return jwt.sign({ id: usuario.id }, SECRET, { expiresIn: '8h' });
}

function autenticar(req, res, next) {
  const header = req.headers.authorization || '';
  const [tipo, token] = header.split(' ');
  if (tipo !== 'Bearer' || !token) {
    return res.status(401).json({ erro: 'Token não informado.' });
  }
  try {
    req.usuarioId = jwt.verify(token, SECRET).id;
    return next();
  } catch {
    return res.status(401).json({ erro: 'Token inválido ou expirado.' });
  }
}

module.exports = { gerarToken, autenticar };
