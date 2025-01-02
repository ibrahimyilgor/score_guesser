import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define the type for your context
interface SettingsContextType {
  lang: string;
  setLang: (lang: string) => void;
}

// Create a default value for the context
const defaultContextValue: SettingsContextType = {
  lang: "en",
  setLang: () => {}, // Dummy function to prevent errors before initialization
};

// Create the context
const SettingsContext = createContext<SettingsContextType>(defaultContextValue);

interface SettingsProviderProps {
    children: ReactNode;
  }
  
  export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
    const [lang, setLang] = useState<string>("en");

    useEffect(() => {
        //Language
        let localLang = localStorage.getItem("lang");
        if(typeof localLang === "string"){
            localLang = JSON.parse(localLang);
            if (localLang) {
                setLang(localLang);
            }
        }
    }, []);
  
    return (
      <SettingsContext.Provider value={{ lang, setLang }}>
        {children}
      </SettingsContext.Provider>
    );
  };
