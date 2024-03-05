export const USER_ROLES = ['Linguist', 'Reader'] as const;

export const MESSAGES = {
  errorEmailRequired: 'The email address is required!',
  errorEmailNotVerified: 'Email not verified! Please check your inbox.',
  errorEmailInvalid: 'The email address is invalid!',

  errorPasswordRequired: 'The password is required!',
  errorPasswordLength: 'The password must be at least 6 characters long!',
  errorPasswordMatch: 'The passwords do not match!',

  errorFirstNameRequired: 'The first name is required!',

  errorLastNameRequired: 'The last name is required!',

  errorRoleRequired: 'The role is required!',

  errorInvalidCredentials: 'Invalid credentials! Please try again.',

  errorAccountCreation: 'There was an error creating your account. Please try again.',

  errorGoogleSignIn: 'There was an error signing in with Google. Please try again.',

  errorSendPasswordResetEmail: 'There was an error sending the password reset email. Please try again.',

  errorUpdateAccountDetails: 'There was an error updating your account details. Please try again.',

  errorMarkStoryAsRead: 'There was an error marking the story as read. Please try again.',
  errorMarkStoryAsUnread: 'There was an error marking the story as unread. Please try again.',

  successLogin: 'You have successfully logged in!',

  successRegister: 'Your account was successfully created! Verification email sent!',

  successGoogleSignIn: 'You have successfully signed in with Google!',

  successSendPasswordResetEmail: 'Password reset email sent! Please check your inbox.',

  successUpdateAccountDetails: 'Your account details were successfully updated!',

  successMarkStoryAsRead: 'Story marked as read!',
  successMarkStoryAsUnread: 'Story marked as unread!',
};

export const DEFAULT_ALERT_DURATION = 3000;
