import { LocalComponents } from './styled.ts';
import { HOME_INFORMATION } from '../../utils/defines.ts';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider/context.ts';

const HomePage = () => {
  const { isLinguist } = useContext(AuthContext);

  const navigate = useNavigate();

  const onInformationClick = (navigateTo: string) => {
    navigate(navigateTo);
  };

  return (
    <LocalComponents.Container>
      {HOME_INFORMATION.filter(
        (item) => item.navigateTo !== '/alignments' || (item.navigateTo === '/alignments' && isLinguist),
      ).map((item) => (
        <LocalComponents.InformationContainer key={item.navigateTo} onClick={() => onInformationClick(item.navigateTo)}>
          <LocalComponents.InformationContainerTitle>{item.title}</LocalComponents.InformationContainerTitle>
          <LocalComponents.InformationContainerDescription>
            {item.description}
          </LocalComponents.InformationContainerDescription>
        </LocalComponents.InformationContainer>
      ))}
    </LocalComponents.Container>
  );
};

export default HomePage;
