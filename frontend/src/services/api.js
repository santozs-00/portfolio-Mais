const BASE_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');
const CHAVE = 'santozs:sessao';

export function lerSessao() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE)) || null;
  } catch {
    return null;
  }
}

export function salvarSessao(sessao) {
  try {
    if (sessao) localStorage.setItem(CHAVE, JSON.stringify(sessao));
    else localStorage.removeItem(CHAVE);
  } catch { /* armazenamento indisponível */ }
}

async function requisicao(caminho, { metodo = 'GET', corpo, autenticado = true } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const sessao = lerSessao();
  if (autenticado && sessao?.token) headers.Authorization = `Bearer ${sessao.token}`;

  let resposta;
  try {
    resposta = await fetch(`${BASE_URL}${caminho}`, {
      method: metodo,
      headers,
      body: corpo ? JSON.stringify(corpo) : undefined
    });
  } catch {
    throw new Error('Não foi possível conectar à API. Confira se o backend está rodando na porta 3000.');
  }

  const dados = await resposta.json().catch(() => ({}));
  if (!resposta.ok) {
    if (resposta.status === 401 && autenticado) {
      salvarSessao(null);
      window.dispatchEvent(new Event('santozs:sessao-expirada'));
    }
    throw new Error(dados.erro || `Erro ${resposta.status}`);
  }
  return dados;
}

export const api = {
  login: (usuario, senha) =>
    requisicao('/auth/login', { metodo: 'POST', corpo: { usuario, senha }, autenticado: false }),

  listarSelecoes: () => requisicao('/selecoes', { autenticado: false }),

  listarPortfolios: (instituicao) =>
    requisicao(`/portfolios?instituicao=${encodeURIComponent(instituicao)}`),
  criarPortfolio: (dados) => requisicao('/portfolios', { metodo: 'POST', corpo: dados }),
  removerPortfolio: (id) => requisicao(`/portfolios/${id}`, { metodo: 'DELETE' })
};
