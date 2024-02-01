import { createContext } from 'react';

interface AlertContextProps {
  showAlert: (type: 'success' | 'error' | 'info' | 'warning', message: string, duration?: number) => void;
}

export const AlertContext = createContext<AlertContextProps>({
  showAlert: () => {},
});
