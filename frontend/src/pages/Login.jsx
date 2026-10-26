import { useState } from 'react';
import { api } from '../services/api.js';
import '../css/login.css';

export default function Login({ onEntrar }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!usuario.trim() || !senha.trim()) {
      setMensagem('Preencha o usuário e a senha.');
      return;
    }
    setMensagem('');
    setEnviando(true);
    try {
      onEntrar(await api.login(usuario, senha));
    } catch (erro) {
      setMensagem(erro.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="login-container">
      <section className="login-card">
        <header className="login-header">
          <h1>Bem-vindo!</h1>
        </header>

        <form id="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="usuario">Usuário</label>
            <input
              id="usuario"
              name="usuario"
              autoComplete="username"
              value={usuario}
              onChange={(event) => setUsuario(event.target.value)}
              placeholder="Digite seu usuário"
            />
          </div>

          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              name="senha"
              type="password"
              autoComplete="current-password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              placeholder="Digite sua senha"
            />
          </div>

          <p id="mensagem" role="alert">{mensagem}</p>
          <button type="submit" disabled={enviando}>{enviando ? 'Aguarde...' : 'Entrar'}</button>
        </form>
      </section>
    </main>
  );
}
