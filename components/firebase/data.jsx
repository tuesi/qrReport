import { FIRESTORE_DB } from '../../firebaseConfig';
import { collection, query, orderBy, addDoc, doc, updateDoc, getDoc, limit, startAfter, onSnapshot, deleteDoc } from 'firebase/firestore';

export const FetchDataFromFirestore = async ({ setData, pageSize, lastQuerySnapShot, setLastQuerySnapshot, setLoading }) => {

    let reportQuery = query(
        collection(FIRESTORE_DB, "reports"),
        orderBy("completed", "asc"),
        orderBy("dateCreated", "desc"),
        limit(pageSize)
    );

    if (lastQuerySnapShot) {
        reportQuery = query(reportQuery, startAfter(lastQuerySnapShot));
    }

    const subscribe = onSnapshot(reportQuery, (querySnapshot) => {
        const items = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
        }));

        if (lastQuerySnapShot) {
            setData(prevData => [...prevData, ...items]);
        } else {
            setData(items);
        }

        if (querySnapshot.docs[querySnapshot.docs.length - 1] && lastQuerySnapShot !== querySnapshot.docs[querySnapshot.docs.length - 1]) {
            setLastQuerySnapshot(querySnapshot.docs[querySnapshot.docs.length - 1]);
        }

        setLoading(false);
    });
    return subscribe;
};

export const FetchDeviceDataFromFirestore = async ({ setData, pageSize, lastQuerySnapShot, setLastQuerySnapshot, setLoading }) => {

    let reportQuery = query(
        collection(FIRESTORE_DB, "devices"),
        orderBy("created", "desc"),
        limit(pageSize)
    );

    if (lastQuerySnapShot) {
        reportQuery = query(reportQuery, startAfter(lastQuerySnapShot));
    }

    const subscribe = onSnapshot(reportQuery, (querySnapshot) => {
        const items = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
        }));

        if (lastQuerySnapShot) {
            setData(prevData => [...prevData, ...items]);
        } else {
            setData(items);
        }

        if (querySnapshot.docs[querySnapshot.docs.length - 1] && lastQuerySnapShot !== querySnapshot.docs[querySnapshot.docs.length - 1]) {
            setLastQuerySnapshot(querySnapshot.docs[querySnapshot.docs.length - 1]);
        }

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

export const UpdateDeviceInfo = async (deviceId, deviceInfo) => {
    const deviceDocRef = doc(FIRESTORE_DB, "devices", deviceId);
    try {
        await updateDoc(deviceDocRef, {
            name: deviceInfo.name,
            notes: deviceInfo.notes
        });
    } catch (error) {
        console.error("Error updating document: ", error);
    }
}

export const DeleteDevice = async (deviceId) => {
    const deviceDocRef = doc(FIRESTORE_DB, "devices", deviceId);
    await deleteDoc(deviceDocRef);
}

export const CompleteReport = async (reportId) => {
    const itemRef = doc(FIRESTORE_DB, 'reports', reportId);
    try {
        await updateDoc(itemRef, {
            dateCompleted: new Date(), // Set 'completed' to current date and time
            completed: true
        });
    } catch (error) {
        console.error("Error updating document: ", error);
    }
};