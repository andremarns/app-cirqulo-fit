import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types/auth';

// Configuração do Maestro
const MAESTRO_URL = process.env.REACT_APP_MAESTRO_URL || 'http://localhost:3003';
const MAESTRO_API_URL = process.env.REACT_APP_MAESTRO_API_URL || 'http://localhost:8001/api/v1';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('cirqulo_token');
      if (storedToken) {
        try {
          // Verificar se o token é válido com o Maestro
          const response = await fetch(`${MAESTRO_API_URL}/auth/verify-token`, {
            headers: {
              'Authorization': `Bearer ${storedToken}`
            }
          });
          
          if (response.ok) {
            // Verificar se o usuário tem acesso ao CirquloFit
            const accessResponse = await fetch(`${MAESTRO_API_URL}/auth/check-app-access`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${storedToken}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ app_name: 'cirqulo_fit' })
            });
            
            if (accessResponse.ok) {
              const accessData = await accessResponse.json();
              if (accessData.has_access) {
                // Buscar dados do usuário
                const userResponse = await fetch(`${MAESTRO_API_URL}/auth/me`, {
                  headers: {
                    'Authorization': `Bearer ${storedToken}`
                  }
                });
                
                if (userResponse.ok) {
                  const userData = await userResponse.json();
                  setUser(userData);
                  setToken(storedToken);
                  setIsAuthenticated(true);
                }
              }
            }
          }
        } catch (error) {
          console.error('Erro ao verificar autenticação:', error);
          localStorage.removeItem('cirqulo_token');
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    // Redirecionar para o Maestro para login
    window.location.href = `${MAESTRO_URL}/login?redirect=${encodeURIComponent(window.location.href)}`;
  };

  const register = async (userData: any): Promise<void> => {
    // Redirecionar para o Maestro para registro
    window.location.href = `${MAESTRO_URL}/register?redirect=${encodeURIComponent(window.location.href)}`;
  };

  const logout = (): void => {
    localStorage.removeItem('cirqulo_token');
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    // Redirecionar para o Maestro
    window.location.href = `${MAESTRO_URL}/login`;
  };

  const updateUser = (updatedUser: User): void => {
    setUser(updatedUser);
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isLoading,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
