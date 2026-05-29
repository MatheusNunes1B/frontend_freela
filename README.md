# B7Store Backend

API Node.js + Express para autenticação JWT e CRUD de produtos usando Supabase.

## Rodar localmente

```bash
npm install
cp .env.example .env
npm run dev
```

Configure no `.env` local:

```env
SUPABASE_URL=https://yczhzzpvzvijqcchxhza.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_do_supabase
JWT_SECRET=troque_por_um_segredo_forte
JWT_EXPIRES_IN=1d
FRONTEND_URL=http://localhost:5500
PORT=3000
```

## Segurança do `.env`

O arquivo `.env` contém secrets reais e não deve ir para o GitHub.

Suba apenas:

```txt
.env.example
```

Não suba:

```txt
.env
node_modules/
```

Este projeto já possui `.gitignore` para proteger esses arquivos.

## Variáveis obrigatórias na Vercel

Se a Vercel mostrar este erro:

```txt
Error: Configure SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no ambiente.
```

significa que as variáveis de ambiente não foram cadastradas na Vercel, foram cadastradas com nome diferente, ou o backend não foi redeployado depois da alteração.

No projeto backend da Vercel, vá em **Settings > Environment Variables** e cadastre exatamente:

```txt
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
JWT_SECRET
JWT_EXPIRES_IN
FRONTEND_URL
```

Use estes valores:

```env
SUPABASE_URL=https://yczhzzpvzvijqcchxhza.supabase.co
SUPABASE_SERVICE_ROLE_KEY=cole_a_service_role_key_real_aqui
JWT_SECRET=crie_um_segredo_forte_para_jwt
JWT_EXPIRES_IN=1d
FRONTEND_URL=https://sua-url-do-frontend.vercel.app
```

Depois clique em **Redeploy** no projeto backend.

## Rotas

- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products` protegido por JWT
- `PUT /api/products/:id` protegido por JWT
- `DELETE /api/products/:id` protegido por JWT

## Deploy Vercel

Configure o projeto com a raiz do repositório backend e cadastre as variáveis de ambiente na Vercel. O arquivo `vercel.json` já direciona as requisições para `server.js`.
