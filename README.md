# GECCP

Plataforma de monitorização epidemiológica do Grupo de Estudos de Cancro da Cabeça e Pescoço.

- `server/` — API Node/Express + MariaDB
- `webapp/` — frontend React (Vite)

## Servidor (API)

Requisitos: Node >= 18 e acesso à base de dados MariaDB/MySQL.

```bash
cd server
cp .env.example .env      # preencher DB_*, JWT_SECRET e CORS_ORIGIN
npm ci --omit=dev         # (ou npm install)
npm start                 # escuta em PORT (por defeito 4000)
```

Variáveis (`server/.env`, nunca vai para o git):

| Variável | Descrição |
| --- | --- |
| `PORT` | Porta HTTP (o alojamento pode definir esta) |
| `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` | Ligação à base de dados |
| `JWT_SECRET` | Segredo dos tokens (string longa e aleatória; mudá-lo termina todas as sessões) |
| `CORS_ORIGIN` | URL(s) do frontend separados por vírgula, ex. `https://app.exemplo.pt`. Se vazio, aceita qualquer origem |

Notas:
- A API deve estar atrás de HTTPS (proxy inverso / o painel do alojamento). Já está configurado `trust proxy`.
- `GET /` responde `GECCP API!` — serve de health check.
- Apache como proxy inverso (Node numa porta local): usar `server/.htaccess.example` como `.htaccess` (força HTTPS, bloqueia `.env`/`package.json` e encaminha para a porta). Em "Setup Node.js App" do cPanel **não** usar: o painel gere o seu próprio `.htaccess`.
- Para manter o processo vivo fora de um painel Node: `pm2 start index.js --name geccp-api`.
- Esquema da BD: tabelas `patient` e `patient_clinical_record` (histórico apenso de cada versão gravada do registo clínico). O SQL está descrito no histórico do projeto; sem estas tabelas a criação/edição de doentes falha.

## Webapp

```bash
cd webapp
cp .env.example .env      # VITE_API_URL = URL público da API
npm ci
npm run build             # gera webapp/dist
```

Publicar o conteúdo de `webapp/dist/` num alojamento estático (Apache, Nginx, Netlify, …). O `.htaccess` incluído trata do fallback de SPA em Apache; em Nginx usar `try_files $uri /index.html;`.

`VITE_API_URL` é fixado no momento do build: mudar de API implica voltar a fazer `npm run build`.

## Ordem para colocar online

1. Criar/confirmar as tabelas na BD.
2. Arrancar a API com o `.env` de produção e testar `GET /`.
3. Fazer o build do webapp com `VITE_API_URL` apontando para essa API.
4. Publicar `webapp/dist/` e definir `CORS_ORIGIN` na API com o URL do frontend.
