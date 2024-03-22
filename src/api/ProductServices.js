import { instance } from ".";
import HttpService from "../utils/http-service";


//get all
export const getList = async (params) => {
    let response = await instance.get("admin/products");
    return response.data.data
};

//add
export const addProduct = async (payload) => {
    const formData = new FormData();
    for (const key in payload) {
        formData.append(key, payload[key]);
    }

    const response = await new HttpService().post('/admin/products', {
        body: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};


//delete
export const deleteProduct = async (productId) => {
    const response = await instance.delete(`admin/products/${productId}`);
    return response.data
};

//toggle
export const toggleProductStatus = async (productId) => {
    const response = await instance.post(`/admin/products/toggle-status/${productId}`);
    return response.data;
};

//edit
export const updateProduct = async (productId, productName) => {
    const response = await instance.put(`/admin/products/${productId}`, { productName });
    return response.data;
};
