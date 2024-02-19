import AuthProvider from './AuthProvider';
import { ReactNode } from 'react';
import AlertProvider from './AlertProvider';
import SidebarProvider from './SidebarProvider';

const Providers = ({ children }: { children?: ReactNode }) => {
  return (
    <AuthProvider>
      <SidebarProvider>
        <AlertProvider>{children}</AlertProvider>
      </SidebarProvider>
    </AuthProvider>
  );
};

export default Providers;
