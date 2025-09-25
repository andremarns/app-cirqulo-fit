import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CirquloLogoWithText } from '../components/CirquloLogo';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColors } from '../styles/theme';
import { useAuth } from '../contexts/AuthContext';

const Container = styled.div<{ theme: 'light' | 'dark' }>`
  min-height: 100vh;
  background: linear-gradient(135deg, ${props => getThemeColors(props.theme).primary}20 0%, ${props => getThemeColors(props.theme).secondary}20 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const AuthContainer = styled.div`
  width: 100%;
  max-width: 500px;
`;

const Logo = styled.div<{ theme: 'light' | 'dark' }>`
  text-align: center;
  margin-bottom: 2rem;
`;

const LogoText = styled.h1<{ theme: 'light' | 'dark' }>`
  font-size: 3rem;
  color: ${props => getThemeColors(props.theme).text.primary};
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, ${props => getThemeColors(props.theme).primary} 0%, ${props => getThemeColors(props.theme).secondary} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const LogoSubtext = styled.p<{ theme: 'light' | 'dark' }>`
  color: ${props => getThemeColors(props.theme).text.secondary};
  font-size: 1.1rem;
  margin: 0;
`;

const RedirectCard = styled.div<{ theme: 'light' | 'dark' }>`
  background: ${props => getThemeColors(props.theme).background};
  border: 1px solid ${props => getThemeColors(props.theme).border};
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const RedirectTitle = styled.h2<{ theme: 'light' | 'dark' }>`
  color: ${props => getThemeColors(props.theme).text.primary};
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const RedirectText = styled.p<{ theme: 'light' | 'dark' }>`
  color: ${props => getThemeColors(props.theme).text.secondary};
  font-size: 1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const RedirectButton = styled.button<{ theme: 'light' | 'dark' }>`
  background: linear-gradient(135deg, ${props => getThemeColors(props.theme).primary} 0%, ${props => getThemeColors(props.theme).secondary} 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Countdown = styled.div<{ theme: 'light' | 'dark' }>`
  color: ${props => getThemeColors(props.theme).text.secondary};
  font-size: 0.9rem;
  margin-top: 1rem;
`;

export const AuthPage: React.FC = () => {
  const { theme } = useTheme();
  const { login } = useAuth();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Redirecionar automaticamente após 5 segundos
          window.location.href = `${process.env.REACT_APP_MAESTRO_URL || 'http://localhost:3003'}/login?redirect=${encodeURIComponent(window.location.href)}`;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRedirect = () => {
    window.location.href = `${process.env.REACT_APP_MAESTRO_URL || 'http://localhost:3003'}/login?redirect=${encodeURIComponent(window.location.href)}`;
  };

  return (
    <Container theme={theme}>
      <AuthContainer>
        <Logo theme={theme}>
          <CirquloLogoWithText size={100} variant="fit" theme={theme} showPulse={true} />
          <LogoSubtext theme={theme}>Seu companheiro de treino gamificado</LogoSubtext>
        </Logo>

        <RedirectCard theme={theme}>
          <RedirectTitle theme={theme}>Redirecionando para o Sistema de Login</RedirectTitle>
          <RedirectText theme={theme}>
            O CirquloFit agora utiliza o sistema de autenticação centralizada do Cirqulo Maestro. 
            Você será redirecionado automaticamente para fazer login.
          </RedirectText>
          <RedirectButton theme={theme} onClick={handleRedirect}>
            Ir para o Login
          </RedirectButton>
          <Countdown theme={theme}>
            Redirecionamento automático em {countdown} segundos...
          </Countdown>
        </RedirectCard>
      </AuthContainer>
    </Container>
  );
};
