import { API_URL } from '@env';
import axios from "axios";

const routeName = 'token';

export const saveNotificationToken = async (token) => {
    try {
        const response = await axios.post(API_URL + routeName, token);
        return response.data;
    } catch (error) {
        console.error('Error creating device:', error);
    }
}