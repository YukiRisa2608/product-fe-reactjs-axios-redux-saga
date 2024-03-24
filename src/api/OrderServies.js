import { toast } from "react-toastify";
import HttpService from "../utils/http-service";


export const getOrderDetail = async (id) => {
    let response = await new HttpService().get('customer/order/' + id);
    return response.data;
};

