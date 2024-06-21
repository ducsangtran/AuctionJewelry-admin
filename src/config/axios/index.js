import { notification } from "antd";
import axios from "axios";
// import { setTokens } from '@/core/store/auth/authenticate';

const api = axios.create({
    baseURL: "http://localhost:8080/api/v1/",
});

const openNotificationWithIcon = (type, title) => {
    notification[type]({
        message: title,
        placement: "top",
        duration: 5,
    });
};

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const refreshToken = async () => {
    const refresh = localStorage.getItem("refreshToken");
    if (!refresh) {
        throw new Error("No refresh token available");
    }
    const response = await axios.post("http://localhost:8080/api/v1/user/refresh", { refresh });
    const { accessToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    return accessToken;
};

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newAccessToken = await refreshToken();
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (error) {
                console.log(error);
                openNotificationWithIcon("warning", error.message);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("fullName");
                localStorage.removeItem("roleName");
                window.location.href = "/login";
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
