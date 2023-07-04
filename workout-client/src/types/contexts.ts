import { UserInfo } from "firebase/auth";
import { bodyPartType, equipmentType, targetType } from "./exercises";

export interface IFilterInterface {
  targets: targetType[];
  equipments: equipmentType[];
  bodyParts: bodyPartType[];
  name: string;
};

export type UserCredentials = {
  email: string;
  password: string;
}

export type UserRegisterCredentials = {
  email: string;
  password: string;
  conf_password: string;
}

export type LocalUser = {
  first_name: string;
  last_name: string;
  weight?: number;
  height?: number;
};

export type LocalAuthType = {
  user: UserInfo | null;
  isLoading: boolean;
  isRehydrating: boolean;
};

export type LanguageType = "en" | "ru";

export type UnitType = "metric" | "imperial";
