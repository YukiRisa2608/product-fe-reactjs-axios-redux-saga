import { redirect } from "react-router-dom";
import storageService from "./storage.service";
import { AuthKeys } from "./constant";

export const isAuthenticated = ({ request }) => {
  const token = storageService.get(AuthKeys.ACCESS_TOKEN);

  console.log("request", request)

  if (
    !token &&
    !(request.url.includes("/login") || request.url.includes("/signup"))
  ) {
    return redirect("/login");
  }


  if (
    token &&
    (request.url.includes("/login") || request.url.includes("/signup"))
  ) {
    let user = JSON.parse(storageService.get(AuthKeys.CURRENT_USER));
    if (AuthKeys.ROLE_ADMIN === user.role[0]) {
      return redirect("/admin/category");
    }

    return redirect("/");
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
