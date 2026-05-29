# B7Store - Frontend + Backend Node.js/Supabase

Projeto reorganizado para separar o frontend estático da API backend moderna em Node.js + Express, usando Supabase como banco de dados e JWT para autenticação.

## Estrutura do projeto

```txt
.
├── assets/
│   ├── images/
│   └── js/
│       ├── admin-products.js
│       ├── api.js
│       ├── checkout.js
│       ├── footer.js
│       ├── header.js
│       ├── home.js
│       ├── login.js
│       ├── product.js
│       ├── products-api.js
│       └── produtos.js
├── backend/
│   ├── data/
│   │   └── supabase.js
│   ├── middlewares/
│   │   ├── auth.js
│   │   └── validate.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── productRoutes.js
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   ├── server.js
│   └── vercel.json
├── admin-produtos.html
├── checkout.html
├── index.html
├── login.html
├── product.html
└── produtos.html
```

## O que foi modernizado

- Frontend mantido como páginas HTML para não quebrar o funcionamento atual.
- TailwindCSS adicionado via CDN nas páginas principais e novas telas.
- Os arquivos HTML não dependem mais de `assets/css/*.css`; os estilos principais estão em classes Tailwind nos próprios HTML.
- Scripts separados para integração com API:
  - `assets/js/api.js`: cliente HTTP centralizado.
  - `assets/js/products-api.js`: carrega produtos do backend quando disponível.
  - `assets/js/login.js`: autenticação e armazenamento do token JWT.
  - `assets/js/admin-products.js`: cadastro de produtos via API protegida.
- Backend separado em `backend/` com Express, rotas, middlewares e conexão Supabase.
- Estrutura pronta para deploy separado na Vercel.

## Separar em dois repositórios GitHub

Sim, este projeto deve ser salvo em **dois repositórios separados**:

1. Um repositório para o **frontend**.
2. Um repositório para o **backend**.

### Repositório do frontend

No repositório do frontend, envie apenas os arquivos da raiz necessários para a interface.

Arquivos e pastas essenciais do frontend:

```txt
assets/
admin-produtos.html
checkout.html
index.html
login.html
product.html
produtos.html
README.md
```

Não envie a pasta abaixo para o repositório do frontend:

```txt
backend/
```

A pasta `assets/` é essencial porque contém:

```txt
assets/images/
assets/js/
```

O frontend usa TailwindCSS via CDN diretamente nos arquivos HTML, então a pasta `assets/css/` não é mais necessária se ela ainda existir no seu computador.

### Repositório do backend

No repositório do backend, envie o conteúdo da pasta `backend/`.

A estrutura do repositório backend deve ficar assim na raiz do repo:

```txt
data/
middlewares/
routes/
.env.example
package.json
package-lock.json
README.md
server.js
vercel.json
```

Ou seja: ao criar o repositório do backend, você pode copiar **o conteúdo de `backend/`**, e não a pasta `backend/` inteira dentro do repositório.

Exemplo correto no repo backend:

```txt
meu-backend/
├── data/
├── middlewares/
├── routes/
├── .env.example
├── package.json
├── package-lock.json
├── README.md
├── server.js
└── vercel.json
```

Evite deixar assim:

```txt
meu-backend/
└── backend/
    ├── data/
    ├── routes/
    └── server.js
```

Também não envie `node_modules/` para o GitHub. Ele é recriado com:

```bash
npm install
```

### O que fazer com `.env.example`

O arquivo `.env.example` **deve ir para o GitHub**.

Ele serve como modelo para mostrar quais variáveis o backend precisa, mas não contém secrets reais.

Pode enviar:

```txt
.env.example
```

Não envie:

```txt
.env
```

O arquivo `.env` deve existir apenas localmente ou nas variáveis de ambiente da Vercel.

Exemplo:

```env
SUPABASE_URL=https://yczhzzpvzvijqcchxhza.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_do_supabase
JWT_SECRET=troque_por_um_segredo_forte
JWT_EXPIRES_IN=1d
FRONTEND_URL=https://seu-frontend.vercel.app
PORT=3000
```

### Variáveis obrigatórias na Vercel

