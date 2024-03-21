import { instance } from ".";

//get all
export const getList = async (params) => {
    let response = await instance.get("admin/products");
    return response.data.data
};

//add
export const addProduct = async (productName) => {
    const response = await instance.post('/admin/products', { productName });
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
