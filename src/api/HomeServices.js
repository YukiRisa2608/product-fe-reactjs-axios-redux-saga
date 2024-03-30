import { instance } from ".";
import HttpService from "../utils/http-service";

//get all
class HomeService {
   async getList(params) {
      try {
         const response = await new HttpService().get(`/home?page=${params.page}`);
         return response.data;
      } catch (error) {
         throw new Error(error.message);
      }
   }

   //sort
   async getListSorted(params) {
      try {
         const response = await new HttpService().get("/home/sort", {
            params: {
               page: params.page,
               size: params.size,
               sort: params.sortDirection,
            },
         });
         return response.data;
      } catch (error) {
         throw new Error(error.response.data.message || error.message);
      }
   }

   async getListCategories() {
      try {
         const response = await new HttpService().get(`/home/categories`);
         return response.data;
      } catch (error) {
         throw new Error(error.message);
      }
   }


   // Search product
   async searchProduct(payload) {
      const response = await new HttpService().get(`/home/product/search`, {
         params: payload
      })
      return response.data;
   }

};



export default new HomeService();