export interface ThemeColors {
  // Cores principais
  primary: string;
  secondary: string;
  accent: string;
  
  // Cores de fundo
  background: string;
  surface: string;
  card: string;
  
  // Cores de texto
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  
  // Cores de borda
  border: string;
  divider: string;
  
  // Cores de status
  success: string;
  warning: string;
  error: string;
  info: string;
  
  // Cores de níveis
  level1: string;
  level2: string;
  level3: string;
  
  // Cores de hover e estados
  hover: string;
  active: string;
  disabled: string;
}

export const lightTheme: ThemeColors = {
  // Cores principais
  primary: '#667eea',
  secondary: '#764ba2',
  accent: '#4caf50',
  
  // Cores de fundo
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  surface: '#ffffff',
  card: '#ffffff',
  
  // Cores de texto
  text: {
    primary: '#333333',
    secondary: '#666666',
    muted: '#999999'
  },
  
  // Cores de borda
  border: '#e0e0e0',
  divider: '#f0f0f0',
  
  // Cores de status
  success: '#4caf50',
  warning: '#ff9800',
  error: '#f44336',
  info: '#2196f3',
  
  // Cores de níveis
  level1: '#4caf50', // Iniciante - Verde
  level2: '#2196f3', // Aprendiz - Azul
  level3: '#ff9800', // Intermediário - Laranja
  
  // Cores de hover e estados
  hover: '#f5f5f5',
  active: '#e0e0e0',
  disabled: '#cccccc'
};

export const darkTheme: ThemeColors = {
  // Cores principais
  primary: '#7c4dff',
  secondary: '#9c27b0',
  accent: '#00e676',
  
  // Cores de fundo
  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
  surface: '#2d2d44',
  card: '#2d2d44',
  
  // Cores de texto
  text: {
    primary: '#ffffff',
    secondary: '#b0b0b0',
    muted: '#808080'
  },
  
  // Cores de borda
  border: '#404040',
  divider: '#333333',
  
  // Cores de status
  success: '#00e676',
  warning: '#ffb74d',
  error: '#f44336',
  info: '#64b5f6',
  
  // Cores de níveis
  level1: '#00e676', // Iniciante - Verde claro
  level2: '#64b5f6', // Aprendiz - Azul claro
  level3: '#ffb74d', // Intermediário - Laranja claro
  
  // Cores de hover e estados
  hover: '#404040',
  active: '#505050',
  disabled: '#666666'
};

export const getThemeColors = (theme: 'light' | 'dark'): ThemeColors => {
  return theme === 'dark' ? darkTheme : lightTheme;
};
