export interface ValidationErrorSimple {
  field: string;
  errors: { [type: string]: string };
}

export interface AuthErrors {
  user_errors?: ValidationErrorSimple[];
  stats_errors?: ValidationErrorSimple[];
}

export interface Login {
  token: string;
}

export interface Register {
  message: string;
}

export interface ApiError {
  message: string;
}

export type LoginResponse = Login | AuthErrors | ApiError;
export type RegisterResponse = Register | AuthErrors | ApiError;
