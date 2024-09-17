import { FIRESTORE_DB } from '../../firebaseConfig';
import { collection, query, orderBy, addDoc, doc, updateDoc, getDoc, limit, startAfter, onSnapshot, deleteDoc, getDocs, where, setDoc } from 'firebase/firestore';


//TODO implement this function and create the same for others

export const FetchSearchDataFromFirestore = async ({ setSearchData, pageSize, lastSearchQuerySnapShot, setLastSearchQuerySnapshot, searchText }) => {
    let items = await findBySearch(searchText, pageSize, lastSearchQuerySnapShot, setLastSearchQuerySnapshot, 'reports', 'dateCreated');
    setSearchData(items);
}

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

const findBySearch = async (searchText, pageSize, lastSearchQuerySnapShot, setLastSearchQuerySnapshot, collectionName, orderByField) => {

    //TODO Check if pagination implementation works
    let reportQuery = query(
        collection(FIRESTORE_DB, collectionName),
        where("subString", "array-contains", searchText.toLowerCase()),
        orderBy(orderByField, "desc"),
        limit(pageSize)
    );

    //If not the first page start after the last fetched item
    if (lastSearchQuerySnapShot) {
        reportQuery = query(reportQuery, startAfter(lastSearchQuerySnapShot));
    }


    //Get data
    const reportsQuerySnapshot = await getDocs(reportQuery);
    const items = reportsQuerySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
    }));


    //Save the last doc snapshot if its not the last
    if (reportsQuerySnapshot.docs[reportsQuerySnapshot.docs.length - 1] && lastQuerySnapShot !== reportsQuerySnapshot.docs[reportsQuerySnapshot.docs.length - 1]) {
        setLastSearchQuerySnapshot(reportsQuerySnapshot.docs[reportsQuerySnapshot.docs.length - 1]);
    }

    return lastQuerySnapShot ? [...prevData, ...items] : items;
}

export const FetchDeviceDataFromFirestore = async ({ setData, pageSize, lastQuerySnapShot, setLastQuerySnapshot, setLoading, searchText }) => {

    if (searchText !== '') {
        let items = await findBySearch(searchText, 'devices', 'created');
        setData(items);
        setLastQuerySnapshot(null);
        return;
    }

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

export const FetchPartsDataFromFirestore = async ({ deviceId, setItems, pageSize, lastQuerySnapShot, searchText }) => {

    if (searchText !== '' && searchText !== null) {
        let items = await findBySearch(searchText, 'parts', 'deviceId');
        setItems({ items: items, lastQuerySnapShot: 0, isSearch: true });
        return;
    }

    let reportQuery = query(
        collection(FIRESTORE_DB, "parts"),
        where("deviceId", "==", deviceId),
        orderBy("created", "desc"),
        limit(pageSize)
    );

    if (lastQuerySnapShot) {
        reportQuery = query(reportQuery, startAfter(lastQuerySnapShot));
    }

    const subscribe = onSnapshot(reportQuery, async (querySnapshot) => {
        const items = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }));

        setItems({ items: items, lastQuerySnapShot: querySnapshot.docs[querySnapshot.docs.length - 1], isSearch: false });
    });
    return subscribe;
};

export const AddNewDevice = async (deviceData) => {
    return await addDoc(collection(FIRESTORE_DB, "devices"), deviceData);
};;

export const AddNewReport = async (formData) => {
    return await addDoc(collection(FIRESTORE_DB, "reports"), formData);
};

export const GetAllDevices = async () => {
    const querySnapshot = await getDocs(collection(FIRESTORE_DB, "devices"), orderBy("created", "desc"));
    const deviceNames = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return { label: data.name, value: { id: doc.id, name: data.name } };
    });
    return deviceNames;
}

export const GetDeviceInfo = async (deviceId) => {
    const deviceDocRef = doc(FIRESTORE_DB, "devices", deviceId);
    return await getDoc(deviceDocRef);
};

