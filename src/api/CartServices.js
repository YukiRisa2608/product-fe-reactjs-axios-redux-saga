import { instance } from ".";
import HttpService from "../utils/http-service";

//get cart product
export const getCartInfo = async () => {
    // let response = await instance.request({
    //     method: "GET",
    //     baseURL: "http://localhost:8081/api.com/v2/",
    //     url: 'customer/carts',
    //     headers: {
    //         Authorization: `Bearer ${token}`
    //     },
    // });
    let response = await new HttpService().get('customer/carts');

    return response.data;
};

//get cart product
export const updateQuantity = async (payload) => {
    // let response = await instance.request({
    //     method: "POST",
    //     baseURL: "http://localhost:8081/api.com/v2/",
    //     url: 'customer/carts',
    //     headers: {
    //         Authorization: `Bearer ${token}`
    //     },
    //     params: payload
    // });

    let response = await new HttpService().post('customer/carts', { params: payload });


    return response.data;
};


//get cart product
export const purchase = async () => {
    // let response = await instance.request({
    //     method: "POST",
    //     baseURL: "http://localhost:8081/api.com/v2/",
    //     url: 'customer/carts/purchase',
    //     headers: {
    //         Authorization: `Bearer ${token}`
    //     },
    // });
    let response = await new HttpService().post('customer/carts/purchase');

    return response.data;
};