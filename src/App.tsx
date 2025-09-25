import React, { useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { WorkoutProvider, useWorkout } from './contexts/WorkoutContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { HomePage } from './pages/HomePage';
import { WorkoutPage } from './pages/WorkoutPage';
import { AuthPage } from './pages/AuthPage';
import { UserPage } from './pages/UserPage';
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
  const { isAuthenticated, isLoading } = useAuth();
  
  // Verificar se há token de retorno do Maestro
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const redirect = urlParams.get('redirect');
    
    if (token) {
      // Salvar token e redirecionar
      localStorage.setItem('cirqulo_token', token);
      if (redirect) {
        window.location.href = redirect;
      } else {
        window.location.href = window.location.origin;
      }
    }
  }, []);
  
  if (isLoading) {
    return (
      <AppContainer>
        <GlobalStyle theme={theme} />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '1.2rem',
          color: getThemeColors(theme).text.primary
        }}>
          Carregando...
        </div>
      </AppContainer>
    );
  }
  
  if (!isAuthenticated) {
    return (
      <AppContainer>
        <GlobalStyle theme={theme} />
        <AuthPage />
      </AppContainer>
    );
  }
  
  // Verificar se está na página de usuário
  const currentPath = window.location.pathname;
  if (currentPath === '/user' || currentPath === '/profile') {
    return (
      <AppContainer>
        <GlobalStyle theme={theme} />
        <UserPage />
      </AppContainer>
    );
  }
  
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
      <AuthProvider>
        <WorkoutProvider>
          <AppContent />
        </WorkoutProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
