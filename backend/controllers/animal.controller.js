const pool = require('../config/database');

// Listar todos os animais do usuário
exports.getAll = async (req, res) => {
  try {
    const { type, status } = req.query;
    let query = 'SELECT * FROM animals WHERE user_id = $1';
    const params = [req.user.id];

    if (type) {
      query += ' AND type = $2';
      params.push(type);
    }

    if (status) {
      const paramIndex = params.length + 1;
      query += ` AND status = $${paramIndex}`;
      params.push(status);
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar animais:', error);
    res.status(500).json({ error: 'Erro ao buscar animais.' });
  }
};

// Buscar um animal específico
exports.getById = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM animals WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Animal não encontrado.' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar animal:', error);
    res.status(500).json({ error: 'Erro ao buscar animal.' });
  }
};

// Cadastrar novo animal
exports.create = async (req, res) => {
  try {
    const {
      type,
      identification,
      breed,
      birth_date,
      gender,
      weight,
      health_status,
      notes
    } = req.body;

    const result = await pool.query(
      `INSERT INTO animals (user_id, type, identification, breed, birth_date, gender, weight, health_status, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [req.user.id, type, identification, breed, birth_date, gender, weight, health_status, notes]
    );

    res.status(201).json({
      message: 'Animal cadastrado com sucesso!',
      animal: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao cadastrar animal:', error);
    res.status(500).json({ error: 'Erro ao cadastrar animal.' });
  }
};

// Atualizar animal
exports.update = async (req, res) => {
  try {
    const {
      type,
      identification,
      breed,
      birth_date,
      gender,
      weight,
      health_status,
      status,
      notes
    } = req.body;

    const result = await pool.query(
      `UPDATE animals 
       SET type = $1, identification = $2, breed = $3, birth_date = $4, 
           gender = $5, weight = $6, health_status = $7, status = $8, notes = $9,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $10 AND user_id = $11 RETURNING *`,
      [type, identification, breed, birth_date, gender, weight, health_status, status, notes, req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Animal não encontrado.' });
    }

    res.json({
      message: 'Animal atualizado com sucesso!',
      animal: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao atualizar animal:', error);
    res.status(500).json({ error: 'Erro ao atualizar animal.' });
  }
};

// Deletar animal
exports.delete = async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM animals WHERE id = $1 AND user_id = $2 RETURNING *',
      [req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Animal não encontrado.' });
    }

    res.json({ message: 'Animal removido com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar animal:', error);
    res.status(500).json({ error: 'Erro ao deletar animal.' });
  }
};

// Estatísticas do rebanho
exports.getStats = async (req, res) => {
  try {
    const stats = await pool.query(
      `SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN type = 'vaca' THEN 1 END) as total_vacas,
        COUNT(CASE WHEN type = 'porco' THEN 1 END) as total_porcos,
        COUNT(CASE WHEN status = 'ativo' THEN 1 END) as ativos,
        AVG(weight) as peso_medio
       FROM animals WHERE user_id = $1`,
      [req.user.id]
    );

    res.json(stats.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({ error: 'Erro ao buscar estatísticas.' });
  }
};

