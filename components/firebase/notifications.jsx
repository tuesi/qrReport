import { FIRESTORE_DB } from '../../firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

export const saveNotificationToken = async (token) => {
    const notificationsRef = collection(FIRESTORE_DB, "notifications");
    const checkTokenQuery = query(notificationsRef, where("token", "==", token));
    const querySnapshot = await getDocs(checkTokenQuery);
    if (querySnapshot.empty) {
        return await addDoc(notificationsRef, { token: token });
    }
};

export const getNotificationTokens = async () => {
    const querySnapshot = await getDocs(collection(FIRESTORE_DB, "notifications"));
    const tokens = querySnapshot.docs.map(doc => doc.data().token);
    console.log(tokens);
    return tokens;
};