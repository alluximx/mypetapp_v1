import React from 'react';

export interface AuthContextType {
  isGuest: boolean;
  goHomeAsGuest: () => void;
  signIn: (data: any) => Promise<{status: boolean; data: any}>;
  signUp: (data: any) => Promise<{status: boolean; data: any}>;
  signOut: () => Promise<void>;
}

// Default function definitions.
export const AuthContext = React.createContext<AuthContextType>({
  isGuest: false,
  goHomeAsGuest: () => {},
  signIn: async (data) => {
    return data;
  },
  signUp: async (data) => {
    return data;
  },
  signOut: async () => {},
});
