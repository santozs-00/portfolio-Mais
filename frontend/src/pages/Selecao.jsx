import { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import '../css/selecao.css';

// Usado caso a API não responda; o fluxo continua funcionando.
const PADRAO = [
  { id: 'senai', titulo: 'SENAI', detalhes: 'Informática e atividades técnicas' },
  { id: 'sesi', titulo: 'SESI', detalhes: 'Atividades e portfólio escolar' }
];

export default function Selecao({ usuario, onVoltar, onSelecionar }) {
  const [opcoes, setOpcoes] = useState(PADRAO);

  useEffect(() => {
    api.listarSelecoes()
      .then((lista) => {
        const portais = lista.filter((s) => ['SENAI', 'SESI'].includes(s.titulo.toUpperCase()));
        if (portais.length) setOpcoes(portais);
      })
      .catch(() => { /* mantém opções padrão */ });
  }, []);

  return (
    <main className="selecao-page">
      <div className="container">
        <h1>Escolha seu portal</h1>
        <h2>{usuario?.nome ? `${usuario.nome}, qual` : 'Qual'} área você deseja acessar?</h2>

        <div className="opcoes">
          {opcoes.map((opcao) => {
            const escola = opcao.titulo.toUpperCase();
            return (
              <button
                key={opcao.id}
                className={`botao botao-${escola.toLowerCase()}`}
                onClick={() => onSelecionar(escola)}
              >
                {escola}
                <span className="descricao">{opcao.detalhes}</span>
              </button>
            );
          })}
        </div>

        <button className="voltar-login" onClick={onVoltar}>Sair</button>
      </div>
    </main>
  );
}
