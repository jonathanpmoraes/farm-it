import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { financialService } from '../services/api';
import './Common.css';

const Financial = () => {
  const [transactions, setTransactions] = useState([]);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [filter, setFilter] = useState('all');
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'despesa',
    category: '',
    description: '',
    amount: '',
    payment_method: 'dinheiro',
    notes: '',
  });

  useEffect(() => {
    loadData();
  }, [filter]);

  const loadData = async () => {
    try {
      const params = filter !== 'all' ? { type: filter } : {};
      const [transactionsRes, reportRes] = await Promise.all([
        financialService.getAll(params),
        financialService.getReport({}),
      ]);
      setTransactions(transactionsRes.data);
      setReport(reportRes.data.summary);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTransaction) {
        await financialService.update(editingTransaction.id, formData);
      } else {
        await financialService.create(formData);
      }
      loadData();
      closeModal();
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar transação');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja remover esta transação?')) {
      try {
        await financialService.delete(id);
        loadData();
      } catch (error) {
        console.error('Erro ao deletar:', error);
      }
    }
  };

  const openModal = (transaction = null) => {
    if (transaction) {
      setEditingTransaction(transaction);
      setFormData({
        date: transaction.date,
        type: transaction.type,
        category: transaction.category,
        description: transaction.description,
        amount: transaction.amount,
        payment_method: transaction.payment_method || 'dinheiro',
        notes: transaction.notes || '',
      });
    } else {
      setEditingTransaction(null);
      setFormData({
        date: new Date().toISOString().split('T')[0],
        type: 'despesa',
        category: '',
        description: '',
        amount: '',
        payment_method: 'dinheiro',
        notes: '',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTransaction(null);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value || 0);
  };

  if (loading) {
    return <div className="loading-spinner"><div className="spinner"></div></div>;
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Gestão Financeira</h1>
          <p>Controle de receitas e despesas</p>
        </div>
        <Button onClick={() => openModal()}>+ Nova Transação</Button>
      </div>

      {report && (
        <div className="financial-cards">
          <div className="fin-card fin-card-income">
            <h3>Receitas</h3>
            <div className="fin-amount">{formatCurrency(report.total_receitas)}</div>
          </div>
          <div className="fin-card fin-card-expense">
            <h3>Despesas</h3>
            <div className="fin-amount">{formatCurrency(report.total_despesas)}</div>
          </div>
          <div className="fin-card fin-card-balance">
            <h3>Saldo</h3>
            <div className="fin-amount">{formatCurrency(report.saldo)}</div>
          </div>
        </div>
      )}

      <div className="filter-bar">
        <button 
          className={filter === 'all' ? 'filter-active' : ''}
          onClick={() => setFilter('all')}
        >
          Todas
        </button>
        <button 
          className={filter === 'receita' ? 'filter-active' : ''}
          onClick={() => setFilter('receita')}
        >
          💰 Receitas
        </button>
        <button 
          className={filter === 'despesa' ? 'filter-active' : ''}
          onClick={() => setFilter('despesa')}
        >
          💸 Despesas
        </button>
      </div>

      {transactions.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">💰</div>
          <h3>Nenhuma transação registrada</h3>
          <p>Comece registrando suas receitas e despesas</p>
          <Button onClick={() => openModal()}>Adicionar Transação</Button>
        </div>
      ) : (
        <Card>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Tipo</th>
                  <th>Categoria</th>
                  <th>Descrição</th>
                  <th>Valor</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{new Date(transaction.date).toLocaleDateString('pt-BR')}</td>
                    <td>
                      <span className={`type-badge type-${transaction.type}`}>
                        {transaction.type === 'receita' ? '💰' : '💸'} {transaction.type}
                      </span>
                    </td>
                    <td>{transaction.category}</td>
                    <td>{transaction.description}</td>
                    <td>
                      <span className={transaction.type === 'receita' ? 'text-success' : 'text-danger'}>
                        {transaction.type === 'receita' ? '+' : '-'} {formatCurrency(transaction.amount)}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button 
                          className="btn-icon btn-edit"
                          onClick={() => openModal(transaction)}
                          title="Editar"
                        >
                          ✏️
                        </button>
                        <button 
                          className="btn-icon btn-delete"
                          onClick={() => handleDelete(transaction.id)}
                          title="Deletar"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingTransaction ? 'Editar Transação' : 'Nova Transação'}</h2>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Data</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Tipo</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    required
                  >
                    <option value="receita">Receita</option>
                    <option value="despesa">Despesa</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Categoria</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                  placeholder="Ex: Venda de gado, Compra de ração, etc"
                />
              </div>

              <div className="form-group">
                <label>Descrição</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                  placeholder="Descrição detalhada da transação"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Valor (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    required
                    placeholder="Ex: 1500.00"
                  />
                </div>
                <div className="form-group">
                  <label>Forma de Pagamento</label>
                  <select
                    value={formData.payment_method}
                    onChange={(e) => setFormData({...formData, payment_method: e.target.value})}
                  >
                    <option value="dinheiro">Dinheiro</option>
                    <option value="pix">PIX</option>
                    <option value="transferencia">Transferência</option>
                    <option value="cartao">Cartão</option>
                    <option value="cheque">Cheque</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Observações</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Informações adicionais"
                />
              </div>

              <div className="modal-actions">
                <Button type="button" variant="outline" onClick={closeModal}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingTransaction ? 'Atualizar' : 'Cadastrar'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Financial;

