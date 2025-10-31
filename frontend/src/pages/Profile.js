import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/api';
import './Common.css';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    property_name: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        property_name: user.property_name || '',
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await authService.updateProfile(formData);
      updateUser(response.data.user);
      setMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' });
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'Erro ao atualizar perfil' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Meu Perfil</h1>
          <p>Gerencie suas informações pessoais</p>
        </div>
      </div>

      <div className="profile-container">
        <Card title="Informações Pessoais">
          <form onSubmit={handleSubmit} className="profile-form">
            {message.text && (
              <div className={`${message.type}-message`}>
                {message.text}
              </div>
            )}

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="input-disabled"
              />
              <small className="form-help">O email não pode ser alterado</small>
            </div>

            <div className="form-group">
              <label>Nome Completo</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                placeholder="Seu nome completo"
              />
            </div>

            <div className="form-group">
              <label>Telefone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="(00) 00000-0000"
              />
            </div>

            <div className="form-group">
              <label>Nome da Propriedade</label>
              <input
                type="text"
                value={formData.property_name}
                onChange={(e) => setFormData({...formData, property_name: e.target.value})}
                placeholder="Nome da sua fazenda/propriedade"
              />
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </form>
        </Card>

        <Card title="Informações da Conta">
          <div className="account-info">
            <div className="info-item">
              <span className="info-label">Membro desde:</span>
              <span className="info-value">
                {user?.created_at 
                  ? new Date(user.created_at).toLocaleDateString('pt-BR')
                  : '-'}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Última atualização:</span>
              <span className="info-value">
                {user?.updated_at 
                  ? new Date(user.updated_at).toLocaleDateString('pt-BR')
                  : '-'}
              </span>
            </div>
          </div>
        </Card>

        <Card title="Sobre o Farm-IT">
          <div className="about-content">
            <p>
              O Farm-IT é um sistema de gestão sustentável desenvolvido especialmente 
              para pequenas propriedades pecuárias. Nossa missão é ajudar produtores a:
            </p>
            <ul>
              <li>🌾 Fazer gestão eficiente dos recursos naturais</li>
              <li>♻️ Reduzir desperdícios através da otimização</li>
              <li>💰 Melhorar resultados financeiros</li>
              <li>🌱 Promover práticas sustentáveis</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;

