# 🏋️ CirquloFit - Frontend

Aplicativo de treino gamificado desenvolvido em React com TypeScript, integrado com a API CirquloFit.

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Tecnologias](#-tecnologias)
- [Instalação e Execução](#-instalação-e-execução)
- [Desenvolvimento Local](#-desenvolvimento-local)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Funcionalidades](#-funcionalidades)
- [Sistema de Roles](#-sistema-de-roles)
- [Deploy](#-deploy)
- [Configuração](#-configuração)
- [Testes](#-testes)
- [Troubleshooting](#-troubleshooting)

## 🎯 Visão Geral

O CirquloFit é um aplicativo de treino gamificado que transforma exercícios em uma experiência divertida e motivadora. O frontend oferece uma interface moderna e responsiva para gerenciar treinos, acompanhar progresso e desbloquear conquistas.

## ⚠️ Integração com Cirqulo Maestro

O CirquloFit agora utiliza o sistema de autenticação centralizada do **Cirqulo Maestro**. 

### Como funciona:
- O login e registro são gerenciados pelo Cirqulo Maestro
- Usuários são redirecionados automaticamente para o sistema centralizado
- Após autenticação, retornam ao CirquloFit com acesso liberado
- Um único perfil de usuário funciona em todo o ecossistema Cirqulo

### Configuração:
1. Configure as variáveis de ambiente (veja `env.example`)
2. Certifique-se de que o Cirqulo Maestro está rodando
3. O CirquloFit se conectará automaticamente ao sistema de autenticação

### Características Principais
- 🎮 **Gamificação**: Sistema de níveis, experiência e conquistas
- 🎨 **Tema Dinâmico**: Modo claro/escuro com transições suaves
- 📱 **Responsivo**: Funciona perfeitamente em desktop e mobile
- 🔐 **Autenticação**: Sistema completo de login/registro
- 👥 **Multi-role**: Suporte para Alunos, Treinadores e Administradores
- ⚡ **Performance**: Otimizado com React hooks e contextos

## 🛠️ Tecnologias

- **React 18** - Biblioteca principal
- **TypeScript** - Tipagem estática
- **Styled Components** - Estilização CSS-in-JS
- **React Router** - Navegação
- **Context API** - Gerenciamento de estado
- **Axios** - Requisições HTTP
- **Lucide React** - Ícones
- **React Hot Toast** - Notificações

## 🚀 Instalação e Execução

### Pré-requisitos

- Node.js 16+
- npm ou yarn
- Backend CirquloFit rodando

### Configuração Rápida

1. **Clone o repositório**
```bash
git clone <repository-url>
cd app-cirqulo-fit
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

Edite o arquivo `.env`:
```
REACT_APP_API_URL=http://localhost:8000/api/v1
REACT_APP_ENVIRONMENT=development
```

4. **Execute a aplicação**
```bash
npm start
```

A aplicação estará disponível em `http://localhost:3000`

## 🛠️ Desenvolvimento Local

### Configuração Completa

1. **Backend Local**
```bash
# Em outro terminal, na pasta api-cirqulo-fit
docker-compose up -d
```

2. **Frontend Local**
```bash
# Na pasta app-cirqulo-fit
npm start
```

### URLs de Desenvolvimento

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

### Hot Reload

O React possui hot reload automático. Qualquer alteração no código será refletida instantaneamente no navegador.

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── CirquloLogo.tsx  # Logo animado
│   ├── ExerciseCard.tsx # Card de exercício
│   ├── LoginForm.tsx    # Formulário de login
│   ├── ProgressBar.tsx  # Barra de progresso
│   ├── RegisterForm.tsx # Formulário de registro
│   ├── ThemeToggle.tsx  # Toggle de tema
│   ├── Timer.tsx        # Cronômetro
│   └── UserStats.tsx    # Estatísticas do usuário
├── contexts/            # Contextos React
│   ├── AuthContext.tsx  # Contexto de autenticação
│   ├── ThemeContext.tsx # Contexto de tema
│   └── WorkoutContext.tsx # Contexto de treino
├── data/               # Dados estáticos
│   └── workouts.ts     # Dados de treinos
├── pages/              # Páginas da aplicação
│   ├── AuthPage.tsx    # Página de autenticação
│   ├── HomePage.tsx    # Página inicial
│   ├── UserPage.tsx    # Página do usuário
│   └── WorkoutPage.tsx # Página de treino
├── services/           # Serviços de API
│   ├── authService.ts  # Serviço de autenticação
│   └── tenorService.ts # Serviço de GIFs
├── styles/             # Estilos globais
│   └── theme.ts        # Configuração de temas
├── types/              # Definições TypeScript
│   ├── auth.ts         # Tipos de autenticação
│   └── index.ts        # Tipos principais
├── App.tsx             # Componente principal
└── index.tsx           # Ponto de entrada
```

## ✨ Funcionalidades

### 🎮 Gamificação
- **Sistema de Níveis**: Progressão baseada em experiência
- **Conquistas**: Desbloqueio de badges por marcos
- **Estatísticas**: Acompanhamento detalhado do progresso
- **Streaks**: Sequência de dias consecutivos

### 🎨 Interface
- **Tema Dinâmico**: Alternância entre modo claro/escuro
- **Animações**: Transições suaves e micro-interações
- **Responsividade**: Adaptação para diferentes tamanhos de tela
- **Acessibilidade**: Suporte a leitores de tela

### 🔐 Autenticação
- **Login/Registro**: Sistema completo de autenticação
- **Persistência**: Tokens salvos no localStorage
- **Proteção de Rotas**: Redirecionamento baseado em autenticação
- **Logout**: Limpeza segura de dados

### 🏋️ Treinos
- **Cronômetro**: Timer para exercícios e descanso
- **Progresso Visual**: Barras de progresso e indicadores
- **Histórico**: Registro de sessões anteriores
- **Recomendações**: Treinos personalizados por nível

## 👥 Sistema de Roles

### 🎓 Aluno (STUDENT)
- Fazer treinos e acompanhar progresso
- Visualizar estatísticas pessoais
- Desbloquear conquistas
- Gerenciar perfil pessoal

### 🏋️ Treinador (TRAINER)
- Criar e gerenciar treinos
- Monitorar alunos atribuídos
- Visualizar progresso dos alunos
- Dashboard de treinador

### 👑 Administrador (ADMIN)
- Gerenciar usuários e permissões
- Atribuir treinadores a alunos
- Acessar estatísticas do sistema
- Dashboard administrativo

## 🚀 Deploy

### Deploy no Vercel (Recomendado)

1. **Conecte sua conta GitHub**
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com GitHub

2. **Importe o projeto**
   - Clique em "New Project"
   - Selecione o repositório
   - Configure:
     - **Framework Preset**: Create React App
     - **Root Directory**: `app-cirqulo-fit`
     - **Build Command**: `npm run build`
     - **Output Directory**: `build`

3. **Configure variáveis de ambiente**
   ```
   REACT_APP_API_URL=https://seu-backend.railway.app/api/v1
   REACT_APP_ENVIRONMENT=production
   ```

4. **Deploy automático**
   - O Vercel fará deploy automático a cada push
   - URL será: `https://cirqulo-fit.vercel.app`

### Deploy Manual

```bash
# Build de produção
npm run build

# Os arquivos estarão na pasta build/
# Faça upload para seu servidor web
```

## ⚙️ Configuração

### Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|---------|
| `REACT_APP_API_URL` | URL da API backend | `http://localhost:8000/api/v1` |
| `REACT_APP_ENVIRONMENT` | Ambiente (development/production) | `development` |

### Configuração de Tema

```typescript
// src/styles/theme.ts
export const lightTheme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    // ...
  }
}

export const darkTheme = {
  colors: {
    primary: '#0d6efd',
    secondary: '#6c757d',
    // ...
  }
}
```

### Configuração de API

```typescript
// src/services/authService.ts
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';
```

## 🧪 Testes

### Testes Manuais

1. **Teste de Autenticação**
   - Acesse http://localhost:3000
   - Teste login com usuários pré-definidos
   - Verifique redirecionamento após login

2. **Teste de Funcionalidades**
   - Navegue entre páginas
   - Teste alternância de tema
   - Inicie um treino
   - Verifique responsividade

### Usuários de Teste

| Username | Senha | Role |
|----------|-------|------|
| usercirqulo | C!rqulo2025 | STUDENT |
| trainercirqulo | C!rqulo2025 | TRAINER |
| admincirqulo | C!rqulo2025 | ADMIN |
| admin@cirqulo.com | admin123 | ADMIN |
| treinador@cirqulo.com | treinador123 | TRAINER |
| usuario@cirqulo.com | 123456 | STUDENT |

## 🐛 Troubleshooting

### Problemas Comuns

#### 1. Erro de CORS
```
Access to fetch at 'http://localhost:8000/api/v1/auth/login' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solução**: Verifique se o backend está rodando e se o CORS está configurado.

#### 2. Erro 401 Unauthorized
```
Request failed with status code 401
```

**Solução**: Verifique se as credenciais estão corretas e se o token não expirou.

#### 3. Erro de Build
```
Module not found: Can't resolve 'styled-components'
```

**Solução**: Execute `npm install` para instalar dependências.

#### 4. Página em Branco
```
This page isn't working
```

**Solução**: 
- Verifique o console do navegador
- Confirme se o backend está rodando
- Verifique as variáveis de ambiente

#### 5. Tema não Alterna
```
Theme toggle not working
```

**Solução**: Verifique se o ThemeContext está configurado corretamente.

### Debug Avançado

#### 1. Console do Navegador
```javascript
// Verificar estado da aplicação
console.log('Auth State:', localStorage.getItem('authToken'));
console.log('Theme State:', localStorage.getItem('theme'));
```

#### 2. React DevTools
- Instale a extensão React DevTools
- Inspecione componentes e props
- Monitore re-renders

#### 3. Network Tab
- Verifique requisições para a API
- Confirme status codes
- Analise payloads

## 📱 Responsividade

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Teste em Diferentes Dispositivos
```bash
# Usar Chrome DevTools
# Pressione F12
# Clique no ícone de dispositivo
# Teste diferentes resoluções
```

## 🎨 Personalização

### Cores do Tema
```typescript
// src/styles/theme.ts
export const customTheme = {
  colors: {
    primary: '#sua-cor-primaria',
    secondary: '#sua-cor-secundaria',
    // ...
  }
}
```

### Logo Personalizado
```typescript
// src/components/CirquloLogo.tsx
// Substitua o componente por sua logo
```

### Estilos Customizados
```typescript
// src/components/SeuComponente.tsx
const StyledComponent = styled.div`
  // Seus estilos aqui
`;
```

## 📊 Performance

### Otimizações Implementadas
- **Lazy Loading**: Carregamento sob demanda
- **Memoização**: useMemo e useCallback
- **Code Splitting**: Divisão de código
- **Bundle Optimization**: Otimização de build

### Métricas
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🔄 Fluxo de Desenvolvimento

### 1. Desenvolvimento Local
```bash
# Terminal 1: Backend
cd api-cirqulo-fit
docker-compose up -d

# Terminal 2: Frontend
cd app-cirqulo-fit
npm start
```

### 2. Testes
```bash
# Teste manual no navegador
# http://localhost:3000

# Teste de API
cd api-cirqulo-fit
python scripts/test-api.py
```

### 3. Deploy
```bash
# Commit das alterações
git add .
git commit -m "feat: nova funcionalidade"
git push origin main

# Deploy automático no Vercel
```

## 📝 Licença

Este projeto faz parte do ecossistema Cirqulo.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📞 Suporte

Para suporte e dúvidas:
- Abra uma issue no GitHub
- Consulte a documentação da API
- Verifique os logs do console