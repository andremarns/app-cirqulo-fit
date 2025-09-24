import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { WorkoutProvider, useWorkout } from './contexts/WorkoutContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { HomePage } from './pages/HomePage';
import { WorkoutPage } from './pages/WorkoutPage';
import { getThemeColors } from './styles/theme';

const GlobalStyle = createGlobalStyle<{ theme: 'light' | 'dark' }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${props => getThemeColors(props.theme).background};
    min-height: 100vh;
    color: ${props => getThemeColors(props.theme).text.primary};
    transition: all 0.3s ease;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  input, button {
    font-family: inherit;
  }

  button {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 0;
`;

const AppContent: React.FC = () => {
  const { state } = useWorkout();
  const { theme } = useTheme();
  
  return (
    <AppContainer>
      <GlobalStyle theme={theme} />
      {state.isWorkoutActive ? <WorkoutPage /> : <HomePage />}
    </AppContainer>
  );
};

function App() {
  return (
    <ThemeProvider>
      <WorkoutProvider>
        <AppContent />
      </WorkoutProvider>
    </ThemeProvider>
  );
}

export default App;
