import { LocalComponents } from './styled.ts';
import ArrowCircleLeftTwoToneIcon from '@mui/icons-material/ArrowCircleLeftTwoTone';
import { COLORS } from '../../../../utils/colors.ts';
import { SidebarContext } from '../../../../providers/SidebarProvider/context.ts';
import { useContext } from 'react';

const SidebarToggleButton = () => {
  const { isSidebarOpen, openSidebar, closeSidebar } = useContext(SidebarContext);

  const handleToggle = () => {
    if (isSidebarOpen) {
      closeSidebar();
      return;
    }

    openSidebar();
  };

  return (
    <LocalComponents.Container $isSidebarOpen={isSidebarOpen} onClick={handleToggle}>
      <ArrowCircleLeftTwoToneIcon htmlColor={COLORS.primary} fontSize={'inherit'} />
    </LocalComponents.Container>
  );
};

export default SidebarToggleButton;
