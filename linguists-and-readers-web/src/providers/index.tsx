import AuthProvider from './AuthProvider';
import { ReactNode } from 'react';
import AlertProvider from './AlertProvider';

const Providers = ({ children }: { children?: ReactNode }) => {
  return (
    <AuthProvider>
      <AlertProvider>{children}</AlertProvider>
    </AuthProvider>
  );
};

export default Providers;
