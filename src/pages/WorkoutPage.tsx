import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useWorkout } from '../contexts/WorkoutContext';
import { useTheme } from '../contexts/ThemeContext';
import { ExerciseCard } from '../components/ExerciseCard';
import { Timer } from '../components/Timer';
import { ProgressBar } from '../components/ProgressBar';
import { getExerciseGif } from '../services/tenorService';
import { getThemeColors } from '../styles/theme';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const BackButton = styled.button<{ theme: 'light' | 'dark' }>`
  background: ${props => getThemeColors(props.theme).surface};
  border: 1px solid ${props => getThemeColors(props.theme).border};
  border-radius: 12px;
  padding: 0.75rem;
  margin-right: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: ${props => getThemeColors(props.theme).text.primary};
  
  &:hover {
    background: ${props => getThemeColors(props.theme).hover};
    transform: scale(1.05);
  }
`;

const HeaderInfo = styled.div`
  flex: 1;
`;

const WorkoutTitle = styled.h1<{ theme: 'light' | 'dark' }>`
  margin: 0 0 0.5rem 0;
  color: ${props => getThemeColors(props.theme).text.primary};
  font-size: 1.8rem;
`;

const WorkoutDescription = styled.p<{ theme: 'light' | 'dark' }>`
  margin: 0;
  color: ${props => getThemeColors(props.theme).text.secondary};
  font-size: 1rem;
`;

const WorkoutProgress = styled.div<{ theme: 'light' | 'dark' }>`
  background: ${props => getThemeColors(props.theme).card};
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid ${props => getThemeColors(props.theme).border};
`;

const ProgressInfo = styled.div<{ theme: 'light' | 'dark' }>`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: ${props => getThemeColors(props.theme).text.secondary};
`;

const ExercisesList = styled.div`
  margin-top: 2rem;
`;

const CompleteButton = styled.button<{ theme: 'light' | 'dark' }>`
  background: linear-gradient(135deg, ${props => getThemeColors(props.theme).success}, #45a049);
  color: white;
  border: none;
  border-radius: 16px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  margin-top: 2rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(76, 175, 80, 0.3);
  }
  
  &:disabled {
    background: ${props => getThemeColors(props.theme).disabled};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const TimerSection = styled.div`
  position: sticky;
  top: 1rem;
  z-index: 10;
  margin-bottom: 2rem;
`;

export const WorkoutPage: React.FC = () => {
  const { state, completeSet, updateWeight, updateReps, startRestTimer, completeWorkout, stopWorkout } = useWorkout();
  const { theme } = useTheme();
  const { currentSession, timer } = state;
  const [exerciseGifs, setExerciseGifs] = useState<{ [key: string]: string }>({});
  const [loadingGifs, setLoadingGifs] = useState(true);

  useEffect(() => {
    if (currentSession) {
      // Carregar GIFs para os exercícios
      const loadGifs = async () => {
        setLoadingGifs(true);
        const gifs: { [key: string]: string } = {};
        
        // Carregar GIFs em paralelo para melhor performance
        const gifPromises = currentSession.exercises.map(async (exercise) => {
          try {
            const gifUrl = await getExerciseGif(exercise.exercise.name);
            if (gifUrl) {
              gifs[exercise.exercise.id] = gifUrl;
            }
          } catch (error) {
            console.error(`Erro ao carregar GIF para ${exercise.exercise.name}:`, error);
          }
        });
        
        await Promise.all(gifPromises);
        setExerciseGifs(gifs);
        setLoadingGifs(false);
      };
      
      loadGifs();
    }
  }, [currentSession]);

  if (!currentSession) {
    return (
      <Container>
        <div>Nenhum treino ativo. Volte à página inicial para começar.</div>
      </Container>
    );
  }

  const totalSets = currentSession.exercises.reduce((acc, exercise) => acc + exercise.sets.length, 0);
  const completedSets = currentSession.exercises.reduce((acc, exercise) => 
    acc + exercise.sets.filter(set => set.completed).length, 0
  );
  const progress = totalSets > 0 ? (completedSets / totalSets) * 100 : 0;

  const isWorkoutComplete = completedSets === totalSets;

  const handleTimerStart = () => {
    if (timer.timeLeft > 0) {
      // Continuar timer existente
    } else {
      startRestTimer(60); // Timer padrão de 60s
    }
  };

  const handleTimerPause = () => {
    // Implementar pausa do timer
  };

  const handleTimerReset = () => {
    // Implementar reset do timer
  };

  const handleBackToHome = () => {
    if (window.confirm('Tem certeza que deseja sair do treino? Seu progresso será perdido.')) {
      stopWorkout();
    }
  };

  return (
    <Container>
      <Header>
        <BackButton theme={theme} onClick={handleBackToHome}>
          <ArrowLeft size={20} />
        </BackButton>
        <HeaderInfo>
          <WorkoutTitle theme={theme}>{currentSession.exercises[0]?.exercise.name || 'Treino'}</WorkoutTitle>
          <WorkoutDescription theme={theme}>
            {completedSets} de {totalSets} séries concluídas
          </WorkoutDescription>
        </HeaderInfo>
      </Header>

      <WorkoutProgress theme={theme}>
        <ProgressInfo theme={theme}>
          <span>Progresso do Treino</span>
          <span>{Math.round(progress)}%</span>
        </ProgressInfo>
        <ProgressBar
          current={completedSets}
          total={totalSets}
          color={getThemeColors(theme).success}
          showPercentage={false}
        />
      </WorkoutProgress>

      {timer.timeLeft > 0 && (
        <TimerSection>
          <Timer
            timeLeft={timer.timeLeft}
            totalTime={timer.totalTime}
            isRunning={timer.isRunning}
            type={timer.type}
            onStart={handleTimerStart}
            onPause={handleTimerPause}
            onReset={handleTimerReset}
          />
        </TimerSection>
      )}

      <ExercisesList>
        {currentSession.exercises.map((exercise, exerciseIndex) => (
          <ExerciseCard
            key={exercise.exercise.id}
            exercise={exercise}
            exerciseIndex={exerciseIndex}
            onCompleteSet={completeSet}
            onUpdateWeight={updateWeight}
            onUpdateReps={updateReps}
            onStartRest={startRestTimer}
            gifUrl={exerciseGifs[exercise.exercise.id]}
          />
        ))}
      </ExercisesList>

      <CompleteButton
        theme={theme}
        onClick={completeWorkout}
        disabled={!isWorkoutComplete}
      >
        <CheckCircle size={20} />
        {isWorkoutComplete ? 'Finalizar Treino' : `Complete ${totalSets - completedSets} séries restantes`}
      </CompleteButton>
    </Container>
  );
};
