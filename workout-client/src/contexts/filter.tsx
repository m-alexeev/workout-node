import { IFilterInterface } from "../types/contexts";
import React, {
  ReactNode,
  useContext,
  createContext,
  FC,
  useState,
  useEffect,
} from "react";
import { bodyPartType, equipmentType, targetType } from "../types/exercises";

export interface IFilterContextInterface {
  filters: IFilterInterface;
  searchUpdate: (query: string) => void;
  filtersUpdate: (filter: equipmentType | targetType | bodyPartType) => void;
}

interface FilterContextProps {
  children: ReactNode;
}

const FilterContext = createContext<IFilterContextInterface | null>(null);

const ContextProvider: FC<FilterContextProps> = ({ children }) => {
  const [filters, setFilter] = useState<IFilterInterface>({
    name: "",
    targets: [],
    bodyParts: [],
    equipments: [],
  });

  const searchUpdate = (query: string) => {};

  const filtersUpdate = (
    filters: equipmentType | targetType | bodyPartType
  ) => {};

  return (
    <FilterContext.Provider
      value={{ filters, filtersUpdate, searchUpdate }}
    ></FilterContext.Provider>
  );
};
