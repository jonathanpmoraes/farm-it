import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { animalsService, feedingService, manureService, financialService } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    animals: null,
    feeding: null,
    manure: null,
    financial: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [animalsData, feedingData, manureData, financialData] = await Promise.all([
        animalsService.getStats(),
        feedingService.getStats(),
        manureService.getStats(),
        financialService.getReport({}),
      ]);

      setStats({
        animals: animalsData.data,
        feeding: feedingData.data,
        manure: manureData.data,
        financial: financialData.data.summary,
      });
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value || 0);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Visão geral da sua propriedade</p>
      </div>

      <div className="stats-grid">
        <Link to="/animals" className="stat-card stat-card-animals">
          <div className="stat-icon">🐄</div>
          <div className="stat-content">
            <h3>Rebanho</h3>
            <div className="stat-value">{stats.animals?.total || 0}</div>
            <div className="stat-details">
              <span>{stats.animals?.total_vacas || 0} vacas</span>
              <span>{stats.animals?.total_porcos || 0} porcos</span>
            </div>
          </div>
        </Link>

        <Link to="/feeding" className="stat-card stat-card-feeding">
          <div className="stat-icon">🌾</div>
          <div className="stat-content">
            <h3>Alimentação</h3>
            <div className="stat-value">{formatCurrency(stats.feeding?.custo_total)}</div>
            <div className="stat-details">
              <span>Custo total</span>
            </div>
          </div>
        </Link>

        <Link to="/manure" className="stat-card stat-card-manure">
          <div className="stat-icon">♻️</div>
          <div className="stat-content">
            <h3>Esterco</h3>
            <div className="stat-value">{formatCurrency(stats.manure?.sales?.receita_total)}</div>
            <div className="stat-details">
              <span>{stats.manure?.sales?.total_vendas || 0} vendas</span>
            </div>
          </div>
        </Link>

        <Link to="/financial" className="stat-card stat-card-financial">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Saldo</h3>
            <div className="stat-value">{formatCurrency(stats.financial?.saldo)}</div>
            <div className="stat-details">
              <span className="stat-positive">
                +{formatCurrency(stats.financial?.total_receitas)}
              </span>
              <span className="stat-negative">
                -{formatCurrency(stats.financial?.total_despesas)}
              </span>
            </div>
          </div>
        </Link>
      </div>

      <div className="dashboard-grid">
        <Card title="Resumo do Rebanho">
          <div className="summary-list">
            <div className="summary-item">
              <span className="summary-label">Total de animais:</span>
              <span className="summary-value">{stats.animals?.total || 0}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Animais ativos:</span>
              <span className="summary-value">{stats.animals?.ativos || 0}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Peso médio:</span>
              <span className="summary-value">
                {parseFloat(stats.animals?.peso_medio || 0).toFixed(2)} kg
              </span>
            </div>
          </div>
        </Card>

        <Card title="Gestão de Esterco">
          <div className="summary-list">
            <div className="summary-item">
              <span className="summary-label">Total produzido:</span>
              <span className="summary-value">
                {parseFloat(stats.manure?.production?.total_produzido || 0).toFixed(2)} kg
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Total vendido:</span>
              <span className="summary-value">
                {parseFloat(stats.manure?.sales?.total_vendido || 0).toFixed(2)} kg
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Receita total:</span>
              <span className="summary-value stat-positive">
                {formatCurrency(stats.manure?.sales?.receita_total)}
              </span>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Resumo Financeiro">
        <div className="financial-summary">
          <div className="financial-item financial-income">
            <h4>Receitas</h4>
            <div className="financial-amount">
              {formatCurrency(stats.financial?.total_receitas)}
            </div>
          </div>
          <div className="financial-item financial-expense">
            <h4>Despesas</h4>
            <div className="financial-amount">
              {formatCurrency(stats.financial?.total_despesas)}
            </div>
          </div>
          <div className="financial-item financial-balance">
            <h4>Saldo</h4>
            <div className="financial-amount">
              {formatCurrency(stats.financial?.saldo)}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;

