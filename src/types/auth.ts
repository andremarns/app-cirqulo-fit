export interface User {
  id: number;
  email: string;
  username: string;
  name: string;
  level: number;
  experience: number;
  created_at?: string;
}

export interface UserStats {
  total_workouts: number;
  total_time: number;
  total_weight: number;
  current_streak: number;
  longest_streak: number;
  favorite_exercise?: string;
}

export interface UserProfile {
  user: User;
  stats: UserStats;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  name: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}
