import axios from "axios";

const api = axios.create({
    baseURL: "http://apijewelryauction.techx.id.vn:8081/api/v1/",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

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
    const response = await axios.post("http://apijewelryauction.techx.id.vn:8081/api/v1/user/refresh", { refreshToken: refresh });
    const { accessToken } = response.data.data;
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
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("fullName");
                localStorage.removeItem("money");
                // window.location.href = '/login';
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);
export default api;
