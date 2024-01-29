import AuthProvider from './AuthProvider';
import { ReactNode } from 'react';

const Providers = ({ children }: { children?: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default Providers;
