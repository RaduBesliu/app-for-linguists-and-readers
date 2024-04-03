import AuthProvider from './AuthProvider';
import { ReactNode } from 'react';
import AlertProvider from './AlertProvider';
import SidebarProvider from './SidebarProvider';
import StoriesProvider from './StoriesProvider';
import AlignmentsProvider from './AlignmentsProvider';
import DictionaryProvider from './DictionaryProvider';
import LoaderProvider from './LoaderProvider';

const Providers = ({ children }: { children?: ReactNode }) => {
  return (
    <AuthProvider>
      <LoaderProvider>
        <SidebarProvider>
          <AlertProvider>
            <DictionaryProvider>
              <StoriesProvider>
                <AlignmentsProvider>{children}</AlignmentsProvider>
              </StoriesProvider>
            </DictionaryProvider>
          </AlertProvider>
        </SidebarProvider>
      </LoaderProvider>
    </AuthProvider>
  );
};

export default Providers;
