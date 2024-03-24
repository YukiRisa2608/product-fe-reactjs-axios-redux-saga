import { toast } from "react-toastify";
import HttpService from "../utils/http-service";
import storageService from "../utils/storage.service";
import { AuthKeys } from "../utils/constant";

export const login = async (payload) => {
    let response = await new HttpService().post('auth/sign-in', {
        body: payload
    });
    return response?.data?.data;
};

export const signup = async (payload) => {
    let response = await new HttpService().post('auth/sign-up', {
        body: payload
    });

    if (response?.data && response?.data?.status === 500) {
        toast.error(response?.data?.message)
        throw Error(response?.data?.message)
    }

    return response?.data;
};

export const isLoggedIn = () => {
    const accessToken = storageService.get(AuthKeys.ACCESS_TOKEN);
    const loggedIn = storageService.get(AuthKeys.LOGGED_IN) === 'true';
    return !!accessToken && loggedIn;
};