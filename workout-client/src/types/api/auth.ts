export type LoginType = {
  email: string;
  password: string;
}

export type RegisterType = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  weight?: number;
  height?: number;
  fat_percentage?: number;
}

export type AuthType = {
  token : string | null;  
  authenticated: boolean | null;
  isLoading: boolean;
}

export type JWTType = {
  data: string; 
  iat: number; 
  exp: number;
}