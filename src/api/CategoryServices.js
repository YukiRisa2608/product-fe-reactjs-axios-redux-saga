import { instance } from ".";

//get all
export const getList = async (params) => {
    let response = await instance.get("admin/categories");
    return response.data.data
};

//add
export const create = async (categoryName) => {
    let response = await instance.post("admin/categories", {categoryName});
    console.log("create", response)
    return response.data
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