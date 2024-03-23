import AuthProvider from './AuthProvider';
import { ReactNode } from 'react';
import AlertProvider from './AlertProvider';
import SidebarProvider from './SidebarProvider';
import StoriesProvider from './StoriesProvider';
import AlignmentsProvider from './AlignmentsProvider';
import DictionaryProvider from './DictionaryProvider';

const Providers = ({ children }: { children?: ReactNode }) => {
  return (
    <AuthProvider>
      <SidebarProvider>
        <AlertProvider>
          <DictionaryProvider>
            <StoriesProvider>
              <AlignmentsProvider>{children}</AlignmentsProvider>
            </StoriesProvider>
          </DictionaryProvider>
        </AlertProvider>
      </SidebarProvider>
    </AuthProvider>
  );
};

export default Providers;
