import { LocalComponents } from './styled.ts';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { useContext, useState } from 'react';
import { validateEmail } from '../../utils';
import Picker from '../../components/Picker';
import { MESSAGES, USER_ROLES } from '../../utils/defines.ts';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { COLORS } from '../../utils/colors.ts';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider/context.ts';
import { Profile } from '../../api/profile/types.ts';
import { AlertContext } from '../../providers/AlertProvider/context.ts';
import GoogleIcon from '@mui/icons-material/Google';

const RegisterPage = () => {
  const navigate = useNavigate();

  const { signUpUserWithEmailAndPassword, signInUserWithGoogle } = useContext(AuthContext);
  const { showAlert } = useContext(AlertContext);

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

  const [userRole, setUserRole] = useState<string[]>([]);

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const handleRegisterClick = async () => {
    if (!firstName.trim()) {
      setIsFirstNameValid(false);
      showAlert('error', MESSAGES.errorFirstNameRequired);
      return;
    }

    if (!lastName.trim()) {
      setIsLastNameValid(false);
      showAlert('error', MESSAGES.errorLastNameRequired);
      return;
    }

    if (!userRole.length) {
      showAlert('error', MESSAGES.errorRoleRequired);
      return;
    }

    if (!emailAddress.trim()) {
      setIsEmailAddressValid(false);
      showAlert('error', MESSAGES.errorEmailRequired);
      return;
    }

    if (!validateEmail(emailAddress)) {
      setIsEmailAddressValid(false);
      showAlert('error', MESSAGES.errorEmailInvalid);
      return;
    }

    if (!password) {
      setIsPasswordValid(false);
      showAlert('error', MESSAGES.errorPasswordRequired);
      return;
    }

    if (password.length < 6) {
      setIsPasswordValid(false);
      showAlert('error', MESSAGES.errorPasswordLength);
      return;
    }

    if (password !== passwordConfirmation) {
      setIsPasswordConfirmationValid(false);
      showAlert('error', MESSAGES.errorPasswordMatch);
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
      showAlert('error', MESSAGES.errorAccountCreation);
      return;
    }

    setIsButtonDisabled(false);
    showAlert('success', MESSAGES.successRegister);
    navigate('/login');
  };

  const handleGoogleSignInClick = async () => {
    setIsButtonDisabled(true);
    const response = await signInUserWithGoogle();

    if (typeof response === 'string') {
      showAlert('error', response);
      setIsButtonDisabled(false);
      return;
    }

    showAlert('success', MESSAGES.successGoogleSignIn);
    setIsButtonDisabled(false);
    navigate('/home');
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
          <LocalComponents.HelperTextContainerCentered>
            <LocalComponents.HelperText>- or -</LocalComponents.HelperText>
          </LocalComponents.HelperTextContainerCentered>
          <Button
            label={
              <LocalComponents.GoogleButtonTextContainer>
                <GoogleIcon />
                <LocalComponents.GoogleButtonText>Sign in with Google</LocalComponents.GoogleButtonText>
              </LocalComponents.GoogleButtonTextContainer>
            }
            onClick={handleGoogleSignInClick}
            type={'black'}
            isDisabled={isButtonDisabled}
          />
        </LocalComponents.FormInputsContainer>
      </LocalComponents.Form>
    </LocalComponents.Container>
  );
};

export default RegisterPage;
