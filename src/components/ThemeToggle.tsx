import React from 'react';
import styled from 'styled-components';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColors } from '../styles/theme';

const ToggleContainer = styled.div<{ theme: 'light' | 'dark' }>`
  position: relative;
  width: 60px;
  height: 30px;
  background: ${props => getThemeColors(props.theme).border};
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid ${props => getThemeColors(props.theme).primary};
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ToggleSlider = styled.div<{ isDark: boolean }>`
  position: absolute;
  top: 2px;
  left: ${props => props.isDark ? '32px' : '2px'};
  width: 22px;
  height: 22px;
  background: ${props => props.isDark ? '#ffffff' : '#ffd700'};
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const IconContainer = styled.div<{ isDark: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: ${props => props.isDark ? '#333' : '#ff6b35'};
  font-size: 12px;
`;

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <ToggleContainer theme={theme} onClick={toggleTheme}>
      <ToggleSlider isDark={isDark}>
        <IconContainer isDark={isDark}>
          {isDark ? <Moon size={12} /> : <Sun size={12} />}
        </IconContainer>
      </ToggleSlider>
    </ToggleContainer>
  );
};
