import { ReactNode, useContext } from 'react';
import { LocalComponents } from './styled.ts';
import { SidebarContext } from '../../../../providers/SidebarProvider/context.ts';
import { useNavigate } from 'react-router-dom';

interface SidebarLinkProps {
  title: string;
  icon: ReactNode;
  navigateTo: string;
  isActive: boolean;
}

const SidebarLink = ({ title, icon, navigateTo, isActive }: SidebarLinkProps) => {
  const navigate = useNavigate();
  const { isSidebarOpen } = useContext(SidebarContext);

  const onClick = () => {
    navigate(navigateTo);
  };

  return (
    <LocalComponents.Container onClick={onClick} $isActive={isActive}>
      {icon}
      <LocalComponents.Title $isSidebarOpen={isSidebarOpen} $isActive={isActive}>
        {isSidebarOpen && title}
      </LocalComponents.Title>
    </LocalComponents.Container>
  );
};

export default SidebarLink;
