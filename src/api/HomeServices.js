import { instance } from ".";

//get all
export const getList = async (params) => {
    let response = await instance.get("admin/categories");
    return response.data.data
};