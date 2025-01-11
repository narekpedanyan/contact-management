import axios from "axios";

const API_URL = "http://localhost:3000/contacts";

export const getContacts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};