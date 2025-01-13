import axios, { type AxiosResponse } from 'axios';

const SERVICE_URL = 'http://localhost:3000/';

export const axiosInstance = axios.create({
    baseURL: `${SERVICE_URL}`,
    headers: {
        'Content-Type': 'application/json',
    },
});

const responseBody = (response: AxiosResponse) => {
    return response?.data;
};

const fulFilledCb = (response: any) => {
    return response;
};

const onRejectedCb = async (error: any) => {
    return Promise.reject(error);
}

axiosInstance.interceptors.response.use(fulFilledCb, onRejectedCb);
export const requests = {
    get: async (url: string) => axiosInstance.get(url).then(responseBody),
    post: async (
        url: string,
        body: Record<string, any>,
        config?: Record<string, any>,
    ) => axiosInstance.post(url, body, config).then(responseBody),
    put: async (url: string, body: Record<string, any>) =>
        axiosInstance.put(url, body).then(responseBody),
    patch: async (url: string, body: Record<string, any>) =>
        axiosInstance.patch(url, body).then(responseBody),
    delete: async (url: string) => axiosInstance.delete(url).then(responseBody),
};
