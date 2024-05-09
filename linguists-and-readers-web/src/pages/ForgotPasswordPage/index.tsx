import { LocalComponents } from './styled.ts';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider/context.ts';
import { MESSAGES } from '../../utils/defines.ts';
import { AlertContext } from '../../providers/AlertProvider/context.ts';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const { showAlert } = useContext(AlertContext);
  const { sendUserPasswordResetEmail } = useContext(AuthContext);

  const [emailAddress, setEmailAddress] = useState<string>('');

  const [isEmailAddressValid, setIsEmailAddressValid] = useState<boolean>(true);

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const handleResetPasswordClick = async () => {
    if (!emailAddress.trim()) {
      setIsEmailAddressValid(false);
      showAlert('error', MESSAGES.errorEmailRequired);
      setIsButtonDisabled(false);
      return;
    }

    setIsButtonDisabled(true);
    const response = await sendUserPasswordResetEmail(emailAddress);

    if (typeof response === 'string') {
      showAlert('error', response);
      setIsButtonDisabled(false);
      return;
    }

    showAlert('success', MESSAGES.successSendPasswordResetEmail);
    setIsButtonDisabled(false);
    navigate('/login');
  };

  return (
    <LocalComponents.Container>
      <LocalComponents.Form>
        <LocalComponents.Title>Reset your Password</LocalComponents.Title>

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
        </LocalComponents.FormInputsContainer>
        <LocalComponents.FormInputsContainer $flexDirection={'column'}>
          <LocalComponents.HelperText>
            By clicking the button, an email will be sent to you with instructions on how to reset your password. Please
            check your inbox.
          </LocalComponents.HelperText>
          <Button
            label={'Reset my password'}
            onClick={handleResetPasswordClick}
            type={'primary'}
            isDisabled={isButtonDisabled}
          />
          <LocalComponents.HelperTextLink onClick={() => navigate('/login')}>Go back</LocalComponents.HelperTextLink>
        </LocalComponents.FormInputsContainer>
      </LocalComponents.Form>
    </LocalComponents.Container>
  );
};

export default ForgotPasswordPage;
