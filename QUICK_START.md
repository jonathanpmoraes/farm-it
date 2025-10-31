# Farm-IT - Guia Rápido ⚡

## 🚀 Início Rápido (5 minutos)

### 1. Instale as Dependências

```bash
cd /Users/jonathan.moraes.gft/dev/nu/farm-it
npm run install-all
```

### 2. Configure o Banco de Dados

**Criar o banco:**

```bash
psql -U postgres
```

```sql
CREATE DATABASE farm_it;
\q
```

**Configurar credenciais:**

```bash
cd backend
cp .env.example .env
# Edite o arquivo .env com suas credenciais do PostgreSQL
```

**Executar migrations:**

```bash
npm run migrate
```

### 3. Iniciar o Sistema

```bash
cd ..
npm run dev
```

Pronto! Acesse: **http://localhost:3000**

---

## 📋 Checklist de Configuração

- [ ] Node.js instalado
- [ ] PostgreSQL instalado e rodando
- [ ] Banco `farm_it` criado
- [ ] Arquivo `backend/.env` configurado
- [ ] Migrations executadas
- [ ] Backend rodando na porta 5000
- [ ] Frontend rodando na porta 3000

---

## 🎯 Primeiro Uso

1. **Registre-se** em `/register`
2. **Cadastre animais** em Rebanho
3. **Registre alimentação** em Alimentação
4. **Veja o dashboard** com as estatísticas

---

## 🛠️ Comandos Úteis

```bash
# Backend
cd backend
npm run dev          # Desenvolvimento
npm start            # Produção
npm run migrate      # Rodar migrations

# Frontend
cd frontend
npm start            # Desenvolvimento
npm run build        # Build produção

# Raiz (ambos simultaneamente)
npm run dev          # Backend + Frontend
```

---

## 🔑 Variáveis de Ambiente Essenciais

**backend/.env:**

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=SUA_SENHA
DB_NAME=farm_it
JWT_SECRET=CRIE_UM_SECRET_UNICO
NODE_ENV=development
```

---

## 📊 Estrutura Básica

```
farm-it/
├── backend/         → API (porta 5000)
├── frontend/        → React (porta 3000)
└── [docs]          → Documentação
```

---

## 🆘 Problemas Comuns

### Porta em uso

```bash
# Matar processo na porta 5000
lsof -ti:5000 | xargs kill -9
```

### Erro de conexão DB

- Verifique se PostgreSQL está rodando: `pg_isready`
- Confirme credenciais no `.env`

### Dependências

```bash
# Reinstalar tudo
rm -rf node_modules backend/node_modules frontend/node_modules
npm run install-all
```

---

## 📚 Mais Informações

- **Instalação completa:** `SETUP.md`
- **Como usar:** `USAGE_GUIDE.md`
- **API:** `API_DOCUMENTATION.md`
- **Resumo:** `PROJECT_SUMMARY.md`

---

## ✅ Teste Rápido

Após iniciar, teste:

1. ✅ Abra http://localhost:3000
2. ✅ Registre um usuário
3. ✅ Faça login
4. ✅ Veja o dashboard
5. ✅ Cadastre um animal

Tudo funcionando? Você está pronto! 🎉

---

**Farm-IT - Gestão Sustentável para Propriedades Pecuárias** 🌾🐄💚

