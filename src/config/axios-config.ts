import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://sso-back.onrender.com/",
    timeout: 3000,
});

axiosInstance.interceptors.request.use(async (req) => {
    try {
        const token = localStorage.getItem("token");
        if (token) {
            req.headers.Authorization = `Bearer ${token}`;
        }
        return req;
    } catch (error) {
        console.log(error);
        return req;
    }
});

export default axiosInstance;