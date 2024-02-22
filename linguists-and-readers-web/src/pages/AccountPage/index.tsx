import { LocalComponents } from './styled.ts';
import TextInput from '../../components/TextInput';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider/context.ts';
import Button from '../../components/Button';
import { MESSAGES, USER_ROLES } from '../../utils/defines.ts';
import Picker from '../../components/Picker';
import { Profile } from '../../api/profile/types.ts';
import { setProfile } from '../../api/profile';
import { AlertContext } from '../../providers/AlertProvider/context.ts';

const AccountPage = () => {
  const { currentProfile, setCurrentProfile, sendUserPasswordResetEmail } = useContext(AuthContext);

  const { showAlert } = useContext(AlertContext);

  const [firstName, setFirstName] = useState<string>(currentProfile?.firstName ?? '');
  const [lastName, setLastName] = useState<string>(currentProfile?.lastName ?? '');
  const [emailAddress, setEmailAddress] = useState<string>(currentProfile?.email ?? '');
  const [userRole, setUserRole] = useState<string[]>([currentProfile?.role ?? '']);

  const [isFirstNameValid, setIsFirstNameValid] = useState<boolean>(true);
  const [isLastNameValid, setIsLastNameValid] = useState<boolean>(true);

  const [areButtonsDisabled, setAreButtonsDisabled] = useState<boolean>(true);

  const isDataValid = () => {
    if (!firstName.trim()) {
      setIsFirstNameValid(false);
      showAlert('error', MESSAGES.errorFirstNameRequired);
      return false;
    }

    if (!lastName.trim()) {
      setIsLastNameValid(false);
      showAlert('error', MESSAGES.errorLastNameRequired);
      return false;
    }

    return true;
  };

  const resetValidation = () => {
    setIsFirstNameValid(true);
    setIsLastNameValid(true);
  };

  const onSaveClick = async () => {
    if (!isDataValid()) {
      return;
    }

    const profile = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      role: userRole[0],
    } as Profile;

    if (currentProfile?.email) {
      try {
        await setProfile(currentProfile.email, profile);
        showAlert('success', MESSAGES.successUpdateAccountDetails);

        setCurrentProfile({
          ...currentProfile,
          ...profile,
        });
        setAreButtonsDisabled(true);
        resetValidation();
      } catch (e) {
        showAlert('error', MESSAGES.errorUpdateAccountDetails);
      }
    }
  };

  const onResetClick = () => {
    setFirstName(currentProfile?.firstName ?? '');
    setLastName(currentProfile?.lastName ?? '');
    setUserRole([currentProfile?.role ?? '']);
  };

  useEffect(() => {
    if (
      firstName.trim() !== currentProfile?.firstName ||
      lastName.trim() !== currentProfile?.lastName ||
      userRole[0] !== currentProfile?.role
    ) {
      setAreButtonsDisabled(false);
      return;
    }

    setAreButtonsDisabled(true);
  }, [
    firstName,
    lastName,
    emailAddress,
    userRole,
    currentProfile?.firstName,
    currentProfile?.lastName,
    currentProfile?.role,
  ]);

  const onSendPasswordResetEmailClick = async () => {
    if (currentProfile?.email) {
      const result = await sendUserPasswordResetEmail(currentProfile.email);
      if (result) {
        showAlert('success', MESSAGES.successSendPasswordResetEmail);
        return;
      }
    }

    showAlert('error', MESSAGES.errorSendPasswordResetEmail);
  };

  return (
    <LocalComponents.Container>
      <LocalComponents.Title>Account details</LocalComponents.Title>
      <LocalComponents.InformationContainer>
        <LocalComponents.InformationContainer direction={'row'}>
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
        </LocalComponents.InformationContainer>
        <TextInput
          value={emailAddress}
          setValue={setEmailAddress}
          type={'text'}
          placeholder={'name@mail.com'}
          label={'Email'}
          width={'full'}
          isDisabled={true}
        />
        <LocalComponents.HelperTextLink onClick={onSendPasswordResetEmailClick}>
          Send password reset email
        </LocalComponents.HelperTextLink>
        <Picker values={USER_ROLES} activeValues={userRole} setActiveValues={setUserRole} />
      </LocalComponents.InformationContainer>
      <LocalComponents.InformationContainer direction={'row'}>
        <Button label={'Save'} onClick={onSaveClick} isDisabled={areButtonsDisabled} />
        <Button label={'Reset'} type={'danger'} onClick={onResetClick} isDisabled={areButtonsDisabled} />
      </LocalComponents.InformationContainer>
    </LocalComponents.Container>
  );
};

export default AccountPage;
