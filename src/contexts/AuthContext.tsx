import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { UserDTO } from '@/@types/User';
import { UserServices } from '@/database/services';

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextData = {
  user: UserDTO | null;
  isSignedIn: boolean;
  isLoaded: boolean;
  updateUser: (newUser: UserDTO) => void;
  checkUser: () => Promise<void>;
  updateProfile: (userData: Pick<UserDTO, 'name' | 'lastName'>) => Promise<boolean>;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  async function checkUser() {
    try {
      const user = await UserServices.get();
      if (user) {
        setUser(user);
        setIsLoaded(true);
      } else {
        setUser(null);
        setIsLoaded(true);
      }
    } catch (error) {
      setIsLoaded(true);
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log('Erro ao buscar user');
      }
    }
  }
  useEffect(() => {
    checkUser();
  }, []);

  function updateUser(newUser: UserDTO) {
    setUser(newUser);
  }
  async function updateProfile(userData: Pick<UserDTO, 'name' | 'lastName'>): Promise<boolean> {
    if (!user) {
      return false;
    } else {
      const data = await UserServices.update({ uid: user.uid, ...userData });
      updateUser(data);
      return true;
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoaded, isSignedIn: !!user, updateUser, checkUser, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Fora do contexto');
  }
  return context;
}
