import { API_URL } from '@env';
import axios from "axios";

const routeName = 'reports';

export const GetReports = async (lastCreatedDate) => {
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

export const AddNewReport = async (reportData) => {
    try {
        const response = await axios.post(API_URL + routeName, reportData);
        return response.data;
    } catch (error) {
        console.error('Error creating device:', error);
    }
}

export const CompleteReport = async (reportId) => {
    try {
        const response = await axios.patch(`${API_URL}${routeName}/${reportId}`);
        return response.data;
    } catch (error) {
        console.error('Error creating device:', error);
    }
}