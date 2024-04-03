import { createContext } from 'react';

export interface LoaderContextProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const LoaderContext = createContext<LoaderContextProps>({
  isLoading: false,
  setIsLoading: () => {},
});
