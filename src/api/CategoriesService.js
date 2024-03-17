import { instance } from "./instance";

export const getList = async (params) => {
    let response = await instance.get("admin/categories");

    return response.data.data
};


export const create = async (categoryName) => {
    let response = await instance.post("admin/categories", {
        categoryName: categoryName
    });

    console.log("create", response)

    return response.data
};
