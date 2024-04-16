import { FIREBASE_STORAGE } from "../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const SaveImageToStorage = async (uri, imageName) => {

    const storageRef = ref(FIREBASE_STORAGE, `images/${imageName}`);

    try {
        const response = await fetch(uri);
        const blob = await response.blob();
        await uploadBytes(storageRef, blob);
    } catch (error) {
        console.error('Error uploading image', error);
    }
}

export const GetImageFromStorage = async (imageName) => {
    const storageRef = ref(FIREBASE_STORAGE, `images/${imageName}`);

    try {
        const url = await getDownloadURL(storageRef);
        return url;
    } catch (error) {
        console.error('Error getting image from storage', error);
        return null;
    }

}