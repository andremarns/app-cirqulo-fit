import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { User, Settings, LogOut, Edit3, Save, X, Trophy, Target, Clock, Weight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColors } from '../styles/theme';
import { UserProfile } from '../types/auth';
import { authService } from '../services/authService';

const Container = styled.div<{ theme: 'light' | 'dark' }>`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const Header = styled.div<{ theme: 'light' | 'dark' }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${props => getThemeColors(props.theme).border};
`;

const Title = styled.h1<{ theme: 'light' | 'dark' }>`
  color: ${props => getThemeColors(props.theme).text.primary};
  font-size: 2rem;
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button<{ theme: 'light' | 'dark'; variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, ${getThemeColors(props.theme).primary} 0%, ${getThemeColors(props.theme).secondary} 100%);
          color: white;
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          }
        `;
      case 'danger':
        return `
          background: #ff4757;
          color: white;
          &:hover {
            background: #ff3742;
            transform: translateY(-2px);
          }
        `;
      default:
        return `
          background: ${getThemeColors(props.theme).card};
          color: ${getThemeColors(props.theme).text.primary};
          border: 1px solid ${getThemeColors(props.theme).border};
          &:hover {
            background: ${getThemeColors(props.theme).border};
          }
        `;
    }
  }}
`;

const ProfileSection = styled.div<{ theme: 'light' | 'dark' }>`
  background: ${props => getThemeColors(props.theme).card};
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid ${props => getThemeColors(props.theme).border};
`;

const SectionTitle = styled.h2<{ theme: 'light' | 'dark' }>`
  color: ${props => getThemeColors(props.theme).text.primary};
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ProfileCard = styled.div<{ theme: 'light' | 'dark' }>`
  background: ${props => getThemeColors(props.theme).background};
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid ${props => getThemeColors(props.theme).border};
`;

const CardTitle = styled.h3<{ theme: 'light' | 'dark' }>`
  color: ${props => getThemeColors(props.theme).text.primary};
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const InfoLabel = styled.span<{ theme: 'light' | 'dark' }>`
  color: ${props => getThemeColors(props.theme).text.secondary};
  font-weight: 500;
`;

const InfoValue = styled.span<{ theme: 'light' | 'dark' }>`
  color: ${props => getThemeColors(props.theme).text.primary};
  font-weight: 600;
`;

const Input = styled.input<{ theme: 'light' | 'dark' }>`
  padding: 0.5rem;
  border: 1px solid ${props => getThemeColors(props.theme).border};
  border-radius: 8px;
  background: ${props => getThemeColors(props.theme).background};
  color: ${props => getThemeColors(props.theme).text.primary};
  font-size: 1rem;
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${props => getThemeColors(props.theme).primary};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const StatCard = styled.div<{ theme: 'light' | 'dark' }>`
  background: ${props => getThemeColors(props.theme).background};
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  border: 1px solid ${props => getThemeColors(props.theme).border};
`;

const StatIcon = styled.div<{ color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0.5rem;
  color: white;
`;

const StatValue = styled.div<{ theme: 'light' | 'dark' }>`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => getThemeColors(props.theme).text.primary};
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div<{ theme: 'light' | 'dark' }>`
  font-size: 0.9rem;
  color: ${props => getThemeColors(props.theme).text.secondary};
`;

