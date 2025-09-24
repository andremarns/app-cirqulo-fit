import React from 'react';
import styled from 'styled-components';
import { Trophy, Clock, Weight, Flame, Target, TrendingUp } from 'lucide-react';
import { User } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColors } from '../styles/theme';

interface UserStatsProps {
  user: User;
}

const Container = styled.div<{ theme: 'light' | 'dark' }>`
  background: ${props => getThemeColors(props.theme).card};
  border-radius: 16px;
  padding: 1.5rem;
  margin: 1rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid ${props => getThemeColors(props.theme).border};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Avatar = styled.div<{ level: number; theme: 'light' | 'dark' }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => {
    const colors = getThemeColors(props.theme);
    if (props.level >= 3) return `linear-gradient(135deg, ${colors.level3}, #f57c00)`;
    if (props.level >= 2) return `linear-gradient(135deg, ${colors.level2}, #1976d2)`;
    return `linear-gradient(135deg, ${colors.level1}, #388e3c)`;
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  margin-right: 1rem;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.h2<{ theme: 'light' | 'dark' }>`
  margin: 0 0 0.5rem 0;
  color: ${props => getThemeColors(props.theme).text.primary};
  font-size: 1.5rem;
`;

const LevelInfo = styled.div<{ theme: 'light' | 'dark' }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => getThemeColors(props.theme).text.secondary};
`;

const LevelBadge = styled.span<{ level: number; theme: 'light' | 'dark' }>`
  background: ${props => {
    const colors = getThemeColors(props.theme);
    if (props.level >= 3) return colors.level3;
    if (props.level >= 2) return colors.level2;
    return colors.level1;
  }};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const StatCard = styled.div<{ theme: 'light' | 'dark' }>`
  background: ${props => getThemeColors(props.theme).surface};
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  border: 1px solid ${props => getThemeColors(props.theme).border};
`;

const StatIcon = styled.div<{ theme: 'light' | 'dark' }>`
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
  color: ${props => getThemeColors(props.theme).primary};
`;

const StatValue = styled.div<{ theme: 'light' | 'dark' }>`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => getThemeColors(props.theme).text.primary};
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div<{ theme: 'light' | 'dark' }>`
  font-size: 0.8rem;
  color: ${props => getThemeColors(props.theme).text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;


export const UserStats: React.FC<UserStatsProps> = ({ user }) => {
  const { theme } = useTheme();

  const getLevelName = (level: number): string => {
    if (level >= 3) return 'Intermediário';
    if (level >= 2) return 'Aprendiz';
    return 'Iniciante';
  };

  const getLevelEmoji = (level: number): string => {
    if (level >= 3) return '🔥';
    if (level >= 2) return '💪';
    return '🌱';
  };

  return (
    <Container theme={theme}>
      <Header>
        <Avatar level={user.level} theme={theme}>
          {getLevelEmoji(user.level)}
        </Avatar>
        <UserInfo>
          <UserName theme={theme}>{user.name}</UserName>
          <LevelInfo theme={theme}>
            <LevelBadge level={user.level} theme={theme}>
              Nível {user.level} - {getLevelName(user.level)}
            </LevelBadge>
            <span>{user.experience} XP</span>
          </LevelInfo>
        </UserInfo>
      </Header>

      <StatsGrid>
        <StatCard theme={theme}>
          <StatIcon theme={theme}>
            <Trophy size={24} />
          </StatIcon>
          <StatValue theme={theme}>{user.stats.totalWorkouts}</StatValue>
          <StatLabel theme={theme}>Treinos</StatLabel>
        </StatCard>

        <StatCard theme={theme}>
          <StatIcon theme={theme}>
            <Clock size={24} />
          </StatIcon>
          <StatValue theme={theme}>{user.stats.totalTime}</StatValue>
          <StatLabel theme={theme}>Minutos</StatLabel>
        </StatCard>

        <StatCard theme={theme}>
          <StatIcon theme={theme}>
            <Weight size={24} />
          </StatIcon>
          <StatValue theme={theme}>{user.stats.totalWeight}</StatValue>
          <StatLabel theme={theme}>Kg Total</StatLabel>
        </StatCard>

        <StatCard theme={theme}>
          <StatIcon theme={theme}>
            <Flame size={24} />
          </StatIcon>
          <StatValue theme={theme}>{user.stats.currentStreak}</StatValue>
          <StatLabel theme={theme}>Sequência</StatLabel>
        </StatCard>

        <StatCard theme={theme}>
          <StatIcon theme={theme}>
            <Target size={24} />
          </StatIcon>
          <StatValue theme={theme}>{user.stats.longestStreak}</StatValue>
          <StatLabel theme={theme}>Melhor Sequência</StatLabel>
        </StatCard>

        <StatCard theme={theme}>
          <StatIcon theme={theme}>
            <TrendingUp size={24} />
          </StatIcon>
          <StatValue theme={theme}>{user.level}</StatValue>
          <StatLabel theme={theme}>Nível Atual</StatLabel>
        </StatCard>
      </StatsGrid>
    </Container>
  );
};
