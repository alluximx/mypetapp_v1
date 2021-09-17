import React from 'react';

export interface AuthContextType {
  isGuest: boolean;
  userId: number | null;
  goHomeAsGuest: () => void;
  setUserId: (userId: number) => void;
  signIn: (data: any) => Promise<{status: boolean; data: any}>;
  signUp: (data: any) => Promise<{status: boolean; data: any}>;
  signOut: () => Promise<void>;
}

// Default function definitions.
export const AuthContext = React.createContext<AuthContextType>({
  isGuest: false,
  userId: null,
  goHomeAsGuest: () => {},
  setUserId: () => {},
  signIn: async (data) => {
    return data;
  },
  signUp: async (data) => {
    return data;
  },
  signOut: async () => {},
});
