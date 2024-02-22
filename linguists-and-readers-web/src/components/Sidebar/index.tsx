import { LocalComponents } from './styled.ts';
import { Outlet, useLocation } from 'react-router-dom';
import SidebarToggleButton from './components/SidebarToggleButton';
import { useContext } from 'react';
import { SidebarContext } from '../../providers/SidebarProvider/context.ts';
import { AuthContext } from '../../providers/AuthProvider/context.ts';
import Button from '../Button';
import SidebarOpacityWrapper from './components/SidebarOpacityWrapper';
import SidebarLink from './components/SidebarLink';
import { COLORS } from '../../utils/colors.ts';
import HomeIcon from '@mui/icons-material/Home';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import PersonIcon from '@mui/icons-material/Person';

const links = [
  {
    title: 'Home',
    icon: <HomeIcon fontSize={'inherit'} htmlColor={COLORS.black} />,
    activeIcon: <HomeIcon fontSize={'inherit'} htmlColor={COLORS.primary} />,
    navigateTo: 'home',
  },
  {
    title: 'Stories',
    icon: <AutoStoriesIcon fontSize={'inherit'} htmlColor={COLORS.black} />,
    activeIcon: <AutoStoriesIcon fontSize={'inherit'} htmlColor={COLORS.primary} />,
    navigateTo: 'stories',
  },
  {
    title: 'Dictionary',
    icon: <FontDownloadIcon fontSize={'inherit'} htmlColor={COLORS.black} />,
    activeIcon: <FontDownloadIcon fontSize={'inherit'} htmlColor={COLORS.primary} />,
    navigateTo: 'dictionary',
  },
  {
    title: 'Alignments',
    icon: <EditNoteIcon fontSize={'inherit'} htmlColor={COLORS.black} />,
    activeIcon: <EditNoteIcon fontSize={'inherit'} htmlColor={COLORS.primary} />,
    navigateTo: 'alignments',
  },
  {
    title: 'Account',
    icon: <PersonIcon fontSize={'inherit'} htmlColor={COLORS.black} />,
    activeIcon: <PersonIcon fontSize={'inherit'} htmlColor={COLORS.primary} />,
    navigateTo: 'account',
  },
];

const Sidebar = () => {
  const location = useLocation();
  const { isSidebarOpen } = useContext(SidebarContext);
  const { signOutUser } = useContext(AuthContext);

  return (
    <LocalComponents.Container>
      <LocalComponents.SidebarContainer $isSidebarOpen={isSidebarOpen}>
        <SidebarToggleButton />
        <LocalComponents.SidebarVerticalFlexContainer>
          <SidebarOpacityWrapper>
            <LocalComponents.Title>{'Linguists & Readers'}</LocalComponents.Title>
          </SidebarOpacityWrapper>
          <LocalComponents.LinksContainer>
            {links.map((link) => {
              const isActive = location.pathname.toLowerCase().includes(link.navigateTo.toLowerCase());
              return (
                <SidebarLink
                  key={link.title}
                  {...link}
                  icon={isActive ? link.activeIcon : link.icon}
                  isActive={isActive}
                />
              );
            })}
          </LocalComponents.LinksContainer>
          <SidebarOpacityWrapper>
            <Button label={'Log out'} type={'danger'} onClick={signOutUser} />
          </SidebarOpacityWrapper>
        </LocalComponents.SidebarVerticalFlexContainer>
      </LocalComponents.SidebarContainer>
      <LocalComponents.ContentContainer>
        <Outlet />
      </LocalComponents.ContentContainer>
    </LocalComponents.Container>
  );
};

export default Sidebar;
