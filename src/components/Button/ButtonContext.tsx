import { createContext, useContext } from 'react';

type Variant = 'filled' | 'outline';
type ButtonContextType = {
  loading?: boolean;
  variant?: Variant;
};

export const ButtonContext = createContext<ButtonContextType>({});

export const useButtonContext = () => useContext(ButtonContext);
