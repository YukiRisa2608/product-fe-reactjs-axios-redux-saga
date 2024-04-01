import { toast } from "react-toastify";
import { instance } from ".";
import HttpService from "../utils/http-service";

//get cart product
export const getCartInfo = async () => {
    let response = await new HttpService().get('customer/carts');
    return response.data;
};

//delete
export const removeItemInCart = async (productId) => {
    const response = await new HttpService().delete(`customer/carts/${productId}`);
    return response.data
};

//+- quantity
export const updateQuantity = async (payload) => {
    let response = await new HttpService().patch('customer/carts', { params: payload });
    return response.data;
};

//purchase
export const purchase = async () => {
    try {
        let response = await new HttpService().post('customer/carts/purchase');
        console.log({key: response.data})

        if (response.data.status) {
            toast.success(response.data.message);
            return response.data;
        } else {
            toast.error(response.data.message);
            return {};
        }
    } catch (error) {
        toast.error("An error occurred during purchase");
        return {};
    }
};

// add to cart
export const addToCart = async (payload) => {
    let response = await new HttpService().post('customer/carts', {
        params: payload
    });
    console.log(response.data)
    toast.success(response.data)
    return response.data;
};