import { bodyPartType, equipmentType, targetType } from "./exercises";

export interface IFilterInterface {
  targets: targetType[];
  equipments: equipmentType[];
  bodyParts: bodyPartType[];
  name: string;
};

export type LocalUser = {
  first_name: string;
  last_name: string;
  weight?: number;
  height?: number;
};

export type LocalAuthType = {
  user: LocalUser | null;
  isLoading: boolean;
  isRehydrating: boolean;
};

export type LanguageType = "en" | "ru";

export type UnitType = "metric" | "imperial";
