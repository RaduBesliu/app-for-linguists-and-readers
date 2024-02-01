import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import {
  User,
  GoogleAuthProvider,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification,
} from 'firebase/auth';
import { Profile } from '../../api/profile/types.ts';
import { getProfile, setProfile } from '../../api/profile';
import { auth } from '../../utils/firebase.ts';
import { AuthContext } from './context.ts';
import { MESSAGES } from '../../utils/defines.ts';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined | null>(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [currentProfile, setCurrentProfile] = useState<Profile | undefined | null>(null);

  const logInUser = useCallback(async (user: User, profile?: Profile) => {
    setUser(user);
    setIsUserLoggedIn(true);

    console.log('[logInUser] Logged in user');

    if (user.email) {
      const _profile = await getProfile(user.email);

      if (_profile) {
        setCurrentProfile(_profile);
        console.log('[logInUser] Retrieved profile');
        return;
      }

      if (profile) {
        await setProfile(user.email, profile);
        setCurrentProfile(profile);
        console.log('[logInUser] Created profile', profile);
        return;
      }
    }

    console.log('[logInUser] No profile retrieved');
  }, []);

  const logOutUser = useCallback(() => {
    setUser(undefined);
    setIsUserLoggedIn(false);
    setCurrentProfile(undefined);

    console.log('[logOutUser] Logged out user');
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('[authStateChanged] Logged in user detected');
        logInUser(user).then();
      } else {
        console.log('[authStateChanged] Logged out user detected');
        logOutUser();
        return;
      }
    });
  }, [logInUser, logOutUser]);

  const signUpUserWithEmailAndPassword = useCallback(
    async (email: string, password: string, profile: Profile): Promise<boolean> => {
      try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

        console.log('[signUpUserWithEmailAndPassword] User signed up');

        await sendEmailVerification(userCredentials.user);

        const user = userCredentials.user;

        if (user.email) {
          await setProfile(user.email, profile);
        }

        return true;
      } catch (error) {
        console.log('[signUpUserWithEmailAndPassword] Error signing up user', error);

        return false;
      }
    },
    [],
  );

  const signInUserWithEmailAndPassword = useCallback(
    async (email: string, password: string): Promise<boolean | string> => {
      try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);

        console.log('[signInUserWithEmailAndPassword] User signed in');

        const user = userCredentials.user;

        if (!user.emailVerified) {
          console.log('[signInUserWithEmailAndPassword] User email not verified');
          return MESSAGES.errorEmailNotVerified;
        }

        await logInUser(user);

        return true;
      } catch (error) {
        console.log('[signInUserWithEmailAndPassword] Error signing in user', error);

        return MESSAGES.errorInvalidCredentials;
      }
    },
    [logInUser],
  );

  const signInUserWithGoogle = useCallback(async (): Promise<boolean> => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredentials = await signInWithPopup(auth, provider);

      console.log('[signInUserWithGoogle] User signed in');

      const user = userCredentials.user;
      await logInUser(user);

      return true;
    } catch (error) {
      console.log('[signInUserWithGoogle] Error signing in user', error);

      return false;
    }
  }, [logInUser]);

  const signOutUser = useCallback(async (): Promise<boolean> => {
    try {
      await auth.signOut();

      console.log('[signOutUser] User signed out');

      logOutUser();

      return true;
    } catch (error) {
      console.log('[signOutUser] Error signing out user', error);

      return false;
    }
  }, [logOutUser]);

  const sendUserPasswordResetEmail = useCallback(async (email: string): Promise<boolean> => {
    try {
      await sendPasswordResetEmail(auth, email);

      console.log('[sendPasswordResetEmail] Password reset email sent');

      return true;
    } catch (error) {
      console.log('[sendPasswordResetEmail] Error sending password reset email', error);

      return false;
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      isUserLoggedIn,
      currentProfile,
      setCurrentProfile,
      signUpUserWithEmailAndPassword,
      signInUserWithEmailAndPassword,
      signInUserWithGoogle,
      signOutUser,
      sendUserPasswordResetEmail,
    }),
    [
      user,
      isUserLoggedIn,
      currentProfile,
      signUpUserWithEmailAndPassword,
      signInUserWithEmailAndPassword,
      signInUserWithGoogle,
      signOutUser,
      sendUserPasswordResetEmail,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
