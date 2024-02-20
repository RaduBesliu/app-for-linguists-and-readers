import { LocalComponents } from './styled.ts';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { useContext, useEffect, useState } from 'react';
import CheckBox from '../../components/CheckBox';
import { useNavigate } from 'react-router-dom';
import { setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth';
import { auth } from '../../utils/firebase.ts';
import { AuthContext } from '../../providers/AuthProvider/context.ts';
import { MESSAGES } from '../../utils/defines.ts';
import { AlertContext } from '../../providers/AlertProvider/context.ts';

const LoginPage = () => {
  const navigate = useNavigate();

  const { signInUserWithEmailAndPassword } = useContext(AuthContext);
  const { showAlert } = useContext(AlertContext);

  const [emailAddress, setEmailAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [isEmailAddressValid, setIsEmailAddressValid] = useState<boolean>(true);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);

  const [rememberMe, setRememberMe] = useState<boolean>(true);

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  useEffect(() => {
    setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence).then();
  }, [rememberMe]);

  const handleLoginClick = async () => {
    if (!emailAddress.trim()) {
      setIsEmailAddressValid(false);
      showAlert('error', MESSAGES.errorEmailRequired);
      setIsButtonDisabled(false);
      return;
    }

    if (!password) {
      setIsPasswordValid(false);
      showAlert('error', MESSAGES.errorPasswordRequired);
      setIsButtonDisabled(false);
      return;
    }

    setIsButtonDisabled(true);
    const response = await signInUserWithEmailAndPassword(emailAddress, password);

    if (typeof response === 'string') {
      showAlert('error', response);
      setIsButtonDisabled(false);
      return;
    }

    showAlert('success', MESSAGES.successLogin);
    setIsButtonDisabled(false);
    navigate('/home');
  };

  return (
    <LocalComponents.Container>
      <LocalComponents.Form>
        <LocalComponents.Title>Log in to your Account</LocalComponents.Title>

        <LocalComponents.FormInputsContainer $flexDirection={'column'}>
          <TextInput
            value={emailAddress}
            setValue={setEmailAddress}
            isValid={isEmailAddressValid}
            setIsValid={setIsEmailAddressValid}
            type={'text'}
            placeholder={'name@mail.com'}
            label={'Email'}
            width={'full'}
          />
          <TextInput
            value={password}
            setValue={setPassword}
            isValid={isPasswordValid}
            setIsValid={setIsPasswordValid}
            type={'password'}
            placeholder={'Your password'}
            label={'Password'}
            width={'full'}
          />
          <CheckBox value={rememberMe} setValue={setRememberMe} label={'Remember me'} />
        </LocalComponents.FormInputsContainer>
        <LocalComponents.FormInputsContainer $flexDirection={'column'}>
          <Button label={'Log in'} onClick={handleLoginClick} type={'primary'} isDisabled={isButtonDisabled} />
          <LocalComponents.HelperTextLink onClick={() => navigate('/forgot-password')}>
            Forgot your password?
          </LocalComponents.HelperTextLink>
          <LocalComponents.HelperText>
            Don't have an account?{' '}
            <LocalComponents.HelperTextLink onClick={() => navigate('/register')}>
              Register
            </LocalComponents.HelperTextLink>
          </LocalComponents.HelperText>
        </LocalComponents.FormInputsContainer>
      </LocalComponents.Form>
    </LocalComponents.Container>
  );
};

export default LoginPage;
