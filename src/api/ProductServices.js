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
export const updateProduct = async (productId, payload) => {
    const formData = new FormData();
    for (const key in payload.payload) {
        if (key === 'file') {
            if (payload.payload[key] === null) {
                continue
            }
        }
        formData.append(key, payload.payload[key]);
    }

    const response = await new HttpService().put(`/admin/products/${productId}`, {
        body: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

// Search product
export const searchProduct = async (payload) => {
    const response = await new HttpService().get(`/admin/products/search`, {
        params: payload
    })
    console.log("Call API response: ", response.data)
    return response.data;
}