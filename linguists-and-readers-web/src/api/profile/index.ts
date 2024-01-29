import { Profile } from './types.ts';
import { db } from '../../utils/firebase.ts';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const getProfile = async (key: string): Promise<Profile | null> => {
  const docRef = doc(db, 'profiles', key);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log('[getProfile] Document data:', docSnap.data());
    return docSnap.data() as Profile;
  } else {
    console.log('[getProfile] No such document!');
    return null;
  }
};

export const setProfile = async (key: string, profile: Profile): Promise<void> => {
  const docRef = doc(db, 'profiles', key);
  console.log('[setProfile] profile:', profile);
  await setDoc(docRef, profile, { merge: true });
};
