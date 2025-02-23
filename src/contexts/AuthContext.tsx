import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { UserDTO } from '../@types/User';

import { getUser } from '@/services/database';

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextData = {
  user: UserDTO | null;
  isSignedIn: boolean;
  isLoaded: boolean;
  updateUser: (newUser: UserDTO) => void;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    async function checkUser() {
      try {
        const user = await getUser();
        if (!user) {
          throw new Error('Usuário não encontrado');
        }
        setUser(user);
        setIsLoaded(true);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log('Erro ao buscar user');
        }
        setIsLoaded(true);
      }
    }
    checkUser();
  }, []);

  function updateUser(newUser: UserDTO) {
    setUser(newUser);
  }

  return (
    <AuthContext.Provider value={{ user, isLoaded, isSignedIn: !!user, updateUser }}>
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
