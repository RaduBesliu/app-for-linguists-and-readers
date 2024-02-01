import { User } from 'firebase/auth';
import { createContext } from 'react';
import { Profile } from '../../api/profile/types.ts';

export interface AuthContextProps {
  user?: User | null;
  isUserLoggedIn: boolean;
  currentProfile?: Profile | null;
  setCurrentProfile: (profile: Profile) => void;
  signUpUserWithEmailAndPassword: (email: string, password: string, profile: Profile) => Promise<boolean>;
  signInUserWithEmailAndPassword: (email: string, password: string) => Promise<boolean | string>;
  signInUserWithGoogle: () => Promise<boolean>;
  signOutUser: () => Promise<boolean>;
  sendUserPasswordResetEmail: (email: string) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  isUserLoggedIn: false,
  currentProfile: null,
  setCurrentProfile: () => {},
  signUpUserWithEmailAndPassword: () => Promise.resolve(false),
  signInUserWithEmailAndPassword: () => Promise.resolve(false),
  signInUserWithGoogle: () => Promise.resolve(false),
  signOutUser: () => Promise.resolve(false),
  sendUserPasswordResetEmail: () => Promise.resolve(false),
});
