import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
    try {
        await ReactNativeAsyncStorage.setItem(key, value);
    } catch (e) {
        console.log('Error storing data', e);
    }
}

export const storeObject = async (key, values) => {
    try {
        const jsonValue = JSON.stringify(values);
        await ReactNativeAsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.log('Error storing objects', e);
    }
}

export const getData = async (key) => {
    try {
        const value = await ReactNativeAsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
    } catch (e) {
        console.log('Error getting data', e);
    }
}

export const getObjectData = async (key) => {
    try {
        const jsonValue = await ReactNativeAsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log('Error getting object data', e);
    }
}

export const removeData = async (key) => {
    try {
        await ReactNativeAsyncStorage.removeItem(key)
    } catch (e) {
        console.log('Error removing data', e);
    }
}