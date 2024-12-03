import { API_URL } from '@env';
import axios from "axios";

const routeName = 'devices';

export const GetDevices = async (lastCreatedDate) => {
    try {
        const response = await axios.get(API_URL + routeName, {
            params: {
                lastCreatedDate: lastCreatedDate
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching devices:', error);
    }
}

export const GetDeviceList = async () => {
    try {
        const response = await axios.get(API_URL + routeName);
        const deviceNames = response.data.map(device => {
            return { label: device.name, value: { id: device._id, name: device.name } };
        });
        return deviceNames;
    } catch (error) {
        console.error('Error fetching devices:', error);
    }
}

export const AddNewDevice = async (deviceData) => {
    try {
        const response = await axios.post(API_URL + routeName, deviceData);
        return response.data;
    } catch (error) {
        console.error('Error creating device:', error);
    }
}

export const GetDeviceInfo = async (deviceId) => {
    try {
        const response = await axios.get(`${API_URL}${routeName}/byId`, {
            params: { deviceId }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching devices:', error);
    }
}

export const UpdateDeviceInfo = async (deviceId, deviceData) => {
    try {
        const response = await axios.patch(`${API_URL}${routeName}/${deviceId}`, deviceData);
        return response.data;
    } catch (error) {
        console.error('Error saving device data:', error);
    }
}

//TODO add delete device