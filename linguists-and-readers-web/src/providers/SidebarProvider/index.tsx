import { ReactNode, useMemo, useState } from 'react';
import { SidebarContext } from './context';

const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const value = useMemo(() => ({ isSidebarOpen, openSidebar, closeSidebar }), [isSidebarOpen]);

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};

export default SidebarProvider;
