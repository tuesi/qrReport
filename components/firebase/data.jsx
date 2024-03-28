import { FIRESTORE_DB } from '../../firebaseConfig';
import { collection, onSnapshot, query, orderBy, addDoc, doc, updateDoc, getDoc, limit, startAfter } from 'firebase/firestore';

export const FetchDataFromFirestore = async ({ setData, pageSize, startAfterDate, setLoading }) => {
    let reportRef = query(collection(FIRESTORE_DB, "reports"), orderBy("dateCreated", "desc"), limit(pageSize));
    if (startAfterDate) {
        reportRef = query(reportRef, startAfter(startAfterDate));
    }
    const subscribe = onSnapshot(reportRef, (querySnapshot) => {
        const items = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
        }));
        setData(prevData => [...prevData, ...items]);
        setLoading(false);
    });
    return subscribe;
};

export const AddNewDevice = async (deviceData) => {
    return await addDoc(collection(FIRESTORE_DB, "devices"), deviceData);
};

export const AddNewReport = async (formData) => {
    return await addDoc(collection(FIRESTORE_DB, "reports"), formData);
};

export const GetDeviceInfo = async (deviceId) => {
    const deviceDocRef = doc(FIRESTORE_DB, "devices", deviceId);
    return await getDoc(deviceDocRef);
};

export const UpdateReport = async (reportId) => {
    const itemRef = doc(FIRESTORE_DB, 'reports', reportId);
    try {
        await updateDoc(itemRef, {
            dateCompleted: new Date() // Set 'completed' to current date and time
        });
    } catch (error) {
        console.error("Error updating document: ", error);
    }
};