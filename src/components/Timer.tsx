import React from 'react';
import styled from 'styled-components';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColors } from '../styles/theme';

interface TimerProps {
  timeLeft: number;
  totalTime: number;
  isRunning: boolean;
  type: 'rest' | 'work' | 'warmup' | 'cooldown';
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

const TimerContainer = styled.div<{ theme: 'light' | 'dark' }>`
  background: linear-gradient(135deg, ${props => getThemeColors(props.theme).primary} 0%, ${props => getThemeColors(props.theme).secondary} 100%);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  margin: 1rem 0;
`;

const TimerDisplay = styled.div`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;
`;

const TimerType = styled.div`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  opacity: 0.9;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  margin-bottom: 1.5rem;
  overflow: hidden;
  
  &::after {
    content: '';
    display: block;
    width: ${props => props.progress}%;
    height: 100%;
    background: white;
    border-radius: 4px;
    transition: width 0.3s ease;
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const ControlButton = styled.button<{ variant?: 'primary' | 'secondary'; theme: 'light' | 'dark' }>`
  background: ${props => {
    const colors = getThemeColors(props.theme);
    return props.variant === 'primary' ? 'white' : 'rgba(255, 255, 255, 0.2)';
  }};
  color: ${props => {
    const colors = getThemeColors(props.theme);
    return props.variant === 'primary' ? colors.primary : 'white';
  }};
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.5rem;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const getTimerTypeText = (type: string): string => {
  switch (type) {
    case 'rest': return 'Descanso';
    case 'work': return 'Trabalho';
    case 'warmup': return 'Aquecimento';
    case 'cooldown': return 'Desaquecimento';
    default: return 'Timer';
  }
};

export const Timer: React.FC<TimerProps> = ({
  timeLeft,
  totalTime,
  isRunning,
  type,
  onStart,
  onPause,
  onReset
}) => {
  const { theme } = useTheme();
  const progress = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;

  return (
    <TimerContainer theme={theme}>
      <TimerType>{getTimerTypeText(type)}</TimerType>
      <TimerDisplay>{formatTime(timeLeft)}</TimerDisplay>
      <ProgressBar progress={progress} />
      <Controls>
        {isRunning ? (
          <ControlButton theme={theme} onClick={onPause}>
            <Pause size={24} />
          </ControlButton>
        ) : (
          <ControlButton theme={theme} variant="primary" onClick={onStart}>
            <Play size={24} />
          </ControlButton>
        )}
        <ControlButton theme={theme} onClick={onReset}>
          <RotateCcw size={20} />
        </ControlButton>
      </Controls>
    </TimerContainer>
  );
};
