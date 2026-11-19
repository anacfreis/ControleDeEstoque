# Controle de Estoque

API REST para controle de estoque, feita com Node.js, Express, Prisma e PostgreSQL. Permite cadastrar usuários, categorias, fornecedores e produtos (com imagem), com login via JWT.

## Requisitos

- Node.js 20 ou superior
- Yarn 1.x
- PostgreSQL rodando na sua máquina (ou um banco remoto)

## Como rodar

```bash
# 1. Clone o repositório e entre na pasta
git clone <url-do-repositorio>
cd ControleDeEstoque

# 2. Instale as dependências
yarn install

# 3. Crie o seu arquivo de variáveis de ambiente
cp .env.example .env
# Abra o .env e preencha DATABASE_URL e JWT_SECRET

# 4. Crie as tabelas no banco
yarn prisma migrate deploy
yarn prisma generate

# 5. Rode o servidor em modo desenvolvimento
yarn dev
```

O servidor sobe em `http://localhost:3333`.

## Variáveis de ambiente

| Variável | Obrigatória | Descrição |
|---|---|---|
| `DATABASE_URL` | Sim | URL de conexão com o PostgreSQL |
| `JWT_SECRET` | Sim | Segredo usado para assinar os tokens de login |
| `PORT` | Não | Porta do servidor (padrão: 3333) |

Para gerar um `JWT_SECRET` forte:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Autenticação

Faça login em `POST /login` e use o `token` recebido no header das demais rotas:

```
Authorization: Bearer <token>
```

Só `POST /users` e `POST /login` não exigem token.

## Rotas

| Recurso | Método e rota |
|---|---|
| Usuários | `POST /users`, `POST /login`, `GET /users/:id`, `DELETE /users/:id` |
| Categorias | `POST /categories`, `GET /categories/:id`, `PUT /categories/:id`, `DELETE /categories/:id` |
| Fornecedores | `POST /suppliers`, `GET /suppliers/:id`, `PUT /suppliers/:id`, `DELETE /suppliers/:id` |
| Produtos | `POST /products`, `GET /products`, `GET /products/:id`, `GET /products/category/:categoryId`, `PUT /products/:id`, `DELETE /products/:id` |

### Produtos e imagens

`POST /products` e `PUT /products/:id` usam `multipart/form-data` com os campos:

- `name` (texto)
- `price` (número)
- `categoryId` (número)
- `supplierId` (número)
- `image` (arquivo, opcional)

As imagens ficam na pasta `uploads/` e são servidas em `GET /files/<nome-do-arquivo>`.

## Erros

Dados inválidos retornam `400` com a lista de campos com problema:

```json
{
  "error": "Dados inválidos.",
  "details": [{ "field": "price", "message": "..." }]
}
```

## Scripts

| Comando | O que faz |
|---|---|
| `yarn dev` | Roda o servidor com recarga automática |
| `yarn build` | Compila o TypeScript |