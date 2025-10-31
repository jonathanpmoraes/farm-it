import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { manureService } from '../services/api';
import './Common.css';

const Manure = () => {
  const [activeTab, setActiveTab] = useState('sales');
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSale, setEditingSale] = useState(null);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    customer_name: '',
    customer_contact: '',
    quantity: '',
    unit: 'kg',
    price_per_unit: '',
    payment_status: 'pendente',
    notes: '',
  });

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {
    try {
      const response = await manureService.getSales({});
      setSales(response.data);
    } catch (error) {
      console.error('Erro ao carregar vendas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSale) {
        await manureService.updateSale(editingSale.id, formData);
      } else {
        await manureService.createSale(formData);
      }
      loadSales();
      closeModal();
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar venda');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja remover esta venda?')) {
      try {
        await manureService.deleteSale(id);
        loadSales();
      } catch (error) {
        console.error('Erro ao deletar:', error);
      }
    }
  };

  const openModal = (sale = null) => {
    if (sale) {
      setEditingSale(sale);
      setFormData({
        date: sale.date,
        customer_name: sale.customer_name,
        customer_contact: sale.customer_contact || '',
        quantity: sale.quantity,
        unit: sale.unit,
        price_per_unit: sale.price_per_unit,
        payment_status: sale.payment_status,
        notes: sale.notes || '',
      });
    } else {
      setEditingSale(null);
      setFormData({
        date: new Date().toISOString().split('T')[0],
        customer_name: '',
        customer_contact: '',
        quantity: '',
        unit: 'kg',
        price_per_unit: '',
        payment_status: 'pendente',
        notes: '',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingSale(null);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value || 0);
  };

  const getPaymentStatusColor = (status) => {
    const colors = {
      pago: 'success',
      pendente: 'warning',
      parcial: 'info',
    };
    return colors[status] || 'default';
  };

  if (loading) {
    return <div className="loading-spinner"><div className="spinner"></div></div>;
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Comercialização de Esterco</h1>
          <p>Gestão de vendas de esterco como subproduto</p>
        </div>
        <Button onClick={() => openModal()}>+ Nova Venda</Button>
      </div>

      {sales.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">♻️</div>
          <h3>Nenhuma venda registrada</h3>
          <p>Comece registrando vendas de esterco</p>
          <Button onClick={() => openModal()}>Registrar Venda</Button>
        </div>
      ) : (
        <Card>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Cliente</th>
                  <th>Contato</th>
                  <th>Quantidade</th>
                  <th>Preço/Un.</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.id}>
                    <td>{new Date(sale.date).toLocaleDateString('pt-BR')}</td>
                    <td>{sale.customer_name}</td>
                    <td>{sale.customer_contact || '-'}</td>
                    <td>{sale.quantity} {sale.unit}</td>
                    <td>{formatCurrency(sale.price_per_unit)}</td>
                    <td><strong>{formatCurrency(sale.total_amount)}</strong></td>
                    <td>
                      <span className={`status-badge status-${getPaymentStatusColor(sale.payment_status)}`}>
                        {sale.payment_status}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button 
                          className="btn-icon btn-edit"
                          onClick={() => openModal(sale)}
                          title="Editar"
                        >
                          ✏️
                        </button>
                        <button 
                          className="btn-icon btn-delete"
                          onClick={() => handleDelete(sale.id)}
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
              <h2>{editingSale ? 'Editar Venda' : 'Nova Venda'}</h2>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>Data</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Nome do Cliente</label>
                  <input
                    type="text"
                    value={formData.customer_name}
                    onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                    required
                    placeholder="Nome do comprador"
                  />
                </div>
                <div className="form-group">
                  <label>Contato</label>
                  <input
                    type="text"
                    value={formData.customer_contact}
                    onChange={(e) => setFormData({...formData, customer_contact: e.target.value})}
                    placeholder="Telefone ou email"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Quantidade</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    required
                    placeholder="Ex: 500"
                  />
                </div>
                <div className="form-group">
                  <label>Unidade</label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({...formData, unit: e.target.value})}
                  >
                    <option value="kg">kg</option>
                    <option value="ton">Tonelada</option>
                    <option value="m3">m³</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Preço por Unidade (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price_per_unit}
                  onChange={(e) => setFormData({...formData, price_per_unit: e.target.value})}
                  required
                  placeholder="Ex: 2.50"
                />
              </div>

              <div className="form-group">
                <label>Status do Pagamento</label>
                <select
                  value={formData.payment_status}
                  onChange={(e) => setFormData({...formData, payment_status: e.target.value})}
                >
                  <option value="pendente">Pendente</option>
                  <option value="parcial">Parcial</option>
                  <option value="pago">Pago</option>
                </select>
              </div>

              <div className="form-group">
                <label>Observações</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Informações adicionais sobre a venda"
                />
              </div>

              <div className="form-info">
                <strong>Total da Venda:</strong> 
                {formatCurrency((formData.quantity || 0) * (formData.price_per_unit || 0))}
              </div>

              <div className="modal-actions">
                <Button type="button" variant="outline" onClick={closeModal}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingSale ? 'Atualizar' : 'Registrar'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manure;

