import axios from "axios";
import summaryApi, { baseURL } from "../common/summaryApi";
// import summaryApi, { baseURL } from "../common/summaryApi";

const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true
})

//sending access token in header
Axios.interceptors.request.use(
    async (config) => {
        if (typeof window !== "undefined" && window.location.hostname) {
            const host = window.location.hostname;
            if (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.trim()) {
                config.baseURL = import.meta.env.VITE_API_URL.replace(/\/$/, "");
            } else if (host.includes("jpenterprise.store") || host.endsWith(".vercel.app")) {
                config.baseURL = "https://backend.jpenterprise.store";
            } else if (/^(192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)/.test(host)) {
                config.baseURL = `${window.location.protocol}//${host}:8080`;
            } else {
                config.baseURL = baseURL;
            }
        }

        const accessToken = localStorage.getItem("accessToken")

        if(accessToken) {
            config.headers.authorization = `Bearer ${accessToken}` 
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

//extend the life span of accesstoken with help of refreshToken
Axios.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        let originalRequest = error.config

        if(error.response?.status === 401 && originalRequest && !originalRequest.retry) {
            originalRequest.retry = true

            const refreshToken = localStorage.getItem("refreshToken")

            if(refreshToken) {
                const newAccessToken = await refreshAccessToken(refreshToken)

                if(newAccessToken) {
                    originalRequest.headers.authorization = `Bearer ${newAccessToken}`
                    return Axios(originalRequest)
                }
            }
        }
        return Promise.reject(error)
    }
)

const refreshAccessToken = async (refreshToken) => {
    try {
        const response = await Axios({
            ...summaryApi.refreshToken,
            headers : {
                authorization: `Bearer ${refreshToken}`
            }
        })
        const accessToken = response.data.data.accessToken
        // console.log("response: ", response);
        localStorage.setItem("accessToken", accessToken)
        return accessToken
    } catch (error) {
        console.log("error: ", error);
    }
}

export default Axios