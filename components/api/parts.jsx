import { API_URL } from '@env';
import axios from "axios";

const partRouteName = 'parts';
const partDevicesRouteName = 'part-devices';

export const GetParts = async (deviceId, lastCreatedDate) => {
    try {
        const response = await axios.get(`${API_URL}${partRouteName}`, {
            params: {
                deviceId: deviceId,
                lastCreatedDate: lastCreatedDate
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching parts:', error);
    }
}

export const AddNewPart = async (partData, deviceData) => {
    try {
        const requestData = {
            partData,
            deviceData
        };
        const response = await axios.post(API_URL + partRouteName, requestData);
        return response.data;
    } catch (error) {
        console.error('Error creating part:', error);
    }
}

export const GetAllPartDevices = async () => {
    try {
        const response = await axios.get(`${API_URL}${partDevicesRouteName}`);
        if (response.data) {
            const devices = Object.entries(response.data.mapOfArrays).map(([key, value]) => {
                return { value: key, label: value };
            });
            return devices;
        }
    } catch (error) {
        console.error('Error getting part devices:', error);
    }
}

export const UpdatePartInfo = async (partId, partData, deviceId) => {
    try {
        const requestData = {
            partId,
            partData,
            deviceId
        };
        const response = await axios.patch(`${API_URL}${partRouteName}`, requestData);
        return response.data;
    } catch (error) {
        console.error('Error updating part:', error);
    }
}

//TODO update list after part delete
export const DeletePart = async (partId) => {
    try {
        const response = await axios.delete(`${API_URL}${partRouteName}/${partId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting part:', error);
    }
}
