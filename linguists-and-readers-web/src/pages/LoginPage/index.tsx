import { LocalComponents } from './styled.ts';
import Button from '../../components/Button';
import { WIDTHS } from '../../utils/sizes.ts';
import TextInput from '../../components/TextInput';

const LoginPage = () => {
  return (
    <LocalComponents.Container>
      <h1>Login Page</h1>
      <Button label={'Register'} width={WIDTHS.large} onClick={() => console.log('register click')} type={'primary'} />
      <Button
        label={'Register'}
        width={WIDTHS.large}
        onClick={() => console.log('register click')}
        type={'secondary'}
      />
      <TextInput type={'text'} placeholder={'Email'} label={'Email'} width={WIDTHS.large} />
      <TextInput type={'password'} placeholder={'Password'} label={'Password'} width={WIDTHS.large} />
    </LocalComponents.Container>
  );
};

export default LoginPage;
