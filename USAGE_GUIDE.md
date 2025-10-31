# Guia de Uso - Farm-IT

## 📱 Introdução

O Farm-IT é um sistema completo de gestão para pequenas propriedades pecuárias, focado em sustentabilidade e otimização de recursos. Este guia mostrará como usar cada funcionalidade do sistema.

---

## 🚀 Primeiros Passos

### 1. Criar sua Conta

1. Acesse `http://localhost:3000/register`
2. Preencha seus dados:
   - Nome completo
   - Email (será seu login)
   - Senha (mínimo 6 caracteres)
   - Telefone (opcional)
   - Nome da propriedade (opcional)
3. Clique em "Cadastrar"
4. Você será automaticamente logado no sistema

### 2. Conhecer o Dashboard

Após o login, você verá o Dashboard com:

- **Cards coloridos** com estatísticas principais
- **Gráficos e resumos** de cada módulo
- **Visão geral financeira** da propriedade

---

## 🐄 Gestão de Rebanho

### Cadastrar Animal

1. Vá em **Rebanho** no menu
2. Clique em **"+ Adicionar Animal"**
3. Preencha os dados:
   - **Tipo**: Vaca ou Porco
   - **Identificação**: Nome ou número do animal (ex: "Vaca 001")
   - **Raça**: Opcional (ex: "Holandesa", "Duroc")
   - **Data de Nascimento**: Opcional
   - **Gênero**: Macho ou Fêmea
   - **Peso**: Em quilogramas
   - **Estado de Saúde**: Saudável, Em Tratamento ou Quarentena
   - **Observações**: Notas adicionais
4. Clique em **"Cadastrar"**

### Filtrar Animais

Use os botões no topo:
- **Todos**: Mostra todos os animais
- **🐄 Vacas**: Apenas vacas
- **🐷 Porcos**: Apenas porcos

### Editar ou Remover Animal

- Clique em **"Editar"** no card do animal para atualizar informações
- Clique em **"Remover"** para deletar (confirmação necessária)

### Dicas

- Mantenha o peso atualizado regularmente
- Use o campo de observações para anotar tratamentos, vacinas, etc.
- Marque animais vendidos alterando o status para "Vendido"

---

## 🌾 Controle de Alimentação

### Registrar Alimentação

1. Vá em **Alimentação** no menu
2. Clique em **"+ Novo Registro"**
3. Preencha:
   - **Data**: Data da alimentação
   - **Animal**: Selecione um animal específico ou deixe em branco para "Alimentação Geral"
   - **Tipo de Ração**: Nome do alimento (ex: "Ração para gado leiteiro")
   - **Quantidade**: Valor numérico
   - **Unidade**: kg, Tonelada ou Saco
   - **Custo**: Valor em reais (opcional)
   - **Observações**: Notas adicionais
4. Clique em **"Cadastrar"**

### Visualizar Histórico

A tabela mostra:
- Data do registro
- Animal alimentado (ou "Geral")
- Tipo de ração
- Quantidade utilizada
- Custo total

### Gerenciar Estoque (Futuro)

O sistema permite controlar estoque de alimentos:
- Adicionar compras de ração ao estoque
- Baixar automaticamente ao registrar alimentação
- Alertas de estoque baixo

### Otimização

- Registre diariamente para ter dados precisos
- Analise os custos por animal para identificar otimizações
- Compare períodos para avaliar mudanças na alimentação

---

## ♻️ Comercialização de Esterco

### Registrar Venda

1. Vá em **Esterco** no menu
2. Clique em **"+ Nova Venda"**
3. Preencha:
   - **Data**: Data da venda
   - **Nome do Cliente**: Comprador
   - **Contato**: Telefone ou email
   - **Quantidade**: Volume vendido
   - **Unidade**: kg, Tonelada ou m³
   - **Preço por Unidade**: Valor unitário
   - **Status do Pagamento**: Pendente, Parcial ou Pago
   - **Observações**: Detalhes da venda
4. O sistema calcula automaticamente o **Total da Venda**
5. Clique em **"Registrar"**

### Acompanhar Vendas

A tabela mostra:
- Data da venda
- Cliente e contato
- Quantidade vendida
- Preço unitário e total
- Status do pagamento (com cores)

### Atualizar Status de Pagamento

1. Clique em **"Editar"** na venda
2. Altere o **Status do Pagamento**
3. Salve as alterações

### Benefícios

- **Receita adicional** com subproduto
- **Sustentabilidade** ao reciclar resíduos
- **Controle financeiro** de todas as vendas
- **Base de clientes** organizada

---

## 💰 Gestão Financeira

### Registrar Receita

