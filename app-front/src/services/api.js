import axios from "axios";

export const api = axios.create({
    baseURL: "auth",
});

export const createSession = async (email, password) => {
    return api.post("/auth/login", { email, password });
};
