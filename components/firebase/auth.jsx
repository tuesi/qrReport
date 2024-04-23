import { FIREBASE_AUTH } from '../../firebaseConfig';
import { signInAnonymously } from 'firebase/auth';

export const Auth = async () => {
    const user = FIREBASE_AUTH.currentUser;
    if (!user) {
        await signInAnonymously(FIREBASE_AUTH);
    }
}