import React from 'react';

export interface AuthContextType {
  isGuest: boolean;
  userId: number | null;
  goHomeAsGuest: (data: any) => Promise<{status: boolean; data: any}>;
  setUserId: (userId: number) => void;
  signIn: (data: any) => Promise<{status: boolean; data: any}>;
  signUp: (data: any) => Promise<{status: boolean; data: any}>;
  signOut: () => Promise<void>;
  signOutGuest: () => Promise<void>;
}

// Default function definitions.
export const AuthContext = React.createContext<AuthContextType>({
  isGuest: false,
  userId: null,
  goHomeAsGuest: async (data) => {
    return data;
  },
  setUserId: () => {},
  signIn: async (data) => {
    return data;
  },
  signUp: async (data) => {
    return data;
  },
  signOut: async () => {},
  signOutGuest: async () => {},
});
