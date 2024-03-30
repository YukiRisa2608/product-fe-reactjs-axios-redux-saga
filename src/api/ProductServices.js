import { toast } from "react-toastify";
import HttpService from "../utils/http-service";


//get all
export const getList = async (params) => {
    let response = await new HttpService().get("admin/products");
    console.log(response)
    if (response.data.status === "SUCCESS") {
        return response.data.data
    }
    toast.error(response.data.message);
    return []

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

    if (response.data.status === "SUCCESS") {
        toast.success("Add new product successfully")
        return response.data.data
    }

    toast.error(response.data.message);
    return {}
};


//delete
export const deleteProduct = async (productId) => {
    const response = await new HttpService().delete(`admin/products/${productId}`);

    if (response.data.status === "SUCCESS") {
        toast.success("Delete product successfully")
        return response.data.data
    }

    toast.error(response.data.message);
    return {}
};

//toggle
export const toggleProductStatus = async (productId) => {
    const response = await new HttpService().post(`/admin/products/toggle-status/${productId}`);

    if (response.data.status === "SUCCESS") {
        return response.data.data
    }

    toast.error(response.data.message);
    return {}
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

    if (response.data.status === "SUCCESS") {
        return response.data.data
    }

    toast.error(response.data.message);
    return {}
};

// Search product
export const searchProduct = async (payload) => {
    const response = await new HttpService().get(`/admin/products/search`, {
        params: payload
    })

    if (response.data.status === "SUCCESS") {
        return response.data.data
    }

    toast.error(response.data.message);
    return {}
}