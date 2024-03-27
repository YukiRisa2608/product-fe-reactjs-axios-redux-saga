import HttpService from "../utils/http-service";

//get all
export const getList = async () => {
    let response = await new HttpService().get("/admin/users");
    return response.data
};

//add
export const addUser = async (payload) => {
    const response = await new HttpService().post("/admin/users", {
        body: payload
    })

    return response.data;
};

//delete
export const deleteUser = async (userId) => {
    const response = await new HttpService().delete(`admin/users/${userId}`);
    return response.data
};

//toggle
export const toggleUserStatus = async (userId) => {
    const response = await new HttpService().post(`/admin/users/toggle-status/${userId}`);
    return response.data;
};
