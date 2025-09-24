import { Workout, Exercise } from '../types';

export const exercises: Exercise[] = [
  {
    id: 'cardio-warmup',
    name: 'Cardio Leve',
    description: 'Aquecimento cardiovascular',
    muscleGroups: ['cardio'],
    equipment: 'Esteira/Bicicleta/Elíptico',
    instructions: [
      'Mantenha um ritmo confortável',
      'Foque na respiração',
      'Não force muito no início'
    ]
  },
  {
    id: 'squat',
    name: 'Agachamento',
    description: 'Exercício para quadríceps e glúteos',
    muscleGroups: ['quadríceps', 'glúteos'],
    equipment: 'Peso corporal ou Smith',
    instructions: [
      'Pés na largura dos ombros',
      'Desça até 90 graus',
      'Mantenha o peito erguido',
      'Subida controlada'
    ]
  },
  {
    id: 'bench-press',
    name: 'Supino Reto',
    description: 'Exercício para peito, tríceps e ombros',
    muscleGroups: ['peito', 'tríceps', 'ombros'],
    equipment: 'Barra ou Halteres',
    instructions: [
      'Deite no banco com os pés no chão',
      'Segure a barra com pegada média',
      'Desça controladamente até o peito',
      'Empurre para cima com força'
    ]
  },
  {
    id: 'row',
    name: 'Remada Baixa',
    description: 'Exercício para costas e bíceps',
    muscleGroups: ['costas', 'bíceps'],
    equipment: 'Máquina ou Barra',
    instructions: [
      'Sente-se com as pernas flexionadas',
      'Puxe o cabo em direção ao abdômen',
      'Mantenha as costas retas',
      'Contraia as escápulas'
    ]
  },
  {
    id: 'shoulder-press',
    name: 'Desenvolvimento de Ombros',
    description: 'Exercício para ombros e trapézio',
    muscleGroups: ['ombros', 'trapézio'],
    equipment: 'Halteres ou Smith',
    instructions: [
      'Sente-se com as costas apoiadas',
      'Segure os halteres na altura dos ombros',
      'Empurre para cima até estender os braços',
      'Desça controladamente'
    ]
  },
  {
    id: 'lat-pulldown',
    name: 'Puxada na Polia Alta',
    description: 'Exercício para dorsal e bíceps',
    muscleGroups: ['dorsal', 'bíceps'],
    equipment: 'Polia Alta',
    instructions: [
      'Sente-se com as pernas fixas',
      'Puxe a barra em direção ao peito',
      'Mantenha o tronco ereto',
      'Contraia as costas'
    ]
  },
  {
    id: 'leg-curl',
    name: 'Mesa Flexora',
    description: 'Exercício para posterior de coxa e glúteo',
    muscleGroups: ['posterior de coxa', 'glúteos'],
    equipment: 'Mesa Flexora',
    instructions: [
      'Deite-se na máquina com as pernas fixas',
      'Flexione as pernas contraindo o posterior',
      'Mantenha o movimento controlado',
      'Retorne à posição inicial'
    ]
  },
  {
    id: 'plank',
    name: 'Prancha',
    description: 'Exercício isométrico para abdômen',
    muscleGroups: ['abdômen', 'core'],
    equipment: 'Peso corporal',
    instructions: [
      'Apoie-se nos antebraços e pés',
      'Mantenha o corpo em linha reta',
      'Contraia o abdômen',
      'Respire normalmente'
    ]
  },
  {
    id: 'crunch',
    name: 'Crunch',
    description: 'Exercício para abdômen',
    muscleGroups: ['abdômen'],
    equipment: 'Colchonete ou Banco',
    instructions: [
      'Deite-se com os joelhos flexionados',
      'Mãos atrás da cabeça',
      'Levante o tronco contraindo o abdômen',
      'Desça controladamente'
    ]
  }
];

