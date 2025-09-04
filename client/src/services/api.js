import axios from 'axios';

// Local pe chalate time localhost, render pe deploy hone ke baad backend URL
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const uploadFile = async (data) => {
    try {
        let response = await axios.post(`${API_URL}/upload`, data);
        return response.data;
    } catch (error) {
        console.error('Error while calling the api', error.message);
    }
}