1. Vá em **Financeiro** no menu
2. Clique em **"+ Nova Transação"**
3. Selecione **Tipo**: "Receita"
4. Preencha:
   - **Categoria**: Ex: "Venda de Gado", "Venda de Esterco"
   - **Descrição**: Detalhes da receita
   - **Valor**: Quantia recebida
   - **Forma de Pagamento**: Dinheiro, PIX, Transferência, etc.
   - **Observações**: Informações adicionais
5. Clique em **"Cadastrar"**

### Registrar Despesa

Mesmo processo, mas selecione **Tipo**: "Despesa"

Exemplos de categorias de despesas:
- Ração e Alimentação
- Medicamentos
- Manutenção
- Energia
- Água
- Mão de obra
- Equipamentos

### Visualizar Relatórios

No topo da página, veja:
- **Card verde**: Total de receitas
- **Card vermelho**: Total de despesas
- **Card azul**: Saldo (receitas - despesas)

### Filtrar Transações

Use os botões:
- **Todas**: Mostra tudo
- **💰 Receitas**: Apenas receitas
- **💸 Despesas**: Apenas despesas

### Análise Financeira

- Acompanhe mensalmente seu saldo
- Compare receitas vs despesas
- Identifique categorias com maior custo
- Planeje investimentos baseado em dados reais

---

## 👤 Perfil

### Atualizar Informações

1. Vá em **Perfil** no menu
2. Atualize:
   - Nome completo
   - Telefone
   - Nome da propriedade
3. Clique em **"Salvar Alterações"**

**Nota:** O email não pode ser alterado pois é usado como login.

### Informações da Conta

Veja:
- Data de criação da conta
- Última atualização do perfil

---

## 📊 Boas Práticas

### 1. Registros Diários

- ✅ Registre alimentação diariamente
- ✅ Atualize peso dos animais semanalmente
- ✅ Lance transações financeiras no mesmo dia

### 2. Organização

- ✅ Use identificações claras para animais (ex: "Vaca 001", "Porco A1")
- ✅ Padronize categorias financeiras
- ✅ Mantenha observações consistentes

### 3. Análise

- ✅ Revise o dashboard semanalmente
- ✅ Compare custos mês a mês
- ✅ Identifique oportunidades de otimização

### 4. Sustentabilidade

- ✅ Monitore produção de esterco
- ✅ Maximize vendas de subprodutos
- ✅ Reduza desperdício de ração através dos dados

---

## 📱 Uso Mobile

O Farm-IT é totalmente responsivo! Use no celular:

1. Acesse pelo navegador do celular
2. Todas as funcionalidades estão disponíveis
3. Menu hambúrguer (☰) no canto superior esquerdo
4. Interface otimizada para toque

### Dicas Mobile

- Adicione à tela inicial para acesso rápido
- Registre dados diretamente no campo
- Use o celular para consultas rápidas

---

## 🔐 Segurança

### Senha Segura

- Mínimo 6 caracteres
- Combine letras e números
- Não compartilhe sua senha

### Logout

Sempre faça logout ao usar computadores compartilhados:
1. Clique em **"Sair"** no canto superior direito

### Sessão

- Token de autenticação válido por 7 dias
- Após esse período, faça login novamente

---

## 💡 Dicas e Truques

### 1. Atalhos Rápidos

- Dashboard mostra cards clicáveis que levam direto para cada módulo
- Clique nos números para ver detalhes

### 2. Filtros

- Use filtros para análises específicas
- Combine diferentes filtros para insights detalhados

### 3. Notas e Observações

- Use o campo de observações para registrar detalhes importantes
- Isso ajuda a relembrar contextos específicos

### 4. Backup de Dados

- Exporte relatórios regularmente (funcionalidade futura)
- Mantenha registro de informações críticas

---

## 🆘 Precisa de Ajuda?

### Problemas Comuns

**Não consigo fazer login**
- Verifique se o email está correto
- Confirme a senha (mínimo 6 caracteres)
- Tente registrar novamente se esqueceu a senha

**Dados não aparecem**
- Recarregue a página (F5)
- Faça logout e login novamente
- Verifique sua conexão com internet

**Erro ao salvar**
- Preencha todos os campos obrigatórios
- Verifique formato de datas (dia/mês/ano)
- Verifique valores numéricos (use ponto para decimais)

---

## 🌟 Próximas Funcionalidades

Em desenvolvimento:
- 📊 Gráficos interativos
- 📄 Exportação de relatórios em PDF
- 📧 Alertas por email
- 📱 App mobile nativo
- 🔔 Notificações de lembretes
- 📈 Previsões e análises avançadas

---

**Aproveite o Farm-IT e otimize a gestão da sua propriedade! 🌾🐄💚**