export const easyWorkout: Workout = {
  id: 'easy-fullbody',
  name: 'Fullbody Easy',
  description: 'Treino completo para iniciantes - 3x por semana',
  difficulty: 'easy',
  level: 1,
  estimatedDuration: 60,
  exercises: [
    {
      exercise: exercises[0], // Cardio
      sets: [{ reps: 5, weight: 0, completed: false }],
      targetReps: 5,
      targetSets: 1,
      restTime: 0
    },
    {
      exercise: exercises[1], // Agachamento
      sets: [
        { reps: 10, weight: 0, completed: false, restTime: 60 },
        { reps: 10, weight: 0, completed: false, restTime: 60 },
        { reps: 10, weight: 0, completed: false, restTime: 60 }
      ],
      targetReps: 10,
      targetSets: 3,
      restTime: 60
    },
    {
      exercise: exercises[2], // Supino
      sets: [
        { reps: 10, weight: 0, completed: false, restTime: 60 },
        { reps: 10, weight: 0, completed: false, restTime: 60 },
        { reps: 10, weight: 0, completed: false, restTime: 60 }
      ],
      targetReps: 10,
      targetSets: 3,
      restTime: 60
    },
    {
      exercise: exercises[3], // Remada
      sets: [
        { reps: 10, weight: 0, completed: false, restTime: 60 },
        { reps: 10, weight: 0, completed: false, restTime: 60 },
        { reps: 10, weight: 0, completed: false, restTime: 60 }
      ],
      targetReps: 10,
      targetSets: 3,
      restTime: 60
    },
    {
      exercise: exercises[4], // Desenvolvimento
      sets: [
        { reps: 10, weight: 0, completed: false, restTime: 60 },
        { reps: 10, weight: 0, completed: false, restTime: 60 },
        { reps: 10, weight: 0, completed: false, restTime: 60 }
      ],
      targetReps: 10,
      targetSets: 3,
      restTime: 60
    },
    {
      exercise: exercises[5], // Puxada
      sets: [
        { reps: 10, weight: 0, completed: false, restTime: 60 },
        { reps: 10, weight: 0, completed: false, restTime: 60 },
        { reps: 10, weight: 0, completed: false, restTime: 60 }
      ],
      targetReps: 10,
      targetSets: 3,
      restTime: 60
    },
    {
      exercise: exercises[6], // Mesa Flexora
      sets: [
        { reps: 10, weight: 0, completed: false, restTime: 60 },
        { reps: 10, weight: 0, completed: false, restTime: 60 },
        { reps: 10, weight: 0, completed: false, restTime: 60 }
      ],
      targetReps: 10,
      targetSets: 3,
      restTime: 60
    },
    {
      exercise: exercises[7], // Prancha
      sets: [
        { reps: 20, weight: 0, completed: false, restTime: 60 },
        { reps: 20, weight: 0, completed: false, restTime: 60 },
        { reps: 20, weight: 0, completed: false, restTime: 60 }
      ],
      targetReps: 20,
      targetSets: 3,
      restTime: 60
    },
    {
      exercise: exercises[8], // Crunch
      sets: [
        { reps: 15, weight: 0, completed: false, restTime: 60 },
        { reps: 15, weight: 0, completed: false, restTime: 60 },
        { reps: 15, weight: 0, completed: false, restTime: 60 }
      ],
      targetReps: 15,
      targetSets: 3,
      restTime: 60
    }
  ]
};

export const levels: { [key: number]: any } = {
  1: {
    number: 1,
    name: 'Iniciante',
    requiredExperience: 0,
    description: 'Primeiros passos na academia',
    color: '#4CAF50',
    workout: easyWorkout
  },
  2: {
    number: 2,
    name: 'Aprendiz',
    requiredExperience: 100,
    description: 'Já está pegando o ritmo!',
    color: '#2196F3',
    workout: easyWorkout // Por enquanto o mesmo, depois implementamos Medium
  },
  3: {
    number: 3,
    name: 'Intermediário',
    requiredExperience: 300,
    description: 'Hora de aumentar a intensidade',
    color: '#FF9800',
    workout: easyWorkout // Por enquanto o mesmo, depois implementamos Hard
  }
};
