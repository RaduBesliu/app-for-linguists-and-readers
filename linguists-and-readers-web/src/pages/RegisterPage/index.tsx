import { LocalComponents } from './styled.ts';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { validateEmail } from '../../utils';
import Picker from '../../components/Picker';
import { USER_ROLES } from '../../utils/defines.ts';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { COLORS } from '../../utils/colors.ts';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');

  const [isFirstNameValid, setIsFirstNameValid] = useState<boolean>(true);
  const [isLastNameValid, setIsLastNameValid] = useState<boolean>(true);
  const [isEmailAddressValid, setIsEmailAddressValid] = useState<boolean>(true);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [isPasswordConfirmationValid, setIsPasswordConfirmationValid] = useState<boolean>(true);

  const [alert, setAlert] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<'success' | 'error' | undefined>();
  const [message, setMessage] = useState<string>('');

  const [userRole, setUserRole] = useState<string[]>([]);

  const triggerAlert = (type: 'success' | 'error', message: string) => {
    setAlertType(type);
    setMessage(message);
    setAlert(true);
  };

  const handleRegisterClick = () => {
    console.log(firstName, lastName, userRole, emailAddress, password, passwordConfirmation);

    if (!firstName.trim()) {
      setIsFirstNameValid(false);
      triggerAlert('error', 'The first name is required!');
      return;
    }

    if (!lastName.trim()) {
      setIsLastNameValid(false);
      triggerAlert('error', 'The last name is required!');
      return;
    }

    if (!userRole.length) {
      triggerAlert('error', 'The user role is required!');
      return;
    }

    if (!emailAddress.trim()) {
      setIsEmailAddressValid(false);
      triggerAlert('error', 'The email address is required!');
      return;
    }

    if (!validateEmail(emailAddress)) {
      setIsEmailAddressValid(false);
      triggerAlert('error', 'The email address is invalid!');
      return;
    }

    if (!password) {
      setIsPasswordValid(false);
      triggerAlert('error', 'The password is required!');
      return;
    }

    if (password.length < 6) {
      setIsPasswordValid(false);
      triggerAlert('error', 'The password must be at least 6 characters long!');
      return;
    }

    if (password !== passwordConfirmation) {
      setIsPasswordConfirmationValid(false);
      triggerAlert('error', 'The passwords do not match!');
      return;
    }

    triggerAlert('success', 'Your account was successfully created!');
  };

  return (
    <LocalComponents.Container>
      <LocalComponents.Form>
        <LocalComponents.Title>Create an Account</LocalComponents.Title>

        <LocalComponents.FormInputsContainer $flexDirection={'column'}>
          <LocalComponents.FormInputsContainer $flexDirection={'row'}>
            <TextInput
              value={firstName}
              setValue={setFirstName}
              isValid={isFirstNameValid}
              setIsValid={setIsFirstNameValid}
              type={'text'}
              placeholder={'John'}
              label={'First name'}
              width={'full'}
            />
            <TextInput
              value={lastName}
              setValue={setLastName}
              isValid={isLastNameValid}
              setIsValid={setIsLastNameValid}
              type={'text'}
              placeholder={'Doe'}
              label={'Last name'}
              width={'full'}
            />
          </LocalComponents.FormInputsContainer>
          <Picker values={USER_ROLES} activeValues={userRole} setActiveValues={setUserRole} />
          {userRole.length ? (
            <LocalComponents.HelperTextContainer>
              <InfoOutlinedIcon htmlColor={COLORS.primary} />
              <LocalComponents.HelperText>Don't worry, you can change your role later.</LocalComponents.HelperText>
            </LocalComponents.HelperTextContainer>
          ) : null}
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
          <LocalComponents.FormInputsContainer $flexDirection={'row'}>
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
            <TextInput
              value={passwordConfirmation}
              setValue={setPasswordConfirmation}
              isValid={isPasswordConfirmationValid}
              setIsValid={setIsPasswordConfirmationValid}
              type={'password'}
              placeholder={'Confirm your password'}
              label={'Confirm password'}
              width={'full'}
            />
          </LocalComponents.FormInputsContainer>
        </LocalComponents.FormInputsContainer>
        <LocalComponents.FormInputsContainer $flexDirection={'column'}>
          <Button label={'Register'} onClick={handleRegisterClick} type={'primary'} />
          <LocalComponents.HelperText>
            Already have an account?{' '}
            <LocalComponents.HelperTextLink onClick={() => navigate('/login')}>Login</LocalComponents.HelperTextLink>
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

export default RegisterPage;
