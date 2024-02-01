import { LocalComponents } from './styled.ts';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { useContext, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { validateEmail } from '../../utils';
import Picker from '../../components/Picker';
import { MESSAGES, USER_ROLES } from '../../utils/defines.ts';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { COLORS } from '../../utils/colors.ts';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider/context.ts';
import { Profile } from '../../api/profile/types.ts';

const RegisterPage = () => {
  const navigate = useNavigate();

  const { signUpUserWithEmailAndPassword } = useContext(AuthContext);

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

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const triggerAlert = (type: 'success' | 'error', message: string) => {
    setAlertType(type);
    setMessage(message);
    setAlert(true);
  };

  const handleRegisterClick = async () => {
    if (!firstName.trim()) {
      setIsFirstNameValid(false);
      triggerAlert('error', MESSAGES.errorFirstNameRequired);
      return;
    }

    if (!lastName.trim()) {
      setIsLastNameValid(false);
      triggerAlert('error', MESSAGES.errorLastNameRequired);
      return;
    }

    if (!userRole.length) {
      triggerAlert('error', MESSAGES.errorRoleRequired);
      return;
    }

    if (!emailAddress.trim()) {
      setIsEmailAddressValid(false);
      triggerAlert('error', MESSAGES.errorEmailRequired);
      return;
    }

    if (!validateEmail(emailAddress)) {
      setIsEmailAddressValid(false);
      triggerAlert('error', MESSAGES.errorEmailInvalid);
      return;
    }

    if (!password) {
      setIsPasswordValid(false);
      triggerAlert('error', MESSAGES.errorPasswordRequired);
      return;
    }

    if (password.length < 6) {
      setIsPasswordValid(false);
      triggerAlert('error', MESSAGES.errorPasswordLength);
      return;
    }

    if (password !== passwordConfirmation) {
      setIsPasswordConfirmationValid(false);
      triggerAlert('error', MESSAGES.errorPasswordMatch);
      return;
    }

    setIsButtonDisabled(true);

    const profile: Profile = {
      firstName,
      lastName,
      email: emailAddress,
      role: userRole[0].toLowerCase() as 'linguist' | 'reader',
    };

    const response = await signUpUserWithEmailAndPassword(emailAddress, password, profile);

    if (!response) {
      setIsButtonDisabled(false);
      triggerAlert('error', MESSAGES.errorAccountCreation);
      return;
    }

    setIsButtonDisabled(false);
    triggerAlert('success', MESSAGES.successLogin);
    navigate('/login');
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
          <Button label={'Register'} onClick={handleRegisterClick} type={'primary'} isDisabled={isButtonDisabled} />
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
