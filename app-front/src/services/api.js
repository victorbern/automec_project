import axios from "axios";

export const api = axios.create ({
    baseURL: "http://localhost:3030",
});

export const createSession = async (email, password) => {

    return api.post('/auth/login', {email, password});   
}