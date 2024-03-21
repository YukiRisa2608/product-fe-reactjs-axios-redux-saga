import { instance } from ".";

//get all
export const getList = async (params) => {
   let response = await instance.get(`/home?page=${params.page}`);
   return response.data;
};

// class HomeService extends HttpService {
//    async getList(params) {
//       console.log(params.page)
//       try {
//          const response = await this.get(`/home?page=${params.page}`);
//          // const response = await this.get("/home", {
//          //    params: {
//          //       page: params.page
//          //    }
//          // });

//          console.log("OKe3")

//          return response.data;
//       } catch (error) {
//          throw new Error(error.message);
//       }
//    }
// };

// export default new HomeService();