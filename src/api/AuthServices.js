import { toast } from "react-toastify";
import HttpService from "../utils/http-service";

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

    if (response?.data && response?.data?.status == 500) {
        toast.error(response?.data?.message)
        throw Error(response?.data?.message)
    }

    return response?.data;
};

