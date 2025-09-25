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
  // Cores principais - Lilás e Roxo
  primary: '#8b5cf6',       // Lilás
  secondary: '#a855f7',     // Roxo médio
  accent: '#10b981',        // Verde para sucesso
  
  // Cores de fundo
  background: '#ffffff',    // Branco
  surface: '#faf5ff',       // Lilás muito claro
  card: '#ffffff',
  
  // Cores de texto
  text: {
    primary: '#581c87',     // Roxo escuro
    secondary: '#7c2d12',   // Roxo médio
    muted: '#a78bfa'        // Lilás claro
  },
  
  // Cores de borda
  border: '#e9d5ff',        // Lilás claro
  divider: '#f3e8ff',       // Lilás muito claro
  
  // Cores de status
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#06b6d4',
  
  // Cores de níveis
  level1: '#10b981',        // Iniciante - Verde
  level2: '#8b5cf6',        // Aprendiz - Lilás
  level3: '#a855f7',        // Intermediário - Roxo
  
  // Cores de hover e estados
  hover: '#f3e8ff',         // Lilás muito claro
  active: '#e9d5ff',        // Lilás claro
  disabled: '#d1d5db'       // Cinza
};

export const darkTheme: ThemeColors = {
  // Cores principais - Roxo escuro no modo escuro
  primary: '#6d28d9',       // Roxo escuro
  secondary: '#4c1d95',     // Roxo mais escuro
  accent: '#10b981',        // Verde para sucesso
  
  // Cores de fundo
  background: '#1e1b4b',    // Roxo muito escuro
  surface: '#312e81',       // Roxo escuro
  card: '#312e81',
  
  // Cores de texto
  text: {
    primary: '#f3e8ff',     // Lilás claro
    secondary: '#c4b5fd',   // Lilás médio
    muted: '#a78bfa'        // Lilás
  },
  
  // Cores de borda
  border: '#4c1d95',        // Roxo escuro
  divider: '#312e81',       // Roxo escuro
  
  // Cores de status
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#06b6d4',
  
  // Cores de níveis
  level1: '#10b981',        // Iniciante - Verde
  level2: '#6d28d9',        // Aprendiz - Roxo escuro
  level3: '#4c1d95',        // Intermediário - Roxo mais escuro
  
  // Cores de hover e estados
  hover: '#4c1d95',         // Roxo escuro
  active: '#312e81',        // Roxo escuro
  disabled: '#6b7280'       // Cinza
};

export const getThemeColors = (theme: 'light' | 'dark'): ThemeColors => {
  return theme === 'dark' ? darkTheme : lightTheme;
};