O erro abaixo significa que a Vercel não encontrou as variáveis `SUPABASE_URL` e/ou `SUPABASE_SERVICE_ROLE_KEY` no ambiente do backend:

```txt
Error: Configure SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no ambiente.
```

Para corrigir:

1. Abra o projeto do backend na Vercel.
2. Vá em **Settings > Environment Variables**.
3. Cadastre exatamente estes nomes:

```txt
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
JWT_SECRET
JWT_EXPIRES_IN
FRONTEND_URL
```

4. Use estes valores:

```env
SUPABASE_URL=https://yczhzzpvzvijqcchxhza.supabase.co
SUPABASE_SERVICE_ROLE_KEY=cole_a_service_role_key_real_aqui
JWT_SECRET=crie_um_segredo_forte_para_jwt
JWT_EXPIRES_IN=1d
FRONTEND_URL=https://sua-url-do-frontend.vercel.app
```

5. Salve as variáveis.
6. Faça **Redeploy** do backend na Vercel.

Atenção: depois de adicionar ou alterar variáveis de ambiente na Vercel, é necessário fazer redeploy para o backend carregar os novos valores.

### Pontos de atenção antes de subir

- Não subir `.env`.
- Não subir `node_modules/`.
- Não subir `backend/` dentro do repositório frontend.
- Não subir arquivos `__MACOSX/`, se ainda existirem.
- No frontend, configurar `assets/js/api.js` para apontar para a URL real do backend na Vercel.
- No backend, configurar `FRONTEND_URL` com a URL real do frontend na Vercel para o CORS funcionar.
- No Supabase, criar as tabelas `usuarios` e `produtos` antes de testar login/produtos.

### Ordem recomendada para publicar

1. Crie o repositório do backend.
2. Copie o conteúdo de `backend/` para esse repositório.
3. Suba o backend no GitHub.
4. Faça deploy do backend na Vercel.
5. Configure as variáveis de ambiente reais do backend na Vercel.
6. Copie a URL final do backend.
7. Atualize `assets/js/api.js` no frontend com a URL final do backend.
8. Crie o repositório do frontend.
9. Suba os arquivos do frontend, sem a pasta `backend/`.
10. Faça deploy do frontend na Vercel.
11. Volte no backend na Vercel e configure `FRONTEND_URL` com a URL final do frontend.

## Como rodar o frontend

Como o frontend é estático, você pode abrir `index.html` diretamente no navegador.

Recomendado: usar uma extensão como Live Server no VS Code ou qualquer servidor estático local.

Exemplo com `npx serve`:

```bash
npx serve .
```

Depois acesse a URL local informada pelo terminal.

### Configurar URL da API no frontend

Por padrão, `assets/js/api.js` usa:

```js
http://localhost:3000
```

Quando o backend estiver hospedado na Vercel, defina antes dos scripts ou ajuste esse arquivo:

```html
<script>
  window.API_BASE_URL = 'https://seu-backend.vercel.app';
</script>
<script src="assets/js/api.js"></script>
```

## Como rodar o backend

