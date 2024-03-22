import { instance } from ".";

//get all
export const getList = async (params) => {
    let response = await instance.get("admin/categories");
    return response.data.data
};

//add
export const addCategory = async (categoryName) => {
    const response = await instance.post('/admin/categories', { categoryName });
    return response.data;
};

//delete
export const deleteCategory = async (categoryId) => {
    const response = await instance.delete(`admin/categories/${categoryId}`);
    return response.data
}; 

//toggle
export const toggleCategoryStatus = async (categoryId) => {
    const response = await instance.post(`/admin/categories/toggle-status/${categoryId}`);
    return response.data;
};

//edit
export const updateCategory = async (categoryId, categoryName) => {
    const response = await instance.put(`/admin/categories/${categoryId}`, { categoryName });
    return response.data;
};
