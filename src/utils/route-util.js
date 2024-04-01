import { redirect } from "react-router-dom";
import storageService from "./storage.service";
import { AuthKeys } from "./constant";

export const isAuthenticated = ({ request }) => {
  const token = storageService.get(AuthKeys.ACCESS_TOKEN);

  console.log("request", request)

  //chưa có token, chuyển về login
  if (
    !token &&
    !(request.url.includes("/login") || request.url.includes("/signup"))
  ) {
    return redirect("/login");
  }


  //có token, về home or admin page
  if (
    token &&
    (request.url.includes("/login") || request.url.includes("/signup"))
  ) {
    let user = JSON.parse(storageService.get(AuthKeys.CURRENT_USER));
    if (AuthKeys.ROLE_ADMIN === user.role[0]) {
      return redirect("/admin/category");
    }

    return redirect("/");

    //logout, xóa token trong storage
  } else if (token) {
    let user = JSON.parse(storageService.get(AuthKeys.CURRENT_USER));
    if (AuthKeys.ROLE_USER === user.role[0] && request.url.includes("/admin")) {
      // block user access admin page
      storageService.remove(AuthKeys.ACCESS_TOKEN);
      storageService.remove(AuthKeys.CURRENT_USER);
      storageService.set(AuthKeys.LOGGED_IN, false);
      return redirect("/login");
    }
  }

  return true;
};
