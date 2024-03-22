import { instance } from ".";
import HttpService from "../utils/http-service";

//get all
class HomeService  {
   async getList(params) {
      try {
         const response = await new HttpService().get(`/home?page=${params.page}`);
         return response.data;
      } catch (error) {
         throw new Error(error.message);
      }
   }
};

export default new HomeService();