import React, { useState } from 'react';
import styled from 'styled-components';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColors } from '../styles/theme';

const FormContainer = styled.div<{ theme: 'light' | 'dark' }>`
  background: ${props => getThemeColors(props.theme).card};
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid ${props => getThemeColors(props.theme).border};
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const Title = styled.h2<{ theme: 'light' | 'dark' }>`
  color: ${props => getThemeColors(props.theme).text.primary};
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input<{ theme: 'light' | 'dark' }>`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid ${props => getThemeColors(props.theme).border};
  border-radius: 12px;
  background: ${props => getThemeColors(props.theme).background};
  color: ${props => getThemeColors(props.theme).text.primary};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => getThemeColors(props.theme).primary};
    box-shadow: 0 0 0 3px ${props => getThemeColors(props.theme).primary}20;
  }

  &::placeholder {
    color: ${props => getThemeColors(props.theme).text.secondary};
  }
`;

const InputIcon = styled.div<{ theme: 'light' | 'dark' }>`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => getThemeColors(props.theme).text.secondary};
  z-index: 1;
`;

const PasswordToggle = styled.button<{ theme: 'light' | 'dark' }>`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${props => getThemeColors(props.theme).text.secondary};
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => getThemeColors(props.theme).primary};
  }
`;

const Button = styled.button<{ theme: 'light' | 'dark' }>`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, ${props => getThemeColors(props.theme).primary} 0%, ${props => getThemeColors(props.theme).secondary} 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div<{ theme: 'light' | 'dark' }>`
  color: #ff4757;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 1rem;
  padding: 0.75rem;
  background: rgba(255, 71, 87, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(255, 71, 87, 0.2);
`;

const SwitchForm = styled.div<{ theme: 'light' | 'dark' }>`
  text-align: center;
  margin-top: 1.5rem;
  color: ${props => getThemeColors(props.theme).text.secondary};
`;

const SwitchButton = styled.button<{ theme: 'light' | 'dark' }>`
  background: none;
  border: none;
  color: ${props => getThemeColors(props.theme).primary};
  cursor: pointer;
  font-weight: 600;
  text-decoration: underline;

  &:hover {
    color: ${props => getThemeColors(props.theme).secondary};
  }
`;

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onLoginSuccess: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister, onLoginSuccess }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { useAuth } = await import('../contexts/AuthContext');
      const { login } = useAuth();
      await login(formData.email, formData.password);
      onLoginSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer theme={theme}>
      <Title theme={theme}>Entrar</Title>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <InputIcon theme={theme}>
            <Mail size={20} />
          </InputIcon>
          <Input
            theme={theme}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </InputGroup>

        <InputGroup>
          <InputIcon theme={theme}>
            <Lock size={20} />
          </InputIcon>
          <Input
            theme={theme}
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <PasswordToggle
            theme={theme}
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </PasswordToggle>
        </InputGroup>

        <Button theme={theme} type="submit" disabled={isLoading}>
          <LogIn size={20} />
          {isLoading ? 'Entrando...' : 'Entrar'}
        </Button>

        {error && (
          <ErrorMessage theme={theme}>
            {error}
          </ErrorMessage>
        )}
      </Form>

      <SwitchForm theme={theme}>
        Não tem uma conta?{' '}
        <SwitchButton theme={theme} onClick={onSwitchToRegister}>
          Criar conta
        </SwitchButton>
      </SwitchForm>
    </FormContainer>
  );
};
