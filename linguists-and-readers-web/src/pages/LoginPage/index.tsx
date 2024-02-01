import { LocalComponents } from './styled.ts';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { useContext, useEffect, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import CheckBox from '../../components/CheckBox';
import { useNavigate } from 'react-router-dom';
import { setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth';
import { auth } from '../../utils/firebase.ts';
import { AuthContext } from '../../providers/AuthProvider/context.ts';
import { MESSAGES } from '../../utils/defines.ts';

const LoginPage = () => {
  const navigate = useNavigate();

  const { signInUserWithEmailAndPassword } = useContext(AuthContext);

  const [emailAddress, setEmailAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [isEmailAddressValid, setIsEmailAddressValid] = useState<boolean>(true);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);

  const [alert, setAlert] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<'success' | 'error' | undefined>();
  const [message, setMessage] = useState<string>('');

  const [rememberMe, setRememberMe] = useState<boolean>(true);

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  useEffect(() => {
    setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence).then();
  }, [rememberMe]);

  const triggerAlert = (type: 'success' | 'error', message: string) => {
    setAlertType(type);
    setMessage(message);
    setAlert(true);
  };

  const handleLoginClick = async () => {
    console.log(emailAddress, password);

    if (!emailAddress.trim()) {
      setIsEmailAddressValid(false);
      triggerAlert('error', MESSAGES.errorEmailRequired);
      setIsButtonDisabled(false);
      return;
    }

    if (!password) {
      setIsPasswordValid(false);
      triggerAlert('error', MESSAGES.errorPasswordRequired);
      setIsButtonDisabled(false);
      return;
    }

    setIsButtonDisabled(true);
    const response = await signInUserWithEmailAndPassword(emailAddress, password);

    if (typeof response === 'string') {
      triggerAlert('error', response);
      setIsButtonDisabled(false);
      return;
    }

    triggerAlert('success', MESSAGES.successLogin);
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
          <LocalComponents.HelperText>
            Don't have an account?{' '}
            <LocalComponents.HelperTextLink onClick={() => navigate('/register')}>
              Register
            </LocalComponents.HelperTextLink>
          </LocalComponents.HelperText>
        </LocalComponents.FormInputsContainer>
      </LocalComponents.Form>

      <Snackbar open={alert} autoHideDuration={3000} onClose={() => setAlert(false)}>
        <Alert onClose={() => setAlert(false)} severity={alertType}>
          {message}
        </Alert>
      </Snackbar>
    </LocalComponents.Container>
  );
};

export default LoginPage;
