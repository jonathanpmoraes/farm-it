-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  property_name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de animais (rebanho)
CREATE TABLE IF NOT EXISTS animals (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL CHECK (type IN ('vaca', 'porco')),
  identification VARCHAR(100) NOT NULL,
  breed VARCHAR(100),
  birth_date DATE,
  gender VARCHAR(20) CHECK (gender IN ('macho', 'femea')),
  weight DECIMAL(10, 2),
  health_status VARCHAR(50) DEFAULT 'saudavel',
  notes TEXT,
  status VARCHAR(20) DEFAULT 'ativo' CHECK (status IN ('ativo', 'vendido', 'morto')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de controle de alimentação
CREATE TABLE IF NOT EXISTS feeding_records (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  animal_id INTEGER REFERENCES animals(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  feed_type VARCHAR(100) NOT NULL,
  quantity DECIMAL(10, 2) NOT NULL,
  unit VARCHAR(20) NOT NULL,
  cost DECIMAL(10, 2),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de estoque de alimentos/insumos
CREATE TABLE IF NOT EXISTS feed_inventory (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  feed_name VARCHAR(100) NOT NULL,
  quantity DECIMAL(10, 2) NOT NULL,
  unit VARCHAR(20) NOT NULL,
  cost_per_unit DECIMAL(10, 2),
  supplier VARCHAR(255),
  purchase_date DATE,
  expiry_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de produção de esterco
CREATE TABLE IF NOT EXISTS manure_production (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  quantity DECIMAL(10, 2) NOT NULL,
  unit VARCHAR(20) NOT NULL,
  quality VARCHAR(50),
  storage_location VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de vendas de esterco
CREATE TABLE IF NOT EXISTS manure_sales (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_contact VARCHAR(100),
  quantity DECIMAL(10, 2) NOT NULL,
  unit VARCHAR(20) NOT NULL,
  price_per_unit DECIMAL(10, 2) NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  payment_status VARCHAR(50) DEFAULT 'pendente' CHECK (payment_status IN ('pendente', 'pago', 'parcial')),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de transações financeiras
CREATE TABLE IF NOT EXISTS financial_transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('receita', 'despesa')),
  category VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(50),
  reference_id INTEGER,
  reference_type VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_animals_user_id ON animals(user_id);
CREATE INDEX IF NOT EXISTS idx_animals_type ON animals(type);
CREATE INDEX IF NOT EXISTS idx_feeding_user_id ON feeding_records(user_id);
CREATE INDEX IF NOT EXISTS idx_feeding_animal_id ON feeding_records(animal_id);
CREATE INDEX IF NOT EXISTS idx_feeding_date ON feeding_records(date);
CREATE INDEX IF NOT EXISTS idx_manure_sales_user_id ON manure_sales(user_id);
CREATE INDEX IF NOT EXISTS idx_financial_user_id ON financial_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_financial_date ON financial_transactions(date);
CREATE INDEX IF NOT EXISTS idx_financial_type ON financial_transactions(type);

