import React from 'react';

export interface AuthContextType {
  signIn: (data: any) => Promise<{status: boolean; data: any}>;
  signUp: (data: any) => Promise<{status: boolean; data: any}>;
  goHome: () => Promise<void>;
}

// Default function definitions.
export const AuthContext = React.createContext<AuthContextType>({
  signIn: async (data) => {
    return data;
  },
  signUp: async (data) => {
    return data;
  },
  goHome: async () => {},
});
