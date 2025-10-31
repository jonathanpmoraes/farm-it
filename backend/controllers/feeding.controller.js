const pool = require('../config/database');

// Listar registros de alimentação
exports.getAll = async (req, res) => {
  try {
    const { animal_id, start_date, end_date } = req.query;
    let query = `
      SELECT fr.*, a.identification as animal_identification, a.type as animal_type
      FROM feeding_records fr
      LEFT JOIN animals a ON fr.animal_id = a.id
      WHERE fr.user_id = $1
    `;
    const params = [req.user.id];

    if (animal_id) {
      query += ' AND fr.animal_id = $2';
      params.push(animal_id);
    }

    if (start_date) {
      const paramIndex = params.length + 1;
      query += ` AND fr.date >= $${paramIndex}`;
      params.push(start_date);
    }

    if (end_date) {
      const paramIndex = params.length + 1;
      query += ` AND fr.date <= $${paramIndex}`;
      params.push(end_date);
    }

    query += ' ORDER BY fr.date DESC, fr.created_at DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar alimentação:', error);
    res.status(500).json({ error: 'Erro ao buscar registros de alimentação.' });
  }
};

// Registrar alimentação
exports.create = async (req, res) => {
  try {
    const { animal_id, date, feed_type, quantity, unit, cost, notes } = req.body;

    const result = await pool.query(
      `INSERT INTO feeding_records (user_id, animal_id, date, feed_type, quantity, unit, cost, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [req.user.id, animal_id, date, feed_type, quantity, unit, cost, notes]
    );

    res.status(201).json({
      message: 'Alimentação registrada com sucesso!',
      record: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao registrar alimentação:', error);
    res.status(500).json({ error: 'Erro ao registrar alimentação.' });
  }
};

// Atualizar registro
exports.update = async (req, res) => {
  try {
    const { animal_id, date, feed_type, quantity, unit, cost, notes } = req.body;

    const result = await pool.query(
      `UPDATE feeding_records 
       SET animal_id = $1, date = $2, feed_type = $3, quantity = $4, 
           unit = $5, cost = $6, notes = $7, updated_at = CURRENT_TIMESTAMP
       WHERE id = $8 AND user_id = $9 RETURNING *`,
      [animal_id, date, feed_type, quantity, unit, cost, notes, req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Registro não encontrado.' });
    }

    res.json({
      message: 'Registro atualizado com sucesso!',
      record: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao atualizar alimentação:', error);
    res.status(500).json({ error: 'Erro ao atualizar alimentação.' });
  }
};

// Deletar registro
exports.delete = async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM feeding_records WHERE id = $1 AND user_id = $2 RETURNING *',
      [req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Registro não encontrado.' });
    }

    res.json({ message: 'Registro removido com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar alimentação:', error);
    res.status(500).json({ error: 'Erro ao deletar alimentação.' });
  }
};

// Estatísticas de alimentação
exports.getStats = async (req, res) => {
  try {
    const stats = await pool.query(
      `SELECT 
        COUNT(*) as total_registros,
        SUM(cost) as custo_total,
        AVG(cost) as custo_medio,
        SUM(quantity) as quantidade_total
       FROM feeding_records WHERE user_id = $1`,
      [req.user.id]
    );

    res.json(stats.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({ error: 'Erro ao buscar estatísticas.' });
  }
};

// Gerenciar estoque de alimentos
exports.getInventory = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM feed_inventory WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar estoque:', error);
    res.status(500).json({ error: 'Erro ao buscar estoque.' });
  }
};

exports.addToInventory = async (req, res) => {
  try {
    const { feed_name, quantity, unit, cost_per_unit, supplier, purchase_date, expiry_date, notes } = req.body;

    const result = await pool.query(
      `INSERT INTO feed_inventory (user_id, feed_name, quantity, unit, cost_per_unit, supplier, purchase_date, expiry_date, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [req.user.id, feed_name, quantity, unit, cost_per_unit, supplier, purchase_date, expiry_date, notes]
    );

    res.status(201).json({
      message: 'Item adicionado ao estoque!',
      item: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao adicionar ao estoque:', error);
    res.status(500).json({ error: 'Erro ao adicionar ao estoque.' });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const { feed_name, quantity, unit, cost_per_unit, supplier, purchase_date, expiry_date, notes } = req.body;

    const result = await pool.query(
      `UPDATE feed_inventory 
       SET feed_name = $1, quantity = $2, unit = $3, cost_per_unit = $4,
           supplier = $5, purchase_date = $6, expiry_date = $7, notes = $8,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $9 AND user_id = $10 RETURNING *`,
      [feed_name, quantity, unit, cost_per_unit, supplier, purchase_date, expiry_date, notes, req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item não encontrado.' });
    }

    res.json({
      message: 'Estoque atualizado com sucesso!',
      item: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao atualizar estoque:', error);
    res.status(500).json({ error: 'Erro ao atualizar estoque.' });
  }
};

exports.deleteFromInventory = async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM feed_inventory WHERE id = $1 AND user_id = $2 RETURNING *',
      [req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item não encontrado.' });
    }

    res.json({ message: 'Item removido do estoque!' });
  } catch (error) {
    console.error('Erro ao deletar do estoque:', error);
    res.status(500).json({ error: 'Erro ao deletar do estoque.' });
  }
};

