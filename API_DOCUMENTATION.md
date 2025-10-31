# Documentação da API - Farm-IT

## Base URL

```shell
http://localhost:5000/api
```

## Autenticação

A maioria dos endpoints requer autenticação via JWT token no header:

```json
Authorization: Bearer <token>
```

---

## 🔐 Autenticação (`/api/auth`)

### Registrar Usuário

**POST** `/auth/register`

**Body:**

```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123",
  "phone": "(11) 98765-4321",
  "property_name": "Fazenda Boa Vista"
}
```

**Response:** 201 Created

```json
{
  "message": "Usuário registrado com sucesso!",
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@example.com",
    "phone": "(11) 98765-4321",
    "property_name": "Fazenda Boa Vista"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login

**POST** `/auth/login`

**Body:**

```json
{
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Response:** 200 OK

```json
{
  "message": "Login realizado com sucesso!",
  "user": { ... },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Obter Perfil

**GET** `/auth/profile` 🔒

**Response:** 200 OK

```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@example.com",
  "phone": "(11) 98765-4321",
  "property_name": "Fazenda Boa Vista",
  "created_at": "2025-01-15T10:00:00.000Z"
}
```

### Atualizar Perfil

**PUT** `/auth/profile` 🔒

**Body:**

```json
{
  "name": "João Silva Santos",
  "phone": "(11) 98765-4321",
  "property_name": "Fazenda Nova Esperança"
}
```

---

## 🐄 Animais (`/api/animals`)

### Listar Animais

**GET** `/animals` 🔒

**Query Parameters:**

- `type`: `vaca` ou `porco` (opcional)
- `status`: `ativo`, `vendido`, `morto` (opcional)

**Response:** 200 OK

```json
[
  {
    "id": 1,
    "type": "vaca",
    "identification": "Vaca 001",
    "breed": "Holandesa",
    "birth_date": "2020-05-15",
    "gender": "femea",
    "weight": 450.50,
    "health_status": "saudavel",
    "status": "ativo",
    "notes": "Animal em excelente condição",
    "created_at": "2025-01-15T10:00:00.000Z"
  }
]
```

### Obter Animal por ID

**GET** `/animals/:id` 🔒

### Criar Animal

**POST** `/animals` 🔒

**Body:**

```json
{
  "type": "vaca",
  "identification": "Vaca 002",
  "breed": "Gir",
  "birth_date": "2021-03-10",
  "gender": "femea",
  "weight": 380.00,
  "health_status": "saudavel",
  "notes": "Recém adquirida"
}
```

### Atualizar Animal

**PUT** `/animals/:id` 🔒

### Deletar Animal

**DELETE** `/animals/:id` 🔒

### Estatísticas do Rebanho

**GET** `/animals/stats` 🔒

**Response:** 200 OK

```json
{
  "total": 25,
  "total_vacas": 15,
  "total_porcos": 10,
  "ativos": 23,
  "peso_medio": 425.75
}
```

---

## 🌾 Alimentação (`/api/feeding`)

### Listar Registros

**GET** `/feeding` 🔒

**Query Parameters:**

- `animal_id`: ID do animal (opcional)
- `start_date`: Data inicial (YYYY-MM-DD)
- `end_date`: Data final (YYYY-MM-DD)

**Response:** 200 OK

```json
[
  {
    "id": 1,
    "animal_id": 1,
    "animal_identification": "Vaca 001",
    "date": "2025-01-15",
    "feed_type": "Ração Concentrada",
    "quantity": 50.00,
    "unit": "kg",
    "cost": 150.00,
    "notes": "Alimentação matinal"
  }
]
```

### Criar Registro

**POST** `/feeding` 🔒

**Body:**

```json
{
  "animal_id": 1,
  "date": "2025-01-15",
  "feed_type": "Ração Concentrada",
  "quantity": 50.00,
  "unit": "kg",
  "cost": 150.00,
  "notes": "Alimentação matinal"
}
```

### Atualizar Registro

**PUT** `/feeding/:id` 🔒

### Deletar Registro

**DELETE** `/feeding/:id` 🔒

### Estatísticas

**GET** `/feeding/stats` 🔒

**Response:** 200 OK

```json
{
  "total_registros": 45,
  "custo_total": 6750.00,
  "custo_medio": 150.00,
  "quantidade_total": 2250.00
}
```

### Estoque de Alimentos

**GET** `/feeding/inventory` 🔒

**POST** `/feeding/inventory` 🔒

**PUT** `/feeding/inventory/:id` 🔒

**DELETE** `/feeding/inventory/:id` 🔒

---

## ♻️ Esterco (`/api/manure`)

### Produção

#### Listar Produção

**GET** `/manure/production` 🔒

**Query Parameters:**

- `start_date`: Data inicial (YYYY-MM-DD)
- `end_date`: Data final (YYYY-MM-DD)

#### Registrar Produção

**POST** `/manure/production` 🔒

**Body:**

```json
{
  "date": "2025-01-15",
  "quantity": 500.00,
  "unit": "kg",
  "quality": "alta",
  "storage_location": "Galpão 2",
  "notes": "Esterco curtido"
}
```

#### Atualizar Produção

**PUT** `/manure/production/:id` 🔒

#### Deletar Produção

**DELETE** `/manure/production/:id` 🔒

### Vendas

#### Listar Vendas

**GET** `/manure/sales` 🔒

**Query Parameters:**

- `start_date`: Data inicial
- `end_date`: Data final
- `payment_status`: `pendente`, `pago`, `parcial`

**Response:** 200 OK

```json
[
  {
    "id": 1,
    "date": "2025-01-15",
    "customer_name": "Agricola Silva",
    "customer_contact": "(11) 99999-9999",
    "quantity": 300.00,
    "unit": "kg",
    "price_per_unit": 2.50,
    "total_amount": 750.00,
    "payment_status": "pago",
    "notes": "Entrega realizada"
  }
]
```

#### Registrar Venda

**POST** `/manure/sales` 🔒

**Body:**

```json
{
  "date": "2025-01-15",
  "customer_name": "Agricola Silva",
  "customer_contact": "(11) 99999-9999",
  "quantity": 300.00,
  "unit": "kg",
  "price_per_unit": 2.50,
  "payment_status": "pago",
  "notes": "Entrega imediata"
}
```

#### Atualizar Venda

**PUT** `/manure/sales/:id` 🔒

#### Deletar Venda

**DELETE** `/manure/sales/:id` 🔒

#### Estatísticas

**GET** `/manure/stats` 🔒

**Response:** 200 OK

```json
{
  "production": {
    "total_produzido": 5000.00,
    "total_registros": 20
  },
  "sales": {
    "receita_total": 12500.00,
    "total_vendido": 4500.00,
    "total_vendas": 15,
    "vendas_pagas": 12,
    "vendas_pendentes": 3
  }
}
```

---

## 💰 Financeiro (`/api/financial`)

### Listar Transações

**GET** `/financial` 🔒

**Query Parameters:**

- `type`: `receita` ou `despesa`
- `category`: Categoria da transação
- `start_date`: Data inicial
- `end_date`: Data final

**Response:** 200 OK

```json
[
  {
    "id": 1,
    "date": "2025-01-15",
    "type": "receita",
    "category": "Venda de Esterco",
    "description": "Venda para Agricola Silva",
    "amount": 750.00,
    "payment_method": "pix",
    "notes": "Pagamento confirmado"
  }
]
```

### Obter Transação

**GET** `/financial/:id` 🔒

### Criar Transação

**POST** `/financial` 🔒

**Body:**

```json
{
  "date": "2025-01-15",
  "type": "despesa",
  "category": "Ração",
  "description": "Compra de ração concentrada",
  "amount": 500.00,
  "payment_method": "transferencia",
  "notes": "Fornecedor XYZ"
}
```

### Atualizar Transação

**PUT** `/financial/:id` 🔒

### Deletar Transação

**DELETE** `/financial/:id` 🔒

### Relatório Financeiro

**GET** `/financial/report` 🔒

**Query Parameters:**

- `start_date`: Data inicial (opcional)
- `end_date`: Data final (opcional)

**Response:** 200 OK

```json
{
  "summary": {
    "total_receitas": 15000.00,
    "total_despesas": 8500.00,
    "saldo": 6500.00,
    "total_transacoes": 45
  },
  "byCategory": [
    {
      "category": "Venda de Esterco",
      "type": "receita",
      "total": 12500.00,
      "quantidade": 15
    }
  ],
  "recentTransactions": [...]
}
```

### Estatísticas Mensais

**GET** `/financial/monthly` 🔒

**Response:** 200 OK

```json
[
  {
    "mes": "2025-01",
    "receitas": 15000.00,
    "despesas": 8500.00,
    "saldo": 6500.00
  }
]
```

---

## Códigos de Status HTTP

- `200 OK` - Requisição bem-sucedida
- `201 Created` - Recurso criado com sucesso
- `400 Bad Request` - Dados inválidos
- `401 Unauthorized` - Não autenticado ou token inválido
- `404 Not Found` - Recurso não encontrado
- `500 Internal Server Error` - Erro no servidor

## Formato de Erro

```json
{
  "error": "Mensagem de erro descritiva"
}
```

---

## Notas Importantes

1. **Datas**: Usar formato ISO (YYYY-MM-DD)
2. **Números decimais**: Usar ponto como separador (ex: 450.50)
3. **Token JWT**: Válido por 7 dias
4. **Valores monetários**: Em reais (BRL)

---

**Desenvolvido para Farm-IT v1.0.0**

