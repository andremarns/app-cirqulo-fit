import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, User, WorkoutSession, Achievement } from '../types';
import { easyWorkout, levels } from '../data/workouts';

type WorkoutAction =
  | { type: 'INITIALIZE_USER'; payload: User }
  | { type: 'START_WORKOUT'; payload: WorkoutSession }
  | { type: 'STOP_WORKOUT' }
  | { type: 'COMPLETE_SET'; payload: { exerciseIndex: number; setIndex: number } }
  | { type: 'UPDATE_WEIGHT'; payload: { exerciseIndex: number; setIndex: number; weight: number } }
  | { type: 'UPDATE_REPS'; payload: { exerciseIndex: number; setIndex: number; reps: number } }
  | { type: 'COMPLETE_WORKOUT' }
  | { type: 'START_TIMER'; payload: { duration: number; type: 'rest' | 'work' | 'warmup' | 'cooldown' } }
  | { type: 'STOP_TIMER' }
  | { type: 'TICK_TIMER' }
  | { type: 'UNLOCK_ACHIEVEMENT'; payload: Achievement }
  | { type: 'LEVEL_UP' };

interface WorkoutContextType {
  state: AppState;
  dispatch: React.Dispatch<WorkoutAction>;
  startWorkout: () => void;
  stopWorkout: () => void;
  completeSet: (exerciseIndex: number, setIndex: number) => void;
  updateWeight: (exerciseIndex: number, setIndex: number, weight: number) => void;
  updateReps: (exerciseIndex: number, setIndex: number, reps: number) => void;
  startRestTimer: (duration: number) => void;
  completeWorkout: () => void;
}

const initialState: AppState = {
  user: {
    id: '1',
    name: 'Usuário',
    level: 1,
    experience: 0,
    workoutHistory: [],
    achievements: [],
    stats: {
      totalWorkouts: 0,
      totalTime: 0,
      totalWeight: 0,
      currentStreak: 0,
      longestStreak: 0
    }
  },
  timer: {
    isRunning: false,
    timeLeft: 0,
    totalTime: 0,
    type: 'rest'
  },
  isWorkoutActive: false
};

