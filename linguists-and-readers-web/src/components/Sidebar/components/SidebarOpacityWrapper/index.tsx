import { LocalComponents } from './styled.ts';
import { ReactNode, useContext } from 'react';
import { SidebarContext } from '../../../../providers/SidebarProvider/context.ts';

const SidebarOpacityWrapper = ({ children }: { children: ReactNode }) => {
  const { isSidebarOpen } = useContext(SidebarContext);

  return <LocalComponents.Container $isSidebarOpen={isSidebarOpen}>{children}</LocalComponents.Container>;
};

export default SidebarOpacityWrapper;
