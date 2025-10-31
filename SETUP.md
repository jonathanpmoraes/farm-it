# Guia de Instalação - Farm-IT

Este guia fornece instruções passo a passo para configurar e executar o Farm-IT.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 16 ou superior) - [Download](https://nodejs.org/)
- **PostgreSQL** (versão 12 ou superior) - [Download](https://www.postgresql.org/download/)
- **npm** (geralmente vem com Node.js)

## Passo 1: Configurar o Banco de Dados

### 1.1 Criar o Banco de Dados

Abra o terminal do PostgreSQL (psql) e execute:

```sql
CREATE DATABASE farm_it;
```

### 1.2 Criar um Usuário (Opcional)

Se quiser criar um usuário específico para o projeto:

```sql
CREATE USER farm_admin WITH PASSWORD 'sua_senha_aqui';
GRANT ALL PRIVILEGES ON DATABASE farm_it TO farm_admin;
```

## Passo 2: Configurar o Backend

### 2.1 Instalar Dependências

```bash
cd backend
npm install
```

### 2.2 Configurar Variáveis de Ambiente

Crie um arquivo `.env` na pasta `backend`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha_postgresql
DB_NAME=farm_it
JWT_SECRET=seu_secret_super_seguro_123456
NODE_ENV=development
```

**⚠️ IMPORTANTE:** Altere o `JWT_SECRET` para uma string única e segura!

### 2.3 Executar Migrations

```bash
npm run migrate
```

Você deve ver a mensagem: ✅ Migrations executadas com sucesso!

## Passo 3: Configurar o Frontend

### 3.1 Instalar Dependências

```bash
cd ../frontend
npm install
```

### 3.2 Configurar Variáveis de Ambiente (Opcional)

Se o backend estiver em outra porta ou servidor, crie um arquivo `.env`:

```bash
cp .env.example .env
```

E ajuste a URL da API:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Passo 4: Executar o Projeto

### Opção 1: Executar Backend e Frontend Separadamente

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

Você deve ver:
```
🚀 Servidor rodando na porta 5000
📍 http://localhost:5000
✅ Conectado ao banco de dados PostgreSQL
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

O navegador abrirá automaticamente em `http://localhost:3000`

### Opção 2: Executar Tudo de Uma Vez

Na pasta raiz do projeto:

```bash
npm run install-all  # Primeira vez apenas
npm run dev
```

## Passo 5: Acessar o Sistema

1. Abra seu navegador em `http://localhost:3000`
2. Clique em "Cadastre-se" para criar sua conta
3. Preencha os dados e comece a usar!

## Estrutura das URLs

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health

## Funcionalidades Disponíveis

✅ **Autenticação de Usuários**
- Registro de novos usuários
- Login com JWT
- Gestão de perfil

✅ **Gestão de Rebanho**
- Cadastro de vacas e porcos
- Controle de peso e saúde
- Filtros e busca

✅ **Controle de Alimentação**
- Registro de alimentação por animal ou geral
- Controle de custos
- Gestão de estoque de ração

✅ **Comercialização de Esterco**
- Registro de produção
- Gestão de vendas
- Controle de pagamentos

✅ **Gestão Financeira**
- Receitas e despesas
- Relatórios financeiros
- Dashboard com estatísticas

## Solução de Problemas

### Erro de Conexão com o Banco

```
❌ Erro no pool do PostgreSQL
```

**Solução:**
1. Verifique se o PostgreSQL está rodando
2. Confirme as credenciais no arquivo `.env`
3. Certifique-se que o banco `farm_it` foi criado

### Erro "Port 5000 already in use"

**Solução:**
```bash
# No macOS/Linux
lsof -ti:5000 | xargs kill -9

# Ou altere a porta no arquivo backend/.env
PORT=5001
```

### Erro "Cannot find module"

**Solução:**
```bash
# Reinstale as dependências
cd backend && npm install
cd ../frontend && npm install
```

### Frontend não conecta ao Backend

**Solução:**
1. Verifique se o backend está rodando
2. Confirme a URL da API no arquivo `frontend/.env`
3. Desabilite CORS temporariamente no navegador (apenas para testes)

## Testando a API Manualmente

Você pode testar os endpoints usando curl ou Postman:

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Registrar Usuário
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "senha123",
    "property_name": "Fazenda Boa Vista"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "senha123"
  }'
```

## Próximos Passos

Após a instalação bem-sucedida:

1. ✅ Crie sua conta de usuário
2. ✅ Cadastre seus primeiros animais
3. ✅ Registre a alimentação
4. ✅ Comece a controlar suas finanças
5. ✅ Explore o dashboard com estatísticas

## Suporte

Em caso de dúvidas ou problemas:

1. Verifique se todas as dependências foram instaladas corretamente
2. Confirme que o PostgreSQL está rodando
3. Revise as configurações do arquivo `.env`
4. Verifique os logs no terminal para mensagens de erro

---

**Desenvolvido com 💚 para ajudar pequenos produtores rurais**

