import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for your context
interface AuthContextType {
  user: string | null;
  setUser: (user: string | null) => void;
}

// Create a default value for the context
const defaultContextValue: AuthContextType = {
  user: null,
  setUser: () => {}, // Dummy function to prevent errors before initialization
};

// Create the context
const AuthContext = createContext<AuthContextType>(defaultContextValue);

interface AuthProviderProps {
    children: ReactNode;
  }
  
  export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<string | null>(null);
  
    return (
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    );
  };
