import { useEffect, useState } from 'react';
import Login from './pages/Login.jsx';
import Selecao from './pages/Selecao.jsx';
import Portfolio from './pages/Portfolio.jsx';
import { lerSessao, salvarSessao } from './services/api.js';

export default function App() {
  const [sessao, setSessao] = useState(lerSessao);
  const [pagina, setPagina] = useState(() => (lerSessao() ? 'selecao' : 'login'));
  const [tipo, setTipo] = useState('SESI');

  function sair() {
    salvarSessao(null);
    setSessao(null);
    setPagina('login');
  }

  // Token expirado/invalidado em qualquer requisição → volta ao login.
  useEffect(() => {
    window.addEventListener('santozs:sessao-expirada', sair);
    return () => window.removeEventListener('santozs:sessao-expirada', sair);
  }, []);

  function entrar(novaSessao) {
    salvarSessao(novaSessao);
    setSessao(novaSessao);
    setPagina('selecao');
  }

  if (!sessao || pagina === 'login') {
    return <Login onEntrar={entrar} />;
  }

  if (pagina === 'selecao') {
    return (
      <Selecao
        usuario={sessao.usuario}
        onVoltar={sair}
        onSelecionar={(escola) => {
          setTipo(escola);
          setPagina('portfolio');
        }}
      />
    );
  }

  return <Portfolio tipo={tipo} usuario={sessao.usuario} onVoltar={() => setPagina('selecao')} />;
}
