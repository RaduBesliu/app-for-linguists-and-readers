import Button from '../../components/Button';
import { AuthContext } from '../../providers/AuthProvider/context.ts';
import { useContext } from 'react';

const HomePage = () => {
  const { signOutUser } = useContext(AuthContext);

  return <Button label={'Log out'} type={'danger'} onClick={signOutUser} />;
};

export default HomePage;