const workoutReducer = (state: AppState, action: WorkoutAction): AppState => {
  switch (action.type) {
    case 'INITIALIZE_USER':
      return {
        ...state,
        user: action.payload
      };

    case 'START_WORKOUT':
      return {
        ...state,
        currentSession: action.payload,
        isWorkoutActive: true
      };

    case 'STOP_WORKOUT':
      return {
        ...state,
        currentSession: undefined,
        isWorkoutActive: false,
        timer: {
          isRunning: false,
          timeLeft: 0,
          totalTime: 0,
          type: 'rest'
        }
      };

    case 'COMPLETE_SET':
      if (!state.currentSession) return state;
      
      const updatedExercises = state.currentSession.exercises.map((exercise, exerciseIndex) => {
        if (exerciseIndex === action.payload.exerciseIndex) {
          return {
            ...exercise,
            sets: exercise.sets.map((set, setIndex) => {
              if (setIndex === action.payload.setIndex) {
                return { ...set, completed: true };
              }
              return set;
            })
          };
        }
        return exercise;
      });

      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          exercises: updatedExercises
        }
      };

    case 'UPDATE_WEIGHT':
      if (!state.currentSession) return state;
      
      const updatedExercisesWeight = state.currentSession.exercises.map((exercise, exerciseIndex) => {
        if (exerciseIndex === action.payload.exerciseIndex) {
          return {
            ...exercise,
            sets: exercise.sets.map((set, setIndex) => {
              if (setIndex === action.payload.setIndex) {
                return { ...set, weight: action.payload.weight };
              }
              return set;
            })
          };
        }
        return exercise;
      });

      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          exercises: updatedExercisesWeight
        }
      };

    case 'UPDATE_REPS':
      if (!state.currentSession) return state;
      
      const updatedExercisesReps = state.currentSession.exercises.map((exercise, exerciseIndex) => {
        if (exerciseIndex === action.payload.exerciseIndex) {
          return {
            ...exercise,
            sets: exercise.sets.map((set, setIndex) => {
              if (setIndex === action.payload.setIndex) {
                return { ...set, reps: action.payload.reps };
              }
              return set;
            })
          };
        }
        return exercise;
      });

      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          exercises: updatedExercisesReps
        }
      };

    case 'COMPLETE_WORKOUT':
      if (!state.currentSession) return state;
      
      const completedSession: WorkoutSession = {
        ...state.currentSession,
        endTime: new Date(),
        completed: true,
        totalDuration: Math.floor((new Date().getTime() - state.currentSession.startTime.getTime()) / 60000)
      };

      const newExperience = state.user.experience + 50; // 50 XP por treino
      const newLevel = Math.floor(newExperience / 100) + 1;

      const updatedUser: User = {
        ...state.user,
        level: newLevel,
        experience: newExperience,
        workoutHistory: [...state.user.workoutHistory, completedSession],
        stats: {
          ...state.user.stats,
          totalWorkouts: state.user.stats.totalWorkouts + 1,
          totalTime: state.user.stats.totalTime + (completedSession.totalDuration || 0),
          currentStreak: state.user.stats.currentStreak + 1,
          longestStreak: Math.max(state.user.stats.currentStreak + 1, state.user.stats.longestStreak)
        }
      };

      return {
        ...state,
        user: updatedUser,
        currentSession: undefined,
        isWorkoutActive: false,
        timer: {
          isRunning: false,
          timeLeft: 0,
          totalTime: 0,
          type: 'rest'
        }
      };

    case 'START_TIMER':
      return {
        ...state,
        timer: {
          isRunning: true,
          timeLeft: action.payload.duration,
          totalTime: action.payload.duration,
          type: action.payload.type
        }
      };

    case 'STOP_TIMER':
      return {
        ...state,
        timer: {
          ...state.timer,
          isRunning: false
        }
      };

    case 'TICK_TIMER':
      if (state.timer.timeLeft <= 1) {
        return {
          ...state,
          timer: {
            ...state.timer,
            isRunning: false,
            timeLeft: 0
          }
        };
      }
      return {
        ...state,
        timer: {
          ...state.timer,
          timeLeft: state.timer.timeLeft - 1
        }
      };

    case 'UNLOCK_ACHIEVEMENT':
      return {
        ...state,
        user: {
          ...state.user,
          achievements: [...state.user.achievements, action.payload]
        }
      };

    case 'LEVEL_UP':
      return {
        ...state,
        user: {
          ...state.user,
          level: state.user.level + 1
        }
      };

    default:
      return state;
  }
};

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, initialState);

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    const savedUser = localStorage.getItem('workout-user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      dispatch({ type: 'INITIALIZE_USER', payload: user });
    }
  }, []);

  // Salvar dados no localStorage quando o estado muda
  useEffect(() => {
    localStorage.setItem('workout-user', JSON.stringify(state.user));
  }, [state.user]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (state.timer.isRunning && state.timer.timeLeft > 0) {
      interval = setInterval(() => {
        dispatch({ type: 'TICK_TIMER' });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state.timer.isRunning, state.timer.timeLeft]);

  const startWorkout = () => {
    const currentWorkout = levels[state.user.level]?.workout || easyWorkout;
    const session: WorkoutSession = {
      id: Date.now().toString(),
      workoutId: currentWorkout.id,
      startTime: new Date(),
      exercises: currentWorkout.exercises.map((exercise: any) => ({
        ...exercise,
        sets: exercise.sets.map((set: any) => ({ ...set, completed: false }))
      })),
      completed: false
    };
    dispatch({ type: 'START_WORKOUT', payload: session });
  };

  const stopWorkout = () => {
    dispatch({ type: 'STOP_WORKOUT' });
  };

  const completeSet = (exerciseIndex: number, setIndex: number) => {
    dispatch({ type: 'COMPLETE_SET', payload: { exerciseIndex, setIndex } });
  };

  const updateWeight = (exerciseIndex: number, setIndex: number, weight: number) => {
    dispatch({ type: 'UPDATE_WEIGHT', payload: { exerciseIndex, setIndex, weight } });
  };

  const updateReps = (exerciseIndex: number, setIndex: number, reps: number) => {
    dispatch({ type: 'UPDATE_REPS', payload: { exerciseIndex, setIndex, reps } });
  };

  const startRestTimer = (duration: number) => {
    dispatch({ type: 'START_TIMER', payload: { duration, type: 'rest' } });
  };

  const completeWorkout = () => {
    dispatch({ type: 'COMPLETE_WORKOUT' });
  };

  const value: WorkoutContextType = {
    state,
    dispatch,
    startWorkout,
    stopWorkout,
    completeSet,
    updateWeight,
    updateReps,
    startRestTimer,
    completeWorkout
  };

  return (
    <WorkoutContext.Provider value={value}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
};
