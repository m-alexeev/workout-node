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
  filtersUpdate: (
    key: keyof Omit<IFilterInterface, "name">,
    filter: equipmentType | targetType | bodyPartType
  ) => void;
}

interface FilterContextProps {
  children: ReactNode;
}

const FilterContext = createContext<IFilterContextInterface | null>(null);

const FilterProvider: FC<FilterContextProps> = ({ children }) => {
  const [filters, setFilter] = useState<IFilterInterface>({
    name: "",
    targets: [],
    bodyParts: [],
    equipments: [],
  });

  const searchUpdate = (query: string) => {
    setFilter({...filters, name: query});
  };

  const filtersUpdate = (
    key: keyof Omit<IFilterInterface, "name">,
    filter: equipmentType | targetType | bodyPartType
  ) => {
    // Check if filter in list 
    // Remove if present else add

    // any[] to avoid type errors
    const activeList: any[] = filters[key];
    if (activeList.includes(filter)){
      activeList.splice(activeList.indexOf(filter));
    }else{
      activeList.push(filter);      
    }
    // Update filter list
    setFilter({...filters,[key]: filter});
  };


  useEffect(()=> {
    console.log("Filters: " + filters);
  },[filters]);

  return (
    <FilterContext.Provider value={{filters, filtersUpdate, searchUpdate }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () =>{
  const context = useContext(FilterContext) as IFilterContextInterface;
  if (context === undefined){
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
}

export { FilterProvider };
