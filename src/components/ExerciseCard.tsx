import React, { useState } from 'react';
import styled from 'styled-components';
import { Check, Plus, Minus } from 'lucide-react';
import { WorkoutExercise } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColors } from '../styles/theme';

interface ExerciseCardProps {
  exercise: WorkoutExercise;
  exerciseIndex: number;
  onCompleteSet: (exerciseIndex: number, setIndex: number) => void;
  onUpdateWeight: (exerciseIndex: number, setIndex: number, weight: number) => void;
  onUpdateReps: (exerciseIndex: number, setIndex: number, reps: number) => void;
  onStartRest: (duration: number) => void;
  gifUrl?: string;
}

const Card = styled.div<{ theme: 'light' | 'dark' }>`
  background: ${props => getThemeColors(props.theme).card};
  border-radius: 16px;
  padding: 1.5rem;
  margin: 1rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid ${props => getThemeColors(props.theme).border};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const GifContainer = styled.div<{ theme: 'light' | 'dark' }>`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  margin-right: 1rem;
  background: ${props => getThemeColors(props.theme).surface};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GifImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlaceholderIcon = styled.div<{ theme: 'light' | 'dark' }>`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, ${props => getThemeColors(props.theme).primary} 0%, ${props => getThemeColors(props.theme).secondary} 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
`;

const ExerciseInfo = styled.div`
  flex: 1;
`;

const ExerciseName = styled.h3<{ theme: 'light' | 'dark' }>`
  margin: 0 0 0.5rem 0;
  color: ${props => getThemeColors(props.theme).text.primary};
  font-size: 1.2rem;
`;

const ExerciseDetails = styled.div<{ theme: 'light' | 'dark' }>`
  color: ${props => getThemeColors(props.theme).text.secondary};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const MuscleGroups = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const MuscleTag = styled.span<{ theme: 'light' | 'dark' }>`
  background: ${props => getThemeColors(props.theme).surface};
  color: ${props => getThemeColors(props.theme).primary};
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  border: 1px solid ${props => getThemeColors(props.theme).border};
`;

const SetsContainer = styled.div`
  margin-top: 1rem;
`;

const SetRow = styled.div<{ completed: boolean; theme: 'light' | 'dark' }>`
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
  margin: 0.5rem 0;
  background: ${props => {
    const colors = getThemeColors(props.theme);
    return props.completed ? colors.success + '20' : colors.surface;
  }};
  border-radius: 12px;
  border: 2px solid ${props => {
    const colors = getThemeColors(props.theme);
    return props.completed ? colors.success : 'transparent';
  }};
  transition: all 0.3s ease;
  gap: 0.75rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 0;
  }
`;

const SetHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  
  @media (min-width: 768px) {
    width: auto;
    margin-right: 1rem;
  }
`;

const SetNumber = styled.div<{ theme: 'light' | 'dark' }>`
  font-weight: bold;
  color: ${props => getThemeColors(props.theme).text.primary};
  font-size: 1.1rem;
  
  @media (min-width: 768px) {
    min-width: 30px;
    margin-right: 1rem;
  }
`;

const SetControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    width: auto;
    flex: 1;
  }
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  
  @media (min-width: 768px) {
    margin: 0 1rem;
    flex: none;
  }
`;

const InputLabel = styled.label<{ theme: 'light' | 'dark' }>`
  font-size: 0.9rem;
  color: ${props => getThemeColors(props.theme).text.secondary};
  min-width: 50px;
  
  @media (min-width: 768px) {
    margin-right: 0.5rem;
    min-width: auto;
  }