export const UserPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    username: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileData = await authService.getUserProfile();
        setProfile(profileData);
        setEditData({
          name: profileData.user.name,
          username: profileData.user.username,
        });
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      loadProfile();
    }
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      name: profile?.user.name || '',
      username: profile?.user.username || '',
    });
  };

  const handleSave = async () => {
    try {
      const updatedUser = await authService.updateProfile(editData);
      if (profile) {
        setProfile({
          ...profile,
          user: updatedUser,
        });
      }
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (isLoading) {
    return (
      <Container theme={theme}>
        <div>Carregando...</div>
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container theme={theme}>
        <div>Erro ao carregar perfil</div>
      </Container>
    );
  }

  return (
    <Container theme={theme}>
      <Header theme={theme}>
        <Title theme={theme}>Meu Perfil</Title>
        <HeaderActions>
          <Button theme={theme} variant="secondary" onClick={handleLogout}>
            <LogOut size={20} />
            Sair
          </Button>
        </HeaderActions>
      </Header>

      <ProfileSection theme={theme}>
        <SectionTitle theme={theme}>
          <User size={24} />
          Informações Pessoais
        </SectionTitle>
        
        <ProfileGrid>
          <ProfileCard theme={theme}>
            <CardTitle theme={theme}>Dados Básicos</CardTitle>
            
            <InfoRow>
              <InfoLabel theme={theme}>Nome:</InfoLabel>
              {isEditing ? (
                <Input
                  theme={theme}
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                />
              ) : (
                <InfoValue theme={theme}>{profile.user.name}</InfoValue>
              )}
            </InfoRow>
            
            <InfoRow>
              <InfoLabel theme={theme}>Username:</InfoLabel>
              {isEditing ? (
                <Input
                  theme={theme}
                  value={editData.username}
                  onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                />
              ) : (
                <InfoValue theme={theme}>@{profile.user.username}</InfoValue>
              )}
            </InfoRow>
            
            <InfoRow>
              <InfoLabel theme={theme}>Email:</InfoLabel>
              <InfoValue theme={theme}>{profile.user.email}</InfoValue>
            </InfoRow>
            
            <InfoRow>
              <InfoLabel theme={theme}>Nível:</InfoLabel>
              <InfoValue theme={theme}>{profile.user.level}</InfoValue>
            </InfoRow>
            
            <InfoRow>
              <InfoLabel theme={theme}>Experiência:</InfoLabel>
              <InfoValue theme={theme}>{profile.user.experience} XP</InfoValue>
            </InfoRow>

            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              {isEditing ? (
                <>
                  <Button theme={theme} variant="primary" onClick={handleSave}>
                    <Save size={16} />
                    Salvar
                  </Button>
                  <Button theme={theme} variant="secondary" onClick={handleCancel}>
                    <X size={16} />
                    Cancelar
                  </Button>
                </>
              ) : (
                <Button theme={theme} variant="primary" onClick={handleEdit}>
                  <Edit3 size={16} />
                  Editar
                </Button>
              )}
            </div>
          </ProfileCard>

          <ProfileCard theme={theme}>
            <CardTitle theme={theme}>Estatísticas</CardTitle>
            <StatsGrid>
              <StatCard theme={theme}>
                <StatIcon color="#4caf50">
                  <Target size={20} />
                </StatIcon>
                <StatValue theme={theme}>{profile.stats.total_workouts}</StatValue>
                <StatLabel theme={theme}>Treinos</StatLabel>
              </StatCard>
              
              <StatCard theme={theme}>
                <StatIcon color="#2196f3">
                  <Clock size={20} />
                </StatIcon>
                <StatValue theme={theme}>{profile.stats.total_time}</StatValue>
                <StatLabel theme={theme}>Minutos</StatLabel>
              </StatCard>
              
              <StatCard theme={theme}>
                <StatIcon color="#ff9800">
                  <Weight size={20} />
                </StatIcon>
                <StatValue theme={theme}>{profile.stats.total_weight}</StatValue>
                <StatLabel theme={theme}>Peso Total</StatLabel>
              </StatCard>
              
              <StatCard theme={theme}>
                <StatIcon color="#9c27b0">
                  <Trophy size={20} />
                </StatIcon>
                <StatValue theme={theme}>{profile.stats.current_streak}</StatValue>
                <StatLabel theme={theme}>Sequência</StatLabel>
              </StatCard>
            </StatsGrid>
          </ProfileCard>
        </ProfileGrid>
      </ProfileSection>
    </Container>
  );
};
