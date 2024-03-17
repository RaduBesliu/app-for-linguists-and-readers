import AuthProvider from './AuthProvider';
import { ReactNode } from 'react';
import AlertProvider from './AlertProvider';
import SidebarProvider from './SidebarProvider';
import StoriesProvider from './StoriesProvider';
import AlignmentsProvider from './AlignmentsProvider';

const Providers = ({ children }: { children?: ReactNode }) => {
  return (
    <AuthProvider>
      <SidebarProvider>
        <AlertProvider>
          <StoriesProvider>
            <AlignmentsProvider>{children}</AlignmentsProvider>
          </StoriesProvider>
        </AlertProvider>
      </SidebarProvider>
    </AuthProvider>
  );
};

export default Providers;
