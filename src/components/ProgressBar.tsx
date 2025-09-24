import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColors } from '../styles/theme';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  color?: string;
  showPercentage?: boolean;
}

const Container = styled.div`
  width: 100%;
  margin: 1rem 0;
`;

const Label = styled.div<{ theme: 'light' | 'dark' }>`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: ${props => getThemeColors(props.theme).text.secondary};
`;

const BarContainer = styled.div<{ theme: 'light' | 'dark' }>`
  width: 100%;
  height: 12px;
  background: ${props => getThemeColors(props.theme).border};
  border-radius: 6px;
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled.div<{ progress: number; color: string; theme: 'light' | 'dark' }>`
  height: 100%;
  width: ${props => Math.min(props.progress, 100)}%;
  background: ${props => props.color};
  border-radius: 6px;
  transition: width 0.3s ease;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.3) 50%,
      transparent 100%
    );
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const Percentage = styled.span<{ theme: 'light' | 'dark' }>`
  font-weight: bold;
  color: ${props => getThemeColors(props.theme).text.primary};
`;

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  label,
  color = '#4caf50',
  showPercentage = true
}) => {
  const { theme } = useTheme();
  const progress = total > 0 ? (current / total) * 100 : 0;
  const percentage = Math.round(progress);

  return (
    <Container>
      {label && (
        <Label theme={theme}>
          <span>{label}</span>
          {showPercentage && (
            <Percentage theme={theme}>{percentage}%</Percentage>
          )}
        </Label>
      )}
      <BarContainer theme={theme}>
        <ProgressFill progress={progress} color={color} theme={theme} />
      </BarContainer>
    </Container>
  );
};
