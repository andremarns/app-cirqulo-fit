export interface Exercise {
  id: string;
  name: string;
  description: string;
  muscleGroups: string[];
  equipment: string;
  gifUrl?: string;
  instructions: string[];
}

export interface WorkoutSet {
  reps: number;
  weight: number;
  completed: boolean;
  restTime?: number;
}

export interface WorkoutExercise {
  exercise: Exercise;
  sets: WorkoutSet[];
  targetReps: number;
  targetSets: number;
  restTime: number; // em segundos
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  exercises: WorkoutExercise[];
  estimatedDuration: number; // em minutos
  difficulty: 'easy' | 'medium' | 'hard';
  level: number;
}

export interface WorkoutSession {
  id: string;
  workoutId: string;
  startTime: Date;
  endTime?: Date;
  exercises: WorkoutExercise[];
  completed: boolean;
  totalDuration?: number; // em minutos
}

export interface User {
  id: string;
  name: string;
  level: number;
  experience: number;
  currentWorkout?: string;
  workoutHistory: WorkoutSession[];
  achievements: Achievement[];
  stats: UserStats;
}

export interface UserStats {
  totalWorkouts: number;
  totalTime: number; // em minutos
  totalWeight: number; // peso total levantado
  currentStreak: number; // dias consecutivos
  longestStreak: number;
  favoriteExercise?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  category: 'streak' | 'weight' | 'workout' | 'level';
}

export interface Level {
  number: number;
  name: string;
  requiredExperience: number;
  description: string;
  color: string;
  workout: Workout;
}

export interface TimerState {
  isRunning: boolean;
  timeLeft: number; // em segundos
  totalTime: number;
  type: 'rest' | 'work' | 'warmup' | 'cooldown';
}

export interface AppState {
  user: User;
  currentSession?: WorkoutSession;
  timer: TimerState;
  isWorkoutActive: boolean;
}