`;

const NumberInput = styled.input<{ theme: 'light' | 'dark' }>`
  width: 80px;
  padding: 0.5rem;
  border: 1px solid ${props => getThemeColors(props.theme).border};
  border-radius: 8px;
  text-align: center;
  font-size: 1rem;
  background: ${props => getThemeColors(props.theme).surface};
  color: ${props => getThemeColors(props.theme).text.primary};
  
  &:focus {
    outline: none;
    border-color: ${props => getThemeColors(props.theme).primary};
    box-shadow: 0 0 0 2px ${props => getThemeColors(props.theme).primary}20;
  }
  
  @media (min-width: 768px) {
    width: 60px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  
  @media (min-width: 768px) {
    margin-left: auto;
  }
`;

const IconButton = styled.button<{ variant?: 'primary' | 'secondary'; theme: 'light' | 'dark' }>`
  background: ${props => {
    const colors = getThemeColors(props.theme);
    return props.variant === 'primary' ? colors.success : colors.surface;
  }};
  color: ${props => {
    const colors = getThemeColors(props.theme);
    return props.variant === 'primary' ? 'white' : colors.text.secondary;
  }};
  border: 1px solid ${props => getThemeColors(props.theme).border};
  border-radius: 8px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => {
      const colors = getThemeColors(props.theme);
      return props.variant === 'primary' ? '#45a049' : colors.hover;
    }};
    transform: scale(1.05);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const RestButton = styled.button<{ theme: 'light' | 'dark' }>`
  background: ${props => getThemeColors(props.theme).warning};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f57c00;
    transform: scale(1.05);
  }
`;

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  exerciseIndex,
  onCompleteSet,
  onUpdateWeight,
  onUpdateReps,
  onStartRest,
  gifUrl
}) => {
  const { theme } = useTheme();
  
  const getExerciseEmoji = (exerciseName: string): string => {
    const emojiMap: { [key: string]: string } = {
      'Agachamento': '🦵',
      'Supino Reto': '💪',
      'Remada Baixa': '🚣',
      'Desenvolvimento de Ombros': '🏋️',
      'Puxada na Polia Alta': '💪',
      'Mesa Flexora': '🦵',
      'Prancha': '🧘',
      'Crunch': '🔥',
      'Cardio Leve': '🏃'
    };
    return emojiMap[exerciseName] || '💪';
  };

  const handleWeightChange = (setIndex: number, delta: number) => {
    const currentWeight = exercise.sets[setIndex].weight;
    const newWeight = Math.max(0, currentWeight + delta);
    onUpdateWeight(exerciseIndex, setIndex, newWeight);
  };

  const handleRepsChange = (setIndex: number, delta: number) => {
    const currentReps = exercise.sets[setIndex].reps;
    const newReps = Math.max(0, currentReps + delta);
    onUpdateReps(exerciseIndex, setIndex, newReps);
  };

  const handleStartRest = () => {
    onStartRest(exercise.restTime);
  };

  return (
    <Card theme={theme}>
      <Header>
        <GifContainer theme={theme}>
          {gifUrl ? (
            <GifImage src={gifUrl} alt={exercise.exercise.name} />
          ) : (
            <PlaceholderIcon theme={theme}>
              {getExerciseEmoji(exercise.exercise.name)}
            </PlaceholderIcon>
          )}
        </GifContainer>
        <ExerciseInfo>
          <ExerciseName theme={theme}>{exercise.exercise.name}</ExerciseName>
          <ExerciseDetails theme={theme}>
            {exercise.targetSets} séries × {exercise.targetReps} reps
          </ExerciseDetails>
          <MuscleGroups>
            {exercise.exercise.muscleGroups.map((muscle, index) => (
              <MuscleTag key={index} theme={theme}>{muscle}</MuscleTag>
            ))}
          </MuscleGroups>
        </ExerciseInfo>
      </Header>

      <SetsContainer>
        {exercise.sets.map((set, setIndex) => (
          <SetRow key={setIndex} completed={set.completed} theme={theme}>
            <SetHeader>
              <SetNumber theme={theme}>Série {setIndex + 1}</SetNumber>
              <ButtonGroup>
                {!set.completed && (
                  <IconButton
                    theme={theme}
                    variant="primary"
                    onClick={() => onCompleteSet(exerciseIndex, setIndex)}
                  >
                    <Check size={16} />
                  </IconButton>
                )}
                {set.completed && setIndex < exercise.sets.length - 1 && (
                  <RestButton theme={theme} onClick={handleStartRest}>
                    Descanso {exercise.restTime}s
                  </RestButton>
                )}
              </ButtonGroup>
            </SetHeader>
            
            <SetControls>
              <InputGroup>
                <InputLabel theme={theme}>Peso:</InputLabel>
                <ButtonGroup>
                  <IconButton theme={theme} onClick={() => handleWeightChange(setIndex, -2.5)}>
                    <Minus size={16} />
                  </IconButton>
                  <NumberInput
                    theme={theme}
                    type="number"
                    value={set.weight}
                    onChange={(e) => onUpdateWeight(exerciseIndex, setIndex, parseFloat(e.target.value) || 0)}
                  />
                  <IconButton theme={theme} onClick={() => handleWeightChange(setIndex, 2.5)}>
                    <Plus size={16} />
                  </IconButton>
                </ButtonGroup>
              </InputGroup>

              <InputGroup>
                <InputLabel theme={theme}>Reps:</InputLabel>
                <ButtonGroup>
                  <IconButton theme={theme} onClick={() => handleRepsChange(setIndex, -1)}>
                    <Minus size={16} />
                  </IconButton>
                  <NumberInput
                    theme={theme}
                    type="number"
                    value={set.reps}
                    onChange={(e) => onUpdateReps(exerciseIndex, setIndex, parseInt(e.target.value) || 0)}
                  />
                  <IconButton theme={theme} onClick={() => handleRepsChange(setIndex, 1)}>
                    <Plus size={16} />
                  </IconButton>
                </ButtonGroup>
              </InputGroup>
            </SetControls>
          </SetRow>
        ))}
      </SetsContainer>
    </Card>
  );
};
