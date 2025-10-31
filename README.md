# 🌾 Farm-IT - Sistema de Gestão Sustentável para Propriedades Pecuárias

<div align="center">

![Farm-IT Logo](https://img.shields.io/badge/Farm--IT-v1.0.0-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Completo-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)

**Sistema completo de gestão para pequenas propriedades pecuárias**  
*Sustentabilidade • Otimização • Inovação*

</div>

---

## 🎯 Sobre o Projeto

O **Farm-IT** é uma solução completa desenvolvida para ajudar pequenos produtores rurais a gerenciar suas propriedades de forma **sustentável** e **eficiente**. O sistema permite controle total sobre rebanho, alimentação, comercialização de subprodutos e finanças.

### 🌟 Destaques

- ✅ **100% Web** - Acesse de qualquer dispositivo
- ✅ **Mobile-First** - Interface otimizada para celular
- ✅ **Gratuito** - Open source e sem custos
- ✅ **Fácil de Usar** - Interface intuitiva
- ✅ **Completo** - Todas as funcionalidades em um só lugar

---

## 🚀 Funcionalidades

### 🐄 Gestão de Rebanho

- Cadastro e controle de vacas e porcos
- Monitoramento de peso e saúde
- Histórico completo de cada animal
- Estatísticas do rebanho

### 🌾 Controle de Alimentação

- Registro de alimentação por animal ou geral
- Controle de custos com ração
- Gestão de estoque de alimentos
- Análise de consumo

### ♻️ Comercialização de Esterco

- Registro de produção de esterco
- Gestão de vendas e clientes
- Controle de pagamentos
- Receita adicional sustentável

### 💰 Gestão Financeira

- Controle de receitas e despesas
- Relatórios financeiros completos
- Análise de rentabilidade
- Gráficos e estatísticas

### 🔐 Sistema de Autenticação

- Registro e login seguros
- Gestão de perfil de usuário
- Proteção de dados com JWT

### 📊 Dashboard Interativo

- Visão geral da propriedade
- Indicadores em tempo real
- Métricas de sustentabilidade

---

## 🛠️ Tecnologias

<table>
<tr>
<td>

### Frontend

- ⚛️ **React 18**
- 🔀 **React Router**
- 🌐 **Axios**
- 🎨 **CSS3**

</td>
<td>

### Backend

- 🟢 **Node.js**
- ⚡ **Express**
- 🐘 **PostgreSQL**
- 🔒 **JWT + Bcrypt**

</td>
</tr>
</table>

---

## 📦 Instalação Rápida

### Pré-requisitos

- [Node.js](https://nodejs.org/) v16+
- [PostgreSQL](https://www.postgresql.org/) v12+

### Passo a Passo

```bash
# 1. Navegue até o diretório
cd /farm-it

# 2. Instale as dependências
npm run install-all

# 3. Configure o banco de dados
psql -U postgres -c "CREATE DATABASE farm_it;"

# 4. Configure o arquivo .env
cd backend
cp .env.example .env
# Edite o .env com suas credenciais

# 5. Execute as migrations
npm run migrate

# 6. Inicie o sistema
cd ..
npm run dev
```

🎉 **Pronto!** Acesse http://localhost:3000

---

## 📚 Documentação

| Documento | Descrição |
|-----------|-----------|
| [📖 QUICK_START.md](QUICK_START.md) | Guia rápido em 5 minutos |
| [⚙️ SETUP.md](SETUP.md) | Instalação completa e detalhada |
| [📱 USAGE_GUIDE.md](USAGE_GUIDE.md) | Como usar todas as funcionalidades |
| [🔌 API_DOCUMENTATION.md](API_DOCUMENTATION.md) | Documentação técnica da API |
| [📋 PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Resumo completo do projeto |

---

## 📁 Estrutura do Projeto

```
farm-it/
├── 📄 Documentação
│   ├── README.md              # Este arquivo
│   ├── QUICK_START.md         # Início rápido
│   ├── SETUP.md               # Guia de instalação
│   ├── USAGE_GUIDE.md         # Manual do usuário
│   ├── API_DOCUMENTATION.md   # Documentação API
│   └── PROJECT_SUMMARY.md     # Resumo do projeto
│
├── 🔧 Backend (Node.js + Express + PostgreSQL)
│   ├── config/                # Configurações
│   ├── controllers/           # Lógica de negócio
│   ├── routes/                # Rotas da API
│   ├── middleware/            # Autenticação
│   ├── migrations/            # Banco de dados
│   └── server.js              # Servidor principal
│
└── ⚛️ Frontend (React)
    ├── public/                # Arquivos estáticos
    └── src/
        ├── components/        # Componentes reutilizáveis
        ├── pages/             # Páginas da aplicação
        ├── contexts/          # Estado global (Auth)
        └── services/          # Cliente API
```

---

## 🌐 URLs do Sistema

| Serviço | URL | Descrição |
|---------|-----|-----------|
| 🖥️ Frontend | http://localhost:3000 | Interface do usuário |
| 🔌 Backend | http://localhost:5000 | API REST |
| ✅ Health Check | http://localhost:5000/api/health | Status da API |

---

## 🔒 Segurança

- ✅ Senhas criptografadas com **bcrypt**
- ✅ Autenticação via **JWT** (válido 7 dias)
- ✅ Proteção contra **SQL Injection**
- ✅ Validação de dados de entrada
- ✅ CORS configurado
- ✅ Rotas protegidas

---

## 📱 Responsividade

Interface totalmente adaptável:

| Dispositivo | Resolução | Status |
|-------------|-----------|--------|
| 🖥️ Desktop | 1920x1080+ | ✅ Otimizado |
| 💻 Laptop | 1366x768+ | ✅ Otimizado |
| 📱 Tablet | 768x1024 | ✅ Otimizado |
| 📱 Mobile | 375x667+ | ✅ Otimizado |

---

## 🎯 Casos de Uso

### Problema Resolvido

Pequenos produtores rurais enfrentam dificuldades em:

- ❌ Controlar custos de alimentação
- ❌ Gerenciar dados de rebanho
- ❌ Aproveitar subprodutos
- ❌ Organizar finanças

### Solução Farm-IT

- ✅ Registro preciso de alimentação e custos
- ✅ Histórico completo de cada animal
- ✅ Comercialização de esterco
- ✅ Dashboard financeiro completo
- ✅ Decisões baseadas em dados

---

## 🚀 Como Começar

### 1️⃣ Primeiro Acesso

1. Acesse http://localhost:3000/register
2. Crie sua conta
3. Faça login

### 2️⃣ Configure sua Propriedade

1. Atualize seu perfil
2. Cadastre seus animais
3. Registre o estoque de ração

### 3️⃣ Use Diariamente

1. Registre a alimentação
2. Acompanhe o dashboard
3. Lance receitas e despesas
4. Registre vendas de esterco

---

## 💡 Dicas de Uso

- 📊 Confira o dashboard diariamente
- 📝 Registre alimentação assim que ocorrer
- 💰 Lance transações no mesmo dia
- 🔄 Atualize peso dos animais semanalmente
- ♻️ Registre produção e venda de esterco

---

## 🎬 Primeiros Passos

```bash
# Depois de instalar, teste:

# 1. Crie sua conta
Acesse: http://localhost:3000/register

# 2. Cadastre um animal
Menu > Rebanho > + Adicionar Animal

# 3. Registre alimentação
Menu > Alimentação > + Novo Registro

# 4. Veja suas estatísticas
Menu > Dashboard
```

---

## 📊 Exemplo de Dados

Para testar o sistema com dados de exemplo:

```bash
cd backend
psql -U postgres -d farm_it -f migrations/seed_data_example.sql
```

**Importante:** Edite o arquivo SQL e substitua `user_id = 1` pelo ID do seu usuário.

---

## 🤝 Contribuindo

Contribuições são muito bem-vindas!

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença **ISC**.

---

## 🆘 Suporte

Encontrou algum problema? Veja nossa documentação:

- 📖 [Guia de Instalação](SETUP.md)
- 💡 [Guia de Uso](USAGE_GUIDE.md)
- ⚡ [Início Rápido](QUICK_START.md)

---

## 🌱 Impacto Ambiental

O Farm-IT promove:

- ♻️ **Reciclagem** de resíduos orgânicos
- 🌱 **Redução** de desperdício de ração
- 💚 **Sustentabilidade** na produção
- 📊 **Eficiência** no uso de recursos
- 🌍 **Consciência** ambiental

---

## ✨ Status do Projeto

<div align="center">

### ✅ PROJETO COMPLETO E FUNCIONAL

Todas as funcionalidades foram implementadas e testadas!

**Versão:** 1.0.0  
**Data:** Outubro 2025  
**Status:** Produção

</div>

---

<div align="center">

**Desenvolvido com 💚 para promover a sustentabilidade no campo**

*Farm-IT - Gestão Inteligente para o Futuro do Agronegócio*

---

🌾 🐄 ♻️ 💰 📊

</div>

