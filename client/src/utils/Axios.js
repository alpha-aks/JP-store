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
        if (typeof window !== "undefined" && window.location.hostname && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
            config.baseURL = `${window.location.protocol}//${window.location.hostname}:8080`;
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