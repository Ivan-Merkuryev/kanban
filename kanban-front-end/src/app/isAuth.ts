import Cookies from "js-cookie";

export const isAuth = () => {
  const hasAccessToken: boolean = Cookies.get("accessToken") !== undefined;
  return hasAccessToken;
};