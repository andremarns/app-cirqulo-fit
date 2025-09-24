# 💪 CirquloFit - Aplicação de Treino Gamificada

Uma aplicação React responsiva para acompanhar treinos de forma gamificada, com sistema de níveis, experiência e acompanhamento de progresso.

## 🚀 Funcionalidades

### ✅ MVP Implementado
- **Sistema de Níveis**: 3 níveis (Iniciante, Aprendiz, Intermediário)
- **Treino Fullbody Easy**: Baseado no treino fornecido
- **Acompanhamento de Séries**: Controle de repetições e peso
- **Timer de Descanso**: Cronômetro para intervalos entre séries
- **Sistema de Experiência**: Ganho de XP por treino completado
- **Interface Responsiva**: Funciona em mobile e desktop
- **Persistência Local**: Dados salvos no localStorage
- **Design Moderno**: Interface limpa e intuitiva
- **Temas**: Modo claro e escuro com toggle
- **GIFs dos Exercícios**: Integração com Tenor API

### 🎮 Gamificação
- **Níveis**: Progressão baseada em experiência
- **XP**: Ganho de experiência por treino
- **Estatísticas**: Acompanhamento de progresso
- **Sequência**: Contador de dias consecutivos

### 📱 Responsividade
- Design adaptativo para mobile e desktop
- Interface touch-friendly
- Componentes otimizados para diferentes tamanhos de tela

## 🛠️ Tecnologias Utilizadas

- **React 18** com TypeScript
- **Styled Components** para estilização
- **Context API** para gerenciamento de estado
- **Lucide React** para ícones
- **Axios** para requisições HTTP
- **Tenor API** para GIFs dos exercícios

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd app-gim
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm start
```

4. Acesse `http://localhost:3000` no seu navegador

## 🏋️ Como Usar

### 1. Página Inicial
- Visualize suas estatísticas e progresso
- Veja seu nível atual e experiência
- Clique em "Iniciar Treino" para começar

### 2. Durante o Treino
- Complete as séries marcando como concluídas
- Ajuste peso e repetições conforme necessário
- Use o timer de descanso entre séries
- Acompanhe o progresso em tempo real

### 3. Finalização
- Complete todas as séries para finalizar o treino
- Ganhe experiência e suba de nível
- Visualize suas estatísticas atualizadas

## 🎯 Treino Implementado

### Fullbody Easy (Nível 1)
1. **Cardio Leve** (5-10 min)
2. **Agachamento** (3x10 reps)
3. **Supino Reto** (3x10 reps)
4. **Remada Baixa** (3x10 reps)
5. **Desenvolvimento de Ombros** (3x10 reps)
6. **Puxada na Polia Alta** (3x10 reps)
7. **Mesa Flexora** (3x10 reps)
8. **Prancha** (3x20s)
9. **Crunch** (3x15 reps)

### Progressão
- **Descanso**: 60-90s entre séries
- **Repetições**: 10-15 reps
- **Carga**: Aumentar 5-10% quando atingir 15 reps
- **Duração**: 6-10 semanas no nível Easy

## 🔧 Configuração da API Tenor

Para usar os GIFs dos exercícios, você precisa de uma chave da API Tenor:

1. Acesse [Tenor API](https://developers.google.com/tenor)
2. Crie uma conta e obtenha sua chave
3. Substitua a chave em `src/services/tenorService.ts`:
```typescript
const TENOR_API_KEY = 'SUA_CHAVE_AQUI';
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ExerciseCard.tsx
│   ├── ProgressBar.tsx
│   ├── Timer.tsx
│   └── UserStats.tsx
├── contexts/           # Context API
│   └── WorkoutContext.tsx
├── data/              # Dados estáticos
│   └── workouts.ts
├── pages/             # Páginas da aplicação
│   ├── HomePage.tsx
│   └── WorkoutPage.tsx
├── services/          # Serviços externos
│   └── tenorService.ts
├── types/             # Definições TypeScript
│   └── index.ts
└── App.tsx           # Componente principal
```

## 🎨 Design System

### Cores
- **Primária**: #667eea (Azul)
- **Secundária**: #764ba2 (Roxo)
- **Sucesso**: #4caf50 (Verde)
- **Aviso**: #ff9800 (Laranja)
- **Erro**: #f44336 (Vermelho)

### Tipografia
- **Fonte**: System fonts (San Francisco, Segoe UI, etc.)
- **Tamanhos**: 0.8rem - 2.5rem
- **Pesos**: 400, 500, 600, 700

## 🚀 Próximos Passos

### Funcionalidades Futuras
- [ ] Treinos Medium (A-B) e Hard (A-B-C)
- [ ] Sistema de conquistas
- [ ] Histórico detalhado de treinos
- [ ] Gráficos de progresso
- [ ] Notificações de lembrete
- [ ] Sincronização com nuvem
- [ ] Modo offline
- [ ] PWA (Progressive Web App)

### Melhorias Técnicas
- [ ] Testes unitários
- [ ] Testes de integração
- [ ] Otimização de performance
- [ ] Acessibilidade (a11y)
- [ ] Internacionalização (i18n)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, abra uma issue ou pull request.

---

**Desenvolvido com 💪 para ajudar na sua jornada fitness!**