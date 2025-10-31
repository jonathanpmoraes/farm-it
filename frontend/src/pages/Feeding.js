import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { feedingService, animalsService } from '../services/api';
import './Common.css';

const Feeding = () => {
  const [records, setRecords] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [formData, setFormData] = useState({
    animal_id: '',
    date: new Date().toISOString().split('T')[0],
    feed_type: '',
    quantity: '',
    unit: 'kg',
    cost: '',
    notes: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [recordsRes, animalsRes] = await Promise.all([
        feedingService.getAll({}),
        animalsService.getAll({ status: 'ativo' }),
      ]);
      setRecords(recordsRes.data);
      setAnimals(animalsRes.data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingRecord) {
        await feedingService.update(editingRecord.id, formData);
      } else {
        await feedingService.create(formData);
      }
      loadData();
      closeModal();
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar registro');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja remover este registro?')) {
      try {
        await feedingService.delete(id);
        loadData();
      } catch (error) {
        console.error('Erro ao deletar:', error);
      }
    }
  };

  const openModal = (record = null) => {
    if (record) {
      setEditingRecord(record);
      setFormData({
        animal_id: record.animal_id || '',
        date: record.date,
        feed_type: record.feed_type,
        quantity: record.quantity,
        unit: record.unit,
        cost: record.cost || '',
        notes: record.notes || '',
      });
    } else {
      setEditingRecord(null);
      setFormData({
        animal_id: '',
        date: new Date().toISOString().split('T')[0],
        feed_type: '',
        quantity: '',
        unit: 'kg',
        cost: '',
        notes: '',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingRecord(null);
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
          <h1>Controle de Alimentação</h1>
          <p>Registros de alimentação e otimização de ração</p>
        </div>
        <Button onClick={() => openModal()}>+ Novo Registro</Button>
      </div>

      {records.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🌾</div>
          <h3>Nenhum registro de alimentação</h3>
          <p>Comece registrando a alimentação dos animais</p>
          <Button onClick={() => openModal()}>Adicionar Registro</Button>
        </div>
      ) : (
        <Card>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Animal</th>
                  <th>Tipo de Ração</th>
                  <th>Quantidade</th>
                  <th>Custo</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id}>
                    <td>{new Date(record.date).toLocaleDateString('pt-BR')}</td>
                    <td>{record.animal_identification || 'Geral'}</td>
                    <td>{record.feed_type}</td>
                    <td>{record.quantity} {record.unit}</td>
                    <td>{formatCurrency(record.cost)}</td>
                    <td>
                      <div className="table-actions">
                        <button 
                          className="btn-icon btn-edit"
                          onClick={() => openModal(record)}
                          title="Editar"
                        >
                          ✏️
                        </button>
                        <button 
                          className="btn-icon btn-delete"
                          onClick={() => handleDelete(record.id)}
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
              <h2>{editingRecord ? 'Editar Registro' : 'Novo Registro'}</h2>
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
                  <label>Animal (opcional)</label>
                  <select
                    value={formData.animal_id}
                    onChange={(e) => setFormData({...formData, animal_id: e.target.value})}
                  >
                    <option value="">Alimentação Geral</option>
                    {animals.map((animal) => (
                      <option key={animal.id} value={animal.id}>
                        {animal.identification} - {animal.type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Tipo de Ração</label>
                <input
                  type="text"
                  value={formData.feed_type}
                  onChange={(e) => setFormData({...formData, feed_type: e.target.value})}
                  required
                  placeholder="Ex: Ração para gado"
                />
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
                    placeholder="Ex: 50"
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
                    <option value="saco">Saco</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Custo (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.cost}
                  onChange={(e) => setFormData({...formData, cost: e.target.value})}
                  placeholder="Ex: 150.00"
                />
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
                  {editingRecord ? 'Atualizar' : 'Cadastrar'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feeding;

