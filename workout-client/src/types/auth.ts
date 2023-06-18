export type LocalUser = {
    first_name: string;
    last_name: string;
    weight?: number;
    height?: number
}
  
export type LocalAuthType = {
    user: LocalUser | null;
    isLoading: boolean;
    isRehydrating: boolean;
}