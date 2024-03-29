import HttpService from "../utils/http-service";

//get all
export const getList = async () => {
    let response = await new HttpService().get("/admin/roles");
    return response.data
};

