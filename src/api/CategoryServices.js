import HttpService from "../utils/http-service";

//get all
export const getList = async (params) => {
    let response = await new HttpService().get("admin/categories");
    return response.data.data
};

//add
export const addCategory = async (categoryName) => {
    const response = await new HttpService().post('/admin/categories', {
        body: {
            categoryName
        }
    });
    return response.data;
};

//delete
export const deleteCategory = async (categoryId) => {
    const response = await new HttpService().delete(`admin/categories/${categoryId}`);
    return response.data
};

//toggle
export const toggleCategoryStatus = async (categoryId) => {
    const response = await new HttpService().post(`/admin/categories/toggle-status/${categoryId}`);
    return response.data;
};

//edit
export const updateCategory = async (categoryId, categoryName) => {
    const response = await new HttpService().put(`/admin/categories/${categoryId}`, {
        body: {
            categoryName
        }
    });
    return response.data;
};
