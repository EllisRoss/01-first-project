import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "a3d6acb3-8449-4702-b788-2742107bd9c5",
    }
});

export const usersAPI = {
    getUsers (currentPage = 1, pageSize = 100) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },
    follow (userId) {
        return instance.post(`follow/${userId}`)
            .then(response => response.data);
    },

    unfollow (userId) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data);
    },
};
