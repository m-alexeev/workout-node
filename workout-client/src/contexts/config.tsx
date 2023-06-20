import React, {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState,
  useContext,
} from "react";
import * as SecureStore from "expo-secure-store";
import { LanguageType, UnitType } from "../types/config";

type ConfigType = {
  units: UnitType;
  language: LanguageType;
};

export interface IConfigContextInterface {
	config: ConfigType;
  updateUnits: (unit: UnitType) => void;
  updateLanguage: (language: LanguageType) => void;
}

interface ConfigProps {
  children: ReactNode;
}

const ConfigContext = createContext<IConfigContextInterface | null>(null);

const ConfigProvider: FC<ConfigProps> = ({ children }) => {
	const [config, setConfig] = useState<ConfigType>({units: "metric", language: "en"});


  const getSavedConfig = async () => {
    const configJson = await SecureStore.getItemAsync("config");
    let config = {};
    if (configJson){
        config = JSON.parse(configJson);
    }
		 setConfig(config as ConfigType);		
  };

  useEffect(() => {
    getSavedConfig();
  }, []);

	useEffect(() => {
		// save updated config to local storage
		console.log(config);
		SecureStore.setItemAsync("config", JSON.stringify(config));
	}, [config]);

	const updateLanguage = (language: LanguageType) => {
		setConfig({...config, language: language});
	} 
	
	const updateUnits = (units: UnitType) => {
		setConfig({...config, units: units});
	}

	return(
		<ConfigContext.Provider value={{config, updateUnits, updateLanguage}}>
			{children}
		</ConfigContext.Provider>
	)

};

export const useConfig = () => 
	useContext(ConfigContext) as IConfigContextInterface;	

export {ConfigProvider}