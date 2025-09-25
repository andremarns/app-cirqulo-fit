import React, { useState } from 'react';
import styled from 'styled-components';
import { Eye, EyeOff, Mail, Lock, User, UserPlus } from 'lucide-react';
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

const PasswordStrength = styled.div<{ theme: 'light' | 'dark' }>`
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: ${props => getThemeColors(props.theme).text.secondary};
`;

const StrengthBar = styled.div<{ strength: number; theme: 'light' | 'dark' }>`
  height: 4px;
  background: ${props => {
    if (props.strength < 2) return '#ff4757';
    if (props.strength < 3) return '#ffa502';
    return '#2ed573';
  }};
  border-radius: 2px;
  width: ${props => (props.strength / 4) * 100}%;
  transition: all 0.3s ease;
`;

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onRegisterSuccess: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin, onRegisterSuccess }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const getPasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validações
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      setIsLoading(false);
      return;
    }

    try {
      const { useAuth } = await import('../contexts/AuthContext');
      const { register } = useAuth();
      await register({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      onRegisterSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar conta');
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <FormContainer theme={theme}>
      <Title theme={theme}>Criar Conta</Title>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <InputIcon theme={theme}>
            <User size={20} />
          </InputIcon>
          <Input
            theme={theme}
            type="text"
            name="name"
            placeholder="Nome completo"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </InputGroup>

        <InputGroup>
          <InputIcon theme={theme}>
            <User size={20} />
          </InputIcon>
          <Input
            theme={theme}
            type="text"
            name="username"
            placeholder="Nome de usuário"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </InputGroup>

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
          {formData.password && (
            <PasswordStrength theme={theme}>
              <div>Força da senha:</div>
              <StrengthBar strength={passwordStrength} theme={theme} />
            </PasswordStrength>
          )}
        </InputGroup>

        <InputGroup>
          <InputIcon theme={theme}>
            <Lock size={20} />
          </InputIcon>
          <Input
            theme={theme}
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirmar senha"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          <PasswordToggle
            theme={theme}
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </PasswordToggle>
        </InputGroup>

        <Button theme={theme} type="submit" disabled={isLoading}>
          <UserPlus size={20} />
          {isLoading ? 'Criando conta...' : 'Criar conta'}
        </Button>

        {error && (
          <ErrorMessage theme={theme}>
            {error}
          </ErrorMessage>
        )}
      </Form>

      <SwitchForm theme={theme}>
        Já tem uma conta?{' '}
        <SwitchButton theme={theme} onClick={onSwitchToLogin}>
          Fazer login
        </SwitchButton>
      </SwitchForm>
    </FormContainer>
  );
};
