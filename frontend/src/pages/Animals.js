import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { animalsService } from '../services/api';
import './Animals.css';

const Animals = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState(null);
  const [filter, setFilter] = useState('all');
  const [formData, setFormData] = useState({
    type: 'vaca',
    identification: '',
    breed: '',
    birth_date: '',
    gender: 'femea',
    weight: '',
    health_status: 'saudavel',
    notes: '',
  });

  useEffect(() => {
    loadAnimals();
  }, [filter]);

  const loadAnimals = async () => {
    try {
      const params = filter !== 'all' ? { type: filter } : {};
      const response = await animalsService.getAll(params);
      setAnimals(response.data);
    } catch (error) {
      console.error('Erro ao carregar animais:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAnimal) {
        await animalsService.update(editingAnimal.id, formData);
      } else {
        await animalsService.create(formData);
      }
      loadAnimals();
      closeModal();
    } catch (error) {
      console.error('Erro ao salvar animal:', error);
      alert('Erro ao salvar animal');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja remover este animal?')) {
      try {
        await animalsService.delete(id);
        loadAnimals();
      } catch (error) {
        console.error('Erro ao deletar animal:', error);
        alert('Erro ao deletar animal');
      }
    }
  };

  const openModal = (animal = null) => {
    if (animal) {
      setEditingAnimal(animal);
      setFormData({
        type: animal.type,
        identification: animal.identification,
        breed: animal.breed || '',
        birth_date: animal.birth_date || '',
        gender: animal.gender,
        weight: animal.weight || '',
        health_status: animal.health_status || 'saudavel',
        notes: animal.notes || '',
      });
    } else {
      setEditingAnimal(null);
      setFormData({
        type: 'vaca',
        identification: '',
        breed: '',
        birth_date: '',
        gender: 'femea',
        weight: '',
        health_status: 'saudavel',
        notes: '',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingAnimal(null);
  };

  if (loading) {
    return <div className="loading-spinner"><div className="spinner"></div></div>;
  }

  return (
    <div className="animals-page">
      <div className="page-header">
        <div>
          <h1>Gestão de Rebanho</h1>
          <p>Controle de vacas e porcos</p>
        </div>
        <Button onClick={() => openModal()}>+ Adicionar Animal</Button>
      </div>

      <div className="filter-bar">
        <button 
          className={filter === 'all' ? 'filter-active' : ''}
          onClick={() => setFilter('all')}
        >
          Todos
        </button>
        <button 
          className={filter === 'vaca' ? 'filter-active' : ''}
          onClick={() => setFilter('vaca')}
        >
          🐄 Vacas
        </button>
        <button 
          className={filter === 'porco' ? 'filter-active' : ''}
          onClick={() => setFilter('porco')}
        >
          🐷 Porcos
        </button>
      </div>

      {animals.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🐄</div>
          <h3>Nenhum animal cadastrado</h3>
          <p>Adicione seu primeiro animal ao rebanho</p>
          <Button onClick={() => openModal()}>Adicionar Animal</Button>
        </div>
      ) : (
        <div className="animals-grid">
          {animals.map((animal) => (
            <Card key={animal.id} className="animal-card">
              <div className="animal-header">
                <div className="animal-icon">
                  {animal.type === 'vaca' ? '🐄' : '🐷'}
                </div>
                <div className="animal-info">
                  <h3>{animal.identification}</h3>
                  <span className="animal-breed">{animal.breed || 'Raça não informada'}</span>
                </div>
              </div>
              <div className="animal-details">
                <div className="detail-item">
                  <span className="detail-label">Gênero:</span>
                  <span>{animal.gender}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Peso:</span>
                  <span>{animal.weight ? `${animal.weight} kg` : 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Saúde:</span>
                  <span className={`health-status health-${animal.health_status}`}>
                    {animal.health_status}
                  </span>
                </div>
              </div>
              {animal.notes && (
                <div className="animal-notes">{animal.notes}</div>
              )}
              <div className="animal-actions">
                <Button size="small" variant="outline" onClick={() => openModal(animal)}>
                  Editar
                </Button>
                <Button size="small" variant="danger" onClick={() => handleDelete(animal.id)}>
                  Remover
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingAnimal ? 'Editar Animal' : 'Novo Animal'}</h2>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Tipo</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    required
                  >
                    <option value="vaca">Vaca</option>
                    <option value="porco">Porco</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Identificação</label>
                  <input
                    type="text"
                    value={formData.identification}
                    onChange={(e) => setFormData({...formData, identification: e.target.value})}
                    required
                    placeholder="Ex: Vaca 001"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Raça</label>
                  <input
                    type="text"
                    value={formData.breed}
                    onChange={(e) => setFormData({...formData, breed: e.target.value})}
                    placeholder="Ex: Holandesa"
                  />
                </div>
                <div className="form-group">
                  <label>Data de Nascimento</label>
                  <input
                    type="date"
                    value={formData.birth_date}
                    onChange={(e) => setFormData({...formData, birth_date: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Gênero</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    required
                  >
                    <option value="macho">Macho</option>
                    <option value="femea">Fêmea</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Peso (kg)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                    placeholder="Ex: 450.5"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Estado de Saúde</label>
                <select
                  value={formData.health_status}
                  onChange={(e) => setFormData({...formData, health_status: e.target.value})}
                >
                  <option value="saudavel">Saudável</option>
                  <option value="tratamento">Em Tratamento</option>
                  <option value="quarentena">Quarentena</option>
                </select>
              </div>

              <div className="form-group">
                <label>Observações</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Informações adicionais sobre o animal"
                />
              </div>

              <div className="modal-actions">
                <Button type="button" variant="outline" onClick={closeModal}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingAnimal ? 'Atualizar' : 'Cadastrar'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Animals;

