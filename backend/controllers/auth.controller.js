const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

// Registrar novo usuário
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, property_name } = req.body;

    // Verificar se o usuário já existe
    const userExists = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'Email já cadastrado.' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserir usuário no banco
    const result = await pool.query(
      'INSERT INTO users (name, email, password, phone, property_name) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, phone, property_name',
      [name, email, hashedPassword, phone, property_name]
    );

    const user = result.rows[0];

    // Gerar token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Usuário registrado com sucesso!',
      user,
      token
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ error: 'Erro ao registrar usuário.' });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuário
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const user = result.rows[0];

    // Verificar senha
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Remover senha da resposta
    delete user.password;

    res.json({
      message: 'Login realizado com sucesso!',
      user,
      token
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro ao fazer login.' });
  }
};

// Obter perfil do usuário
exports.getProfile = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, phone, property_name, created_at FROM users WHERE id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({ error: 'Erro ao buscar perfil.' });
  }
};

// Atualizar perfil
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, property_name } = req.body;

    const result = await pool.query(
      'UPDATE users SET name = $1, phone = $2, property_name = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING id, name, email, phone, property_name',
      [name, phone, property_name, req.user.id]
    );

    res.json({
      message: 'Perfil atualizado com sucesso!',
      user: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({ error: 'Erro ao atualizar perfil.' });
  }
};

