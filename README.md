# Santozs — Portal Escolar (React + Express)

Projeto unificado: `frontend/` (React + Vite) conversa com `backend/` (Express + Sequelize + MySQL).

## Estrutura

```
santozs/
├── package.json          # scripts para rodar tudo junto
├── backend/              # API Express (porta 3000)
│   ├── .env.example
│   └── src/
│       ├── server.js         # sobe o banco e o servidor
│       ├── app.js            # CORS, rotas /api, serve o frontend em produção
│       ├── config/conn.js    # conexão Sequelize (MySQL ou SQLite via .env)
│       ├── middlewares/auth.js   # JWT
│       ├── controllers/ models/ routes/
└── frontend/             # React + Vite (porta 5173)
    ├── vite.config.js        # proxy /api → http://localhost:3000
    └── src/
        ├── services/api.js   # único lugar com fetch / base URL / token
        ├── pages/ (Login, Selecao, Portfolio)
        └── css/
```

## Como rodar

Pré-requisitos: Node.js 18+ e MySQL ligado (XAMPP/Workbench). O banco `santozs_db` é criado automaticamente.

```bash
npm run install:all
# se necessário, ajuste usuário/senha do MySQL em backend/.env
npm run dev
```

Abra http://localhost:5173 e entre com **usuário** `usuario` e **senha** `senha` (criado automaticamente na primeira execução).

Sem MySQL? Em `backend/.env` use `DB_DIALECT=sqlite` (arquivo local, nada a instalar).

### Produção (uma porta só)

```bash
npm run start      # compila o frontend e o Express serve tudo em http://localhost:3000
```

## Endpoints (prefixo `/api`)

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| POST | `/auth/login` | – | `{usuario, senha}` → `{usuario, token}` |
| GET | `/selecoes` | – | Portais SENAI/SESI |
| POST/PUT/DELETE | `/selecoes[/:id]` | Bearer | CRUD de seleções |
| GET | `/portfolios?instituicao=SESI` | Bearer | Atividades do usuário logado |
| POST | `/portfolios` | Bearer | `{titulo, descricao, materia, tipo, instituicao}` |
| PUT/DELETE | `/portfolios/:id` | Bearer | Só do dono |

## O que foi alterado na integração

- Frontend chamava `/api/atividades` com resposta `{dados}`; agora usa `/api/portfolios` (arrays diretos), via `services/api.js`.
- Login deixou de ser simulado: login com usuário fixo (`usuario`/`senha`), senha criptografada (bcrypt) e token JWT.
- Modelo `Portfolio` ganhou `materia`, `tipo` e `instituicao` (campos que o formulário já usava).
- Tela de seleção lê `/selecoes` (populada automaticamente com SENAI e SESI).
- CORS restrito a `CORS_ORIGIN`; em dev o proxy do Vite evita CORS.
- Adicionados `vite.config.js`, `.env.example`, botão Remover e versões fixas de dependências.
