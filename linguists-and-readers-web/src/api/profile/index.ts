import { Profile } from './types.ts';
import { db } from '../../utils/firebase.ts';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { MESSAGES } from '../../utils/defines.ts';

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

export const toggleStoryRead = async (profileKey: string, storyId: string): Promise<boolean> => {
  const profile = await getProfile(profileKey);
  if (!profile) {
    return false;
  }

  const updatedProfile = {
    ...profile,
    readStories: profile?.readStories?.includes(storyId)
      ? profile.readStories.filter((id) => id !== storyId)
      : [...(profile?.readStories ?? []), storyId],
  };

  try {
    await setProfile(profileKey, updatedProfile);
    return true;
  } catch (error) {
    console.error('[toggleStoryRead] Error updating profile:', error);
    return false;
  }
};
