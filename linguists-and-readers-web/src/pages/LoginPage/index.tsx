import { LocalComponents } from './styled.ts';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { useEffect, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import CheckBox from '../../components/CheckBox';
import { useNavigate } from 'react-router-dom';
import { setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth';
import { auth } from '../../utils/firebase.ts';

const LoginPage = () => {
  const navigate = useNavigate();

  const [emailAddress, setEmailAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [isEmailAddressValid, setIsEmailAddressValid] = useState<boolean>(true);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);

  const [alert, setAlert] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<'success' | 'error' | undefined>();
  const [message, setMessage] = useState<string>('');

  const [rememberMe, setRememberMe] = useState<boolean>(true);

  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence).then();
  }, [rememberMe]);

  const triggerAlert = (type: 'success' | 'error', message: string) => {
    setAlertType(type);
    setMessage(message);
    setAlert(true);
  };

  const handleLoginClick = () => {
    console.log(emailAddress, password);
    setIsDisabled(true);

    if (!emailAddress.trim()) {
      setIsEmailAddressValid(false);
      triggerAlert('error', 'The email address is required!');
      setIsDisabled(false);
      return;
    }

    if (!password) {
      setIsPasswordValid(false);
      triggerAlert('error', 'The password is required!');
      setIsDisabled(false);
      return;
    }

    triggerAlert('success', 'You have successfully logged in!');
    setIsDisabled(false);
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
          <Button label={'Log in'} onClick={handleLoginClick} type={'primary'} isDisabled={isDisabled} />
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