Entre na pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` baseado no `.env.example`:

```bash
cp .env.example .env
```

Configure as variáveis:

```env
SUPABASE_URL=https://yczhzzpvzvijqcchxhza.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_do_supabase
JWT_SECRET=troque_por_um_segredo_forte
JWT_EXPIRES_IN=1d
FRONTEND_URL=http://localhost:5500
PORT=3000
```

Rode em desenvolvimento:

```bash
npm run dev
```

Rode em produção local:

```bash
npm start
```

A API ficará disponível em:

```txt
http://localhost:3000
```

## Supabase

A conexão fica em:

```txt
backend/data/supabase.js
```

O código usa variáveis de ambiente e não expõe secrets no repositório.

### Tabelas esperadas

Crie as tabelas abaixo no Supabase.

#### usuarios

```sql
create table usuarios (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  email text not null unique,
  senha_hash text not null,
  created_at timestamp with time zone default now()
);
```

#### produtos

```sql
create table produtos (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  descricao text,
  preco numeric(10, 2) not null,
  imagem text,
  created_at timestamp with time zone default now()
);
```

## Autenticação

A autenticação usa JWT.

Fluxo:

1. O usuário faz login em `POST /api/auth/login`.
2. A API busca o usuário na tabela `usuarios`.
3. A senha enviada é comparada com `senha_hash` usando `bcryptjs`.
4. Se estiver correta, a API retorna um token JWT.
5. O frontend salva o token em `localStorage`.
6. Rotas protegidas exigem o cabeçalho:

```txt
Authorization: Bearer seu_token_jwt
```

O middleware responsável fica em:

```txt
backend/middlewares/auth.js
```

## Rotas da API

### Status

```http
GET /
```

Retorna informações básicas da API.

### Login

```http
POST /api/auth/login
Content-Type: application/json
```

Body:

```json
{
  "email": "admin@email.com",
  "senha": "123456"
}
```

Resposta:

```json
{
  "token": "jwt",
  "user": {
    "id": "uuid",
    "nome": "Admin",
    "email": "admin@email.com"
  }
}
```

### Cadastro de usuário

```http
POST /api/auth/register
Content-Type: application/json
```

Body:

```json
{
  "nome": "Admin",
  "email": "admin@email.com",
  "senha": "123456"
}
```

### Listar produtos

```http
GET /api/products
```

Rota pública.

### Buscar produto por ID

```http
GET /api/products/:id
```

Rota pública.

### Cadastrar produto

```http
POST /api/products
Authorization: Bearer seu_token_jwt
Content-Type: application/json
```

Body:

```json
{
  "nome": "Camiseta Node.js",
  "descricao": "Camiseta para devs",
  "preco": 99.9,
  "imagem": "assets/images/products/camiseta-node.png"
}
```

### Editar produto

```http
PUT /api/products/:id
Authorization: Bearer seu_token_jwt
Content-Type: application/json
```

Body:

```json
{
  "nome": "Camiseta Node.js Atualizada",
  "preco": 109.9
}
```

### Deletar produto

```http
DELETE /api/products/:id
Authorization: Bearer seu_token_jwt
```

Retorna `204 No Content` em caso de sucesso.

## Explicação das pastas do backend

### `backend/data/`

Contém integrações com dados externos. Hoje possui `supabase.js`, responsável por criar o client do Supabase.

### `backend/middlewares/`

Contém funções que rodam antes das rotas.

- `auth.js`: valida o JWT.
- `validate.js`: valida campos obrigatórios simples.

### `backend/routes/`

Contém as rotas separadas por domínio.

- `authRoutes.js`: login e cadastro de usuários.
- `productRoutes.js`: CRUD de produtos.

### `backend/server.js`

Arquivo principal da API. Configura Express, CORS, JSON, rotas e tratamento de erros.

## Deploy do backend na Vercel

1. Crie um repositório GitHub somente para o backend ou configure a raiz do projeto como `backend` na Vercel.
2. Na Vercel, importe o projeto.
3. Configure o diretório raiz como:

```txt
backend
```

4. Configure as variáveis de ambiente na Vercel:

```txt
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
JWT_SECRET
JWT_EXPIRES_IN
FRONTEND_URL
```

5. O arquivo `backend/vercel.json` já aponta todas as rotas para `server.js`.

## Deploy do frontend na Vercel

1. Crie um repositório GitHub separado para o frontend.
2. Envie os arquivos do frontend:

```txt
assets/
index.html
produtos.html
product.html
checkout.html
login.html
admin-produtos.html
README.md
```

Não envie no repositório frontend:

```txt
backend/
node_modules/
.env
__MACOSX/
```

3. Na Vercel, importe esse repositório como projeto estático.
4. Configure a URL do backend em `assets/js/api.js` ou defina `window.API_BASE_URL` nas páginas que usam API.

## Comandos npm do backend

```bash
npm install
npm run dev
npm start
```

## Observações importantes

- Não coloque `SUPABASE_SERVICE_ROLE_KEY` no frontend.
- O frontend deve conversar apenas com o backend.
- As rotas de cadastro, edição e exclusão de produtos são protegidas por JWT.
- As rotas de listagem e detalhe de produtos são públicas para permitir a vitrine da loja.
- O frontend legado continua funcionando mesmo se a API estiver offline; quando a API estiver online, as listas de produtos são preenchidas com dados do Supabase.
