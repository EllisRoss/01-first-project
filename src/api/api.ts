import axios from "axios";
import {
    AuthMeResponseType, FollowResponseType,
    GetCaptchaURLResponseType,
    GetUsersResponseType, LoginResponseType, LogoutResponseType,
    SaveProfileResponseType,
    SetUserAvatarResponseType, UpdateUserStatusResponseType
} from "../types/APIResponceTypes";
import { ProfileType } from "../types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "a3d6acb3-8449-4702-b788-2742107bd9c5",
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 100) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },
    follow(userId: number) {
        return instance.post<FollowResponseType>(`follow/${userId}`)
    },

    unfollow(userId: number) {
        return instance.delete<FollowResponseType>(`follow/${userId}`)
    },
};

export const authAPI = {
    authMe() {
        return instance.get<AuthMeResponseType>(`auth/me`)
            .then(response => response.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null) {
        return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha});
    },
    logout() {
        return instance.delete<LogoutResponseType>(`auth/login`);
    },
}

export const profileAPI = {
    getUserProfile(userId: number | null) {
        return instance.get<ProfileType>(`profile/${userId}`);
    },
    getUserStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`);
    },
    updateUserStatus(status: string) {
        return instance.put<UpdateUserStatusResponseType>(`profile/status`, {status: status});
    },
    setUserAvatar(photo: any) {
        return instance.put<SetUserAvatarResponseType>(`profile/photo`, photo)
            .then(response => response.data)
    },
    saveProfile(formData: ProfileType) {
        return instance.put<SaveProfileResponseType>(`profile`, formData)
            .then(response => response.data);
    },
}

export const securityAPI = {
    getCaptchaURL() {
        return instance.get<GetCaptchaURLResponseType>(`security/get-captcha-url`);
    },
}

