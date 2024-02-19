import { createContext } from 'react';

interface SidebarProviderProps {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
}

export const SidebarContext = createContext<SidebarProviderProps>({
  isSidebarOpen: false,
  openSidebar: () => {},
  closeSidebar: () => {},
});
