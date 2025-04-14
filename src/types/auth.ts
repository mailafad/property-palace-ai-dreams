
export interface UserRegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  full_name?: string;
  phone?: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserProfile {
  id?: string;
  user_id?: string;
  full_name?: string;
  avatar_url?: string | null;
  email?: string;
  phone?: string;
  role?: string;
  created_at?: string;
}