//TODO if image changes delete the old one
export const UpdateDeviceInfo = async (deviceId, deviceInfo) => {
    const deviceDocRef = doc(FIRESTORE_DB, "devices", deviceId);
    try {
        await updateDoc(deviceDocRef, {
            name: deviceInfo.name,
            notes: deviceInfo.notes,
            imageName: deviceInfo.imageName
        });
    } catch (error) {
        console.error("Error updating document: ", error);
    }
}

export const DeleteDevice = async (deviceId) => {
    const deviceDocRef = doc(FIRESTORE_DB, "devices", deviceId);
    await deleteDoc(deviceDocRef);
}

export const AddNewPart = async (partData, deviceData) => {
    const partRef = await addDoc(collection(FIRESTORE_DB, "parts"), partData);
    await AddNewPartDevice(deviceData);
    return partRef;
}

export const AddNewPartDevice = async (deviceData) => {
    const docRef = doc(collection(FIRESTORE_DB, 'partDevices'), 'deviceList');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists && docSnap.data()) {
        const currentDevices = docSnap.data().deviceMap || {};
        currentDevices[deviceData.id] = [deviceData.name, false];
        await updateDoc(docRef, { deviceMap: currentDevices });
    } else {
        await setDoc(docRef, { deviceMap: { [deviceData.id]: [deviceData.name, false] } });
    }
}

export const GetAllPartDevices = async () => {
    const docRef = doc(collection(FIRESTORE_DB, 'partDevices'), 'deviceList');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const devicesData = docSnap.data().deviceMap;
        const devices = Object.entries(devicesData).map(([key, value]) => {
            return { value: key, label: value };
        });
        return devices;
    } else {
        return [];
    }
}

export const UpdatePartDevice = async (deviceId, isPartLow) => {
    const docRef = doc(collection(FIRESTORE_DB, 'partDevices'), 'deviceList');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const devicesData = docSnap.data().deviceMap;
        devicesData[deviceId][1] = isPartLow;
        await updateDoc(docRef, { deviceMap: devicesData });
    }
}

export const GetPartInfo = async (partId) => {
    const partDocRef = doc(FIRESTORE_DB, "parts", partId);
    return await getDoc(partDocRef);
};

export const UpdatePartInfo = async (partId, partInfo, deviceId) => {
    const partDocRef = doc(FIRESTORE_DB, "parts", partId);
    try {
        if (partDocRef.amount < partDocRef.minAmount && partInfo.amount > partInfo.minAmount) {
            UpdatePartDevice(deviceId, false);
        } else if (partDocRef.amount > partDocRef.minAmount && partInfo.amount < partInfo.minAmount) {
            UpdatePartDevice(deviceId, true);
        }
        await updateDoc(partDocRef, {
            name: partInfo.name,
            notes: partInfo.notes,
            location: partInfo.location,
            minAmount: partInfo.minAmount,
            amount: partInfo.amount,
            imageName: partInfo.imageName
        });
    } catch (error) {
        console.error("Error updating document: ", error);
    }
}

//TODO maybe delete device if it has no more parts?
export const DeletePart = async (partId) => {
    const partDocRef = doc(FIRESTORE_DB, "parts", partId);
    await deleteDoc(partDocRef);
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

export const AddNewUser = async (userData, username) => {
    const userRef = collection(FIRESTORE_DB, "users");
    const checkUserQuery = query(userRef, where("username", "==", username));
    const querySnapshot = await getDocs(checkUserQuery);
    if (querySnapshot.empty) {
        return await addDoc(userRef, userData);
    }
};

export const GetUsers = async () => {
    const querySnapshot = await getDocs(collection(FIRESTORE_DB, "users"));
    const users = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return { label: data.username, value: data.username };
    });
    return users;
};

export const DeleteUser = async (username) => {
    const userRef = collection(FIRESTORE_DB, "users");
    const checkUserQuery = query(userRef, where("username", "==", username));
    const querySnapshot = await getDocs(checkUserQuery);
    if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        await deleteDoc(userDoc.ref);
    }
}