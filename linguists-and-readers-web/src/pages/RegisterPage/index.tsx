import { LocalComponents } from './styled.ts';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

const RegisterPage = () => {
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

  const [alertInvalid, setAlertInvalid] = useState<boolean>(false);
  const [alertSuccess, setAlertSuccess] = useState<boolean>(false);

  const handleRegisterClick = () => {
    console.log(firstName, lastName, emailAddress, password, passwordConfirmation);

    if (!firstName.trim()) {
      setIsFirstNameValid(false);
    }

    if (!lastName.trim()) {
      setIsLastNameValid(false);
    }

    if (!emailAddress.trim()) {
      setIsEmailAddressValid(false);
    }

    if (!password) {
      setIsPasswordValid(false);
    }

    if (!passwordConfirmation) {
      setIsPasswordConfirmationValid(false);
    }

    if (
      !isFirstNameValid ||
      !isLastNameValid ||
      !isEmailAddressValid ||
      !isPasswordValid ||
      !isPasswordConfirmationValid
    ) {
      setAlertInvalid(true);
      return;
    }

    setAlertSuccess(true);
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
        <Button label={'Register'} onClick={handleRegisterClick} type={'primary'} />
      </LocalComponents.Form>

      <Snackbar open={alertInvalid} autoHideDuration={3000} onClose={() => setAlertInvalid(false)}>
        <Alert onClose={() => setAlertInvalid(false)} severity='error'>
          There were some errors in your form. Please check again.
        </Alert>
      </Snackbar>
      <Snackbar open={alertSuccess} autoHideDuration={3000} onClose={() => setAlertSuccess(false)}>
        <Alert onClose={() => setAlertSuccess(false)} severity='success'>
          Your account was successfully created!
        </Alert>
      </Snackbar>
    </LocalComponents.Container>
  );
};

export default RegisterPage;
