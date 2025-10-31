const pool = require('../config/database');

// Listar transações
exports.getAll = async (req, res) => {
  try {
    const { type, category, start_date, end_date } = req.query;
    let query = 'SELECT * FROM financial_transactions WHERE user_id = $1';
    const params = [req.user.id];

    if (type) {
      query += ' AND type = $2';
      params.push(type);
    }

    if (category) {
      const paramIndex = params.length + 1;
      query += ` AND category = $${paramIndex}`;
      params.push(category);
    }

    if (start_date) {
      const paramIndex = params.length + 1;
      query += ` AND date >= $${paramIndex}`;
      params.push(start_date);
    }

    if (end_date) {
      const paramIndex = params.length + 1;
      query += ` AND date <= $${paramIndex}`;
      params.push(end_date);
    }

    query += ' ORDER BY date DESC, created_at DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar transações:', error);
    res.status(500).json({ error: 'Erro ao buscar transações.' });
  }
};

// Buscar transação específica
exports.getById = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM financial_transactions WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Transação não encontrada.' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar transação:', error);
    res.status(500).json({ error: 'Erro ao buscar transação.' });
  }
};

// Criar transação
exports.create = async (req, res) => {
  try {
    const {
      date,
      type,
      category,
      description,
      amount,
      payment_method,
      reference_id,
      reference_type,
      notes
    } = req.body;

    const result = await pool.query(
      `INSERT INTO financial_transactions 
       (user_id, date, type, category, description, amount, payment_method, reference_id, reference_type, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [req.user.id, date, type, category, description, amount, payment_method, reference_id, reference_type, notes]
    );

    res.status(201).json({
      message: 'Transação registrada com sucesso!',
      transaction: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao criar transação:', error);
    res.status(500).json({ error: 'Erro ao criar transação.' });
  }
};

// Atualizar transação
exports.update = async (req, res) => {
  try {
    const {
      date,
      type,
      category,
      description,
      amount,
      payment_method,
      reference_id,
      reference_type,
      notes
    } = req.body;

    const result = await pool.query(
      `UPDATE financial_transactions 
       SET date = $1, type = $2, category = $3, description = $4,
           amount = $5, payment_method = $6, reference_id = $7,
           reference_type = $8, notes = $9, updated_at = CURRENT_TIMESTAMP
       WHERE id = $10 AND user_id = $11 RETURNING *`,
      [date, type, category, description, amount, payment_method, reference_id, reference_type, notes, req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Transação não encontrada.' });
    }

    res.json({
      message: 'Transação atualizada com sucesso!',
      transaction: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao atualizar transação:', error);
    res.status(500).json({ error: 'Erro ao atualizar transação.' });
  }
};

// Deletar transação
exports.delete = async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM financial_transactions WHERE id = $1 AND user_id = $2 RETURNING *',
      [req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Transação não encontrada.' });
    }

    res.json({ message: 'Transação removida com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar transação:', error);
    res.status(500).json({ error: 'Erro ao deletar transação.' });
  }
};

// Relatório financeiro
exports.getReport = async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    let dateFilter = '';
    const params = [req.user.id];

    if (start_date) {
      dateFilter += ' AND date >= $2';
      params.push(start_date);
    }

    if (end_date) {
      const paramIndex = params.length + 1;
      dateFilter += ` AND date <= $${paramIndex}`;
      params.push(end_date);
    }

    // Resumo geral
    const summary = await pool.query(
      `SELECT 
        SUM(CASE WHEN type = 'receita' THEN amount ELSE 0 END) as total_receitas,
        SUM(CASE WHEN type = 'despesa' THEN amount ELSE 0 END) as total_despesas,
        SUM(CASE WHEN type = 'receita' THEN amount ELSE -amount END) as saldo,
        COUNT(*) as total_transacoes
       FROM financial_transactions WHERE user_id = $1${dateFilter}`,
      params
    );

    // Por categoria
    const byCategory = await pool.query(
      `SELECT 
        category,
        type,
        SUM(amount) as total,
        COUNT(*) as quantidade
       FROM financial_transactions 
       WHERE user_id = $1${dateFilter}
       GROUP BY category, type
       ORDER BY total DESC`,
      params
    );

    // Transações recentes
    const recentTransactions = await pool.query(
      `SELECT * FROM financial_transactions 
       WHERE user_id = $1${dateFilter}
       ORDER BY date DESC, created_at DESC
       LIMIT 10`,
      params
    );

    res.json({
      summary: summary.rows[0],
      byCategory: byCategory.rows,
      recentTransactions: recentTransactions.rows
    });
  } catch (error) {
    console.error('Erro ao gerar relatório:', error);
    res.status(500).json({ error: 'Erro ao gerar relatório.' });
  }
};

// Estatísticas mensais
exports.getMonthlyStats = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        TO_CHAR(date, 'YYYY-MM') as mes,
        SUM(CASE WHEN type = 'receita' THEN amount ELSE 0 END) as receitas,
        SUM(CASE WHEN type = 'despesa' THEN amount ELSE 0 END) as despesas,
        SUM(CASE WHEN type = 'receita' THEN amount ELSE -amount END) as saldo
       FROM financial_transactions 
       WHERE user_id = $1
       GROUP BY TO_CHAR(date, 'YYYY-MM')
       ORDER BY mes DESC
       LIMIT 12`,
      [req.user.id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar estatísticas mensais:', error);
    res.status(500).json({ error: 'Erro ao buscar estatísticas mensais.' });
  }
};

