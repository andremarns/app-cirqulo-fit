import React from 'react';
import styled from 'styled-components';
import { Play, BarChart3, Trophy, Settings } from 'lucide-react';
import { useWorkout } from '../contexts/WorkoutContext';
import { useTheme } from '../contexts/ThemeContext';
import { UserStats } from '../components/UserStats';
import { ProgressBar } from '../components/ProgressBar';
import { ThemeToggle } from '../components/ThemeToggle';
import { getThemeColors } from '../styles/theme';

const Container = styled.div<{ theme: 'light' | 'dark' }>`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const Header = styled.div<{ theme: 'light' | 'dark' }>`
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  padding-top: 3rem;
  
  @media (max-width: 768px) {
    padding-top: 4rem;
  }
`;

const ThemeToggleContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    top: 0.5rem;
    right: 0.5rem;
    flex-direction: column;
    gap: 0.25rem;
  }
`;

const ThemeLabel = styled.span<{ theme: 'light' | 'dark' }>`
  font-size: 0.9rem;
  color: ${props => getThemeColors(props.theme).text.secondary};
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Title = styled.h1<{ theme: 'light' | 'dark' }>`
  font-size: 2.5rem;
  color: ${props => getThemeColors(props.theme).text.primary};
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, ${props => getThemeColors(props.theme).primary} 0%, ${props => getThemeColors(props.theme).secondary} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-top: 1rem;
  }
`;

const Subtitle = styled.p<{ theme: 'light' | 'dark' }>`
  font-size: 1.2rem;
  color: ${props => getThemeColors(props.theme).text.secondary};
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ActionCard = styled.div<{ theme: 'light' | 'dark' }>`
  background: ${props => getThemeColors(props.theme).card};
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid ${props => getThemeColors(props.theme).border};
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

const ActionIcon = styled.div<{ color: string }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
  font-size: 2rem;
`;

const ActionTitle = styled.h3<{ theme: 'light' | 'dark' }>`
  margin: 0 0 0.5rem 0;
  color: ${props => getThemeColors(props.theme).text.primary};
  font-size: 1.3rem;
`;

const ActionDescription = styled.p<{ theme: 'light' | 'dark' }>`
  color: ${props => getThemeColors(props.theme).text.secondary};
  margin: 0;
  line-height: 1.5;
`;

const StatsSection = styled.div`
  margin-top: 2rem;
`;

const SectionTitle = styled.h2<{ theme: 'light' | 'dark' }>`
  color: ${props => getThemeColors(props.theme).text.primary};
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const LevelProgress = styled.div<{ theme: 'light' | 'dark' }>`
  background: ${props => getThemeColors(props.theme).card};
  border-radius: 16px;
  padding: 1.5rem;
  margin: 1rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid ${props => getThemeColors(props.theme).border};
`;

const LevelInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const LevelName = styled.div<{ level: number; theme: 'light' | 'dark' }>`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${props => {
    const colors = getThemeColors(props.theme);
    if (props.level >= 3) return colors.level3;
    if (props.level >= 2) return colors.level2;
    return colors.level1;
  }};
`;

const NextLevelInfo = styled.div<{ theme: 'light' | 'dark' }>`
  font-size: 0.9rem;
  color: ${props => getThemeColors(props.theme).text.secondary};
`;

export const HomePage: React.FC = () => {
  const { state, startWorkout } = useWorkout();
  const { theme } = useTheme();
  const { user } = state;

  const currentLevelExp = (user.level - 1) * 100;
  const nextLevelExp = user.level * 100;

  const getLevelName = (level: number): string => {
    if (level >= 3) return 'Intermediário';
    if (level >= 2) return 'Aprendiz';
    return 'Iniciante';
  };

  const getLevelColor = (level: number): string => {
    const colors = getThemeColors(theme);
    if (level >= 3) return colors.level3;
    if (level >= 2) return colors.level2;
    return colors.level1;
  };

  const handleStartWorkout = () => {
    startWorkout();
  };

  return (
    <Container theme={theme}>
      <Header theme={theme}>
        <ThemeToggleContainer>
          <ThemeLabel theme={theme}>
            {theme === 'dark' ? 'Escuro' : 'Claro'}
          </ThemeLabel>
          <ThemeToggle />
        </ThemeToggleContainer>
        <Title theme={theme}>💪 CirquloFit</Title>
        <Subtitle theme={theme}>Seu companheiro de treino gamificado</Subtitle>
      </Header>

      <QuickActions>
        <ActionCard theme={theme} onClick={handleStartWorkout}>
          <ActionIcon color="#4caf50">
            <Play size={40} />
          </ActionIcon>
          <ActionTitle theme={theme}>Iniciar Treino</ActionTitle>
          <ActionDescription theme={theme}>
            Comece seu treino de hoje e ganhe experiência!
          </ActionDescription>
        </ActionCard>

        <ActionCard theme={theme}>
          <ActionIcon color="#2196f3">
            <BarChart3 size={40} />
          </ActionIcon>
          <ActionTitle theme={theme}>Estatísticas</ActionTitle>
          <ActionDescription theme={theme}>
            Acompanhe seu progresso e evolução
          </ActionDescription>
        </ActionCard>

        <ActionCard theme={theme}>
          <ActionIcon color="#ff9800">
            <Trophy size={40} />
          </ActionIcon>
          <ActionTitle theme={theme}>Conquistas</ActionTitle>
          <ActionDescription theme={theme}>
            Desbloqueie novas conquistas e níveis
          </ActionDescription>
        </ActionCard>

        <ActionCard theme={theme}>
          <ActionIcon color="#9c27b0">
            <Settings size={40} />
          </ActionIcon>
          <ActionTitle theme={theme}>Configurações</ActionTitle>
          <ActionDescription theme={theme}>
            Personalize sua experiência de treino
          </ActionDescription>
        </ActionCard>
      </QuickActions>

      <StatsSection>
        <SectionTitle theme={theme}>Seu Progresso</SectionTitle>
        
        <LevelProgress theme={theme}>
          <LevelInfo>
            <LevelName level={user.level} theme={theme}>
              Nível {user.level} - {getLevelName(user.level)}
            </LevelName>
            <NextLevelInfo theme={theme}>
              {user.experience}/{nextLevelExp} XP
            </NextLevelInfo>
          </LevelInfo>
          <ProgressBar
            current={user.experience - currentLevelExp}
            total={nextLevelExp - currentLevelExp}
            color={getLevelColor(user.level)}
            showPercentage={true}
          />
        </LevelProgress>

        <UserStats user={user} />
      </StatsSection>
    </Container>
  );
};
