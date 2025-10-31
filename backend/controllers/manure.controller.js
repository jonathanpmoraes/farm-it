const pool = require('../config/database');

// Listar produção de esterco
exports.getProduction = async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    let query = 'SELECT * FROM manure_production WHERE user_id = $1';
    const params = [req.user.id];

    if (start_date) {
      query += ' AND date >= $2';
      params.push(start_date);
    }

    if (end_date) {
      const paramIndex = params.length + 1;
      query += ` AND date <= $${paramIndex}`;
      params.push(end_date);
    }

    query += ' ORDER BY date DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar produção:', error);
    res.status(500).json({ error: 'Erro ao buscar produção de esterco.' });
  }
};

// Registrar produção
exports.createProduction = async (req, res) => {
  try {
    const { date, quantity, unit, quality, storage_location, notes } = req.body;

    const result = await pool.query(
      `INSERT INTO manure_production (user_id, date, quantity, unit, quality, storage_location, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [req.user.id, date, quantity, unit, quality, storage_location, notes]
    );

    res.status(201).json({
      message: 'Produção registrada com sucesso!',
      production: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao registrar produção:', error);
    res.status(500).json({ error: 'Erro ao registrar produção.' });
  }
};

// Atualizar produção
exports.updateProduction = async (req, res) => {
  try {
    const { date, quantity, unit, quality, storage_location, notes } = req.body;

    const result = await pool.query(
      `UPDATE manure_production 
       SET date = $1, quantity = $2, unit = $3, quality = $4,
           storage_location = $5, notes = $6, updated_at = CURRENT_TIMESTAMP
       WHERE id = $7 AND user_id = $8 RETURNING *`,
      [date, quantity, unit, quality, storage_location, notes, req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Registro não encontrado.' });
    }

    res.json({
      message: 'Produção atualizada com sucesso!',
      production: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao atualizar produção:', error);
    res.status(500).json({ error: 'Erro ao atualizar produção.' });
  }
};

// Deletar produção
exports.deleteProduction = async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM manure_production WHERE id = $1 AND user_id = $2 RETURNING *',
      [req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Registro não encontrado.' });
    }

    res.json({ message: 'Registro removido com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar produção:', error);
    res.status(500).json({ error: 'Erro ao deletar produção.' });
  }
};

// Listar vendas
exports.getSales = async (req, res) => {
  try {
    const { start_date, end_date, payment_status } = req.query;
    let query = 'SELECT * FROM manure_sales WHERE user_id = $1';
    const params = [req.user.id];

    if (start_date) {
      query += ' AND date >= $2';
      params.push(start_date);
    }

    if (end_date) {
      const paramIndex = params.length + 1;
      query += ` AND date <= $${paramIndex}`;
      params.push(end_date);
    }

    if (payment_status) {
      const paramIndex = params.length + 1;
      query += ` AND payment_status = $${paramIndex}`;
      params.push(payment_status);
    }

    query += ' ORDER BY date DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar vendas:', error);
    res.status(500).json({ error: 'Erro ao buscar vendas.' });
  }
};

// Registrar venda
exports.createSale = async (req, res) => {
  try {
    const {
      date,
      customer_name,
      customer_contact,
      quantity,
      unit,
      price_per_unit,
      payment_status,
      notes
    } = req.body;

    const total_amount = quantity * price_per_unit;

    const result = await pool.query(
      `INSERT INTO manure_sales 
       (user_id, date, customer_name, customer_contact, quantity, unit, price_per_unit, total_amount, payment_status, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [req.user.id, date, customer_name, customer_contact, quantity, unit, price_per_unit, total_amount, payment_status, notes]
    );

    res.status(201).json({
      message: 'Venda registrada com sucesso!',
      sale: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao registrar venda:', error);
    res.status(500).json({ error: 'Erro ao registrar venda.' });
  }
};

// Atualizar venda
exports.updateSale = async (req, res) => {
  try {
    const {
      date,
      customer_name,
      customer_contact,
      quantity,
      unit,
      price_per_unit,
      payment_status,
      notes
    } = req.body;

    const total_amount = quantity * price_per_unit;

    const result = await pool.query(
      `UPDATE manure_sales 
       SET date = $1, customer_name = $2, customer_contact = $3, quantity = $4,
           unit = $5, price_per_unit = $6, total_amount = $7, payment_status = $8,
           notes = $9, updated_at = CURRENT_TIMESTAMP
       WHERE id = $10 AND user_id = $11 RETURNING *`,
      [date, customer_name, customer_contact, quantity, unit, price_per_unit, total_amount, payment_status, notes, req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Venda não encontrada.' });
    }

    res.json({
      message: 'Venda atualizada com sucesso!',
      sale: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao atualizar venda:', error);
    res.status(500).json({ error: 'Erro ao atualizar venda.' });
  }
};

// Deletar venda
exports.deleteSale = async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM manure_sales WHERE id = $1 AND user_id = $2 RETURNING *',
      [req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Venda não encontrada.' });
    }

    res.json({ message: 'Venda removida com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar venda:', error);
    res.status(500).json({ error: 'Erro ao deletar venda.' });
  }
};

// Estatísticas
exports.getStats = async (req, res) => {
  try {
    const productionStats = await pool.query(
      `SELECT 
        SUM(quantity) as total_produzido,
        COUNT(*) as total_registros
       FROM manure_production WHERE user_id = $1`,
      [req.user.id]
    );

    const salesStats = await pool.query(
      `SELECT 
        SUM(total_amount) as receita_total,
        SUM(quantity) as total_vendido,
        COUNT(*) as total_vendas,
        COUNT(CASE WHEN payment_status = 'pago' THEN 1 END) as vendas_pagas,
        COUNT(CASE WHEN payment_status = 'pendente' THEN 1 END) as vendas_pendentes
       FROM manure_sales WHERE user_id = $1`,
      [req.user.id]
    );

    res.json({
      production: productionStats.rows[0],
      sales: salesStats.rows[0]
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({ error: 'Erro ao buscar estatísticas.' });
  }
};

